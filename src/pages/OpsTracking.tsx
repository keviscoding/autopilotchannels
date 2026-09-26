import { useState, useEffect, useCallback, useMemo } from 'react';
import OpsGate from '../ops/OpsGate';
import { LIVE_SHEET_CONFIG } from '../ops/opsConfig';

interface Lead {
  'Response ID': string;
  'Submitted at': string;
  'First name': string;
  'Email': string;
  'Phone': string;
  'First video ID': string;
  'First video title': string;
  'First video link': string;
  'Latest YouTube video ID': string;
  'Latest YouTube video title': string;
  'Latest YouTube video link': string;
  'First touch time': string;
  'Latest touch time': string;
  'Link placement': string;
  'Entry route': string;
  'Tracking version': string;
  'Budget answer': string;
  'Readiness': string;
  'Main challenge': string;
  'Self-reported video': string;
  'Call status': string;
  'Booked at': string;
  'Attended': string;
  'Closer qualified': string;
  'Outcome': string;
  'Non-close reason': string;
  'Contract value': string;
  'Cash collected': string;
  'Collection dates': string;
  'Refunds': string;
  'Repeat applicant': string;
  'Unique lead key': string;
  'Owner': string;
  'Next follow-up': string;
  'Closer notes': string;
  'Is test': string;
  [key: string]: string | string[];
}

interface TrackingData {
  exportedAt: string;
  spreadsheetId: string;
  spreadsheetUrl: string;
  cashPathNote?: string;
  leads: Lead[];
}

function parseCash(value: string): number {
  if (!value || typeof value !== 'string') return 0;
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Parse Google Visualization CSV response into Lead objects
 * CSV format: first row is headers, subsequent rows are data
 */
function parseCsvToLeads(csvText: string): Lead[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];
  
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };
  
  const headers = parseCSVLine(lines[0]);
  const leads: Lead[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const lead: Lead = {} as Lead;
    
    headers.forEach((header, index) => {
      lead[header] = values[index] || '';
    });
    
    leads.push(lead);
  }
  
  return leads;
}

/**
 * Fetch live data from Google Sheets via gviz CSV endpoint
 */
async function fetchLiveSheetData(): Promise<TrackingData> {
  const response = await fetch(LIVE_SHEET_CONFIG.gvizCsvUrl, {
    method: 'GET',
    headers: {
      'Accept': 'text/csv',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet data: ${response.status} ${response.statusText}`);
  }
  
  const csvText = await response.text();
  const leads = parseCsvToLeads(csvText);
  
  return {
    exportedAt: new Date().toISOString(),
    spreadsheetId: LIVE_SHEET_CONFIG.spreadsheetId,
    spreadsheetUrl: LIVE_SHEET_CONFIG.spreadsheetUrl,
    cashPathNote: 'Cash is MANUAL on Lead List: set Outcome=won, fill Cash collected. Live data refreshed automatically.',
    leads,
  };
}

/**
 * Fetch fallback data from bundled JSON
 */
async function fetchFallbackData(): Promise<TrackingData> {
  const response = await fetch('/ops/tracking-data.json');
  if (!response.ok) {
    throw new Error('Failed to load fallback tracking data');
  }
  const json = await response.json();
  return {
    ...json,
    leads: json.leads || []
  };
}

function OpsTrackingDashboard() {
  const [data, setData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'fallback'>('live');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [hideTests, setHideTests] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOutcome, setFilterOutcome] = useState<string>('all');
  const [filterCallStatus, setFilterCallStatus] = useState<string>('all');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const loadData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const liveData = await fetchLiveSheetData();
      setData(liveData);
      setDataSource('live');
      setLastUpdated(new Date());
      setError(null);
    } catch (liveError) {
      console.warn('Live sheet fetch failed, falling back to bundled JSON:', liveError);
      
      try {
        const fallbackData = await fetchFallbackData();
        setData(fallbackData);
        setDataSource('fallback');
        setLastUpdated(new Date());
        setError('Live sheet unreachable — showing last bundled snapshot');
      } catch (fallbackError) {
        console.error('Fallback data also failed:', fallbackError);
        setError('Failed to load tracking data from both live sheet and fallback');
        setData(null);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadData();
    }, LIVE_SHEET_CONFIG.autoRefreshMs);

    return () => clearInterval(intervalId);
  }, [loadData]);

  const handleManualRefresh = () => {
    loadData(true);
  };

  const filteredLeads = useMemo(() => {
    if (!data) return [];
    return data.leads.filter(lead => {
      const isTest = String(lead['Is test']).toLowerCase() === 'y';
      if (hideTests && isTest) return false;
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const firstName = String(lead['First name'] || '').toLowerCase();
        const email = String(lead['Email'] || '').toLowerCase();
        const phone = String(lead['Phone'] || '').toLowerCase();
        if (!firstName.includes(term) && !email.includes(term) && !phone.includes(term)) {
          return false;
        }
      }
      
      if (filterOutcome !== 'all') {
        const outcome = String(lead['Outcome'] || '').toLowerCase();
        if (outcome !== filterOutcome.toLowerCase()) {
          return false;
        }
      }
      
      if (filterCallStatus !== 'all') {
        const callStatus = String(lead['Call status'] || '').toLowerCase();
        if (callStatus !== filterCallStatus.toLowerCase()) {
          return false;
        }
      }
      
      return true;
    });
  }, [data, hideTests, searchTerm, filterOutcome, filterCallStatus]);

  const stats = useMemo(() => {
    if (!data) return {
      totalApplicants: 0,
      booked: 0,
      attended: 0,
      won: 0,
      cashCollected: 0,
      budgetFitRate: 0,
      bookedRate: 0,
      attendedRate: 0,
      wonRate: 0
    };

    const nonTestLeads = data.leads.filter(l => String(l['Is test']).toLowerCase() !== 'y');
    const booked = nonTestLeads.filter(l => l['Booked at']).length;
    const attended = nonTestLeads.filter(l => {
      const att = String(l['Attended'] || '').toLowerCase();
      return att === 'yes' || att === 'y';
    }).length;
    const won = nonTestLeads.filter(l => String(l['Outcome'] || '').toLowerCase() === 'won').length;
    const cashCollected = nonTestLeads.reduce((sum, l) => sum + parseCash(String(l['Cash collected'] || '')), 0);
    const budgetFit = nonTestLeads.filter(l => {
      const budget = String(l['Budget answer'] || '').toLowerCase();
      return budget.includes('5k') || budget.includes('10k') || budget.includes('15k') || budget.includes('$5') || budget.includes('$10') || budget.includes('$15');
    }).length;
    const budgetFitRate = nonTestLeads.length > 0 ? (budgetFit / nonTestLeads.length) * 100 : 0;
    
    return {
      totalApplicants: nonTestLeads.length,
      booked,
      attended,
      won,
      cashCollected,
      budgetFitRate,
      bookedRate: nonTestLeads.length > 0 ? (booked / nonTestLeads.length) * 100 : 0,
      attendedRate: booked > 0 ? (attended / booked) * 100 : 0,
      wonRate: attended > 0 ? (won / attended) * 100 : 0
    };
  }, [data]);

  const videoPerformance = useMemo(() => {
    if (!data) return [];
    const nonTestLeads = data.leads.filter(l => String(l['Is test']).toLowerCase() !== 'y');
    const videoMap = new Map<string, { title: string; count: number; won: number; cash: number }>();
    
    nonTestLeads.forEach(lead => {
      const videoId = String(lead['First video ID'] || lead['Latest YouTube video ID'] || '');
      const videoTitle = String(lead['First video title'] || lead['Latest YouTube video title'] || 'Unknown');
      if (!videoId) return;
      
      const existing = videoMap.get(videoId) || { title: videoTitle, count: 0, won: 0, cash: 0 };
      existing.count += 1;
      if (String(lead['Outcome'] || '').toLowerCase() === 'won') {
        existing.won += 1;
        existing.cash += parseCash(String(lead['Cash collected'] || ''));
      }
      videoMap.set(videoId, existing);
    });
    
    return Array.from(videoMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [data]);

  if (loading && !data) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        fontFamily: 'var(--font-sans)'
      }}>
        <div style={{ textAlign: 'center', color: 'var(--fg-muted)' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border)',
            borderTop: '3px solid var(--accent)',
            borderRadius: '50%',
            margin: '0 auto 16px',
            animation: 'spin 1s linear infinite'
          }} />
          Loading tracking data...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      fontFamily: 'var(--font-sans)'
    }}>
      <header style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              margin: 0,
              color: 'var(--fg-strong)'
            }}>
              Sales Analytics
            </h1>
            <p style={{
              fontSize: '14px',
              color: 'var(--fg-muted)',
              margin: '4px 0 0 0'
            }}>
              {dataSource === 'live' ? '🟢 Live' : '🔴 Fallback'} · Last updated: {lastUpdated?.toLocaleString() || 'Never'}
              {dataSource === 'live' && ' · Auto-refreshes every 30 min'}
            </p>
          </div>
          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            style={{
              padding: '10px 20px',
              background: refreshing ? 'var(--fg-disabled)' : 'var(--accent)',
              color: 'var(--fg-on-accent)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: refreshing ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {refreshing ? 'Refreshing...' : 'Refresh Now'}
          </button>
        </div>
      </header>
      
      <main style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '32px 24px',
        position: 'relative'
      }}>
        {loading && data && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(250, 248, 243, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            borderRadius: '12px'
          }}>
            <div style={{
              textAlign: 'center',
              color: 'var(--fg-muted)',
              fontSize: '16px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid var(--border)',
                borderTop: '3px solid var(--accent)',
                borderRadius: '50%',
                margin: '0 auto 16px',
                animation: 'spin 1s linear infinite'
              }} />
              Loading data...
            </div>
          </div>
        )}
        
        {error && dataSource === 'fallback' && (
          <div style={{
            background: 'var(--warn-50)',
            border: '1px solid var(--warn)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            color: 'var(--warn)',
            fontSize: '14px'
          }}>
            <strong>⚠️ Fallback mode:</strong> Live sheet unreachable. Showing last bundled snapshot. <a href={LIVE_SHEET_CONFIG.spreadsheetUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link)', fontWeight: 600 }}>Check sheet</a> or try refreshing.
          </div>
        )}
        
        <section style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {[
              { label: 'Applicants', value: stats.totalApplicants, desc: 'Non-test leads' },
              { label: 'Booked', value: stats.booked, desc: `${stats.bookedRate.toFixed(1)}% conversion` },
              { label: 'Attended', value: stats.attended, desc: `${stats.attendedRate.toFixed(1)}% show rate` },
              { label: 'Won', value: stats.won, desc: `${stats.wonRate.toFixed(1)}% close rate` },
              { label: 'Cash Collected', value: `$${stats.cashCollected.toLocaleString()}`, desc: 'Manual entry' },
              { label: 'Budget Fit', value: `${stats.budgetFitRate.toFixed(1)}%`, desc: '$5k+ budget' }
            ].map((kpi, i) => (
              <div key={i} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--fg-subtle)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}>
                  {kpi.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: 'var(--fg-strong)',
                  marginBottom: '4px'
                }}>
                  {kpi.value}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--fg-muted)'
                }}>
                  {kpi.desc}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            marginBottom: '16px',
            color: 'var(--fg-strong)'
          }}>
            Funnel Stages
          </h2>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            overflowX: 'auto'
          }}>
            {[
              { label: 'Applied', count: stats.totalApplicants },
              { label: 'Booked', count: stats.booked },
              { label: 'Attended', count: stats.attended },
              { label: 'Won', count: stats.won }
            ].map((stage, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--accent-soft)',
                    border: '2px solid var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    marginBottom: '8px'
                  }}>
                    {stage.count}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--fg-strong)'
                  }}>
                    {stage.label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{
                    width: '40px',
                    height: '2px',
                    background: 'var(--border-strong)',
                    flexShrink: 0
                  }} />
                )}
              </div>
            ))}
          </div>
        </section>
        
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            marginBottom: '16px',
            color: 'var(--fg-strong)'
          }}>
            Video Performance
          </h2>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-alt)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Video</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', fontWeight: 600, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Leads</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', fontWeight: 600, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Won</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', fontWeight: 600, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cash</th>
                </tr>
              </thead>
              <tbody>
                {videoPerformance.map((video, i) => (
                  <tr key={video.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--fg)' }}>
                      <div style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {video.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--fg-subtle)', marginTop: '2px' }}>{video.id}</div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '16px', fontWeight: 600, color: 'var(--fg-strong)' }}>{video.count}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '16px', fontWeight: 600, color: 'var(--green-700)' }}>{video.won}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '16px', fontWeight: 600, color: 'var(--fg-strong)' }}>${video.cash.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
        <section>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              margin: 0,
              color: 'var(--fg-strong)'
            }}>
              Applicant Explorer
            </h2>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--fg)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={hideTests}
                onChange={(e) => setHideTests(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              Hide test entries
            </label>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '16px',
            flexWrap: 'wrap'
          }}>
            <input
              type="search"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '1 1 300px',
                padding: '10px 14px',
                fontSize: '14px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
            <select
              value={filterOutcome}
              onChange={(e) => setFilterOutcome(e.target.value)}
              style={{
                padding: '10px 14px',
                fontSize: '14px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--surface)',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Outcomes</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="">Pending</option>
            </select>
            <select
              value={filterCallStatus}
              onChange={(e) => setFilterCallStatus(e.target.value)}
              style={{
                padding: '10px 14px',
                fontSize: '14px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--surface)',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Call Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="no-show">No Show</option>
              <option value="">Not Called</option>
            </select>
          </div>
          
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-alt)' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Applicant</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Call Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Outcome</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', fontWeight: 600, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cash</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, i) => {
                    const isTest = String(lead['Is test']).toLowerCase() === 'y';
                    const firstName = String(lead['First name'] || 'Unknown');
                    const email = String(lead['Email'] || '');
                    const source = String(lead['First source'] || lead['Latest source'] || '—');
                    const callStatus = String(lead['Call status'] || '');
                    const outcome = String(lead['Outcome'] || '');
                    const cash = String(lead['Cash collected'] || '—');
                    
                    return (
                      <tr
                        key={String(lead['Response ID'] || i)}
                        onClick={() => setSelectedLead(lead)}
                        style={{
                          borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                          cursor: 'pointer',
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg-strong)' }}>
                                {firstName}
                                {isTest && (
                                  <span style={{
                                    marginLeft: '8px',
                                    padding: '2px 6px',
                                    background: 'var(--warn-50)',
                                    color: 'var(--warn)',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    borderRadius: '4px',
                                    textTransform: 'uppercase'
                                  }}>
                                    Test
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>{email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--fg)' }}>
                          {source}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '13px' }}>
                          {callStatus ? (
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 600,
                              background: callStatus.toLowerCase().includes('completed') ? 'var(--green-50)' : 'var(--bg-alt)',
                              color: callStatus.toLowerCase().includes('completed') ? 'var(--green-700)' : 'var(--fg-muted)'
                            }}>
                              {callStatus}
                            </span>
                          ) : '—'}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '13px' }}>
                          {outcome ? (
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 600,
                              background: outcome.toLowerCase() === 'won' ? 'var(--green-50)' : 
                                         outcome.toLowerCase() === 'lost' ? 'var(--danger-50)' : 'var(--bg-alt)',
                              color: outcome.toLowerCase() === 'won' ? 'var(--green-700)' : 
                                     outcome.toLowerCase() === 'lost' ? 'var(--danger)' : 'var(--fg-muted)'
                            }}>
                              {outcome}
                            </span>
                          ) : '—'}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '14px', fontWeight: 600, color: 'var(--fg-strong)' }}>
                          {cash}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredLeads.length === 0 && (
              <div style={{
                padding: '48px 24px',
                textAlign: 'center',
                color: 'var(--fg-muted)'
              }}>
                No applicants match your filters
              </div>
            )}
          </div>
          <div style={{
            marginTop: '12px',
            fontSize: '13px',
            color: 'var(--fg-subtle)',
            textAlign: 'right'
          }}>
            Showing {filteredLeads.length} of {data?.leads.length || 0} total leads
          </div>
        </section>
      </main>
      
      {selectedLead && (
        <div
          onClick={() => setSelectedLead(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--surface)',
              borderRadius: '16px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div style={{
              padding: '24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start'
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  margin: '0 0 8px 0',
                  color: 'var(--fg-strong)'
                }}>
                  {String(selectedLead['First name'] || 'Unknown')}
                  {String(selectedLead['Is test']).toLowerCase() === 'y' && (
                    <span style={{
                      marginLeft: '12px',
                      padding: '4px 8px',
                      background: 'var(--warn-50)',
                      color: 'var(--warn)',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      textTransform: 'uppercase'
                    }}>
                      Test Entry
                    </span>
                  )}
                </h3>
                <div style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>{String(selectedLead['Email'] || '')}</div>
                {selectedLead['Phone'] && (
                  <div style={{ fontSize: '14px', color: 'var(--fg-muted)', marginTop: '2px' }}>{String(selectedLead['Phone'])}</div>
                )}
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  color: 'var(--fg-subtle)',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '20px' }}>
                {Object.entries(selectedLead)
                  .filter(([key, value]) => 
                    value && 
                    key !== 'Response ID' && 
                    key !== 'First name' && 
                    key !== 'Email' && 
                    key !== 'Phone' &&
                    key !== 'Is test'
                  )
                  .map(([key, value], i) => (
                    <div key={i}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--fg-subtle)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '6px'
                      }}>
                        {key}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--fg)' }}>
                        {String(key).toLowerCase().includes('link') && String(value).startsWith('http') ? (
                          <a href={String(value)} target="_blank" rel="noreferrer" style={{ color: 'var(--link)' }}>
                            {String(value)}
                          </a>
                        ) : String(value)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OpsTracking() {
  return (
    <OpsGate>
      <OpsTrackingDashboard />
    </OpsGate>
  );
}
