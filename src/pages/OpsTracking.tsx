import { useState, useEffect, useCallback } from 'react';
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
  'Call status': string;
  'Booked at': string;
  'Outcome': string;
  'Contract value': string;
  'Cash collected': string;
  'Is test': string;
  'Unique lead key': string;
  [key: string]: string | string[];
}

interface TrackingData {
  exportedAt: string;
  spreadsheetId: string;
  spreadsheetUrl: string;
  cashPathNote?: string;
  leads: Lead[];
  contentPerformance?: Array<{
    'Video ID': string;
    'Title': string;
    'Watch link': string;
    [key: string]: string;
  }>;
}

interface VideoStats {
  videoId: string;
  title: string;
  watchLink: string;
  applicants: number;
  booked: number;
  won: number;
  cash: number;
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
  if (lines.length < 2) return []; // Need at least header + 1 row
  
  // Parse CSV respecting quoted fields
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          current += '"';
          i++;
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current); // Add last field
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
    cashPathNote: 'Cash is MANUAL on Lead List: set Outcome=won, fill Cash collected (+ Contract value, Collection dates). Live data refreshed automatically.',
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
  return response.json();
}

function OpsTrackingDashboard() {
  const [data, setData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'fallback'>('live');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hideTestLeads, setHideTestLeads] = useState(false);

  const loadData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      // Try live sheet first
      const liveData = await fetchLiveSheetData();
      setData(liveData);
      setDataSource('live');
      setLastUpdated(new Date());
      setError(null);
    } catch (liveError) {
      console.warn('Live sheet fetch failed, falling back to bundled JSON:', liveError);
      
      try {
        // Fall back to bundled JSON
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

  // Initial load on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadData();
    }, LIVE_SHEET_CONFIG.autoRefreshMs);

    return () => clearInterval(intervalId);
  }, [loadData]);

  const handleManualRefresh = () => {
    loadData(true);
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
        <p>Loading tracking data...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ color: '#d32f2f' }}>Error: {error}</p>
        <button
          onClick={handleManualRefresh}
          style={{
            marginTop: '16px',
            padding: '10px 20px',
            background: '#15875B',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ color: '#6B7280' }}>No data available</p>
      </div>
    );
  }

  // Helper to check if a lead is a test
  const isTestLead = (lead: Lead): boolean => {
    const isTest = lead['Is test'];
    if (Array.isArray(isTest)) {
      return isTest.some(v => String(v).toUpperCase() === 'Y');
    }
    return String(isTest).toUpperCase() === 'Y';
  };

  // Filter out test leads for video stats (Content Performance)
  const realLeads = data.leads.filter(lead => !isTestLead(lead));

  // For display in Lead List: filter based on hideTestLeads toggle
  const displayLeads = hideTestLeads 
    ? data.leads.filter(lead => !isTestLead(lead))
    : data.leads;

  // Compute video stats (exclude test leads from metrics)
  const videoMap = new Map<string, VideoStats>();

  realLeads.forEach((lead) => {
    const firstVideoId = lead['First video ID'];
    const latestVideoId = lead['Latest YouTube video ID'];
    const firstTitle = lead['First video title'];
    const latestTitle = lead['Latest YouTube video title'];
    const firstLink = lead['First video link'];
    const latestLink = lead['Latest YouTube video link'];
    
    // Determine which video to attribute this lead to (prefer first video)
    const videoId = firstVideoId || latestVideoId;
    const title = firstTitle || latestTitle || videoId;
    const watchLink = firstLink || latestLink;

    if (!videoId) return;

    if (!videoMap.has(videoId)) {
      videoMap.set(videoId, {
        videoId,
        title,
        watchLink,
        applicants: 0,
        booked: 0,
        won: 0,
        cash: 0,
      });
    }

    const stats = videoMap.get(videoId)!;
    stats.applicants += 1;

    // Count as booked if call status is booked/attended/won/lost or Booked at is set
    const callStatus = (lead['Call status'] || '').toLowerCase();
    const bookedAt = lead['Booked at'];
    if (['booked', 'attended', 'won', 'lost'].includes(callStatus) || bookedAt) {
      stats.booked += 1;
    }

    // Count as won if outcome is "won"
    const outcome = (lead['Outcome'] || '').toLowerCase();
    if (outcome === 'won') {
      stats.won += 1;
    }

    // Add cash
    const cashCollected = lead['Cash collected'];
    stats.cash += parseCash(cashCollected);
  });

  const videoStats = Array.from(videoMap.values()).sort((a, b) => b.applicants - a.applicants);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#16221F', margin: '0 0 8px' }}>
              Ops Tracking Dashboard
            </h1>
            <p style={{ color: '#6B7280', fontSize: '15px', margin: '0' }}>
              Content performance and lead pipeline.
            </p>
          </div>
          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            style={{
              padding: '10px 20px',
              background: refreshing ? '#E5E7EB' : '#15875B',
              color: refreshing ? '#6B7280' : '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: refreshing ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => {
              if (!refreshing) e.currentTarget.style.background = '#0F6B47';
            }}
            onMouseOut={(e) => {
              if (!refreshing) e.currentTarget.style.background = '#15875B';
            }}
          >
            {refreshing ? '🔄 Refreshing...' : '🔄 Refresh Now'}
          </button>
        </div>
        
        {/* Data Source & Last Updated Info */}
        <div style={{ 
          background: dataSource === 'live' ? '#D1FAE5' : '#FFF3CD',
          border: `1px solid ${dataSource === 'live' ? '#6EE7B7' : '#FFEB99'}`,
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '12px',
          fontSize: '14px',
          lineHeight: '1.5',
          color: dataSource === 'live' ? '#065F46' : '#856404'
        }}>
          <strong>{dataSource === 'live' ? '✅ Live data' : '⚠️ Fallback mode'}:</strong>{' '}
          {dataSource === 'live' ? (
            <>
              Auto-refreshes from{' '}
              <a 
                href={LIVE_SHEET_CONFIG.spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#15875B', fontWeight: '600' }}
              >
                Google Sheet Lead List
              </a>
              {' '}every 30 minutes.
            </>
          ) : (
            <>
              Live sheet unreachable — showing last bundled snapshot.{' '}
              <a 
                href={LIVE_SHEET_CONFIG.spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#15875B', fontWeight: '600' }}
              >
                Check sheet
              </a>
              {' '}or try refreshing.
            </>
          )}
          {lastUpdated && (
            <>
              <br />
              <span style={{ fontSize: '13px', opacity: 0.9 }}>
                Last updated: {lastUpdated.toLocaleString()}
              </span>
            </>
          )}
        </div>

        {/* Cash Manual Entry Note */}
        <div style={{ 
          background: '#FFF3CD', 
          border: '1px solid #FFEB99', 
          borderRadius: '8px', 
          padding: '12px 16px',
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#856404'
        }}>
          <strong>📝 Note:</strong> Cash is entered manually on the{' '}
          <a 
            href={data?.spreadsheetUrl || LIVE_SHEET_CONFIG.spreadsheetUrl}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#15875B', fontWeight: '600' }}
          >
            Google Sheet Lead List
          </a>
          {' '}(Outcome + Cash collected columns). This dashboard is read-only.
        </div>
      </header>

      {/* Overview Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#16221F', marginBottom: '16px' }}>
          Overview by Video
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Video Title
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Applicants
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Booked
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Won
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Cash
                </th>
              </tr>
            </thead>
            <tbody>
              {videoStats.map((stat, index) => (
                <tr key={stat.videoId} style={{ borderBottom: index < videoStats.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <td style={{ padding: '14px 16px', fontSize: '14px', color: '#16221F' }}>
                    {stat.watchLink ? (
                      <a 
                        href={stat.watchLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#15875B', textDecoration: 'none', fontWeight: '500' }}
                      >
                        {stat.title}
                      </a>
                    ) : (
                      <span style={{ fontWeight: '500' }}>{stat.title}</span>
                    )}
                    <br />
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>ID: {stat.videoId}</span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '16px', fontWeight: '600', color: '#16221F' }}>
                    {stat.applicants}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '16px', fontWeight: '600', color: '#16221F' }}>
                    {stat.booked}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '16px', fontWeight: '600', color: '#16221F' }}>
                    {stat.won}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '16px', fontWeight: '600', color: '#15875B' }}>
                    ${stat.cash.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </td>
                </tr>
              ))}
              {videoStats.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                    No video data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Lead List Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#16221F', margin: 0 }}>
            Lead List ({displayLeads.length} leads)
          </h2>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            fontSize: '14px',
            color: '#6B7280',
            cursor: 'pointer',
            userSelect: 'none'
          }}>
            <input 
              type="checkbox" 
              checked={hideTestLeads}
              onChange={(e) => setHideTestLeads(e.target.checked)}
              style={{ 
                width: '16px', 
                height: '16px',
                cursor: 'pointer'
              }}
            />
            Hide test leads
          </label>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Name
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Email
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  First Video
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Latest Video
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Call Status
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Outcome
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Cash
                </th>
              </tr>
            </thead>
            <tbody>
              {displayLeads.map((lead, index) => (
                <tr key={lead['Response ID'] || index} style={{ borderBottom: index < displayLeads.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <td style={{ padding: '14px 16px', fontSize: '14px', color: '#16221F' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{lead['First name'] || <span style={{ color: '#9CA3AF' }}>—</span>}</span>
                      {isTestLead(lead) && (
                        <span style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          background: '#FEF3C7',
                          color: '#92400E',
                          fontSize: '11px',
                          fontWeight: '600',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          Test
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '14px', color: '#16221F' }}>
                    {lead['Email'] || <span style={{ color: '#9CA3AF' }}>—</span>}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#16221F' }}>
                    {lead['First video title'] ? (
                      <>
                        {lead['First video link'] ? (
                          <a 
                            href={lead['First video link']} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#15875B', textDecoration: 'none' }}
                          >
                            {lead['First video title']}
                          </a>
                        ) : (
                          lead['First video title']
                        )}
                      </>
                    ) : (
                      <span style={{ color: '#9CA3AF' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#16221F' }}>
                    {lead['Latest YouTube video title'] ? (
                      <>
                        {lead['Latest YouTube video link'] ? (
                          <a 
                            href={lead['Latest YouTube video link']} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#15875B', textDecoration: 'none' }}
                          >
                            {lead['Latest YouTube video title']}
                          </a>
                        ) : (
                          lead['Latest YouTube video title']
                        )}
                      </>
                    ) : (
                      <span style={{ color: '#9CA3AF' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '14px', color: '#16221F' }}>
                    {lead['Call status'] || <span style={{ color: '#9CA3AF' }}>—</span>}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '14px', color: '#16221F' }}>
                    {lead['Outcome'] ? (
                      <span style={{ 
                        color: lead['Outcome'].toLowerCase() === 'won' ? '#15875B' : '#16221F',
                        fontWeight: lead['Outcome'].toLowerCase() === 'won' ? '600' : 'normal'
                      }}>
                        {lead['Outcome']}
                      </span>
                    ) : (
                      <span style={{ color: '#9CA3AF' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#15875B' }}>
                    {lead['Cash collected'] ? (
                      `$${parseCash(lead['Cash collected']).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                    ) : (
                      <span style={{ color: '#9CA3AF', fontWeight: 'normal' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
              {displayLeads.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                    No leads available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer style={{ marginTop: '48px', padding: '20px', background: '#F9FAFB', borderRadius: '8px', fontSize: '13px', color: '#6B7280' }}>
        <p style={{ margin: '0 0 8px' }}>
          <strong>How it works:</strong> Dashboard fetches live data from{' '}
          <a href={data?.spreadsheetUrl || LIVE_SHEET_CONFIG.spreadsheetUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#15875B' }}>
            Google Sheet Lead List
          </a>
          {' '}via Google Visualization CSV API every 30 minutes and on page load.
          No API keys or backend needed — sheet must remain link-viewable for this to work.
        </p>
        <p style={{ margin: '0' }}>
          Spreadsheet ID: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{data?.spreadsheetId || LIVE_SHEET_CONFIG.spreadsheetId}</code>
        </p>
      </footer>
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
