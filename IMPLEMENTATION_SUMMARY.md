# Video Attribution Implementation Summary

## What Was Built

A complete video-level attribution tracking system for headstartchannels.com that:

1. **Tracks 90-day first/latest touch attribution** with localStorage persistence
2. **Supports full UTM parameter set** + legacy `?source=VIDEO_ID` format
3. **Works with React HashRouter** (params before `#/`)
4. **Integrates with Typeform (uNrHKe9G)** - all pages with application form
5. **Integrates with MailerLite (LLFJEN)** - free training email gate
6. **Preserves video IDs when email attribution updates** (critical for multi-touch)
7. **Includes developer tools** - link builder UI + comprehensive documentation

## File Changes

### New Files (3)
1. `src/attribution/index.ts` - Core attribution module (466 lines)
2. `src/pages/VideoLinkHelper.tsx` - Link builder UI (204 lines)
3. `VIDEO_ATTRIBUTION.md` - Full documentation (239 lines)
4. `VERIFICATION.md` - Testing guide (this file)

### Modified Files (6)
1. `src/pages/LandingPage.tsx` - Integrated new attribution system
2. `src/pages/FreeTrainingWatch.tsx` - Integrated new attribution system
3. `src/pages/FreeTrainingRegistration.tsx` - Added MailerLite attribution injection
4. `src/pages/Webinar.tsx` - Merged new + legacy attribution systems
5. `src/App.tsx` - Added `/tools/video-link` route
6. `src/main.tsx` - Added helper route to known routes

## How It Works

### 1. Attribution Capture (Page Load)

When a user visits with attribution params:
```
https://headstartchannels.com/?utm_source=youtube&utm_content=VIDEO_123#/
```

The system:
1. Parses query params from `window.location.search` (before `#/`)
2. Checks if attribution already exists in localStorage
3. Sets **first touch** if this is first visit (never overwrites)
4. Updates **latest touch** with current visit data
5. Stores in localStorage with 90-day TTL

### 2. First vs Latest Touch

| Field | First Touch | Latest Touch |
|-------|-------------|--------------|
| Set when | First tagged visit ever | Every tagged visit |
| Overwrite | Never | Always |
| Use case | True acquisition source | Most recent touchpoint |

### 3. Special Cases

**Email Tracking**:
```
?utm_source=mailerlite&utm_campaign=launch
```
- Updates `latest_source` to "mailerlite"
- Does NOT overwrite `first_video_id` or `latest_youtube_video_id`
- Critical for multi-touch attribution

**Direct Returns**:
```
https://headstartchannels.com/#/
```
- No attribution params = no update
- Preserves existing attribution
- Allows returning users to keep their source

**Internal Navigation**:
```javascript
// User clicks internal link: <a href="#/free-training">
```
- Hash routing doesn't reload page
- Attribution not recaptured
- Preserves acquisition data

### 4. Integration: Typeform

Pages: `/`, `/free-training/watch`

```javascript
import { captureAttribution, formatForTypeform } from '../attribution';

const attribution = captureAttribution();
const hidden = formatForTypeform(attribution);

// Pass to Typeform
<PopupButton id="uNrHKe9G" hidden={hidden} />
<Widget id="uNrHKe9G" hidden={hidden} />
```

Hidden fields sent:
- `first_source`, `first_video_id`, `first_touch_at`
- `latest_source`, `latest_content_id`, `latest_youtube_video_id`, `latest_touch_at`
- `link_placement`, `entry_route`, `tracking_version`

### 5. Integration: MailerLite

Page: `/free-training` (email gate modal)

```javascript
import { captureAttribution, formatForMailerLite } from '../attribution';

const attributionData = captureAttribution();
const fields = formatForMailerLite(attributionData);

// Inject as hidden inputs on form submit
Object.entries(fields).forEach(([key, value]) => {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = key;
  input.value = value;
  form.appendChild(input);
});
```

### 6. Link Builder Tool

URL: `https://headstartchannels.com/#/tools/video-link`

Features:
- Video ID input
- Placement selector (description, pinned comment, end card)
- Destination selector (homepage, free training, webinar)
- Live URL preview
- Copy to clipboard
- Video description template

## Example URLs

### Standard YouTube Link
```
https://headstartchannels.com/?utm_source=youtube&utm_medium=organic_video&utm_content=VIDEO_ID&utm_term=description#/
```

### Legacy Format (Still Works)
```
https://headstartchannels.com/?source=VIDEO_ID#/
```
Maps to: `utm_source=youtube_organic_video`, `utm_content=VIDEO_ID`

### Free Training Link
```
https://headstartchannels.com/?utm_source=youtube&utm_content=VIDEO_ID&utm_term=pinned_comment#/free-training
```

### Email Link
```
https://headstartchannels.com/?utm_source=mailerlite&utm_campaign=launch_2026#/
```

## Verification Steps

### Quick Test (5 minutes)

1. **Clear attribution**:
   ```javascript
   localStorage.removeItem('hs_attribution_v1');
   ```

2. **Test first touch**:
   ```
   http://localhost:5173/?utm_source=youtube&utm_content=TEST_123#/
   ```
   Check: `localStorage.getItem('hs_attribution_v1')`

3. **Test latest touch**:
   ```
   http://localhost:5173/?utm_source=mailerlite&utm_campaign=email#/
   ```
   Verify: `first_video_id` still "TEST_123", `latest_source` is "mailerlite"

4. **Test Typeform**:
   - Click "Apply" button
   - Open DevTools → Network
   - Look for Typeform requests with hidden params

5. **Test link builder**:
   ```
   http://localhost:5173/#/tools/video-link
   ```
   - Enter video ID
   - Copy generated link
   - Paste in new window and verify attribution

See `VERIFICATION.md` for complete test suite (10 test cases + edge cases).

## How to Deploy

1. **Merge PR**: https://github.com/keviscoding/autopilotchannels/pull/14

2. **Deploy to production** (Vite build deploys to hosting)

3. **Configure Typeform**:
   - Login to Typeform dashboard
   - Open form `uNrHKe9G`
   - Add hidden fields:
     - `first_source` (text)
     - `first_video_id` (text)
     - `first_touch_at` (text)
     - `latest_source` (text)
     - `latest_content_id` (text)
     - `latest_youtube_video_id` (text)
     - `latest_touch_at` (text)
     - `link_placement` (text)
     - `entry_route` (text)
     - `tracking_version` (text)

4. **Test MailerLite**:
   - Submit test form at `/free-training`
   - Check if attribution fields appear in submission data
   - If not supported, may need MailerLite API integration

5. **Update video descriptions**:
   - Use link builder at `/#/tools/video-link`
   - Replace old links with new attribution links
   - Format: `?utm_source=youtube&utm_content=VIDEO_ID#/`

## Monitoring

### Check Attribution in Typeform
1. Login to Typeform
2. View responses for form `uNrHKe9G`
3. Look for hidden field columns
4. Verify data is populated

### Check localStorage (Debug)
```javascript
// On any page
JSON.parse(localStorage.getItem('hs_attribution_v1'))
```

### Check TTL Expiration
Attribution expires after 90 days automatically. To test:
```javascript
let attr = JSON.parse(localStorage.getItem('hs_attribution_v1'));
console.log('Expires:', new Date(attr._expires_at));
```

## Troubleshooting

### Attribution Not Captured
- **Issue**: localStorage shows null/undefined
- **Fix**: Ensure query params are **before** `#/` in URL
- **Example**: ✅ `?utm_source=youtube#/` | ❌ `#/?utm_source=youtube`

### Typeform Not Receiving Data
- **Issue**: Hidden fields not in Typeform submissions
- **Fix**: Add hidden fields in Typeform dashboard (exact names, case-sensitive)
- **Check**: Network tab should show params in Typeform embed URL

### MailerLite Not Capturing Attribution
- **Issue**: Form submissions missing attribution
- **Fix**: Verify MailerLite supports custom hidden fields via JS
- **Alternative**: May need server-side integration or MailerLite API

### Email Overwrites Video IDs
- **Issue**: `latest_youtube_video_id` becomes email campaign name
- **Fix**: This should NOT happen - email source preserves video IDs
- **Debug**: Check logic in `deriveSourceFields()` function

### Mobile Links Not Working
- **Issue**: Attribution not captured on mobile
- **Fix**: Params must be **before** `#/` (HashRouter requirement)
- **Test**: `curl -I "https://headstartchannels.com/?utm_source=youtube#/"`

## Key Design Decisions

1. **LocalStorage not Cookies**: 90-day TTL, no GDPR issues, client-side only
2. **First+Latest not Last-Click**: Preserves true acquisition, tracks engagement
3. **Email Preserves Videos**: Multi-touch attribution, video is acquisition
4. **Unknown Stays Unknown**: No invented sources, data integrity
5. **HashRouter Params Before #/**: React requirement, mobile-friendly
6. **Module Separation**: `src/attribution/index.ts` is reusable, framework-agnostic

## Future Enhancements

Possible additions (not in this PR):
- Server-side attribution storage (database)
- Analytics dashboard (view all attribution)
- A/B testing by video ID
- Conversion tracking (application submitted → video ID)
- MailerLite API integration (if hidden fields not supported)
- Multi-channel attribution (Facebook, Twitter, etc.)

## Questions?

- **Documentation**: See `VIDEO_ATTRIBUTION.md`
- **Testing**: See `VERIFICATION.md`
- **Code**: See `src/attribution/index.ts`
- **Helper**: Visit `/#/tools/video-link`

## PR Link

https://github.com/keviscoding/autopilotchannels/pull/14
