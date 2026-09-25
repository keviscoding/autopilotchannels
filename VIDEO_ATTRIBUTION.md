# Video Attribution System

This document describes the video-level attribution tracking system for headstartchannels.com.

## Link Format Examples

### Standard YouTube Video Link
```
https://headstartchannels.com/?utm_source=youtube&utm_medium=organic_video&utm_content=VIDEO_ID_123&utm_term=description#/
```

### Legacy Format (Still Supported)
```
https://headstartchannels.com/?source=VIDEO_ID_123#/
```
Maps to: `utm_source=youtube_organic_video`, `utm_content=VIDEO_ID_123`

### Email Link (MailerLite)
```
https://headstartchannels.com/?utm_source=mailerlite&utm_medium=email&utm_campaign=CAMPAIGN_NAME#/free-training
```

### Full UTM Set
```
https://headstartchannels.com/?utm_source=youtube&utm_medium=organic_video&utm_campaign=launch_2026&utm_content=VIDEO_ID&utm_term=pinned_comment#/free-training
```

## Query Parameter Order (CRITICAL for HashRouter)

Query params must come **BEFORE** the hash (`#/`):

✅ Correct: `https://example.com/?utm_source=youtube#/free-training`  
❌ Wrong: `https://example.com/#/free-training?utm_source=youtube`

The React HashRouter expects params in `window.location.search` (before `#/`).

## UTM Parameters

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `utm_source` | Traffic source | `youtube`, `mailerlite`, `facebook` |
| `utm_medium` | Medium type | `organic_video`, `paid_ad`, `email` |
| `utm_campaign` | Campaign name | `launch_2026`, `webinar` |
| `utm_content` | Video/Content ID | `VIDEO_ID_123`, `abc123xyz` |
| `utm_term` | Placement detail | `description`, `pinned_comment`, `end_card` |

## Attribution Storage

Attribution is stored in localStorage as `hs_attribution_v1` with 90-day TTL:

```json
{
  "first_source": "youtube",
  "first_video_id": "VIDEO_ID_123",
  "first_touch_at": "2026-09-25T00:00:00.000Z",
  "latest_source": "mailerlite",
  "latest_content_id": "CAMPAIGN_123",
  "latest_youtube_video_id": "VIDEO_ID_123",
  "latest_touch_at": "2026-09-25T12:00:00.000Z",
  "link_placement": "description",
  "entry_route": "/free-training",
  "tracking_version": "v1",
  "_expires_at": "2026-12-24T00:00:00.000Z"
}
```

### Field Logic

- **First touch**: Set once, never overwritten (captures initial acquisition)
- **Latest touch**: Updated on each tagged visit from external source
- **Email special case**: `utm_source=mailerlite` updates `latest_source` but preserves `first_video_id` and `latest_youtube_video_id` (doesn't overwrite video IDs with email content)
- **Unknown stays unknown**: System never invents "youtube" when no source exists
- **Direct return visits**: Preserve existing attribution (no new acquisition)
- **Internal navigation**: Hash routing preserves attribution (no param reset)

## Integration Points

### Typeform (uNrHKe9G)
All attribution fields are passed as hidden fields:
- `first_source`, `first_video_id`, `first_touch_at`
- `latest_source`, `latest_content_id`, `latest_youtube_video_id`, `latest_touch_at`
- `link_placement`, `entry_route`, `tracking_version`

Pages: `/` (LandingPage), `/free-training/watch` (Typeform application widget)

### MailerLite (LLFJEN)
Attribution fields injected as hidden form inputs on submission.

**Requirements:**
- Fields must be added to the form in MailerLite UI first (Prophet handles this)
- Input names must use `fields[KEY]` format (e.g., `fields[first_source]`)
- MailerLite classic embed only submits inputs that exist on the form
- Date fields expect YYYY-MM-DD format (ISO timestamps are converted)

**Implementation:**
1. Captures fresh attribution when modal opens (via `captureAttribution()`)
2. Populates existing `input[name="fields[KEY]"]` or `.ml-field-KEY input` elements
3. Creates hidden inputs with `fields[KEY]` format if not found on form
4. Runs on modal open AND on submit button click (capture phase)

**Field Visibility:**
Attribution fields added to the MailerLite classic form are hidden via CSS on the host site (`src/index.css`). The classic builder cannot hide custom fields in the UI, so they would otherwise render visible. The fields are still populated and submitted, but the `.ml-field-group.ml-field-*` selectors ensure they remain hidden from users.

**Date Format**: MailerLite DATE custom fields (`first_touch_at`, `latest_touch_at`) use `YYYY-MM-DD` format, not ISO 8601 timestamps. The `formatForMailerLite()` function automatically converts these fields.

**Fields:**
- `fields[first_source]`, `fields[first_video_id]`, `fields[first_touch_at]`
- `fields[latest_source]`, `fields[latest_content_id]`, `fields[latest_youtube_video_id]`, `fields[latest_touch_at]`
- `fields[link_placement]`, `fields[entry_route]`, `fields[tracking_version]`

Page: `/free-training` (email gate modal)

## Mobile Testing

Both example URLs work on mobile with params before `#/`:

```bash
# Landing page with video attribution
curl -I "https://headstartchannels.com/?utm_source=youtube&utm_content=VIDEO_123#/"

# Free training with email attribution
curl -I "https://headstartchannels.com/?utm_source=mailerlite&utm_campaign=launch#/free-training"
```

## Code Location

- **Attribution module**: `/src/attribution/index.ts`
- **Integration pages**:
  - `/src/pages/LandingPage.tsx` (Typeform PopupButton + Widget)
  - `/src/pages/FreeTrainingWatch.tsx` (Typeform Widget)
  - `/src/pages/FreeTrainingRegistration.tsx` (MailerLite form injection)
  - `/src/pages/Webinar.tsx` (Legacy + new attribution merge)

## Helper Page

Visit `/#/tools/video-link` for a link builder tool (creates properly formatted attribution URLs).

## Testing

```javascript
// Open browser console on any page
import { captureAttribution, getAttribution, clearAttribution } from './attribution';

// Capture current URL attribution
const attr = captureAttribution();
console.log(attr);

// Read stored attribution
const stored = getAttribution();
console.log(stored);

// Clear all attribution (reset)
clearAttribution();
```

## Video Description Template

```
Want your own done-for-you channel? Apply here:
https://headstartchannels.com/?utm_source=youtube&utm_medium=organic_video&utm_content=THIS_VIDEO_ID&utm_term=description#/

Free 68-min training on the full system:
https://headstartchannels.com/?utm_source=youtube&utm_medium=organic_video&utm_content=THIS_VIDEO_ID&utm_term=description#/free-training
```

Replace `THIS_VIDEO_ID` with the actual YouTube video ID.
