import { useEffect, useRef, useState } from 'react';
import { PopupButton, Widget } from '@typeform/embed-react';

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

function Logo({ light }: { light?: boolean }) {
  const lead = light ? '#5FD49E' : '#15875B';
  const trail = light ? '#2A9E6E' : '#8FCFAE';
  return (
    <a
      href="#top"
      onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      className={'logo' + (light ? ' logo--light' : '')}
      aria-label="HeadStart Channels home"
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

function PayCalculator() {
  const [rpm, setRpm] = useState(8);
  const [kViews, setKViews] = useState(20);
  const [perDay, setPerDay] = useState(1);

  const perVideo = kViews * rpm;
  const monthly = perVideo * perDay * 30;
  const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
  const track = (v: number, min: number, max: number) => {
    const pct = ((v - min) / (max - min)) * 100;
    return { backgroundImage: `linear-gradient(90deg, var(--green-600) ${pct}%, var(--line) ${pct}%)` };
  };

  const fields = [
    {
      label: 'What advertisers pay per 1,000 views',
      value: `$${rpm.toFixed(2)}`,
      min: 2, max: 20, step: 0.5, current: rpm,
      onChange: setRpm,
      lo: '$2', hi: '$20',
    },
    {
      label: 'Views a video settles at',
      value: `${kViews}K`,
      min: 5, max: 60, step: 1, current: kViews,
      onChange: setKViews,
      lo: '5K', hi: '60K',
    },
    {
      label: 'Videos posted a day',
      value: String(perDay),
      min: 1, max: 3, step: 1, current: perDay,
      onChange: setPerDay,
      lo: '1', hi: '3',
    },
  ];

  return (
    <div className="calc">
      <div className="calc__row">
        <div className="calc__chip">
          <span>Views</span>
          <b>{kViews}K</b>
        </div>
        <span className="calc__op">&times;</span>
        <div className="calc__chip">
          <span>Per 1,000</span>
          <b>${rpm.toFixed(2)}</b>
        </div>
        <span className="calc__op">=</span>
        <div className="calc__chip calc__chip--out">
          <span>Per video</span>
          <b>{money(perVideo)}</b>
        </div>
      </div>

      {fields.map((f) => (
        <div className="calc__field" key={f.label}>
          <header>
            <h4>{f.label}</h4>
            <b>{f.value}</b>
          </header>
          <input
            className="calc__range"
            type="range"
            min={f.min}
            max={f.max}
            step={f.step}
            value={f.current}
            aria-label={f.label}
            style={track(f.current, f.min, f.max)}
            onChange={(e) => f.onChange(Number(e.target.value))}
          />
          <div className="calc__ends"><span>{f.lo}</span><span>{f.hi}</span></div>
        </div>
      ))}

      <div className="calc__chart" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <span className="calc__bar" key={i} style={{ height: `${((i + 1) / 30) * 100}%` }} />
        ))}
      </div>
      <div className="calc__ends calc__ends--days"><span>Day 1</span><span>Day 15</span><span>Day 30</span></div>

      <div className="calc__total">
        <span>After 30 days</span>
        <b>{money(monthly)}</b>
        <i>{perDay === 1 ? 'one video a day' : `${perDay} videos a day`}, every day, at those numbers</i>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <Reveal className="center" style={{ maxWidth: 720, margin: '0 auto' }}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

/* ---- Proof ---- */
const proofCards = [
  { name: 'Theo', result: 'Went from nothing to $43,000 in a month', src: '/theo-dashboard.jpeg' },
  { name: 'Fahad', result: 'Monetised in 29 days', src: '/fahad-29days.jpeg' },
  { name: 'Anton', result: '100K subscribers in 30 days', src: '/anton-100k.jpeg' },
  { name: 'Pluto', result: '149M views and 38.7K new subscribers in 28 days', src: '/pluto-149m.jpeg' },
];

const videoStories = [
  { id: 'JKAP6p9nnh8', name: 'Fahad', caption: 'From a few hundred views to 15 million' },
  { id: 'YOALp81wuhU', name: 'Sasha', caption: '53, new to YouTube, monetised in 17 days' },
  { id: 'q9mYCUKB5Vk', name: 'Pluto', caption: 'A job, a family, and a channel that pays' },
  { id: 'PmCeZxdI2nI', name: 'Anton', caption: '100K subscribers in 30 days' },
  { id: 'nMcltSa9_vw', name: 'Rich', caption: '$329 a day from 30-second videos' },
  { id: 'mcns8yAYJU8', name: 'Guilherme', caption: 'From flatlined uploads to $7K a month' },
];

const moreResults = [
  { name: 'Sasha', result: '1.4M views and $2,151 in 20 days', src: '/sasha-revenue.jpeg', aspect: 'landscape' },
  { name: 'Pinoxy', result: '67M views and $7,573 in 28 days', src: '/pinoxy-revenue.png', aspect: 'landscape' },
  { name: 'Theo', result: '$43,000 in a month', src: '/theo-43k.png', aspect: 'portrait' },
  { name: 'Bara', result: 'Silver play button on the wall', src: '/bara-playbutton.jpeg', aspect: 'portrait' },
];

const WIN_COUNT = 21;
const wins = Array.from({ length: WIN_COUNT }, (_, i) => `/wins/win-${i + 1}.jpg`);

function WinsCarousel() {
  const [idx, setIdx] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = (n: number) => setIdx(((n % WIN_COUNT) + WIN_COUNT) % WIN_COUNT);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 40) go(idx - 1);
    else if (dx < -40) go(idx + 1);
    touchX.current = null;
  };

  const arrowStyle = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute', top: '50%', [side]: 10, transform: 'translateY(-50%)',
    width: 44, height: 44, borderRadius: 999, border: 'none', cursor: 'pointer',
    background: 'rgba(255,255,255,.92)', color: 'var(--ink-900)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
    boxShadow: '0 4px 14px rgba(0,0,0,.25)',
  });

  return (
    <div style={{ maxWidth: 920, margin: '44px auto 0' }}>
      <div style={{ position: 'relative' }}>
        <button aria-label="Previous" onClick={() => go(idx - 1)} style={arrowStyle('left')}>
          <Icon name="chevron-left" />
        </button>
        <button aria-label="Next" onClick={() => go(idx + 1)} style={arrowStyle('right')}>
          <Icon name="chevron-right" />
        </button>
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            position: 'relative',
            height: 'clamp(380px, 58vh, 520px)',
            background: 'var(--dark-bg)',
            borderRadius: 24,
            border: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(22,34,31,.05), 0 24px 60px rgba(22,34,31,.10)',
          }}
        >
          <div
            style={{
              position: 'absolute', top: 14, left: 16, zIndex: 2,
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 12px 7px 10px', borderRadius: 999,
              background: 'rgba(17,32,27,.55)', backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path d="M16 22 L28 32 L16 42" stroke="#2A9E6E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M32 18 L48 32 L32 46" stroke="#5FD49E" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              <b style={{ color: '#fff', fontWeight: 800 }}>HeadStart</b>
              <span style={{ color: 'var(--dark-dim)', fontWeight: 500 }}> Channels</span>
            </span>
          </div>
          <img
            src={wins[idx]}
            alt={`Client result ${idx + 1}`}
            loading="lazy"
            style={{ maxWidth: '94%', maxHeight: '90%', objectFit: 'contain', borderRadius: 10 }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginTop: 22 }}>
        {wins.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to result ${i + 1}`}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 22 : 8,
              height: 8,
              borderRadius: 999,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: i === idx ? 'var(--green-600)' : 'var(--line-strong)',
              transition: 'width .2s ease, background .2s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---- Attribution: per-video source code into Typeform hidden fields ---- */
const FIRST_TOUCH_KEY = 'hs_first_touch';
const LAST_TOUCH_KEY = 'hs_last_touch';

function readParam(params: URLSearchParams, keys: string[]): string {
  for (const k of keys) {
    const v = params.get(k);
    if (v) return v;
  }
  return '';
}

function getAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const hash = window.location.hash;
  const hashQ = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';
  const searchQ = window.location.search.startsWith('?') ? window.location.search.slice(1) : '';
  const params = new URLSearchParams([searchQ, hashQ].filter(Boolean).join('&'));

  const source = readParam(params, ['source', 'src', 'v', 'utm_content']);
  const touch: Record<string, string> = {
    source,
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    referrer: document.referrer || '',
    landing_page: window.location.href,
    ts: new Date().toISOString(),
  };

  let firstSource = source;
  try {
    if (source) {
      if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
        localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
      } else {
        firstSource = JSON.parse(localStorage.getItem(FIRST_TOUCH_KEY) || '{}').source || source;
      }
      localStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(touch));
    } else {
      const last = JSON.parse(localStorage.getItem(LAST_TOUCH_KEY) || '{}');
      const first = JSON.parse(localStorage.getItem(FIRST_TOUCH_KEY) || '{}');
      Object.assign(touch, { ...last, referrer: touch.referrer, landing_page: touch.landing_page });
      firstSource = first.source || last.source || '';
    }
  } catch {
    // private browsing
  }

  const hidden: Record<string, string> = {
    source: touch.source || '',
    first_source: firstSource || touch.source || '',
    utm_source: touch.utm_source || '',
    utm_medium: touch.utm_medium || '',
    utm_campaign: touch.utm_campaign || '',
    referrer: touch.referrer || '',
    landing_page: touch.landing_page || '',
  };
  Object.keys(hidden).forEach((k) => { if (!hidden[k]) delete hidden[k]; });
  return hidden;
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [attribution] = useState(getAttribution);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    const loader = (id: string) => `
      (function (v, i, d, a, l, y, t, c, s) {
        y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl+'Script'],vlf=v[c][vl+'Loaded'],ve='Embed';
        if(!vsl){vsl=function(u,cb){if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}i.getElementsByTagName("head")[0].appendChild(s);};}
        vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
      })(window, document, 'Vidalytics', 'vidalytics_embed_' + '${id}', 'https://fast.vidalytics.com/embeds/tlH3XS0p/${id}/');
    `;
    script.textContent = loader('fRpXzWP4uXGjFmhc');
    document.head.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={'nav' + (scrolled ? ' nav--scrolled' : '')}>
        <div className="container nav__inner">
          <Logo />
          <div className="nav__cta">
            <div className="nav__links">
              <a href="#how" onClick={(e) => { e.preventDefault(); scrollTo('how'); }}>How it works</a>
              <a href="#results" onClick={(e) => { e.preventDefault(); scrollTo('results'); }}>Results</a>
              <a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }}>FAQ</a>
            </div>
            <PopupButton id={TYPEFORM_ID} hidden={attribution} className="btn btn--primary">
              Apply
            </PopupButton>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero__glow" />
        <div className="container hero__inner">
          <Reveal>
            <span className="pill-tag">For people who want a second income without a second job</span>
          </Reveal>
          <Reveal delay={60}>
            <h1>We'll build you a profitable YouTube channel, <em>completely done for you</em></h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="hero__sub">
              You own the channel. A team makes the videos. Your part is twenty to thirty minutes a day.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <span className="steptag"><Icon name="play" /> Step 1: Watch the video below</span>
          </Reveal>
          <Reveal delay={180} className="hero__media" style={{ maxWidth: 760 }}>
            <div className="frame">
              <div
                id="vidalytics_embed_fRpXzWP4uXGjFmhc"
                style={{ width: '100%', position: 'relative', paddingTop: '56.25%' }}
              />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="hero__after">
              We give you a trusted YouTube channel to build on, choose the niche with you, write the
              video ideas and the reasons they work, hand you the AI prompts that generate your
              thumbnails, and put a production team behind it, so you're not spending six months working
              it out on your own.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <span className="steptag"><Icon name="file-text" /> Step 2: Apply to work with us</span>
          </Reveal>
          <Reveal delay={240} className="tf-inline">
            <Widget id={TYPEFORM_ID} hidden={attribution} opacity={0} inlineOnMobile />
          </Reveal>
          <Reveal delay={260}>
            <p className="hero__micro" style={{ margin: '18px auto 0', justifyContent: 'center', textAlign: 'center', maxWidth: '46ch' }}>
              We read every application. If you'd rather learn every part of this and run the whole
              thing yourself, this won't be a fit.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="trust">
              <span className="trust__item"><Icon name="key-round" /> The channel is in your name</span>
              <span className="trust__item"><Icon name="users" /> A team is installed on it</span>
              <span className="trust__item"><Icon name="clock" /> Twenty to thirty minutes a day</span>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="section" id="recognize">
        <div className="container">
          <SectionHead
            eyebrow="Where most people are when they apply"
            title="You've worked out that the job isn't the whole plan"
            lead="Almost everyone who applies is somewhere in here."
          />
          <div className="scenes">
            {[
              {
                ic: 'clock',
                h: 'Earning more still means working more hours',
                p: "There are only so many hours, and you're already using most of them. The schools, the neighborhood, the trips you'd like to take, all of it still rests on you turning up for the same paycheck. That's a lot of weight for one income to carry, and picking up more hours isn't a way out of it.",
              },
              {
                ic: 'book-open',
                h: 'You could learn all of this yourself',
                p: "Niche research, scripts, packaging, thumbnails, finding editors, judging whether their work is any good. Every one of those is learnable. Learning all of them takes months of evenings, and at the end of it the channel still doesn't exist. You're not short on willingness. You're short on evenings.",
              },
              {
                ic: 'target',
                h: 'The expensive mistake is the niche',
                p: "Pick the wrong one and you find out slowly, after you've paid for a stack of videos, because a channel that isn't working looks exactly like a channel that hasn't had enough time yet. Telling real demand apart from one lucky channel is the part that costs money, and it's the part nobody can do from a trending list.",
              },
            ].map((s, i) => (
              <Reveal className="scene" key={s.h} delay={i * 80}>
                <div className="scene__ic"><Icon name={s.ic} /></div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" id="how">
        <div className="container">
          <SectionHead
            eyebrow="How the install works"
            title="We point the channel in the right direction and staff it. You run it."
            lead="The whole idea is that you don't spend six months finding out the niche was wrong, the ideas don't land, or that you've built something you don't have time to run."
          />
          <div className="steps">
            {[
              {
                n: '01',
                ic: 'compass',
                h: 'We pick the niche with you',
                p: "We know which lanes actually hold up and which ones look great for a month and then die. You'll end up somewhere you're happy to put your name on, rather than a topic you found on a trending list.",
              },
              {
                n: '02',
                ic: 'users',
                h: 'We install the team',
                p: "Production is in place before you start, so the channel has actual people making videos. You're not handed a hiring plan to staff in the evenings, and you're not briefing anyone yourself.",
              },
              {
                n: '03',
                ic: 'send',
                h: 'You approve and post',
                p: "You get the video ideas and why each one works, so you can approve them the way an owner would. Then it's thumbnails and posting, which is where your twenty or thirty minutes goes.",
              },
            ].map((s, i) => (
              <Reveal className="step" key={s.n} delay={i * 90}>
                <span className="step__num">{s.n}</span>
                <div className="step__ic"><Icon name={s.ic} /></div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pay">
        <div className="container">
          <SectionHead
            eyebrow="The arithmetic"
            title="How YouTube actually pays you"
            lead="You get paid for every thousand views, and the rate depends on who is watching and what they're worth to advertisers. Move the sliders and you'll see why the niche decides more than the effort does."
          />
          <Reveal>
            <PayCalculator />
          </Reveal>
          <Reveal className="center" style={{ marginTop: 22 }}>
            <p style={{ fontSize: 15, color: 'var(--fg-subtle)', margin: '0 auto', maxWidth: '58ch', lineHeight: 1.6 }}>
              This is the arithmetic, not a projection and not a promise. Real channels ramp up, dip, and
              depend on plenty of things nobody controls. It's here so the numbers on this page make sense
              rather than sounding made up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--sand" id="niche">
        <div className="container">
          <SectionHead
            eyebrow="Before a single video is made"
            title="What choosing a niche actually involves"
            lead="This is what decides whether the money you put into videos comes back, so here's the work rather than a promise about it."
          />
          <Reveal className="checks">
            {[
              { ic: 'calendar-clock', h: 'How old the opportunity is', p: 'Whether it is forming, mature, or already picked over.' },
              { ic: 'users-round', h: 'Whether the demand is real', p: 'Several channels doing well, not one that got lucky once.' },
              { ic: 'bar-chart-3', h: 'Absolute views, not percentages', p: 'Small channels pulling big numbers means the algorithm is buying.' },
              { ic: 'wallet', h: 'What a video costs to make', p: 'And whether that number fits a budget you can keep funding.' },
              { ic: 'film', h: 'Where the footage comes from', p: 'When source material is hard to get, that is a moat rather than a problem.' },
              { ic: 'user-round', h: 'Who watches, and what they are worth', p: 'An older audience pays several times more per thousand views.' },
              { ic: 'type', h: 'The title patterns that repeat', p: 'So the video ideas are read off the market instead of guessed at.' },
              { ic: 'flask-conical', h: 'How many uploads a fair test takes', p: 'So nobody panics and changes everything after video four.' },
            ].map((c, i) => (
              <Reveal className="check" key={c.h} delay={(i % 2) * 60}>
                <span className="check__ic"><Icon name={c.ic} /></span>
                <span><strong>{c.h}</strong><span>{c.p}</span></span>
              </Reveal>
            ))}
          </Reveal>
          <Reveal className="center" style={{ marginTop: 36 }}>
            <p style={{ fontSize: 17, color: 'var(--ink-700)', margin: '0 auto', maxWidth: '54ch', lineHeight: 1.6 }}>
              None of that is clever. It's just the difference between knowing and hoping, and it's a
              couple of weeks' work for someone who has done it before. On your own, after work, it's the six
              months most people never get back.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="inside">
        <div className="container">
          <SectionHead
            eyebrow="What's in the install"
            title="Everything that has to be in place before a channel works"
            lead="This is the part people usually get wrong on their own, and it's why they end up with a channel they can't keep up with."
          />
          <Reveal className="offer">
            {[
              { ic: 'tv', h: 'A trusted channel to build on', p: "No uploads on it, nothing to inherit. An aged account in good standing, so your videos can get impressions instead of being held back by the account itself. Your Google, your login." },
              { ic: 'compass', h: 'The niche, chosen with you', p: "Somewhere with real demand behind it rather than one channel that got lucky, and somewhere you're happy to put your name on." },
              { ic: 'lightbulb', h: 'Your video ideas, and why they work', p: "The first stretch of what to post, with the thinking behind each one so you can approve them properly." },
              { ic: 'image', h: 'AI prompt templates for thumbnails', p: "You paste, generate, and pick the one you like. It's the reason thumbnails take minutes instead of an evening." },
              { ic: 'users', h: 'The production team, in place', p: "We find the editors, check their work and put them on your channel. You're not interviewing freelancers in the evenings and hoping the first one is any good." },
              { ic: 'wallet', h: 'A production budget that fits', p: "The niche gets chosen around what you can comfortably spend per video, instead of a lane that only works at $300 a video." },
              { ic: 'line-chart', h: 'Someone to read the numbers with you', p: "Early uploads are ambiguous and the usual mistake is changing everything after four videos. You'll know whether it's the idea, the packaging, or simply not enough data yet." },
              { ic: 'graduation-cap', h: 'You learn how it works as we build it', p: "There's nothing to grind through, but you'll pick up why each call was made while it happens. That's what you'd need if you ever want a second channel, or to set one up for somebody in your family." },
            ].map((r) => (
              <div className="offer__row" key={r.h}>
                <span className="offer__ic"><Icon name={r.ic} /></span>
                <span className="offer__txt"><strong>{r.h}</strong><span>{r.p}</span></span>
              </div>
            ))}
          </Reveal>
          <Reveal className="center" style={{ marginTop: 30 }}>
            <PopupButton id={TYPEFORM_ID} hidden={attribution} className="btn btn--primary btn--lg">
              Apply for a Channel Install <Icon name="arrow-right" />
            </PopupButton>
            <p style={{ marginTop: 14, fontSize: 15, color: 'var(--fg-muted)', textAlign: 'center', maxWidth: '46ch', margin: '14px auto 0' }}>
              We'll cover fit and what it costs in the application, before anyone gets on a call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--sand" id="results">
        <div className="container">
          <SectionHead
            eyebrow="What this looks like when it's working"
            title="Noah kept his job the entire time"
            lead="He works in IT in the States. Seven weeks or so after his channel was installed, this is what the last 28 days looked like."
          />
          <Reveal className="case">
            <div className="case__meta">
              <span className="case__who">Noah · United States · works in IT</span>
              <span className="case__keep">Still in the 9 to 5</span>
            </div>
            <div className="frame" style={{ borderRadius: 16, margin: '0 0 22px' }}>
              <YtClip id="0lMNtHqY3fU" title="Noah on his channel" />
            </div>
            <p>
              $6,727.73 and 698.6K views in his last 28 days, on about fifteen to twenty minutes a day.
              He posts and does the thumbnails, the team makes the videos, and the channel belongs to him.
              That's the whole point of the install, and it's a very different thing from a hundred
              thousand subscribers in a month or somebody getting lucky once.
            </p>
          </Reveal>

          <Reveal className="center" style={{ marginTop: 64 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--ink-900)', margin: '0 auto 10px', maxWidth: '30ch' }}>
              And here are other channels we've been behind
            </h3>
            <p style={{ fontSize: 16, color: 'var(--fg-muted)', margin: '0 auto', maxWidth: '52ch', lineHeight: 1.6 }}>
              Different niches, different people, same approach. Have a look through them.
            </p>
          </Reveal>

          <div className="proof-grid">
            {proofCards.map((t, i) => (
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

          <Reveal className="proof-card" style={{ maxWidth: 380, margin: '32px auto 0' }}>
            <div style={{ borderBottom: '1px solid var(--line)' }}>
              <video
                src="/mike-stats.mp4"
                poster="/mike-revenue.png"
                controls
                playsInline
                preload="metadata"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="proof-card__body">
              <span className="proof-card__label"><Icon name="badge-check" /> Client result</span>
              <h4>Mike, in the UK</h4>
              <p>85.5M views and $16,427 in 28 days</p>
            </div>
          </Reveal>

          <Reveal className="proof-card" style={{ maxWidth: 560, margin: '24px auto 0' }}>
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

          <div className="yt-grid">
            {videoStories.map((v, i) => (
              <Reveal className="proof-card" key={v.id} delay={(i % 2) * 60}>
                <YtClip id={v.id} title={`${v.name} on his channel`} />
                <div className="proof-card__body">
                  <span className="proof-card__label"><Icon name="badge-check" /> Client result</span>
                  <h4>{v.name}</h4>
                  <p>{v.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, marginTop: 32, maxWidth: 960, marginLeft: 'auto', marginRight: 'auto' }}>
            {moreResults.filter(r => r.aspect === 'landscape').map((item, i) => (
              <Reveal key={item.src} delay={i * 60} className="proof-card">
                <div style={{ borderBottom: '1px solid var(--line)' }}>
                  <img src={item.src} alt={`${item.name} results`} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                </div>
                <div className="proof-card__body">
                  <span className="proof-card__label"><Icon name="badge-check" /> Client result</span>
                  <h4>{item.name}</h4>
                  <p>{item.result}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, marginTop: 22, maxWidth: 960, marginLeft: 'auto', marginRight: 'auto' }}>
            {moreResults.filter(r => r.aspect === 'portrait').map((item, i) => (
              <Reveal key={item.src} delay={i * 60} className="proof-card">
                <div style={{ borderBottom: '1px solid var(--line)' }}>
                  <img src={item.src} alt={`${item.name} results`} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                </div>
                <div className="proof-card__body">
                  <span className="proof-card__label"><Icon name="badge-check" /> Client result</span>
                  <h4>{item.name}</h4>
                  <p>{item.result}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="disclaimer">
            <Icon name="info" />
            <span>
              These are real client results and they're examples, not averages, and not a promise of
              income. What any channel earns comes down to the niche, the work that goes in, and plenty
              of things nobody controls.
            </span>
          </Reveal>
        </div>
      </section>

      <section className="section" id="wins">
        <div className="container">
          <SectionHead title="Flip through more of them" />
          <WinsCarousel />
        </div>
      </section>

      <section className="section section--sand" id="fit">
        <div className="container">
          <SectionHead
            eyebrow="Who we take"
            title="This suits some people and really doesn't suit others"
            lead="We'd rather say so here than waste an hour of your evening on a call."
          />
          <div className="fit">
            <Reveal className="fit__card fit__yes">
              <p className="fit__tag">You're in the right place if</p>
              <ul>
                <li><Icon name="check" /> You want an asset you own, and you want it built properly the first time</li>
                <li><Icon name="check" /> You'd rather buy experience than spend six months learning every job</li>
                <li><Icon name="check" /> Twenty to thirty minutes a day is realistic, including the tired days</li>
                <li><Icon name="check" /> You can fund the install, whether that's in one payment or across a few</li>
                <li><Icon name="check" /> You've never posted, or you've got a channel that stalled. Both work.</li>
              </ul>
            </Reveal>
            <Reveal className="fit__card fit__no" delay={80}>
              <p className="fit__tag">Give this a miss if</p>
              <ul>
                <li><Icon name="x" /> You want to learn every part of this and run the whole thing yourself</li>
                <li><Icon name="x" /> What you're really after is a course, templates or a community</li>
                <li><Icon name="x" /> You're expecting it to run with nothing at all from you</li>
                <li><Icon name="x" /> You're after something free or nearly free to try out</li>
                <li><Icon name="x" /> You're looking for a friendly chat with nothing on the table</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <SectionHead eyebrow="Straight answers" title="The things people ask us before applying" />
          <div className="faq">
            {[
              {
                q: 'Is this a course?',
                a: "No. There are no lessons to work through and no login that quietly turns into homework. The niche is chosen, the ideas are written and a team makes the videos. You will come out understanding why the decisions were made, because that's worth having, but understanding it is not the job we're handing you.",
              },
              {
                q: 'So do I have to make the videos?',
                a: "No, the team does that. You approve the ideas, make the thumbnail using the prompts we give you, and post. That's what the twenty to thirty minutes a day is.",
              },
              {
                q: 'What if I have never posted on YouTube before?',
                a: "That's common and it's fine, because the parts that need experience are the ones we're doing. What matters more is whether you'll show up for half an hour a day once videos start arriving, because that bit stays with you.",
              },
              {
                q: "I've never run a business or earned online. Is that a problem?",
                a: "No. Plenty of people we install for have done neither, and they're not learning to be marketers here. They own a channel, they post to it, and a team makes what goes on it.",
              },
              {
                q: 'Am I buying a channel from you?',
                a: "No. There's nothing on it to buy. The channel we set you up on has no uploads and no history to inherit. It's an aged account in good standing, which matters because plenty of people post decent videos and get nowhere for reasons that sit on the account rather than in the content. We start you on a clean base and build from there.",
              },
              {
                q: 'Whose channel is it?',
                a: "Yours. It's set up in your own Google under your own login, and everything it earns is yours from the first video.",
              },
              {
                q: 'I bought a course and never used it. Why would this be different?',
                a: "Because the reason that didn't work wasn't laziness, it was that you were handed instructions and still had to do everything yourself after work. Here the niche is picked, the ideas are done, and there's a team on the channel. Your part is the small daily bit.",
              },
              {
                q: 'I hired an editor and still ended up doing everything. How is this not that?',
                a: "One freelancer isn't a system, which is why you ended up managing them. We install the whole production side so it runs without you briefing anyone. You're not anybody's manager here.",
              },
              {
                q: "I already earn from YouTube but I'm stuck. Is this for me?",
                a: "Often, yes. If growth has flattened out or you're dealing with monetization problems and you want the thing to be a real asset rather than a grind, that's a conversation worth having.",
              },
              {
                q: 'Do I need to be on camera?',
                a: "No. These are faceless channels, so you're never filming yourself or showing your face.",
              },
              {
                q: 'What happens after I apply?',
                a: "We read it, and if it looks like a fit we'll set up a strategy call about installing this for you. It's a proper conversation about your channel, not a quick screening.",
              },
              {
                q: 'What will it cost me to keep running each month?',
                a: "Videos cost money to make, so the niche gets picked around a production budget you can actually sustain, and we go through those numbers with you before anything is made. Nobody should be funding a lane that only works at $300 a video.",
              },
              {
                q: 'What does it cost?',
                a: "We go through the investment in the application, before anyone books a call. It's a real purchase rather than something you try out. If paying the whole thing at once isn't practical, there are payment options, so raise it on the call rather than counting yourself out.",
              },
            ].map((it, i) => {
              const isOpen = faqOpen === i;
              return (
                <Reveal className={'faq__item' + (isOpen ? ' faq__item--open' : '')} key={i} delay={Math.min(i, 4) * 40}>
                  <button className="faq__q" onClick={() => setFaqOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    <h4>{it.q}</h4>
                    <span className="ic"><Icon name={isOpen ? 'minus' : 'plus'} /></span>
                  </button>
                  <div className="faq__a"><p>{it.a}</p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--sand final">
        <div className="container container--narrow">
          <Reveal delay={60}>
            <h2>If you want the channel without the second job, put your application in.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>
              We'll tell you honestly whether it's a fit. Being told no is a better outcome than another
              login you never open again.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <PopupButton id={TYPEFORM_ID} hidden={attribution} className="btn btn--primary btn--lg">
              Apply for a Channel Install <Icon name="arrow-right" />
            </PopupButton>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div>
              <Logo light />
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
