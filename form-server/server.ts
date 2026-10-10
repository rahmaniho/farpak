/**
 * Form submission endpoint (Node 22+, no dependencies).
 *
 *   POST /api/submit   multipart/form-data  (fields from RequestForm)
 *   GET  /api/track/:id  status lookup by tracking id (sanitized: no personal data)
 *
 * Environment:
 *   FORM_PORT          default 8787
 *   FORM_HOST          default 127.0.0.1 (the browser never calls this directly; the
 *                      dev server proxies /api to it, production should route /api here)
 *   ALLOWED_ORIGINS    comma-separated list, e.g. https://farapak.ir. Empty = no origin check (dev only).
 *   FORM_WEBHOOK_URL   if set, the sanitized JSON payload is POSTed here (CRM/Slack/email relay).
 *                      If unset, submissions are written to form-server/inbox/ for review.
 *   RATE_LIMIT         requests per IP per minute (default 5)
 */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { validateSubmission, type FormMode, type SubmissionInput } from '../src/lib/validation.ts';

const PORT = Number(process.env.FORM_PORT ?? 8787);
const HOST = process.env.FORM_HOST ?? '127.0.0.1';
const ALLOWED = (process.env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const WEBHOOK = process.env.FORM_WEBHOOK_URL ?? '';
const RATE = Number(process.env.RATE_LIMIT ?? 5);
const MAX_BODY = 12 * 1024 * 1024; // attachment limit (10 MB) plus overhead
const INBOX = path.join(path.dirname(new URL(import.meta.url).pathname), 'inbox');

const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE;
}

function send(res: http.ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers });
  res.end(JSON.stringify(body));
}

function readBody(req: http.IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (c: Buffer) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('too-large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function handleSubmit(req: http.IncomingMessage, res: http.ServerResponse) {
  const origin = req.headers.origin;
  if (ALLOWED.length > 0 && (!origin || !ALLOWED.includes(origin))) {
    return send(res, 403, { ok: false, error: 'forbidden-origin' });
  }

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return send(res, 429, { ok: false, error: 'rate-limited' }, { 'retry-after': '60' });

  let form: FormData;
  try {
    const body = await readBody(req);
    const request = new Request('http://form.local/api/submit', {
      method: 'POST',
      headers: { 'content-type': String(req.headers['content-type'] ?? '') },
      body,
    });
    form = await request.formData();
  } catch (err) {
    const tooLarge = err instanceof Error && err.message === 'too-large';
    return send(res, tooLarge ? 413 : 400, { ok: false, error: tooLarge ? 'too-large' : 'bad-request' });
  }

  const get = (k: string) => {
    const v = form.get(k);
    return typeof v === 'string' ? v : '';
  };
  const attachment = form.get('attachment');
  const file = attachment instanceof File && attachment.size > 0 ? attachment : null;
  const rawMode = get('mode');
  const mode: FormMode = rawMode === 'contact' ? 'contact' : rawMode === 'h477' ? 'h477' : 'rfq';

  const input: SubmissionInput = {
    mode,
    name: get('name'),
    company: get('company'),
    phone: get('phone'),
    email: get('email'),
    subject: get('subject'),
    message: get('message'),
    service: get('service'),
    location: get('location'),
    volume: get('volume'),
    consent: get('consent'),
    website: get('website'),
    attachment: file ? { type: file.type, size: file.size } : null,
  };

  // Honeypot: bots fill hidden fields. Answer as if successful so they learn nothing.
  if (input.website) return send(res, 202, { ok: true });

  const errors = validateSubmission(input);
  if (Object.keys(errors).length > 0) return send(res, 422, { ok: false, errors });

  const record = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    locale: get('locale') === 'en' ? 'en' : 'fa',
    mode,
    name: input.name,
    company: input.company,
    phone: input.phone,
    email: input.email,
    subject: input.subject,
    message: input.message,
    service: input.service,
    location: input.location,
    volume: input.volume,
    consent: input.consent === 'true',
    hse: get('hse') === 'true',
    attachmentName: file ? file.name : null,
  };

  try {
    if (WEBHOOK) {
      const r = await fetch(WEBHOOK, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(record) });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
    } else {
      await fs.mkdir(INBOX, { recursive: true });
      await fs.writeFile(path.join(INBOX, `${record.id}.json`), JSON.stringify(record, null, 2));
    }
  } catch (err) {
    console.error('delivery failed', err);
    return send(res, 502, { ok: false, error: 'delivery-failed' });
  }

  return send(res, 201, { ok: true, id: record.id });
}

async function handleTrack(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return send(res, 429, { ok: false, error: 'rate-limited' }, { 'retry-after': '60' });
  // Only unguessable UUID ids resolve; the response never contains personal fields.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return send(res, 404, { ok: false, error: 'not-found' });
  }
  try {
    const raw = await fs.readFile(path.join(INBOX, `${id}.json`), 'utf8');
    const rec = JSON.parse(raw) as { receivedAt?: string; mode?: string; service?: string };
    return send(res, 200, {
      ok: true,
      status: 'received',
      receivedAt: rec.receivedAt ?? null,
      mode: rec.mode ?? null,
      service: rec.service ?? null,
    });
  } catch {
    return send(res, 404, { ok: false, error: 'not-found' });
  }
}

const server = http.createServer(async (req, res) => {
  // Accept the path with or without a trailing slash (the site uses trailingSlash: 'always').
  const pathname = new URL(req.url ?? '/', 'http://form.local').pathname.replace(/\/+$/, '');
  if (pathname.startsWith('/api/track/')) {
    if (req.method !== 'GET') return send(res, 405, { ok: false, error: 'method-not-allowed' }, { allow: 'GET' });
    return handleTrack(req, res, decodeURIComponent(pathname.slice('/api/track/'.length)));
  }
  if (pathname !== '/api/submit') return send(res, 404, { ok: false, error: 'not-found' });
  if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'method-not-allowed' }, { allow: 'POST' });
  try {
    await handleSubmit(req, res);
  } catch (err) {
    console.error(err);
    send(res, 500, { ok: false, error: 'server-error' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`form-server listening on http://${HOST}:${PORT}`);
  if (ALLOWED.length === 0) console.warn('ALLOWED_ORIGINS is empty: origin check disabled (do not use in production)');
  console.log(WEBHOOK ? 'delivery: webhook' : `delivery: inbox (${INBOX})`);
});
