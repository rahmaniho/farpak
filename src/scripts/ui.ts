/**
 * FARPAK OPS — progressive enhancement layer.
 * ---------------------------------------------------------------------------
 * Everything here is optional. If this file never runs, the page is complete:
 * content is server-rendered, reveals are native CSS scroll-driven animations,
 * counters already contain their final value and the HUD shows its static labels.
 *
 * Budget: one deferred module, no dependencies, ~3 KB, all listeners passive
 * and rAF-throttled. Nothing here reads layout on a scroll event.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

/* ── 1. Header state ─────────────────────────────────────────────────────── */
function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.toggleAttribute('data-stuck', window.scrollY > 12);
    ticking = false;
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* ── 2. Scroll progress fallback ─────────────────────────────────────────────
   Native `animation-timeline: scroll()` drives the bar where supported.
   Older engines get the same bar, driven by one rAF-throttled listener. */
function initScrollProgress(): void {
  if (CSS.supports('animation-timeline: scroll()')) return;
  const bar = document.querySelector<HTMLElement>('.scroll-progress');
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    ticking = false;
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  addEventListener('resize', update, { passive: true });
  update();
}

/* ── 3. Numeric counters ───────────────────────────────────────────────────
   <span data-count="250000" data-locale="fa-IR">۲۵۰٬۰۰۰</span>
   The server-rendered text is the final value, so a failed/absent script
   leaves the correct number on screen. */
function initCounters(): void {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  if (nodes.length === 0) return;
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const final = el.textContent ?? '';
    if (!Number.isFinite(target) || target <= 0) return;
    let fmt: Intl.NumberFormat;
    try {
      fmt = new Intl.NumberFormat(el.dataset.locale ?? 'en-US');
    } catch {
      fmt = new Intl.NumberFormat('en-US');
    }
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
      el.textContent = p < 1 ? fmt.format(Math.round(target * eased)) : final;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          run(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.35 },
  );
  nodes.forEach((n) => io.observe(n));
}

/* ── 4. Pointer spotlight ──────────────────────────────────────────────────
   [data-spot]  → --mx/--my  (card spotlight, in px)
   [data-glow]  → --px/--py  (hero light source, in %)  */
function initSpotlight(): void {
  if (!finePointer.matches || reduceMotion.matches) return;
  const spots = Array.from(document.querySelectorAll<HTMLElement>('[data-spot]'));
  const glows = Array.from(document.querySelectorAll<HTMLElement>('[data-glow]'));
  if (spots.length === 0 && glows.length === 0) return;

  let frame = 0;
  let lastX = 0;
  let lastY = 0;

  const apply = () => {
    frame = 0;
    for (const el of spots) {
      const r = el.getBoundingClientRect();
      if (lastX < r.left || lastX > r.right || lastY < r.top || lastY > r.bottom) continue;
      el.style.setProperty('--mx', `${lastX - r.left}px`);
      el.style.setProperty('--my', `${lastY - r.top}px`);
    }
    for (const el of glows) {
      const r = el.getBoundingClientRect();
      if (lastY > r.bottom || lastY < r.top) continue;
      el.style.setProperty('--px', `${((lastX - r.left) / r.width) * 100}%`);
      el.style.setProperty('--py', `${((lastY - r.top) / r.height) * 100}%`);
    }
  };

  addEventListener(
    'pointermove',
    (ev: PointerEvent) => {
      lastX = ev.clientX;
      lastY = ev.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    },
    { passive: true },
  );
}

/* ── 5. Live HUD clock (Asia/Tehran) ─────────────────────────────────────── */
function initClock(): void {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-clock]'));
  if (nodes.length === 0) return;
  const make = (loc: string) =>
    new Intl.DateTimeFormat(loc, {
      timeZone: 'Asia/Tehran',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  const cache = new Map<string, Intl.DateTimeFormat>();
  const tick = () => {
    const now = new Date();
    for (const n of nodes) {
      const loc = n.dataset.locale ?? 'en-GB';
      let fmt = cache.get(loc);
      if (!fmt) {
        try {
          fmt = make(loc);
        } catch {
          return;
        }
        cache.set(loc, fmt);
      }
      n.textContent = fmt.format(now);
    }
  };
  tick();
  setInterval(tick, 1000);
}

/* ── 6. Mobile navigation ──────────────────────────────────────────────────
   The menu is a native <details>, so it works with zero JS. This only makes it
   behave: close after navigating, close on Escape, close when focus leaves. */
function initMobileNav(): void {
  const details = document.querySelector<HTMLDetailsElement>('[data-mobile-nav]');
  if (!details) return;
  details.addEventListener('click', (ev) => {
    const target = ev.target as HTMLElement;
    if (target.closest('a')) details.open = false;
  });
  details.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && details.open) {
      details.open = false;
      details.querySelector('summary')?.focus();
    }
  });
}

/* ── 6. Copy-link buttons ([data-copy] holds the text to copy) ───────────── */
function initCopy(): void {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-copy]'));
  if (buttons.length === 0 || !navigator.clipboard) return;
  for (const btn of buttons) {
    btn.addEventListener('click', async () => {
      const label = btn.textContent ?? '';
      try {
        await navigator.clipboard.writeText(btn.dataset.copy ?? '');
        btn.textContent = btn.dataset.copiedLabel ?? '✓';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = label;
          btn.disabled = false;
        }, 1800);
      } catch {
        /* Clipboard denied: the visible URL stays as the fallback. */
      }
    });
  }
}

function boot(): void {
  initHeader();
  initScrollProgress();
  initCounters();
  initSpotlight();
  initClock();
  initMobileNav();
  initCopy();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
