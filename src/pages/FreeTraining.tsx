import { useEffect, useRef, useState } from 'react';
import { Widget } from '@typeform/embed-react';

const TYPEFORM_ID = 'uNrHKe9G';

// WebinarJam replay click URL (thank-you page, may have 48h window)
// Replace with YouTube/Vimeo/Loom embed URL once confirmed by Kevis
const REPLAY_EMBED_URL = 'https://event.webinarjam.com/t/click/8wgyk5byintwwavioioao';
const REPLAY_WATCH_URL = 'https://event.webinarjam.com/t/click/8wgyk5byintwwavioioao';

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

function YtClip({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    <div className="ytclip">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="ytclip__poster" onClick={() => setPlay(true)} aria-label={`Play ${title}`}>
          <img
            src={src}
            alt=""
            onError={() => setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
          />
          <span className="ytclip__play" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/** Attribution helper - capture hidden fields for Typeform */
function getAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const hash = window.location.hash;
  const hashQ = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';
  const searchQ = window.location.search.startsWith('?') ? window.location.search.slice(1) : '';
  const params = new URLSearchParams([searchQ, hashQ].filter(Boolean).join('&'));

  const readParam = (keys: string[]): string => {
    for (const k of keys) {
      const v = params.get(k);
      if (v) return v;
    }
    return '';
  };

  const source = readParam(['source', 'src', 'utm_content']) || 'free_training';
  const hidden: Record<string, string> = {
    source,
    first_source: source,
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    referrer: document.referrer || '',
    landing_page: window.location.href.replace(/\?.*$/, '') || '/free-training',
  };

  // Clean up empty values
  Object.keys(hidden).forEach((k) => { if (!hidden[k]) delete hidden[k]; });
  return hidden;
}

/** Replay player component - handles iframe embed fallback */
function ReplayPlayer() {
  const [embedError, setEmbedError] = useState(false);
  const [tryEmbed, setTryEmbed] = useState(false);

  // Try to detect if iframe will work (note: X-Frame-Options will block cross-origin WJ embeds)
  const handleIframeError = () => {
    setEmbedError(true);
  };

  if (!tryEmbed) {
    // Show poster with play button
    return (
      <div className="replay-player">
        <div className="replay-player__poster">
          <div className="replay-player__poster-inner">
            <div style={{ textAlign: 'center', padding: '60px 30px' }}>
              <div style={{ 
                width: '92px', 
                height: '92px', 
                margin: '0 auto 24px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,.3)'
              }}>
                <Icon name="play" />
              </div>
              <h3 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '26px', 
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 16px',
                textWrap: 'balance'
              }}>
                Free Training: How a Faceless YouTube Channel Actually Gets Built
              </h3>
              <p style={{ 
                fontSize: '17px', 
                color: 'rgba(255,255,255,0.85)', 
                margin: '0 0 32px',
                lineHeight: 1.5,
                maxWidth: '48ch',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                Learn the full channel-automation approach at your own pace
              </p>
              <button
                onClick={() => setTryEmbed(true)}
                className="btn btn--primary btn--lg"
                style={{ display: 'inline-flex' }}
              >
                Watch Free Training <Icon name="arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (embedError || REPLAY_EMBED_URL.includes('webinarjam')) {
    // Fallback: open in new tab (WJ likely blocks iframe)
    return (
      <div className="replay-player">
        <div className="replay-player__fallback">
          <div style={{ textAlign: 'center', padding: '48px 30px' }}>
            <div style={{ 
              width: '72px', 
              height: '72px', 
              margin: '0 auto 20px',
              borderRadius: '50%',
              background: 'var(--green-50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon name="external-link" />
            </div>
            <p style={{ 
              fontSize: '17px', 
              color: 'var(--fg-muted)', 
              margin: '0 0 24px',
              lineHeight: 1.5
            }}>
              The training opens in a new window
            </p>
            <a
              href={REPLAY_WATCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg"
            >
              Open Training <Icon name="external-link" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Try iframe embed
  return (
    <div className="replay-player">
      <iframe
        src={REPLAY_EMBED_URL}
        title="Free Training Replay"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '16px',
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        onError={handleIframeError}
      />
    </div>
  );
}

export default function FreeTraining() {
  const [attribution] = useState(getAttribution);

  // Client testimonials - reuse existing site proof
  const testimonials = [
    { name: 'Theo', result: 'Went from nothing to $43,000 in a month', src: '/theo-dashboard.jpeg' },
    { name: 'Fahad', result: 'Monetised in 29 days', lead: 'From a few hundred views to 15 million', video: 'JKAP6p9nnh8' },
    { name: 'Anton', result: '100K subscribers in 30 days', src: '/anton-100k.jpeg' },
    { name: 'Pluto', result: '149M views and 38.7K new subscribers in 28 days', lead: 'A job, a family, and a channel that pays', video: 'q9mYCUKB5Vk' },
    { name: 'Sasha', result: '53, new to YouTube, monetised in 17 days', video: 'YOALp81wuhU' },
    { name: 'Guilherme', result: 'From flatlined uploads to $7K a month', video: 'mcns8yAYJU8' },
    { name: 'Rich', result: '$329 a day from 30-second videos', video: 'PmCeZxdI2nI' },
  ];

  return (
    <>
      <nav className="nav">
        <div className="container nav__inner">
          <Logo />
        </div>
      </nav>

      <header className="hero" style={{ paddingTop: 'clamp(36px, 5vw, 64px)', paddingBottom: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span className="pill-tag">Free Training</span>
          </Reveal>
          <Reveal delay={60}>
            <h1 style={{ margin: '18px 0 0' }}>
              How a faceless YouTube channel <em>actually gets built</em>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="hero__sub" style={{ marginTop: '22px' }}>
              Learn the full channel-automation approach at your own pace. How the niche gets chosen, 
              where the video ideas come from, who makes the videos, and what it really costs.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '920px' }}>
          <Reveal className="frame" style={{ background: 'var(--dark-bg)', borderRadius: '20px' }}>
            <ReplayPlayer />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center" style={{ maxWidth: '720px', margin: '0 auto 56px' }}>
            <h2 className="section-title">What this looks like when it's working</h2>
            <p className="section-lead">
              Real client results from channels we've been behind. Different niches, different people, same approach.
            </p>
          </div>

          <div className="proof-grid">
            {testimonials.filter(t => t.src).slice(0, 3).map((t, i) => (
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

          <div className="yt-grid" style={{ marginTop: '32px' }}>
            {testimonials.filter(t => t.video).map((v, i) => (
              <Reveal className="proof-card" key={v.name} delay={(i % 2) * 60}>
                <YtClip id={v.video!} title={`${v.name} on their channel`} />
                <div className="proof-card__body">
                  <span className="proof-card__label"><Icon name="badge-check" /> Client result</span>
                  <h4>{v.name}</h4>
                  <p>{v.lead || v.result}</p>
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

      <section className="section section--sand">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="center" style={{ marginBottom: '48px' }}>
            <h2 className="section-title">Apply for a Channel Install</h2>
            <p className="section-lead">
              If you want the channel built for you instead of spending months learning every part, 
              apply below. We cover fit and cost in the application, before anyone gets on a call.
            </p>
          </div>

          <Reveal className="tf-inline">
            <Widget id={TYPEFORM_ID} hidden={attribution} opacity={0} inlineOnMobile />
          </Reveal>

          <Reveal delay={100}>
            <p style={{ 
              marginTop: '28px', 
              fontSize: '15px', 
              color: 'var(--fg-subtle)', 
              textAlign: 'center', 
              maxWidth: '52ch', 
              margin: '28px auto 0',
              lineHeight: 1.6
            }}>
              We read every application. If you'd rather learn every part of this and run the whole
              thing yourself, this won't be a fit.
            </p>
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
    </>
  );
}
