function Logo() {
  return (
    <a href="/" className="logo" aria-label="HeadStart Channels home" style={{ textDecoration: 'none' }}>
      <svg className="logo__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M16 22 L28 32 L16 42" stroke="#8FCFAE" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 18 L48 32 L32 46" stroke="#15875B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo__word"><b>HeadStart</b> <span>Channels</span></span>
    </a>
  );
}

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// Calendly redirects to this page with event details appended as query
// params. With hash routing they can land after the '#', so read both.
function getBookingDetails(): { when: string; firstName: string } {
  if (typeof window === 'undefined') return { when: '', firstName: '' };
  const hash = window.location.hash;
  const hashQ = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';
  const searchQ = window.location.search.startsWith('?') ? window.location.search.slice(1) : '';
  const params = new URLSearchParams([searchQ, hashQ].filter(Boolean).join('&'));
  const start = params.get('event_start_time');
  const name = params.get('invitee_full_name') || '';
  let when = '';
  if (start) {
    const d = new Date(start);
    if (!isNaN(d.getTime())) {
      when = new Intl.DateTimeFormat(undefined, {
        weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit',
      }).format(d);
    }
  }
  return { when, firstName: name.trim().split(' ')[0] || '' };
}

export default function Confirmed() {
  const { when, firstName } = getBookingDetails();
  const items = [
    'Add the call to your calendar now so it doesn\'t slip',
    'Watch the video above',
    'Come with a rough idea of what kind of content interests you',
  ];

  return (
    <main style={{ minHeight: '100vh', background: 'var(--paper)', padding: '40px 20px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 40 }}>
          <Logo />
        </div>

        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 9,
          background: 'var(--green-50)', border: '1px solid var(--green-100)', color: 'var(--green-800)',
          fontWeight: 700, fontSize: 14, padding: '8px 16px', borderRadius: 999,
        }}>
          <span style={{ color: 'var(--green-600)', display: 'inline-flex' }}><Check /></span> You're booked
        </span>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2.1rem, 1.4rem + 3vw, 3.25rem)', lineHeight: 1.08, letterSpacing: '-0.02em',
          color: 'var(--ink-900)', margin: '22px 0 0',
        }}>
          You're booked{firstName ? `, ${firstName}` : ''}. Here's what happens next.
        </h1>

        <p style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.5, color: 'var(--fg-muted)', margin: '20px auto 0', maxWidth: '48ch' }}>
          {when
            ? `Your call is confirmed for ${when}. Check your email for the details and calendar invite.`
            : 'Your call is confirmed. Check your email for the details and calendar invite.'}
        </p>

        <p style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink-900)', margin: '40px auto 18px', maxWidth: '44ch' }}>
          Before we talk, watch this. It'll make our call 10x more useful.
        </p>

        <div className="frame" style={{ maxWidth: 720, margin: '0 auto', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/2jaDFfzQdhA"
              title="Watch before your call"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div style={{
          textAlign: 'left', maxWidth: 520, margin: '44px auto 0',
          background: '#fff', border: '1px solid var(--line)', borderRadius: 18, padding: '28px 30px',
          boxShadow: '0 1px 2px rgba(22,34,31,.04), 0 8px 24px rgba(22,34,31,.06)',
        }}>
          <p style={{
            fontSize: 'var(--fs-eyebrow)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
            fontWeight: 700, color: 'var(--accent)', margin: '0 0 16px',
          }}>
            Before our call
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {items.map((it) => (
              <li key={it} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 17, lineHeight: 1.45, color: 'var(--ink-700)' }}>
                <span style={{ color: 'var(--green-600)', flex: 'none', marginTop: 2, display: 'inline-flex' }}><Check /></span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>

        <p style={{ fontSize: 16, color: 'var(--fg-muted)', margin: '32px auto 0', maxWidth: '50ch', lineHeight: 1.55 }}>
          This is a relaxed conversation to pick your niche and see if we're a fit. No pressure, no hard sell.
        </p>
      </div>
    </main>
  );
}
