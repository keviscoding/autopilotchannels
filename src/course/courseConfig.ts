/*
 * COURSE ACCESS CODE
 * ------------------
 * This is the single code buyers enter to unlock the course.
 * To rotate it: change the string below, redeploy, and send the new
 * code to current buyers. Everyone on the old code is locked out.
 *
 * Note: this is a client-side gate. It keeps honest people out, not
 * determined ones. Rotate it periodically. When leakage becomes a
 * real problem, upgrade to per-buyer Whop license keys (the gate is
 * isolated to CourseGate.tsx, so it's a small swap).
 */
export const ACCESS_CODE = 'HEADSTART2026';

// localStorage key that remembers a verified device.
export const ACCESS_STORAGE_KEY = 'hsc_course_access';
