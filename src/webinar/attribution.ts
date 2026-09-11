// The webinar funnel leaves our site in the middle: video -> /webinar ->
// WebinarJam registration -> back to /webinar/confirmed. WebinarJam will not
// carry our ?source= tag through that round trip, so we stash it on the way out
// and read it back on the way in. Without this, every application that arrives
// via the workshop looks like it came from nowhere.

const STORE_KEY = 'hs_webinar_touch';
const KEYS = ['source', 'utm_source', 'utm_medium', 'utm_content'] as const;

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

function fromStore(): Touch {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') as Touch;
  } catch {
    return {}; // private browsing, or someone put junk in there
  }
}

function finalize(t: Touch): Touch {
  return {
    ...t,
    source: t.source || 'webinar',
    // Marks the cohort regardless of which video sent them, so workshop-sourced
    // applications never blend into page-sourced ones.
    utm_campaign: 'webinar',
  };
}

/**
 * Call on the registration page. Records the tag from the video description so
 * it can be recovered after WebinarJam redirects back to us.
 */
export function captureAttribution(): Touch {
  const url = fromUrl();
  const merged = { ...fromStore(), ...url };
  if (Object.keys(url).length) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(merged));
    } catch {
      // nothing we can do, the in-memory value still works for this page view
    }
  }
  return finalize(merged);
}

/** Call on pages reached after the redirect, where the URL no longer has the tag. */
export function readAttribution(): Touch {
  return finalize({ ...fromStore(), ...fromUrl() });
}
