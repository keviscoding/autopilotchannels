import { useState } from 'react';

export default function VideoLinkHelper() {
  const [videoId, setVideoId] = useState('');
  const [placement, setPlacement] = useState('description');
  const [route, setRoute] = useState('/');

  const baseUrl = 'https://headstartchannels.com';
  const params = new URLSearchParams({
    utm_source: 'youtube',
    utm_medium: 'organic_video',
    utm_content: videoId || 'VIDEO_ID',
    utm_term: placement,
  });
  const fullUrl = `${baseUrl}/?${params.toString()}#${route}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '40px auto', 
      padding: '24px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ marginBottom: '8px' }}>Video Link Builder</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Create properly formatted attribution links for YouTube video descriptions.
      </p>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
          YouTube Video ID
        </label>
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="e.g., dQw4w9WgXcQ"
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
          }}
        />
        <small style={{ color: '#666', fontSize: '13px' }}>
          The 11-character ID from the YouTube URL (youtube.com/watch?v=<strong>THIS_PART</strong>)
        </small>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
          Link Placement
        </label>
        <select
          value={placement}
          onChange={(e) => setPlacement(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
          }}
        >
          <option value="description">Video Description</option>
          <option value="pinned_comment">Pinned Comment</option>
          <option value="end_card">End Card</option>
          <option value="community_post">Community Post</option>
        </select>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
          Destination Page
        </label>
        <select
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
          }}
        >
          <option value="/">Homepage (Application)</option>
          <option value="/free-training">Free Training (Registration)</option>
          <option value="/free-training/watch">Free Training (Watch)</option>
          <option value="/webinar">Webinar</option>
        </select>
      </div>

      <div style={{ 
        padding: '16px', 
        background: '#f5f5f5', 
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
          Generated Link
        </label>
        <code style={{ 
          display: 'block',
          padding: '12px',
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '13px',
          wordBreak: 'break-all',
          lineHeight: 1.6,
          fontFamily: 'monospace'
        }}>
          {fullUrl}
        </code>
      </div>

      <button
        onClick={copyToClipboard}
        style={{
          padding: '12px 24px',
          fontSize: '15px',
          fontWeight: '600',
          color: '#fff',
          background: '#15875B',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Copy to Clipboard
      </button>

      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

      <div>
        <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Video Description Template</h2>
        <div style={{ 
          padding: '16px', 
          background: '#f5f5f5', 
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <pre style={{ 
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap'
          }}>
{`Want your own done-for-you channel? Apply here:
${baseUrl}/?utm_source=youtube&utm_medium=organic_video&utm_content=${videoId || 'VIDEO_ID'}&utm_term=description#/

Free 68-min training on the full system:
${baseUrl}/?utm_source=youtube&utm_medium=organic_video&utm_content=${videoId || 'VIDEO_ID'}&utm_term=description#/free-training`}
          </pre>
        </div>
      </div>

      <div style={{ marginTop: '32px', padding: '16px', background: '#fff3cd', borderRadius: '8px' }}>
        <strong style={{ display: 'block', marginBottom: '8px' }}>⚠️ Critical: Query params before #/</strong>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
          Query parameters MUST come before the hash (#/). This is required for React HashRouter.
          <br />
          ✅ Correct: <code>?utm_source=youtube#/free-training</code>
          <br />
          ❌ Wrong: <code>#/free-training?utm_source=youtube</code>
        </p>
      </div>

      <div style={{ marginTop: '24px', fontSize: '14px', color: '#666' }}>
        <p>
          <strong>How it works:</strong> Attribution is captured on page load and stored in localStorage
          with 90-day TTL. First touch is preserved forever, latest touch updates on each tagged visit.
        </p>
        <p>
          <a href="#/" style={{ color: '#15875B' }}>← Back to Home</a>
          {' | '}
          <a 
            href="https://github.com/keviscoding/autopilotchannels/blob/main/VIDEO_ATTRIBUTION.md" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#15875B' }}
          >
            Full Documentation
          </a>
        </p>
      </div>
    </div>
  );
}
