# Video Attribution System - Verification Guide

## Quick Test Steps

### 1. Clear Existing Attribution
```javascript
// Open browser console
localStorage.removeItem('hs_attribution_v1');
```

### 2. Test First Touch Capture
Open in **new private/incognito window**:
```
http://localhost:5173/?utm_source=youtube&utm_medium=organic_video&utm_content=TEST_VIDEO_123&utm_term=description#/
```

Then check localStorage:
```javascript
JSON.parse(localStorage.getItem('hs_attribution_v1'))
```

Expected output:
```json
{
  "first_source": "youtube",
  "first_video_id": "TEST_VIDEO_123",
  "first_touch_at": "2026-09-25T...",
  "latest_source": "youtube",
  "latest_content_id": "TEST_VIDEO_123",
  "latest_youtube_video_id": "TEST_VIDEO_123",
  "latest_touch_at": "2026-09-25T...",
  "link_placement": "description",
  "entry_route": "/",
  "tracking_version": "v1",
  "_expires_at": "2026-12-24T..."
}
```

### 3. Test Latest Touch Update
In the **same window** from step 2, navigate to:
```
http://localhost:5173/?utm_source=mailerlite&utm_medium=email&utm_campaign=launch_email#/free-training
```

Then check localStorage again:
```javascript
JSON.parse(localStorage.getItem('hs_attribution_v1'))
```

Expected output (note: first_* preserved, latest_* updated, video IDs preserved):
```json
{
  "first_source": "youtube",
  "first_video_id": "TEST_VIDEO_123",
  "first_touch_at": "2026-09-25T...", 
  "latest_source": "mailerlite",
  "latest_content_id": "launch_email",
  "latest_youtube_video_id": "TEST_VIDEO_123", // PRESERVED!
  "latest_touch_at": "2026-09-25T...",
  "link_placement": "description",
  "entry_route": "/free-training",
  "tracking_version": "v1",
  "_expires_at": "2026-12-24T..."
}
```

### 4. Test Legacy Format
Clear storage and test legacy `?source=` format:
```javascript
localStorage.removeItem('hs_attribution_v1');
```

Navigate to:
```
http://localhost:5173/?source=LEGACY_VIDEO_789#/
```

Expected output:
```json
{
  "first_source": "youtube_organic_video",
  "first_video_id": "LEGACY_VIDEO_789",
  "latest_source": "youtube_organic_video",
  "latest_youtube_video_id": "LEGACY_VIDEO_789",
  ...
}
```

### 5. Test Direct Return Visit
Navigate to homepage **without** query params:
```
http://localhost:5173/#/
```

Attribution should **remain unchanged** from step 3 or 4.

### 6. Test Typeform Integration (LandingPage)

1. Navigate to: `http://localhost:5173/?utm_source=youtube&utm_content=ABC123#/`
2. Click any "Apply" button to open Typeform popup
3. Open browser DevTools → Network tab
4. Look for requests to `typeform.com` or `api.typeform.com`
5. Inspect query params or request payload

Expected: All attribution fields should be present as hidden fields:
- `first_source=youtube`
- `first_video_id=ABC123`
- `latest_source=youtube`
- `latest_youtube_video_id=ABC123`
- `tracking_version=v1`
- etc.

### 7. Test Typeform Integration (FreeTrainingWatch)

1. Navigate to: `http://localhost:5173/?utm_source=youtube&utm_content=XYZ456#/free-training/watch`
2. Scroll to "Apply for a Channel Install" section
3. Check Typeform widget embed
4. Open DevTools → Network
5. Inspect Typeform requests

Expected: Attribution fields in hidden params

### 8. Test MailerLite Integration (FreeTrainingRegistration)

1. Navigate to: `http://localhost:5173/?utm_source=youtube&utm_content=VIDEO_999&utm_term=pinned_comment#/free-training`
2. Click "Get free access" button (opens modal)
3. Open DevTools → Network tab
4. Enter email and submit form
5. Inspect form POST request

Expected: Hidden input fields with attribution data should be in form payload:
```
first_source: youtube
first_video_id: VIDEO_999
link_placement: pinned_comment
tracking_version: v1
...
```

### 9. Test Link Builder Helper

Navigate to:
```
http://localhost:5173/#/tools/video-link
```

1. Enter Video ID: `TEST_123`
2. Select Placement: "Pinned Comment"
3. Select Destination: "Free Training"
4. Generated link should be:
   ```
   https://headstartchannels.com/?utm_source=youtube&utm_medium=organic_video&utm_content=TEST_123&utm_term=pinned_comment#/free-training
   ```
5. Click "Copy to Clipboard" - link should copy

### 10. Test Internal Navigation (No Acquisition)

1. With attribution already set (from any previous test)
2. Use internal navigation (click nav links, buttons with `#/` href)
3. Navigate between pages: `/`, `/free-training`, `/webinar`
4. Check localStorage after each navigation

Expected: Attribution should **NOT change** during internal hash navigation

## Edge Cases to Test

### Direct Traffic (No Params)
```
http://localhost:5173/#/
```
- Should NOT create attribution if none exists
- Should NOT overwrite existing attribution

### Email Source Does NOT Overwrite Video IDs
1. Set first touch with video: `?utm_source=youtube&utm_content=VID_A#/`
2. Visit with email: `?utm_source=mailerlite&utm_campaign=email_b#/`
3. Check: `latest_youtube_video_id` should still be `VID_A` (not empty or `email_b`)

### TTL Expiration (90 days)
Manually test by:
1. Setting `_expires_at` to past date in localStorage
2. Refresh page
3. Attribution should be cleared and recaptured

```javascript
let attr = JSON.parse(localStorage.getItem('hs_attribution_v1'));
attr._expires_at = '2020-01-01T00:00:00.000Z'; // Past date
localStorage.setItem('hs_attribution_v1', JSON.stringify(attr));
// Refresh page
```

### Unknown Source Stays Unknown
1. Clear attribution
2. Visit: `http://localhost:5173/#/` (no params)
3. Check localStorage: should be empty or minimal
4. System should NOT invent "youtube" or any default source

## Mobile Testing

Test on mobile device or emulator:

1. Open mobile browser
2. Navigate to:
   ```
   https://headstartchannels.com/?utm_source=youtube&utm_content=MOBILE_TEST#/free-training
   ```
3. Verify:
   - Query params parsed correctly
   - Page loads at `/free-training` route
   - Attribution captured in localStorage
   - Forms work correctly

## Production URLs to Test

Once deployed, test these actual URLs:

### Homepage with Video Attribution
```
https://headstartchannels.com/?utm_source=youtube&utm_medium=organic_video&utm_content=REAL_VIDEO_ID&utm_term=description#/
```

### Free Training with Attribution
```
https://headstartchannels.com/?utm_source=youtube&utm_medium=organic_video&utm_content=REAL_VIDEO_ID&utm_term=pinned_comment#/free-training
```

### Webinar with Attribution
```
https://headstartchannels.com/?utm_source=youtube&utm_medium=organic_video&utm_content=REAL_VIDEO_ID#/webinar
```

### Link Builder Tool
```
https://headstartchannels.com/#/tools/video-link
```

## Troubleshooting

### Attribution Not Captured
- Check browser console for errors
- Verify localStorage is enabled (not in private browsing)
- Check query params are **before** `#/` in URL

### Typeform Not Receiving Fields
- Ensure hidden fields are configured in Typeform dashboard
- Field names must match exactly (case-sensitive)
- Check Network tab for actual params sent

### MailerLite Not Receiving Fields
- MailerLite may not support custom hidden fields via JS injection
- Check if form accepts custom fields
- Verify form ID is correct (LLFJEN)

### TTL Not Working
- Check `_expires_at` field is ISO 8601 timestamp
- Verify date comparison logic
- Check system clock is correct

## Expected Behavior Summary

| Scenario | First Touch | Latest Touch | Video IDs |
|----------|-------------|--------------|-----------|
| First visit with video link | ✅ Set | ✅ Set | ✅ Set |
| Return visit with different video | ❌ Preserved | ✅ Updated | ✅ Updated |
| Email visit after video | ❌ Preserved | ✅ Email source | ✅ Video IDs preserved |
| Direct return (no params) | ❌ Preserved | ❌ Preserved | ❌ Preserved |
| Internal navigation | ❌ Preserved | ❌ Preserved | ❌ Preserved |

## Success Criteria

✅ All 10 test steps pass  
✅ Edge cases handle correctly  
✅ Mobile URLs work with params before `#/`  
✅ Typeform receives all hidden fields  
✅ MailerLite form submits with attribution  
✅ Link builder generates correct URLs  
✅ Documentation is clear and accurate  
✅ No TypeScript errors  
✅ Build succeeds  
✅ Dev server runs without errors  

## Support

For questions or issues:
- See `VIDEO_ATTRIBUTION.md` for full documentation
- Check `/tools/video-link` for link examples
- Review `src/attribution/index.ts` for implementation details
