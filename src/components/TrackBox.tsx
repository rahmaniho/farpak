import { useState, type CSSProperties, type FormEvent } from 'react';

interface Props {
  /** UI strings, passed from Astro so this island has no i18n dependency. */
  t: Record<string, string>;
  /** slug → title, to render the service name of a found request. */
  services: { slug: string; title: string }[];
}

interface TrackResult {
  ok: boolean;
  status?: string;
  receivedAt?: string | null;
  mode?: string | null;
  service?: string | null;
  error?: string;
}

// Trailing slash: the site enforces trailingSlash 'always', and the form server strips it.
const ENDPOINT = '/api/track/';

export default function TrackBox({ t, services }: Props) {
  const [code, setCode] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'found' | 'missing' | 'error'>('idle');
  const [result, setResult] = useState<TrackResult | null>(null);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const id = code.trim();
    if (!id) return;
    setState('loading');
    setResult(null);
    try {
      const res = await fetch(`${ENDPOINT}${encodeURIComponent(id)}/`, { method: 'GET' });
      if (res.status === 404) {
        setState('missing');
        return;
      }
      if (res.status === 429) {
        setState('error');
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as TrackResult;
      setResult(data);
      setState('found');
    } catch {
      setState('error');
    }
  }

  const serviceTitle = result?.service ? services.find((s) => s.slug === result.service)?.title : undefined;
  const received = result?.receivedAt ? new Date(result.receivedAt) : null;
  const dateFmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]" noValidate>
        <div>
          <label htmlFor="track-code" className="field-label">{t.trackLabel}</label>
          <input
            id="track-code"
            className="field font-mono text-sm"
            dir="ltr"
            autoComplete="off"
            spellCheck={false}
            placeholder="00000000-0000-0000-0000-000000000000"
            value={code}
            onChange={(ev) => setCode(ev.target.value)}
            aria-describedby="track-hint"
          />
          <p id="track-hint" className="field-hint">{t.trackHint}</p>
        </div>
        <button type="submit" disabled={state === 'loading' || code.trim().length === 0} className="btn btn-primary self-end" style={{ '--acc': 'var(--color-flux)' } as CSSProperties}>
          {state === 'loading' ? t.submitting : t.trackSubmit}
        </button>
      </form>

      <div aria-live="polite" className="mt-6">
        {state === 'found' && result && (
          <div className="callout callout-ok">
            <div className="grid gap-2 text-sm">
              <p className="font-bold">{t.trackFound}</p>
              <p>
                <span className="mono text-[0.625rem] uppercase tracking-[0.18em] opacity-70">{t.trackStatus}: </span>
                <span className="font-bold">{t.trackStatusReceived}</span>
              </p>
              {received && (
                <p>
                  <span className="mono text-[0.625rem] uppercase tracking-[0.18em] opacity-70">{t.trackReceivedAt}: </span>
                  <time dateTime={result.receivedAt ?? undefined}>{dateFmt.format(received)}</time>
                </p>
              )}
              {serviceTitle && (
                <p>
                  <span className="mono text-[0.625rem] uppercase tracking-[0.18em] opacity-70">{t.trackService}: </span>
                  <span>{serviceTitle}</span>
                </p>
              )}
              <p className="text-xs opacity-80">{t.trackNote}</p>
            </div>
          </div>
        )}
        {state === 'missing' && <p className="callout callout-warn">{t.trackNotFound}</p>}
        {state === 'error' && <p className="callout callout-danger">{t.errorMsg}</p>}
      </div>
    </div>
  );
}
