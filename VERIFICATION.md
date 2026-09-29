# Ops Tracking Dashboard Fix - Verification Guide

## Problem Summary

**Before:** Dashboard showed ~470 total leads with many "Unknown" rows and blank emails
**After:** Dashboard shows ~383 total leads matching the actual Lead List spreadsheet

## Root Causes Fixed

1. **Multiline CSV field parsing**: The parser used naive `split('\n')` which broke on legitimate newlines inside quoted fields (e.g., "Main challenge" with paragraph breaks). This created 471 "lines" from 384 actual CSV rows.

2. **Empty trailing gviz header**: Google Sheets gviz CSV export adds an empty 40th column. The parser didn't filter empty headers, causing field misalignment.

## Changes Made

### 1. `src/pages/OpsTracking.tsx`
- Replaced naive line-splitting CSV parser with RFC4180-compliant implementation
- Handles multiline quoted fields, escaped quotes, CRLF/LF line endings
- Skips empty header columns when building lead objects

### 2. `public/ops/tracking-data.json`
- Updated fallback JSON to use real Lead List column names
- Replaced old fake camelCase samples (John Smith, etc.) with anonymized real data structure

## Verification Steps (After Deployment)

### 1. Access the Dashboard
Visit: https://headstartchannels.com/#/ops/tracking
Access code: `OPS-TRACK-2026`

### 2. Check KPI Cards (Top Section)
- **Applicants**: Should show **~381** (non-test leads)
- Badge should show: **🟢 Live data** (not fallback)

### 3. Check Applicant Explorer (Bottom Section)
- Footer should show: "Showing X of **~383** total leads"
- **No "Unknown" rows** with blank emails should appear
- Check for recent applicants mentioned in the issue:
  - darwn (darwnmrad@gmail.com)
  - Tony (tonynwoke28@gmail.com)
  - ljknmlkk (g@gmail.com)
  - OP meena (ytworks229@gmail.com)

### 4. Test Filters
- Check "Hide test entries" checkbox
  - Count should decrease by ~2 leads
- Search for "darwn" or "Tony" in search box
  - Should find matching applicants with correct emails

### 5. Check for Data Integrity
- Click on any applicant row to open detail modal
- Verify "Main challenge" field preserves multiline text correctly
- No truncated or garbled text from CSV parsing issues

## Expected Results

| Metric | Before (Buggy) | After (Fixed) |
|--------|----------------|---------------|
| Total leads parsed | ~470 | ~383 |
| Non-test leads | ~468 | ~381 |
| Leads with email | ~387 | ~372 |
| Leads with blank email | 83 | ~11 |
| "Unknown" fragment rows | Many | 0 |
| Multiline fields preserved | ❌ Broken | ✅ Intact |

## Fallback Mode Testing

If you want to test fallback mode:

1. Temporarily make the sheet private to simulate gviz failure
2. Refresh the ops tracking page
3. Should see: "🔴 Fallback · Live sheet unreachable"
4. Fallback data should show ~10 sample leads with realistic structure
5. No old fake "John Smith" camelCase samples

## Technical Validation

You can run this Node.js script to verify the CSV parser against the live sheet:

```javascript
const https = require('https');

const GVIZ_URL = 'https://docs.google.com/spreadsheets/d/14esKGmmWCUmOMsyJnjlw0ILb8LV2QXUn_1MOR8jognw/gviz/tq?tqx=out:csv&sheet=Lead%20List';

// RFC4180 parser (same as in OpsTracking.tsx)
function parseCsvToLeads(csvText) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField);
        currentField = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        if (char === '\r') i++;
        currentRow.push(currentField);
        if (currentRow.length > 0 && currentRow.some(f => f.trim())) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else if (char !== '\r') {
        currentField += char;
      }
    }
  }
  
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some(f => f.trim())) {
      rows.push(currentRow);
    }
  }
  
  if (rows.length < 2) return [];
  
  const headers = rows[0];
  const leads = [];
  
  for (let i = 1; i < rows.length; i++) {
    const lead = {};
    headers.forEach((header, index) => {
      if (header && header.trim()) {
        lead[header] = rows[i][index] || '';
      }
    });
    leads.push(lead);
  }
  
  return leads;
}

https.get(GVIZ_URL, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const leads = parseCsvToLeads(data);
    const nonTest = leads.filter(l => String(l['Is test']).toLowerCase() !== 'y');
    const withEmail = leads.filter(l => l['Email'] && l['Email'].trim());
    
    console.log('Total leads:', leads.length);
    console.log('Non-test leads:', nonTest.length);
    console.log('Leads with email:', withEmail.length);
    console.log('\nExpected:');
    console.log('Total: ~383');
    console.log('Non-test: ~381');
    console.log('With email: ~372');
  });
});
```

Save as `verify-parser.cjs` and run: `node verify-parser.cjs`

## Rollback Plan

If issues are discovered after deployment:

1. Revert PR #27 on main branch
2. Force push main to trigger DigitalOcean redeploy
3. Dashboard will return to previous state (buggy but known)

## Questions?

Contact the team if you see:
- Lead counts significantly different from expected (~383 total)
- "Unknown" rows appearing in the applicant list
- Blank emails in the majority of rows
- Garbled text in "Main challenge" or other multiline fields
- Fallback mode showing old "John Smith" samples

---

**PR:** https://github.com/keviscoding/autopilotchannels/pull/27
**Branch:** cursor/fix-ops-csv-parser-multiline-a956
**Commit:** 78ea94d
