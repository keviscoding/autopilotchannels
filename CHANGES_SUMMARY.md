# Free Training Funnel UX Improvements

## Quick Reference: What Changed

### Gate Page (`/free-training`) - FreeTrainingRegistration.tsx

#### H1 Headline
- **Before:** "How Working Adults Are Building Faceless YouTube Channels Beside Their Jobs—Without Building Themselves Another Job" (20+ words)
- **After:** "Build a faceless YouTube channel beside your job—without building yourself another job" (14 words)
- **Why:** Faster to read, same promise

#### Hero Padding
- **Before:** `paddingTop: clamp(96px, 8vw, 64px)` (inverted - larger on mobile, smaller on desktop)
- **After:** `paddingTop: clamp(64px, 8vw, 96px)` (correct - tighter on mobile, more generous on desktop)
- **Why:** Better mobile fold, no logo collision

#### Thumbnail Spacing
- **Before:** `marginTop: '36px'`
- **After:** `marginTop: '28px'`
- **Why:** Get CTA visible faster on mobile

#### Thumbnail CTA
- **Added:** "Get free access" label overlay (new CSS class `.video-gate-thumb__cta`)
- **Added:** `objectPosition: 'center 35%'` for better Pamela poster crop
- **Why:** Clear expectation that signup is required

#### Copy Updates
**Under thumbnail:**
- **Before:** "Free instant access. No card required. ..."
- **After:** "Watch instantly after you enter your email. We'll also email a link so you can come back. No card required. ..."

**Modal footer:**
- **Before:** "You'll get the training by email plus occasional HeadStart tips..."
- **After:** "You'll start watching right away. We'll also email a return link, plus occasional HeadStart tips..."
- **Why:** Matches actual behavior (MailerLite success redirects to watch page immediately)

---

### Watch Page (`/free-training/watch`) - FreeTrainingWatch.tsx

#### H1 Headline
- **Before:** "How a faceless YouTube channel actually gets built" (9 words)
- **After:** "Free faceless YouTube training" (4 words)
- **Why:** Less intro, more video focus

#### Hero Sub
- **Before:** 3-line paragraph explaining the training content
- **After:** Removed entirely
- **Why:** Avoid sales essay above player, get to video faster

#### Hero Padding
- **Before:** `paddingTop: clamp(64px, 8vw, 96px)`, `paddingBottom: clamp(32px, 4vw, 48px)`
- **After:** `paddingTop: clamp(48px, 6vw, 72px)`, `paddingBottom: clamp(20px, 3vw, 32px)`
- **Why:** Player sits higher on screen

#### Chapter Hints
- **Added:** Light text under player: "Opportunity · Formats · Production · Examples · Working together"
- **Why:** Quick content preview without another sales block (plain HTML, not fake player chapters)

---

## What Was NOT Changed (Safeguards)

✅ MailerLite form ID (LLFJEN)
✅ MailerLite form HTML structure
✅ MailerLite success URL wiring
✅ Vidalytics embed ID (PY7FIWoxTwL9_Rpl)
✅ Vidalytics player script
✅ Typeform ID (uNrHKe9G)
✅ All routing paths
✅ Consent checkboxes
✅ Privacy policy links
✅ Proof sections (testimonials, results)
✅ Earnings disclaimers
✅ Apply button and form below player
✅ No new earnings claims

---

## Technical Details

### Files Changed
1. `src/pages/FreeTrainingRegistration.tsx` (gate page)
2. `src/pages/FreeTrainingWatch.tsx` (watch page)
3. `src/index.css` (added `.video-gate-thumb__cta` styles)

### New CSS Classes
- `.video-gate-thumb__cta` - "Get free access" overlay label
  - White background with shadow
  - Positioned below play icon
  - Scales slightly on hover

### Build Status
✅ `npm run build` successful
✅ No TypeScript errors
✅ No linting errors
✅ Vite bundle size: 581KB (same as before)

---

## Mobile Responsiveness

All changes tested conceptually for ~375px viewport:
- Thumbnail + CTA visible with minimal scroll
- No logo-text overlap
- Tighter vertical rhythm
- Chapter hints wrap gracefully

---

## Next Steps (If Needed)

Optional future enhancements (NOT in this PR):
- A/B test headline variations
- Add thumbnail overlay gradient for better text readability
- Consider different thumbnail asset if Pamela poster doesn't test well
- Track scroll depth to confirm CTA visibility improvement
- Monitor MailerLite conversion rate changes

---

## Summary

**Goal:** Get more people to the video without breaking anything
**Approach:** Shorter copy, tighter spacing, clearer CTAs
**Risk:** Minimal - all changes are CSS/copy only, no integration changes
**Result:** Faster path to CTA on gate page, cleaner player experience on watch page
