import { useEffect, useRef, useState } from 'react';
import { Widget } from '@typeform/embed-react';

const TYPEFORM_ID = 'uNrHKe9G';

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
    landing_page: window.location.href.replace(/\?.*$/, '') || '/free-training/watch',
  };

  Object.keys(hidden).forEach((k) => { if (!hidden[k]) delete hidden[k]; });
  return hidden;
}

/** Vidalytics player component */
function VidalyticsPlayer() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = `
      (function (v, i, d, a, l, y, t, c, s) {
        y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
        if (!vsl){vsl=function(u,cb){
          if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
          if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}
          i.getElementsByTagName("head")[0].appendChild(s);
        };}
        vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
      })(window, document, 'Vidalytics', 'vidalytics_embed_PY7FIWoxTwL9_Rpl', 'https://fast.vidalytics.com/embeds/tlH3XS0p/PY7FIWoxTwL9_Rpl/');
    `;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      id="vidalytics_embed_PY7FIWoxTwL9_Rpl" 
      style={{ width: '100%', position: 'relative', paddingTop: '56.25%' }}
    />
  );
}

/** Scroll to anchor helper */
function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function FreeTrainingWatch() {
  const [attribution] = useState(getAttribution);

  // Set noindex meta tag (protection via noindex, not redirect)
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // Full testimonials for watch page - Pamela first, then all others
  const testimonials = [
    { name: 'Pamela', result: 'Past $10k a month, working on the channel once her kids are in bed', video: '/pamela-stats.mp4', poster: '/pamela-poster.jpg', location: 'Australia' },
    { name: 'Theo', result: 'Went from nothing to $43,000 in a month', src: '/theo-dashboard.jpeg' },
    { name: 'Fahad', result: 'Monetised in 29 days', lead: 'From a few hundred views to 15 million', video: 'JKAP6p9nnh8' },
    { name: 'Anton', result: '100K subscribers in 30 days', src: '/anton-100k.jpeg' },
    { name: 'Pluto', result: '149M views and 38.7K new subscribers in 28 days', lead: 'A job, a family, and a channel that pays', video: 'q9mYCUKB5Vk' },
    { name: 'Sasha', result: '53, new to YouTube, monetised in 17 days', video: 'YOALp81wuhU' },
    { name: 'Guilherme', result: 'From flatlined uploads to $7K a month', video: 'mcns8yAYJU8' },
    { name: 'Rich', result: '$329 a day from 30-second videos', video: 'nMcltSa9_vw' },
  ];

  return (
    <>
      <nav className="nav">
        <div className="container nav__inner">
          <Logo />
        </div>
      </nav>

      <header className="hero" style={{ paddingTop: 'clamp(36px, 5vw, 64px)', paddingBottom: 'clamp(32px, 4vw, 48px)' }}>
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
            <VidalyticsPlayer />
          </Reveal>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '18px',
            fontSize: '15px',
            color: 'var(--fg-muted)',
            lineHeight: 1.5
          }}>
            68-minute training (+ optional Q&A). Watch at up to 2× speed.
          </div>

          <Reveal style={{ marginTop: '32px', textAlign: 'center' }}>
            <button 
              type="button"
              className="btn btn--primary btn--lg"
              onClick={() => scrollToAnchor('apply')}
              style={{ fontSize: '17px' }}
            >
              Already want us to build the system with you? Apply for a Channel Install →
            </button>
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
            {testimonials.filter(t => t.video && !t.poster).map((v, i) => (
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

      <section className="section section--sand" id="apply">
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
