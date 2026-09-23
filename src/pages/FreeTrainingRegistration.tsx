import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Icon({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && (window as any).lucide) {
      el.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      el.appendChild(i);
      (window as any).lucide.createIcons();
    }
  }, [name]);
  return <span ref={ref} style={{ display: 'inline-flex', lineHeight: 0 }} />;
}

function Logo() {
  const lead = '#15875B';
  const trail = '#8FCFAE';
  return (
    <a
      href="#/"
      className="logo"
      aria-label="HeadStart Channels home"
      style={{ textDecoration: 'none' }}
    >
      <svg className="logo__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M16 22 L28 32 L16 42" stroke={trail} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 18 L48 32 L32 46" stroke={lead} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo__word"><b>HeadStart</b> <span>Channels</span></span>
    </a>
  );
}

function Reveal({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    let done = false;
    const check = () => {
      if (done || !el) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        done = true;
        setTimeout(() => setVisible(true), delay);
        window.removeEventListener('scroll', check);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [delay, visible]);
  return <div ref={ref} className={('reveal ' + (visible ? 'in ' : '') + className).trim()} style={style}>{children}</div>;
}

/** Modal for email gate */
function EmailGateModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (data: { firstName: string; email: string }) => void }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !consent) return;
    setIsSubmitting(true);
    
    // Pass data to parent
    onSubmit({ firstName: firstName.trim(), email: email.trim() });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          <Icon name="x" />
        </button>
        
        <h3 className="modal-heading">Where should we send your free training?</h3>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className="modal-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="modal-consent">
            <label>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                disabled={isSubmitting}
              />
              <span>Send me the training and occasional HeadStart emails about building and operating YouTube channels. Unsubscribe anytime.</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn btn--primary btn--lg btn--full"
            disabled={!firstName.trim() || !email.trim() || !consent || isSubmitting}
          >
            {isSubmitting ? 'Starting...' : 'Start Watching Now →'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function FreeTrainingRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  // Check if already registered
  useEffect(() => {
    if (localStorage.getItem('hs_ft_registered') === '1') {
      // Already registered, redirect to watch page with current query params
      navigate('/free-training/watch' + location.search, { replace: true });
    }
  }, [navigate, location.search]);

  const handleCTAClick = () => {
    setShowModal(true);
  };

  const handleModalSubmit = async (data: { firstName: string; email: string }) => {
    // Capture attribution for MailerLite
    const params = new URLSearchParams(location.search);
    
    const attribution = {
      first_name: data.firstName,
      email: data.email,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      referrer: document.referrer || '',
      landing_page: window.location.href.split('?')[0],
      registered_at: new Date().toISOString(),
    };

    // MailerLite integration: Use VITE_MAILERLITE_ACCOUNT and VITE_MAILERLITE_FORM_ID
    // If env vars are not set, we still proceed to allow the build to work
    // Example: const accountId = import.meta.env.VITE_MAILERLITE_ACCOUNT;
    // Example: const formId = import.meta.env.VITE_MAILERLITE_FORM_ID;
    // For now, we just store locally and redirect
    // TODO: Implement MailerLite API submission when env vars are configured
    // Expected env vars:
    //   - VITE_MAILERLITE_ACCOUNT: MailerLite account ID
    //   - VITE_MAILERLITE_FORM_ID: Form ID for free training subscribers
    
    console.log('Registration data:', attribution);

    // Set local flag
    localStorage.setItem('hs_ft_registered', '1');

    // Navigate to watch page, preserving query params
    navigate('/free-training/watch' + location.search, { replace: true });
  };

  // Shortened proof testimonials for registration page (Pamela + 2 others)
  const testimonials = [
    { name: 'Pamela', result: 'Past $10k a month, working on the channel once her kids are in bed', video: '/pamela-stats.mp4', poster: '/pamela-poster.jpg', location: 'Australia' },
    { name: 'Theo', result: 'Went from nothing to $43,000 in a month', src: '/theo-dashboard.jpeg' },
    { name: 'Anton', result: '100K subscribers in 30 days', src: '/anton-100k.jpeg' },
  ];

  return (
    <>
      <nav className="nav">
        <div className="container nav__inner">
          <Logo />
        </div>
      </nav>

      <header className="hero" style={{ paddingTop: 'clamp(96px, 8vw, 64px)', paddingBottom: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span className="pill-tag">FREE 68-MINUTE ON-DEMAND TRAINING</span>
          </Reveal>
          <Reveal delay={60}>
            <h1 style={{ margin: '18px 0 0' }}>
              How Working Adults Are Building Faceless YouTube Channels Beside Their Jobs—Without Building Themselves Another Job
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="hero__sub" style={{ marginTop: '22px' }}>
              See the three-part system behind the channels we build: choosing the right opportunity, finding a repeatable winning format and installing a production system around a channel you own.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 600, color: 'var(--ink-700)', marginBottom: '16px' }}>
                Inside, you'll see:
              </h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: '0 auto', 
                maxWidth: '560px',
                textAlign: 'left',
                fontSize: '16.5px',
                lineHeight: 1.7,
                color: 'var(--ink-700)'
              }}>
                <li style={{ marginBottom: '10px', paddingLeft: '26px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--green-600)' }}>•</span>
                  Why a profitable niche can still be the wrong opportunity
                </li>
                <li style={{ marginBottom: '10px', paddingLeft: '26px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--green-600)' }}>•</span>
                  How to find a repeatable format instead of relying on one viral video
                </li>
                <li style={{ marginBottom: '10px', paddingLeft: '26px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--green-600)' }}>•</span>
                  How to operate the channel without becoming the writer, editor and production manager
                </li>
                <li style={{ marginBottom: '10px', paddingLeft: '26px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--green-600)' }}>•</span>
                  Real examples of channels that reached $3K, $5K and $10K+ months—and what actually went into those results
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ marginTop: '36px' }}>
              <button 
                type="button"
                className="btn btn--primary btn--lg"
                onClick={handleCTAClick}
                style={{ fontSize: '18px' }}
              >
                Watch the Free Training →
              </button>
              <p style={{ 
                fontSize: '14px', 
                color: 'var(--fg-subtle)', 
                marginTop: '14px',
                lineHeight: 1.5
              }}>
                Free instant access. No card required. Examples are not typical results. No earnings are guaranteed.
              </p>
              <p style={{ 
                fontSize: '16.5px', 
                fontWeight: 600,
                color: 'var(--ink-700)', 
                marginTop: '20px',
                lineHeight: 1.4
              }}>
                A channel you own. A team makes the videos. You keep your evenings.
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="center" style={{ maxWidth: '720px', margin: '0 auto 56px' }}>
            <h2 className="section-title">What this looks like when it's working</h2>
            <p className="section-lead">
              Real client results from channels we've been behind. Different niches, different people, same approach.
            </p>
          </div>

          <Reveal className="proof-card" style={{ maxWidth: '560px', margin: '0 auto 48px' }}>
            <div style={{ borderBottom: '1px solid var(--line)' }}>
              <video
                src="/pamela-stats.mp4"
                poster="/pamela-poster.jpg"
                controls
                playsInline
                preload="metadata"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="proof-card__body">
              <span className="proof-card__label"><Icon name="badge-check" /> Client result</span>
              <h4>Pamela, in Australia</h4>
              <p>Past $10k a month, working on the channel once her kids are in bed</p>
            </div>
          </Reveal>

          <div className="proof-grid">
            {testimonials.filter(t => t.src).map((t, i) => (
              <Reveal className="proof-card" key={t.name + i} delay={(i % 2) * 90}>
                <div style={{ borderBottom: '1px solid var(--line)' }}>
                  <img src={t.src} alt={`${t.name} results`} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                </div>
                <div className="proof-card__body">
                  <span className="proof-card__label"><Icon name="badge-check" /> Client result</span>
                  <h4>{t.name}</h4>
                  <p>{t.result}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="disclaimer" style={{ marginTop: '42px' }}>
            <Icon name="info" />
            <span>
              These are real client results and they're examples, not averages, and not a promise of
              income. What any channel earns comes down to the niche, the work that goes in, and plenty
              of things nobody controls.
            </span>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div>
              <Logo />
              <p className="footer__tag">A YouTube channel you own, with a team on it, that doesn't eat your evenings.</p>
            </div>
            <nav className="footer__links" aria-label="Legal">
              <a href="/terms">Terms of Service</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/earnings-disclaimer">Earnings Disclaimer</a>
              <a href="mailto:support@headstartchannels.com">Contact</a>
            </nav>
          </div>
          <div className="footer__legal">
            <p>
              We make no promise of income. Any figures shown are examples from real clients and aren't
              typical. What a channel earns depends on the niche, the work that goes in, and factors
              outside anyone's control. Nothing here is financial advice. &copy; 2026 HeadStart Channels.
            </p>
          </div>
        </div>
      </footer>

      {showModal && (
        <EmailGateModal 
          onClose={() => setShowModal(false)} 
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
}
