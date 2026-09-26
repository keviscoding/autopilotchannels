/*
 * OPS ACCESS CODE
 * ------------------
 * This is the single code internal team members enter to unlock ops tools.
 * To rotate it: change the string below, redeploy, and send the new
 * code to authorized team members. Everyone on the old code is locked out.
 *
 * Note: this is a client-side gate. It keeps honest people out, not
 * determined ones. Rotate it periodically if needed.
 */
export const OPS_ACCESS_CODE = 'OPS-TRACK-2026';

// localStorage key that remembers a verified device.
export const OPS_ACCESS_STORAGE_KEY = 'hsc_ops_tracking_access';

/*
 * LIVE GOOGLE SHEET DATA SOURCE
 * -------------------------------
 * The tracking dashboard pulls live data from the Lead List via Google
 * Visualization CSV API (gviz). No API keys or backend needed.
 * 
 * Requirements:
 * - Sheet must be "Anyone with the link can view" (it already is)
 * - CORS is already configured for https://headstartchannels.com
 * 
 * Fallback: If live fetch fails, dashboard shows last-bundled snapshot
 * from public/ops/tracking-data.json with a warning.
 */
export const LIVE_SHEET_CONFIG = {
  spreadsheetId: '14esKGmmWCUmOMsyJnjlw0ILb8LV2QXUn_1MOR8jognw',
  sheetName: 'Lead List',
  // Google Visualization CSV endpoint (CORS-enabled)
  get gvizCsvUrl() {
    const encodedSheet = encodeURIComponent(this.sheetName);
    return `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodedSheet}`;
  },
  // Full spreadsheet URL for reference links
  get spreadsheetUrl() {
    return `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/edit`;
  },
  // Auto-refresh interval in milliseconds (30 minutes)
  autoRefreshMs: 30 * 60 * 1000,
};
