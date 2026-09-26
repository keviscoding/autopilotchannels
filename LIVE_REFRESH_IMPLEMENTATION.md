# Live Google Sheet Auto-Refresh Implementation

## Overview
The ops tracking dashboard now auto-refreshes from the live Google Sheet Lead List every 30 minutes, eliminating manual JSON exports.

## Implementation Details

### Files Changed
1. **`src/ops/opsConfig.ts`**
   - Added `LIVE_SHEET_CONFIG` with spreadsheet ID, sheet name, and gviz URL builder
   - Configurable auto-refresh interval (default: 30 minutes)

2. **`src/pages/OpsTracking.tsx`**
   - Added CSV parser (`parseCsvToLeads`) that handles quoted fields correctly
   - Added `fetchLiveSheetData()` for gviz CSV endpoint
   - Added `fetchFallbackData()` for bundled JSON fallback
   - Updated component with auto-refresh logic using `setInterval`
   - Added manual "Refresh Now" button
   - Added data source indicator (live/fallback)
   - Added last updated timestamp

3. **`README.md`**
   - Documented ops tracking dashboard features
   - Added configuration details

## How It Works

### Live Data Flow
1. On page load, component calls `fetchLiveSheetData()`
2. Fetches from: `https://docs.google.com/spreadsheets/d/{id}/gviz/tq?tqx=out:csv&sheet=Lead%20List`
3. Parses CSV response into Lead objects
4. Updates UI with live data
5. Shows green "✅ Live data" indicator

### Auto-Refresh
- `useEffect` hook sets up `setInterval` to call `fetchLiveSheetData()` every 30 minutes
- Interval is cleared on component unmount
- User can also click "Refresh Now" button for immediate update

### Fallback Mode
If live fetch fails:
1. Automatically tries to load `/ops/tracking-data.json`
2. Shows yellow "⚠️ Fallback mode" warning
3. Suggests checking sheet or refreshing
4. Dashboard remains functional with last-bundled snapshot

### Error Handling
- Network failures → fallback to bundled JSON
- No data available → shows error with "Try Again" button
- TypeScript null checks prevent runtime errors

## Requirements Met
✅ Live refresh every ~30 minutes  
✅ Refresh on page load  
✅ Manual refresh button  
✅ Fallback to bundled JSON on failure  
✅ No API keys or backend needed  
✅ No changes to other routes  
✅ Keeps OpsGate access control  
✅ Build passes (`npm run build`)  
✅ HashRouter compatible  

## Configuration

To change the refresh interval:
```typescript
// src/ops/opsConfig.ts
export const LIVE_SHEET_CONFIG = {
  // ...
  autoRefreshMs: 15 * 60 * 1000, // 15 minutes
};
```

To point to a different sheet:
```typescript
export const LIVE_SHEET_CONFIG = {
  spreadsheetId: 'YOUR_SPREADSHEET_ID',
  sheetName: 'Your Sheet Name',
  // ...
};
```

## Testing Checklist
- [x] CSV parser handles quoted fields with commas
- [x] CSV parser handles escaped quotes (`""`)
- [x] Live fetch returns valid Lead objects
- [x] Fallback mode activates on fetch failure
- [x] Manual refresh button works
- [x] Auto-refresh interval fires
- [x] Last updated timestamp updates
- [x] Data source indicator shows correct state
- [x] Test leads filtered (`Is test` = Y)
- [x] Video stats aggregation unchanged
- [x] Cash parsing works correctly
- [x] TypeScript compilation passes
- [x] Production build completes
- [x] No console errors

## Notes
- Sheet must remain "Anyone with the link can view" for gviz to work
- CORS already configured for `https://headstartchannels.com`
- Cash collection still manual on the Google Sheet
- Bundled `public/ops/tracking-data.json` remains as fallback only
