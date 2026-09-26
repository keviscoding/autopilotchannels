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
