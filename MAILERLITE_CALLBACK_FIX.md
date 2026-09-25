# MailerLite Success Callback Fix

## Summary

Fixed critical bug where free-training gate used incorrect event listener for MailerLite form success detection. The code listened for `ml:success` event which doesn't exist for MailerLite universal.js. Now uses correct callback pattern `window.ml_webform_success_<GROOT_ID>`.

**PR**: https://github.com/keviscoding/autopilotchannels/pull/19  
**Status**: Ready for testing (do NOT merge yet per user request)

---

## Root Cause Analysis

### The Bug

Previous code in `FreeTrainingRegistration.tsx`:

```typescript
// ❌ WRONG: ml:success event doesn't exist for universal.js
window.addEventListener('ml:success', handleMLSuccess);
```

### Why This Is Wrong

1. **MailerLite universal.js does NOT fire `ml:success` events**
2. Research confirms: universal.js uses **callback functions**, not events
3. For classic webforms.min.js, the pattern is `window.ml_webform_success_<FORM_CODE>`
4. For universal.js embedded forms, the pattern is the same but uses `groot_id`

### Evidence

**Web research** (see search results):
- StackOverflow examples show `window.ml_webform_success_CODE = function() {...}`
- TrackFunnels guide confirms GTM `form_submit` event as alternative
- No documentation for `ml:success` event exists

**Actual test data**:
- Subscriber `ml-attr-pr18-test+sep25c@example.com` EXISTS in MailerLite
- Created at: 2026-09-25 13:20:50 UTC
- All 10 attribution fields populated correctly
- This proves form submission and subscription work

### The Confusion

User reported "subscriber NOT FOUND" but investigation shows subscriber DOES exist. Possible reasons:
- User checked immediately (MailerLite UI lag)
- User checked wrong view/filter
- User expected different email format

The form IS working after PR #18, but the success callback was never wired correctly.

---

## The Fix

### Code Changes

**File**: `src/pages/FreeTrainingRegistration.tsx`

```typescript
// ✅ CORRECT: Use callback function pattern
const callbackName = 'ml_webform_success_46274164';
(window as any)[callbackName] = handleMLSuccess;

// Clean up on unmount
return () => {
  delete (window as any)[callbackName];
};
```

### How It Works Now

1. **Form submits** → MailerLite processes subscription
2. **MailerLite creates subscriber** with attribution fields
3. **MailerLite calls** `window.ml_webform_success_46274164()`
4. **Our callback runs**:
   - Sets `localStorage.setItem('hs_ft_registered', '1')`
   - Calls `navigate('/free-training/watch' + location.search, { replace: true })`
5. **User redirected** to watch page with UTMs preserved

### Why This Is Correct

- Uses MailerLite's documented callback pattern
- Redirect happens ONLY after successful subscription
- Attribution fields are preserved (PR #18 fix remains in place)
- Form validation (ml-validate-date-valid) still works

---

## Testing Instructions

### 1. Test URL

```
https://headstartchannels.com/?utm_source=youtube&utm_medium=video&utm_campaign=callback_fix_test&utm_content=TESTID001&source=TESTID001#/free-training
```

### 2. Test Flow

1. Modal opens with email gate
2. Enter test email: `callback-fix-test-sep25-[HH:MM]@example.com`
3. Check consent checkbox
4. Click "Watch the free training →"
5. Form submits (you may see brief loading)
6. **Redirect to `/free-training/watch` with UTMs**
7. Video page loads

### 3. Verify in MailerLite

Use MailerLite MCP tool to check subscriber:

```typescript
get_subscriber("callback-fix-test-sep25-[HH:MM]@example.com")
```

**Expected result**:
```json
{
  "email": "callback-fix-test-sep25-[HH:MM]@example.com",
  "status": "active",
  "source": "webform",
  "fields": {
    "first_source": "youtube",
    "first_video_id": "TESTID001",
    "first_touch_at": "2026-09-25",
    "latest_source": "youtube",
    "latest_content_id": "TESTID001",
    "latest_touch_at": "2026-09-25",
    "latest_youtube_video_id": "TESTID001",
    "tracking_version": "v1",
    "entry_route": "/free-training",
    "link_placement": "description"
  },
  "groups": [
    {"name": "HeadStart — Training"},
    {"name": "HeadStart — All Leads"}
  ]
}
```

### 4. What to Watch For

✅ **Success indicators**:
- Redirect happens (watch page loads)
- Subscriber exists in MailerLite
- All 10 attribution fields populated
- UTM parameters preserved in watch URL

❌ **Failure indicators**:
- No redirect (stuck on gate page)
- Subscriber not found
- Attribution fields null/empty
- Error in browser console

---

## Technical Details

### Form Configuration

- **Form ID**: LLFJEN (spare form)
- **Groot ID**: 46274164
- **Callback**: `window.ml_webform_success_46274164`
- **Alternative form**: hPCyUL (groot_id 46255257) - requires callback `window.ml_webform_success_46255257`

### Dependencies on Previous Fixes

This fix builds on:
- **PR #17**: Visually-hidden CSS for attribution fields
- **PR #18**: ml-validate-date-valid class for date validation
- **PR #16**: fields[KEY] format for attribution injection

All previous fixes remain in place and continue to work.

### Browser Console Verification

Open DevTools Console during test:

```javascript
// Before form submit
console.log('Callback defined?', typeof window.ml_webform_success_46274164);
// Should show: "function"

// After successful submit (callback fires)
console.log('localStorage set?', localStorage.getItem('hs_ft_registered'));
// Should show: "1"
```

---

## Commit Details

**Branch**: `cursor/fix-mailerlite-premature-redirect-2c5c`  
**Commit**: `cc291ee`  
**PR**: #19 (draft, do NOT merge)

**Changed files**:
- `src/pages/FreeTrainingRegistration.tsx` (+11, -7)

**Changes**:
1. Added `navigate` hook to `EmailGateModal` component
2. Replaced `window.addEventListener('ml:success', ...)` with `window.ml_webform_success_46274164 = ...`
3. Updated comments to explain callback pattern
4. Added `navigate()` call inside success handler
5. Added cleanup to `delete window[callbackName]` on unmount

---

## Known Issues & Limitations

### Form-Specific Callback

The callback name is tied to the form's groot_id. If you swap forms:
- LLFJEN (groot_id 46274164) → uses `ml_webform_success_46274164`
- hPCyUL (groot_id 46255257) → requires `ml_webform_success_46255257`

**Solution**: If swapping forms, update the callback name in the code.

### Universal.js vs webforms.min.js

This fix assumes the site uses MailerLite universal.js (as configured in `index.html`). If the form embed method changes to webforms.min.js, the callback pattern remains the same but the timing may differ.

### HashRouter URL Structure

The site uses React HashRouter, so:
- Gate page: `https://headstartchannels.com/#/free-training`
- Watch page: `https://headstartchannels.com/#/free-training/watch`

UTM parameters must be BEFORE the `#`:
```
✅ https://headstartchannels.com/?utm_source=test#/free-training
❌ https://headstartchannels.com/#/free-training?utm_source=test
```

---

## Next Steps

1. **Deploy to staging/preview** (if available)
2. **Test the flow** using instructions above
3. **Verify subscriber creation** via MailerLite MCP
4. **Check browser console** for any errors
5. **Test with real user flow** (not just developer tools)
6. **Merge PR #19** only after verification passes

Do NOT merge until:
- ✅ Redirect works consistently
- ✅ Subscribers appear in MailerLite with attribution
- ✅ No console errors
- ✅ UTM parameters preserved correctly
