// The webinar funnel leaves our site in the middle: video -> /webinar ->
// WebinarJam registration -> back to /webinar/confirmed. WebinarJam will not
// carry our ?source= tag through that round trip, so we stash it on the way out
// and read it back on the way in. Without this, every application that arrives
// via the workshop looks like it came from nowhere.
//
// The field names below have to match the hidden fields on the application
// Typeform exactly. Typeform silently discards values for hidden fields that
// do not exist on the form, so a typo here loses data without any error.
// This sends the same shape as the landing page's own attribution, so an
// application looks identical whichever route produced it.

const STORE_KEY = 'hs_webinar_touch';
// Shared with the landing page on purpose, so someone who first arrived from
// one video and later registered from another keeps their true first touch.
const FIRST_TOUCH_KEY = 'hs_first_touch';

const KEYS = ['source', 'utm_source', 'utm_medium', 'utm_content', 'utm_campaign'] as const;

type Touch = Record<string, string>;

function fromUrl(): Touch {
  if (typeof window === 'undefined') return {};
  const hash = window.location.hash;
  const hashQ = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';
  const searchQ = window.location.search.replace(/^\?/, '');
  const params = new URLSearchParams([searchQ, hashQ].filter(Boolean).join('&'));
  const out: Touch = {};
  for (const key of KEYS) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}

/** Where they actually came from, captured before the WebinarJam round trip. */
function context(): Touch {
  if (typeof window === 'undefined') return {};
  const out: Touch = { landing_page: window.location.href };
  if (document.referrer) out.referrer = document.referrer;
  return out;
}

function fromStore(): Touch {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') as Touch;
  } catch {
    return {}; // private browsing, or someone put junk in there
  }
}

/**
 * The first video that ever brought this person to us, across both funnels.
 * Seeds the shared key if the landing page has not already claimed it, so
 * whichever page they meet first wins.
 */
function firstSource(current: string): string {
  try {
    const stored = JSON.parse(localStorage.getItem(FIRST_TOUCH_KEY) || '{}') as Touch;
    if (stored.source) return stored.source;
    if (current && current !== 'webinar') {
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify({ ...context(), source: current }));
    }
  } catch {
    // private browsing
  }
  return current;
}

function finalize(t: Touch): Touch {
  const out: Touch = {
    ...t,
    source: t.source || 'webinar',
    // Marks the cohort regardless of which video sent them, so workshop-sourced
    // applications never blend into page-sourced ones.
    utm_campaign: 'webinar',
  };
  out.first_source = firstSource(out.source);
  for (const k of Object.keys(out)) {
    if (!out[k]) delete out[k];
  }
  return out;
}

/**
 * Call on the registration page. Records the tag from the video description so
 * it can be recovered after WebinarJam redirects back to us. Stored values win
 * over the current page context, so the original entry point survives a second
 * untagged visit.
 */
export function captureAttribution(): Touch {
  const merged = { ...context(), ...fromStore(), ...fromUrl() };
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(merged));
  } catch {
    // nothing we can do, the in-memory value still works for this page view
  }
  return finalize(merged);
}

/** Call on pages reached after the redirect, where the URL no longer has the tag. */
export function readAttribution(): Touch {
  return finalize({ ...fromStore(), ...fromUrl() });
}
