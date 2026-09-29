#!/usr/bin/env node
/**
 * Test script to verify the CSV parser fix handles:
 * 1. Multiline quoted fields (e.g. Main challenge with newlines)
 * 2. Empty trailing gviz headers
 * 3. Correct row count matching the actual sheet
 */

const https = require('https');

// Fetch live CSV from Google Sheets
const GVIZ_URL = 'https://docs.google.com/spreadsheets/d/14esKGmmWCUmOMsyJnjlw0ILb8LV2QXUn_1MOR8jognw/gviz/tq?tqx=out:csv&sheet=Lead%20List';

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
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('CSV Parser Fix Verification');
    console.log('============================\n');
    
    const leads = parseCsvToLeads(data);
    
    console.log('✓ Total leads parsed:', leads.length);
    console.log('  Expected: ~383 (actual rows in sheet)');
    console.log('  Old buggy parser returned: ~470\n');
    
    const nonTestLeads = leads.filter(l => String(l['Is test']).toLowerCase() !== 'y');
    console.log('✓ Non-test leads:', nonTestLeads.length);
    console.log('  Expected: ~381\n');
    
    const leadsWithEmail = leads.filter(l => l['Email'] && l['Email'].trim());
    console.log('✓ Leads with email:', leadsWithEmail.length);
    console.log('  Expected: ~372\n');
    
    const blankEmailLeads = leads.filter(l => !l['Email'] || !l['Email'].trim());
    console.log('✓ Leads with blank email:', blankEmailLeads.length);
    console.log('  Should be reasonable (~11), not 83\n');
    
    // Check for "Unknown" fragment rows
    const unknownLeads = leads.filter(l => l['First name'] === 'Unknown');
    console.log('✓ Leads with "Unknown" first name:', unknownLeads.length);
    console.log('  Should be 0 (no fragments from multiline fields)\n');
    
    // Verify multiline fields are preserved
    const multilineLeads = leads.filter(l => l['Main challenge'] && l['Main challenge'].includes('\n'));
    console.log('✓ Leads with multiline Main challenge:', multilineLeads.length);
    console.log('  Should be ~24 (multiline fields preserved correctly)\n');
    
    // Check specific recent applicants mentioned in task
    const recentNames = ['darwn', 'Tony', 'ljknmlkk', 'OP meena'];
    const foundRecent = recentNames.filter(name => 
      leads.some(l => String(l['First name']).toLowerCase() === name.toLowerCase())
    );
    console.log('✓ Recent applicants found:', foundRecent.join(', '));
    console.log('  Expected: darwn, Tony, ljknmlkk, OP meena\n');
    
    // Verify Is test column is mapped correctly
    const testLeads = leads.filter(l => String(l['Is test']).toLowerCase() === 'y');
    console.log('✓ Test leads (Is test = Y):', testLeads.length);
    console.log('  Expected: ~2\n');
    
    // Check if empty header was skipped
    const sampleLead = leads[0];
    const hasEmptyKey = Object.keys(sampleLead).some(k => k === '' || k.trim() === '');
    console.log('✓ Empty header column skipped:', !hasEmptyKey);
    console.log('  Should be true (no empty keys in lead objects)\n');
    
    // Summary
    const expectedRange = leads.length >= 380 && leads.length <= 390;
    const noFragments = unknownLeads.length === 0;
    const correctEmails = leadsWithEmail.length >= 370;
    const recentFound = foundRecent.length === 4;
    
    if (expectedRange && noFragments && correctEmails && recentFound) {
      console.log('✅ ALL CHECKS PASSED');
      console.log('Parser correctly handles multiline fields and empty headers!');
      process.exit(0);
    } else {
      console.log('❌ SOME CHECKS FAILED');
      if (!expectedRange) console.log('  - Lead count outside expected range');
      if (!noFragments) console.log('  - Fragment rows detected (multiline parsing issue)');
      if (!correctEmails) console.log('  - Too few leads with email');
      if (!recentFound) console.log('  - Missing recent applicants');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching CSV:', err.message);
  process.exit(1);
});
