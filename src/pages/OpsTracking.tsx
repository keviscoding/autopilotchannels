import { useState, useEffect } from 'react';
import OpsGate from '../ops/OpsGate';

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

function OpsTrackingDashboard() {
  const [data, setData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/ops/tracking-data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load tracking data');
        return res.json();
      })
      .then((json: TrackingData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
        <p>Loading tracking data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ color: '#d32f2f' }}>Error: {error || 'No data available'}</p>
      </div>
    );
  }

  // Filter out test leads
  const realLeads = data.leads.filter((lead) => {
    const isTest = lead['Is test'];
    if (Array.isArray(isTest)) {
      return !isTest.some(v => String(v).toUpperCase() === 'Y');
    }
    return String(isTest).toUpperCase() !== 'Y';
  });

  // Compute video stats
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
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#16221F', margin: '0 0 8px' }}>
          Ops Tracking Dashboard
        </h1>
        <p style={{ color: '#6B7280', fontSize: '15px', margin: '0 0 12px' }}>
          Content performance and lead pipeline. Data exported: {new Date(data.exportedAt).toLocaleString()}
        </p>
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
            href={data.spreadsheetUrl} 
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
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#16221F', marginBottom: '16px' }}>
          Lead List ({realLeads.length} leads)
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
              {realLeads.map((lead, index) => (
                <tr key={lead['Response ID'] || index} style={{ borderBottom: index < realLeads.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <td style={{ padding: '14px 16px', fontSize: '14px', color: '#16221F' }}>
                    {lead['First name'] || <span style={{ color: '#9CA3AF' }}>—</span>}
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
              {realLeads.length === 0 && (
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
          <strong>Refresh data:</strong> Export Lead List from the{' '}
          <a href={data.spreadsheetUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#15875B' }}>
            Google Sheet
          </a>
          {' '}and update <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>public/ops/tracking-data.json</code>.
        </p>
        <p style={{ margin: '0' }}>
          Spreadsheet ID: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{data.spreadsheetId}</code>
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
