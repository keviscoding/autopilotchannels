import { useEffect } from 'react';

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

  // The Typeform popup locks page scroll (overflow:hidden) while open and
  // restores it on close. If it ends via a redirect, that lock can persist,
  // so clear any leftover scroll-lock when this page loads.
  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);

  // Load the re-edited transfer walkthrough (Vidalytics) so committed people
  // watch it before the call and arrive already reassured on ownership.
  useEffect(() => {
    const id = 'Xs9145qvedPuS6ij';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = `
      (function (v, i, d, a, l, y, t, c, s) {
        y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl+'Script'],vlf=v[c][vl+'Loaded'],ve='Embed';
        if(!vsl){vsl=function(u,cb){if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}i.getElementsByTagName("head")[0].appendChild(s);};}
        vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
      })(window, document, 'Vidalytics', 'vidalytics_embed_${id}', 'https://fast.vidalytics.com/embeds/tlH3XS0p/${id}/');
    `;
    document.head.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const items = [
    'Add the call to your calendar so it does not slip',
    'Watch the transfer walkthrough below',
    'Come ready to talk about an owned channel a team runs, not a course',
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
          Before we talk, watch this. It will make the conversation useful.
        </p>

        <div className="frame" style={{ maxWidth: 720, margin: '0 auto', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/PuNUNCpEogQ"
              title="Watch before your call"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <p style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink-900)', margin: '52px auto 6px', maxWidth: '46ch' }}>
          And here's exactly how your channel becomes 100% yours.
        </p>
        <p style={{ fontSize: 16, color: 'var(--fg-muted)', margin: '0 auto 18px', maxWidth: '50ch', lineHeight: 1.55 }}>
          The full transfer, start to finish. The key part: once it's done, we're completely locked out, and the
          channel is irreversibly yours on your own account.
        </p>

        <div className="frame" style={{ maxWidth: 720, margin: '0 auto', borderRadius: 20, overflow: 'hidden' }}>
          <div
            id="vidalytics_embed_Xs9145qvedPuS6ij"
            style={{ width: '100%', position: 'relative', paddingTop: '56.25%' }}
          />
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
          This is a conversation about whether a Channel Install is the right fit. You own it. A team produces. You post.
        </p>
      </div>
    </main>
  );
}
