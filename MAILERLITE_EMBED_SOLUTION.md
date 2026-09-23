# MailerLite Embedded Form in React Modal - Technical Solution

## Problem Statement

MailerLite embedded forms were not rendering inside a React modal component that mounted after page load. The modal would open showing only the heading with an empty space where form fields should appear.

## Root Cause Analysis

### How MailerLite Universal.js Works

1. The `universal.js` script loads once when added to `<head>`
2. On page load, it performs a **single DOM scan** for elements with class `.ml-embedded` and attribute `data-form="FORM_ID"`
3. For each discovered element, it injects an iframe or form fields
4. **No subsequent scans occur** - dynamically added `.ml-embedded` elements after page load are ignored

### Why Standard React Mounting Fails

```tsx
// ❌ This doesn't work
function Modal() {
  return (
    <div className="ml-embedded" data-form="hPCyUL"></div>
  );
}
```

When this modal mounts after page load, MailerLite's script has already finished its scan, so the div remains empty forever.

### Why `ml('render')` Doesn't Work

The previous attempt tried calling `ml('render', container)` to manually trigger form rendering. However, **this API does not exist** in MailerLite's universal.js.

**Actual MailerLite APIs:**
- `ml('account', 'ACCOUNT_ID')` - Initialize account (done once)
- `ml('show', 'FORM_ID')` - Show a popup form (not for embedded forms)
- Embedded forms: Automatic via DOM scan only

There is no programmatic API to render embedded forms after page load.

## Solution: Pre-Mount and Move Pattern

### High-Level Approach

1. **Pre-mount** the `.ml-embedded` div in the HTML body (hidden) so it's present during MailerLite's initial scan
2. MailerLite discovers and hydrates it with form fields on page load
3. When modal opens, **move** the already-hydrated DOM node into the modal
4. When modal closes, **move** it back to body for reuse

### Implementation

#### 1. Pre-Mount in HTML (index.html)

```html
<body>
  <div id="root"></div>
  
  <!-- Pre-mounted MailerLite form for modal reuse -->
  <div 
    id="ml-form-premount" 
    class="ml-embedded" 
    data-form="hPCyUL" 
    style="display: none;"
  ></div>
  
  <script type="module" src="/src/main.tsx"></script>
</body>
```

**Why this works:**
- Present in DOM when `universal.js` runs → gets discovered and hydrated
- `display: none` prevents visual flash on page load
- ID allows React to find and move it later

#### 2. Move into Modal (React Component)

```tsx
function EmailGateModal({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Find pre-mounted form
    const form = document.getElementById('ml-form-premount');
    
    if (form) {
      // Move hydrated form into modal
      container.appendChild(form);
      form.style.display = 'block';
    }

    return () => {
      // Move back to body on unmount
      if (form && form.parentNode === container) {
        form.style.display = 'none';
        document.body.appendChild(form);
      }
    };
  }, []);

  return (
    <div className="modal-content">
      <h3>Where should we send your free training?</h3>
      <div ref={containerRef}></div>
    </div>
  );
}
```

### Why This Works

1. ✅ **Respects MailerLite's behavior**: Uses documented DOM scan pattern
2. ✅ **Preserves hydration**: Moving a DOM node keeps all child elements (iframe, scripts, event listeners) intact
3. ✅ **SPA-compatible**: Works across route changes since form stays in DOM
4. ✅ **Reusable**: Can open/close modal multiple times without breaking
5. ✅ **No race conditions**: Form is always ready when modal opens (pre-hydrated)

## Edge Cases Handled

### Multiple Modal Opens
- Form is moved back to body on close, ready for next open
- No re-initialization needed

### SPA Navigation
- Form stays in DOM even if user navigates away and back
- Pre-mount persists across client-side route changes

### Slow Network
- MailerLite script may load slowly, but it will eventually hydrate the pre-mount
- Modal opening after hydration always finds a ready form

### Form Not Yet Hydrated
If user clicks CTA before MailerLite script loads:
- Pre-mount exists but may be empty initially
- When MailerLite loads, it hydrates the form wherever it currently is (even if already moved into modal)
- This "late hydration" works because we move the DOM node, not a clone

## Alternative Approaches Considered

### ❌ Re-inject Script on Modal Open
```tsx
// Creates memory leaks, duplicate scripts, race conditions
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://assets.mailerlite.com/js/universal.js';
  document.body.appendChild(script);
  script.onload = () => ml('account', '994180');
  return () => document.body.removeChild(script);
}, []);
```

### ❌ Clone the Pre-Mount
```tsx
// Loses MailerLite's hydration (iframe, event listeners)
const clone = preMountedForm.cloneNode(true);
container.appendChild(clone);
```

### ❌ Use Iframe Embed Instead of JavaScript
```tsx
// Loses ml:success events, harder to style, less flexible
<iframe src="https://mailerlite.com/form/hPCyUL" />
```

## Success Criteria Met

- [x] Form fields visible in modal on every open
- [x] Works after SPA navigation
- [x] Works with delayed modal mounting
- [x] Reusable across multiple modal open/close cycles
- [x] No invented APIs (uses documented MailerLite behavior)
- [x] Preserves success handling (`ml:success` event)
- [x] Maintains MailerLite redirect on success
- [x] No CSS hiding issues (form naturally inherits modal styles)

## References

- [MailerLite: How to add a form to your website](https://www.mailerlite.com/help/how-to-add-a-form-to-your-website)
- [Stack Overflow: MailerLite SPA reinitialization](https://stackoverflow.com/questions/79681439/how-to-reinitialize-mailerlite-embedded-form-on-route-change-without-page-refres)
- [MailerLite GitHub Issues: Form not rendering in SPA](https://github.com/mailerlite/mailerlite-api-v2-php-sdk/issues)

## Maintenance Notes

### If Form ID Changes
Update `data-form` attribute in `index.html`:
```html
<div id="ml-form-premount" class="ml-embedded" data-form="NEW_FORM_ID" ...>
```

### If Account ID Changes
Update `ml('account', 'NEW_ACCOUNT_ID')` in `index.html`:
```html
<script>
  ml('account', 'NEW_ACCOUNT_ID');
</script>
```

### If Using Multiple Forms
Create multiple pre-mounts with unique IDs:
```html
<div id="ml-form-signup" class="ml-embedded" data-form="FORM_A" style="display: none;"></div>
<div id="ml-form-newsletter" class="ml-embedded" data-form="FORM_B" style="display: none;"></div>
```

Then select the appropriate one in each modal.
