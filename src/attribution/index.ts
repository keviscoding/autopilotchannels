/**
 * Video-level attribution tracking for headstartchannels.com
 * 
 * Tracks first-touch and latest-touch attribution across UTM parameters and
 * video-level source tracking. Works with React HashRouter where query params
 * appear BEFORE the #/ in the URL.
 * 
 * Attribution is stored in localStorage with 90-day TTL and includes:
 * - First touch: Set once, never overwritten (first_source, first_video_id, first_touch_at)
 * - Latest touch: Updated on tagged external traffic (latest_source, latest_content_id, latest_youtube_video_id, latest_touch_at)
 * - Metadata: link_placement, entry_route, tracking_version
 * 
 * Query param mapping:
 * - ?source=VIDEO_ID → maps to first/latest youtube_video_id + source=youtube_organic_video
 * - utm_source, utm_medium, utm_campaign, utm_content (VIDEO_ID), utm_term (placement)
 * - utm_source=mailerlite updates latest_source but preserves first_video_id / latest_youtube_video_id
 * 
 * Unknown stays unknown - never invent "youtube" when no source exists.
 * Direct return visits must NOT erase known first source.
 * Internal hash navigation must preserve attribution (no new acquisition).
 */

const STORE_KEY = 'hs_attribution_v1';
const TTL_DAYS = 90;
const TRACKING_VERSION = 'v1';

export interface Attribution {
  // First touch (set once, never overwrite)
  first_source?: string;
  first_video_id?: string;
  first_touch_at?: string; // ISO 8601 timestamp
  
  // Latest touch (update on tagged external links)
  latest_source?: string;
  latest_content_id?: string;
  latest_youtube_video_id?: string;
  latest_touch_at?: string; // ISO 8601 timestamp
  
  // Metadata
  link_placement?: string;
  entry_route?: string;
  tracking_version: string;
  
  // Internal tracking
  _expires_at?: string; // ISO 8601 timestamp for 90-day TTL
}

interface RawTouch {
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  entry_route: string;
}

/**
 * Parse query params from URL. HashRouter places query params BEFORE #/
 * Example: https://example.com/?utm_source=youtube#/free-training
 */
function parseQueryParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams();
  
  // Query params are in window.location.search (before #/)
  const searchQ = window.location.search.replace(/^\?/, '');
  
  // Also check hash for params (fallback for edge cases)
  const hash = window.location.hash;
  const hashQ = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';
  
  // Merge both (search takes precedence)
  return new URLSearchParams([searchQ, hashQ].filter(Boolean).join('&'));
}

/**
 * Get current route from hash
 */
function getCurrentRoute(): string {
  if (typeof window === 'undefined') return '/';
  const hash = window.location.hash;
  const route = hash.replace(/^#/, '').split('?')[0] || '/';
  return route;
}

/**
 * Check if URL contains any attribution parameters
 */
function hasAttributionParams(params: URLSearchParams): boolean {
  const keys = ['source', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  return keys.some(k => params.has(k));
}

/**
 * Extract raw touch data from current URL
 */
function extractRawTouch(): RawTouch | null {
  const params = parseQueryParams();
  
  // If no attribution params, this is not a new acquisition
  if (!hasAttributionParams(params)) {
    return null;
  }
  
  const touch: RawTouch = {
    entry_route: getCurrentRoute(),
  };
  
  // Legacy: ?source=VIDEO_ID maps to youtube_video_id
  const legacySource = params.get('source');
  if (legacySource) {
    touch.source = 'youtube_organic_video';
    touch.utm_content = legacySource; // VIDEO_ID goes into utm_content
  }
  
  // Standard UTM params (override legacy if present)
  if (params.has('utm_source')) touch.utm_source = params.get('utm_source') || undefined;
  if (params.has('utm_medium')) touch.utm_medium = params.get('utm_medium') || undefined;
  if (params.has('utm_campaign')) touch.utm_campaign = params.get('utm_campaign') || undefined;
  if (params.has('utm_content')) touch.utm_content = params.get('utm_content') || undefined;
  if (params.has('utm_term')) touch.utm_term = params.get('utm_term') || undefined;
  
  return touch;
}

/**
 * Load stored attribution from localStorage
 */
function loadStoredAttribution(): Attribution | null {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored) as Attribution;
    
    // Check TTL
    if (data._expires_at) {
      const expiresAt = new Date(data._expires_at);
      if (expiresAt < new Date()) {
        // Expired, clear it
        localStorage.removeItem(STORE_KEY);
        return null;
      }
    }
    
    return data;
  } catch {
    // Invalid JSON or storage error
    return null;
  }
}

/**
 * Save attribution to localStorage
 */
function saveAttribution(attr: Attribution): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(attr));
  } catch {
    // Private browsing or quota exceeded - continue without storage
  }
}

/**
 * Derive source and video_id from raw touch
 */
function deriveSourceFields(raw: RawTouch): {
  source?: string;
  video_id?: string;
  youtube_video_id?: string;
  content_id?: string;
  placement?: string;
} {
  const result: {
    source?: string;
    video_id?: string;
    youtube_video_id?: string;
    content_id?: string;
    placement?: string;
  } = {};
  
  // Source priority: utm_source > derived from legacy source
  if (raw.utm_source) {
    result.source = raw.utm_source;
  } else if (raw.source) {
    result.source = raw.source; // Already set to 'youtube_organic_video'
  }
  
  // Video ID from utm_content (used by both legacy ?source= and modern utm_content)
  if (raw.utm_content) {
    result.content_id = raw.utm_content;
    
    // If source is youtube-related, also set youtube_video_id
    if (result.source && (
      result.source.includes('youtube') || 
      result.source === 'youtube_organic_video' ||
      raw.source === 'youtube_organic_video'
    )) {
      result.youtube_video_id = raw.utm_content;
      result.video_id = raw.utm_content;
    }
  }
  
  // Placement from utm_term
  if (raw.utm_term) {
    result.placement = raw.utm_term;
  }
  
  return result;
}

/**
 * Capture attribution from current URL and update stored attribution
 * 
 * Call this on every page load/route change to track new acquisitions.
 * Returns the current attribution state (for passing to forms).
 */
export function captureAttribution(): Attribution {
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
  
  const stored = loadStoredAttribution();
  const rawTouch = extractRawTouch();
  
  // If no attribution params in URL and no stored data, return empty attribution
  if (!rawTouch && !stored) {
    return {
      tracking_version: TRACKING_VERSION,
      _expires_at: expiresAt,
    };
  }
  
  // If no new attribution params, return stored attribution (or empty)
  if (!rawTouch) {
    return stored || {
      tracking_version: TRACKING_VERSION,
      _expires_at: expiresAt,
    };
  }
  
  // We have new attribution params - process them
  const derived = deriveSourceFields(rawTouch);
  
  // Build updated attribution
  const updated: Attribution = {
    tracking_version: TRACKING_VERSION,
    _expires_at: expiresAt,
  };
  
  // Preserve first touch if it exists
  if (stored?.first_source) {
    updated.first_source = stored.first_source;
    updated.first_video_id = stored.first_video_id;
    updated.first_touch_at = stored.first_touch_at;
  } else if (derived.source) {
    // Set first touch
    updated.first_source = derived.source;
    updated.first_video_id = derived.video_id;
    updated.first_touch_at = now;
  }
  
  // Update latest touch
  if (derived.source) {
    updated.latest_source = derived.source;
    updated.latest_content_id = derived.content_id;
    updated.latest_touch_at = now;
    
    // Special handling for email source: preserve video IDs
    if (derived.source === 'mailerlite' || derived.source.includes('email')) {
      // Don't overwrite youtube_video_id with email content
      if (stored?.latest_youtube_video_id) {
        updated.latest_youtube_video_id = stored.latest_youtube_video_id;
      }
    } else if (derived.youtube_video_id) {
      // Non-email source with video ID
      updated.latest_youtube_video_id = derived.youtube_video_id;
    }
  }
  
  // Metadata
  if (derived.placement) {
    updated.link_placement = derived.placement;
  } else if (stored?.link_placement) {
    updated.link_placement = stored.link_placement;
  }
  
  if (rawTouch.entry_route) {
    updated.entry_route = rawTouch.entry_route;
  } else if (stored?.entry_route) {
    updated.entry_route = stored.entry_route;
  }
  
  saveAttribution(updated);
  return updated;
}

/**
 * Get current attribution without updating from URL
 * 
 * Use this to read existing attribution (e.g., for forms on pages without UTM params)
 */
export function getAttribution(): Attribution {
  return loadStoredAttribution() || {
    tracking_version: TRACKING_VERSION,
    _expires_at: new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000).toISOString(),
  };
}

/**
 * Format attribution for Typeform hidden fields
 * 
 * Returns key-value pairs suitable for Typeform's hidden field API.
 * Filters out undefined/null values and internal fields.
 */
export function formatForTypeform(attr: Attribution): Record<string, string> {
  const hidden: Record<string, string> = {};
  
  // Map attribution to Typeform hidden fields
  if (attr.first_source) hidden.first_source = attr.first_source;
  if (attr.first_video_id) hidden.first_video_id = attr.first_video_id;
  if (attr.first_touch_at) hidden.first_touch_at = attr.first_touch_at;
  
  if (attr.latest_source) hidden.latest_source = attr.latest_source;
  if (attr.latest_content_id) hidden.latest_content_id = attr.latest_content_id;
  if (attr.latest_youtube_video_id) hidden.latest_youtube_video_id = attr.latest_youtube_video_id;
  if (attr.latest_touch_at) hidden.latest_touch_at = attr.latest_touch_at;
  
  if (attr.link_placement) hidden.link_placement = attr.link_placement;
  if (attr.entry_route) hidden.entry_route = attr.entry_route;
  if (attr.tracking_version) hidden.tracking_version = attr.tracking_version;
  
  return hidden;
}

/**
 * Format attribution for MailerLite custom fields
 * 
 * MailerLite classic embed requires:
 * 1. Fields must be added to the form in MailerLite UI first
 * 2. Input names must use fields[KEY] format (not bare KEY)
 * 3. DATE fields require YYYY-MM-DD format (not ISO 8601 timestamps)
 * 
 * This returns key-value pairs. The calling code must inject these as
 * input[name="fields[KEY]"] or populate existing .ml-field-KEY inputs.
 * This converts first_touch_at and latest_touch_at to date-only format.
 */
export function formatForMailerLite(attr: Attribution): Record<string, string> {
  const hidden: Record<string, string> = {};
  
  // Map attribution to MailerLite custom fields
  if (attr.first_source) hidden.first_source = attr.first_source;
  if (attr.first_video_id) hidden.first_video_id = attr.first_video_id;
  // Convert ISO timestamp to YYYY-MM-DD for MailerLite DATE field
  if (attr.first_touch_at) {
    hidden.first_touch_at = attr.first_touch_at.split('T')[0];
  }
  
  if (attr.latest_source) hidden.latest_source = attr.latest_source;
  if (attr.latest_content_id) hidden.latest_content_id = attr.latest_content_id;
  if (attr.latest_youtube_video_id) hidden.latest_youtube_video_id = attr.latest_youtube_video_id;
  // Convert ISO timestamp to YYYY-MM-DD for MailerLite DATE field
  if (attr.latest_touch_at) {
    hidden.latest_touch_at = attr.latest_touch_at.split('T')[0];
  }
  
  if (attr.link_placement) hidden.link_placement = attr.link_placement;
  if (attr.entry_route) hidden.entry_route = attr.entry_route;
  // Default tracking_version to v1 when empty
  hidden.tracking_version = attr.tracking_version || 'v1';
  
  return hidden;
}

/**
 * Clear all attribution data (for testing/debugging)
 */
export function clearAttribution(): void {
  try {
    localStorage.removeItem(STORE_KEY);
  } catch {
    // Ignore errors
  }
}
