import { useEffect, useRef, useState } from 'react';

/* ---- Lucide icon helper ---- */
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

/* ---- Logo ---- */
function Logo({ light }: { light?: boolean }) {
  const lead = light ? '#5FD49E' : '#15875B';
  const trail = light ? '#2A9E6E' : '#8FCFAE';
  return (
    <a href="#top" className={'logo' + (light ? ' logo--light' : '')} aria-label="HeadStart Channels home">
      <svg className="logo__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M16 22 L28 32 L16 42" stroke={trail} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 18 L48 32 L32 46" stroke={lead} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo__word"><b>HeadStart</b> <span>Channels</span></span>
    </a>
  );
}

/* ---- Scroll reveal ---- */
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

/* ---- Section heading ---- */
function SectionHead({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <Reveal className="center" style={{ maxWidth: 720, margin: '0 auto' }}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

const SPOTS_TOTAL = 50;
const SPOTS_LEFT = 17;

/* ---- Testimonial data ---- */
const proofCards = [
  { name: 'Theo', result: 'Zero to monetised, now $43K/month', src: '/theo-dashboard.jpeg', aspect: 'landscape' },
  { name: 'Fahad', result: 'Monetised in 29 days', src: '/fahad-29days.jpeg', aspect: 'landscape' },
  { name: 'Anton', result: '100K subscribers in 30 days', src: '/anton-100k.jpeg', aspect: 'landscape' },
  { name: 'Pluto', result: '149M views, +38.7K subs in 28 days', src: '/pluto-149m.jpeg', aspect: 'landscape' },
];

const moreResults = [
  { name: 'Sasha', result: '1.4M views, $2,151 in 20 days', src: '/sasha-revenue.jpeg', aspect: 'landscape' },
  { name: 'Pinoxy', result: '67M views, $7,573 in 28 days', src: '/pinoxy-revenue.png', aspect: 'landscape' },
  { name: 'Theo', result: 'From zero to $43,000/month', src: '/theo-43k.png', aspect: 'portrait' },
  { name: 'Bara', result: 'Got the Silver Play Button', src: '/bara-playbutton.jpeg', aspect: 'portrait' },
];

const CALENDLY_URL = 'https://calendly.com/d/cxsk-96h-3d5/headstart-content-strategy-call';

/* ==================================================================
   PAGE
   ================================================================== */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = `
      (function (v, i, d, a, l, y, t, c, s) {
        y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl+'Script'],vlf=v[c][vl+'Loaded'],ve='Embed';
        if(!vsl){vsl=function(u,cb){if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}i.getElementsByTagName("head")[0].appendChild(s);};}
        vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
      })(window, document, 'Vidalytics', 'vidalytics_embed_Tjy4NmnGY26ZsvRR', 'https://fast.vidalytics.com/embeds/tlH3XS0p/Tjy4NmnGY26ZsvRR/');
    `;
    document.head.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
      {/* ──── NAV ──── */}
      <nav className={'nav' + (scrolled ? ' nav--scrolled' : '')}>
        <div className="container nav__inner">
          <Logo />
          <div className="nav__cta">
            <div className="nav__links">
              <a href="#how">How it works</a>
              <a href="#results">Results</a>
              <a href="#faq">FAQ</a>
            </div>
            <button className="btn btn--primary" onClick={() => scrollTo('inside')}>
              Apply now
            </button>
          </div>
        </div>
      </nav>

      {/* ──── HERO ──── */}
      <header className="hero" id="top">
        <div className="hero__glow" />
        <div className="container hero__inner">
          <Reveal>
            <span className="pill-tag"><Icon name="sparkles" /> A calmer way to start on YouTube</span>
          </Reveal>
          <Reveal delay={60}>
            <h1>Skip the two-year grind. Start with a channel that <em>already earns</em>.</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="hero__sub">
              We hand you a YouTube channel that already meets the earning requirements - plus a plain-English, 
              step-by-step plan to grow it. No filming yourself. No tech skills needed. You start at the part where it works.
            </p>
          </Reveal>
          <Reveal delay={180} className="hero__ctarow">
            <button className="btn btn--primary btn--lg" onClick={() => scrollTo('inside')}>
              Claim your head-start channel <Icon name="arrow-right" />
            </button>
            <button className="btn btn--ghost" onClick={() => scrollTo('vsl')}>
              <Icon name="play-circle" /> Watch how it works
            </button>
          </Reveal>
          <Reveal delay={220}>
            <div className="trust">
              <span className="trust__item"><Icon name="shield-check" /> 14-day money-back guarantee</span>
              <span className="trust__item"><Icon name="video-off" /> No filming yourself</span>
              <span className="trust__item"><Icon name="user-round-check" /> Built for total beginners</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ──── VSL ──── */}
      <section className="section section--sand section--tight" id="vsl">
        <div className="container">
          <SectionHead
            eyebrow="Watch this first"
            title="I'll show you exactly how it works"
            lead="One video. A real monetised channel, the strategy behind it, and what your first month could look like if you start off the right way."
          />
          <Reveal className="frame" style={{ maxWidth: 880, margin: '44px auto 0' }}>
            <div
              id="vidalytics_embed_Tjy4NmnGY26ZsvRR"
              style={{ width: '100%', position: 'relative', paddingTop: '66.67%' }}
            />
          </Reveal>
        </div>
      </section>

      {/* ──── HOW IT WORKS ──── */}
      <section className="section" id="how">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="Three simple steps. No tech degree required."
            lead="If you can follow a recipe, you can do this. Here's the whole thing, start to finish."
          />
          <div className="steps">
            {[
              { n: '01', ic: 'gift', h: 'Get your pre-monetised channel', p: "We hand you a channel that already meets YouTube's earning requirements. It's yours - from day one, it can earn ad revenue." },
              { n: '02', ic: 'map', h: 'Follow the day-one playbook', p: "We tell you exactly what to upload, step by step. Pick a topic you actually like from our list of proven niches that make money." },
              { n: '03', ic: 'trending-up', h: 'Post, grow, and get support', p: "Keep it simple, stay consistent, and ask for help whenever you're stuck. You're never doing this alone." },
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

      {/* ──── EMPATHY / BEFORE-AFTER ──── */}
      <section className="section section--sand">
        <div className="container">
          <SectionHead
            eyebrow="Why this is different"
            title="We remove the whole first chapter"
            lead="You've heard the truth about YouTube: it takes a year or two of posting into the void before you earn anything. Most people quit long before that point. You start after it."
          />
          <div className="ba">
            <Reveal className="ba__card ba__before">
              <p className="ba__tag">The usual way</p>
              <h3 className="ba__head">Year one: posting into the void</h3>
              <ul>
                <li><Icon name="x" /> 1–2 years before you earn a penny</li>
                <li><Icon name="x" /> Guessing what to make, completely alone</li>
                <li><Icon name="x" /> Most people quit before it ever works</li>
                <li><Icon name="x" /> Learning confusing tech as you go</li>
              </ul>
            </Reveal>
            <div className="ba__arrow"><Icon name="arrow-right" /></div>
            <Reveal className="ba__card ba__after" delay={120}>
              <p className="ba__tag">The head start</p>
              <h3 className="ba__head">Day one: it already earns</h3>
              <ul>
                <li><Icon name="check" /> A channel that already makes money</li>
                <li><Icon name="check" /> A clear plan for exactly what to post</li>
                <li><Icon name="check" /> Proven niches, picked and tested for you</li>
                <li><Icon name="check" /> Real support whenever you get stuck</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──── PROOF / RESULTS ──── */}
      <section className="section" id="results">
        <div className="container">
          <SectionHead
            eyebrow="Real results"
            title="What our students are doing right now"
            lead="Same system, different niches. Here's what happens when beginners follow the plan."
          />
          <div className="proof-grid">
            {proofCards.map((t, i) => (
              <Reveal className="proof-card" key={t.name + i} delay={(i % 2) * 90}>
                <div style={{ borderBottom: '1px solid var(--line)' }}>
                  <img src={t.src} alt={`${t.name} results`} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                </div>
                <div className="proof-card__body">
                  <span className="proof-card__label"><Icon name="badge-check" /> Customer result</span>
                  <h4>{t.name}</h4>
                  <p>{t.result}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="disclaimer">
            <Icon name="info" />
            <span>These are real customer results shared with permission. They are not typical and not a guarantee. Your results depend on your effort and other factors.</span>
          </Reveal>
        </div>
      </section>

      {/* ──── MORE RESULTS ──── */}
      <section className="section section--sand">
        <div className="container">
          <SectionHead
            eyebrow="More wins"
            title="From people who started exactly where you are"
          />
          {/* Mike - playable video */}
          <Reveal className="proof-card" style={{ maxWidth: 380, margin: '48px auto 0' }}>
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
              <span className="proof-card__label"><Icon name="badge-check" /> Customer result</span>
              <h4>Mike (UK)</h4>
              <p>85.5M views, $16,427 revenue in 28 days</p>
            </div>
          </Reveal>

          {/* Landscape results */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, marginTop: 32, maxWidth: 960, marginLeft: 'auto', marginRight: 'auto' }}>
            {moreResults.filter(r => r.aspect === 'landscape').map((item, i) => (
              <Reveal key={item.src} delay={i * 60} className="proof-card">
                <div style={{ borderBottom: '1px solid var(--line)' }}>
                  <img src={item.src} alt={`${item.name} results`} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                </div>
                <div className="proof-card__body">
                  <span className="proof-card__label"><Icon name="badge-check" /> Customer result</span>
                  <h4>{item.name}</h4>
                  <p>{item.result}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Portrait results */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, marginTop: 22, maxWidth: 960, marginLeft: 'auto', marginRight: 'auto' }}>
            {moreResults.filter(r => r.aspect === 'portrait').map((item, i) => (
              <Reveal key={item.src} delay={i * 60} className="proof-card">
                <div style={{ borderBottom: '1px solid var(--line)' }}>
                  <img src={item.src} alt={`${item.name} results`} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                </div>
                <div className="proof-card__body">
                  <span className="proof-card__label"><Icon name="badge-check" /> Customer result</span>
                  <h4>{item.name}</h4>
                  <p>{item.result}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──── OFFER STACK ──── */}
      <section className="section" id="inside">
        <div className="container">
          <SectionHead
            eyebrow="What's inside"
            title="Everything you need to start ahead"
            lead="No upsell maze, no hidden extras. Here's what you get when you're accepted."
          />
          <Reveal className="offer">
            {[
              { ic: 'tv', h: 'Your pre-monetised channel', p: "Already earning-ready from day one - it's yours to keep." },
              { ic: 'map', h: 'The day-one playbook', p: 'The exact step-by-step plan, written in plain English.' },
              { ic: 'list-checks', h: 'Done-for-you niche menu', p: 'A vetted list of proven money-making topics to choose from.' },
              { ic: 'layout-template', h: 'Title, thumbnail & script templates', p: "So you're never staring at a blank page wondering what to do." },
              { ic: 'compass', h: 'Simple onboarding walkthrough', p: 'We set you up and show you the ropes, step by step.' },
              { ic: 'calendar-check', h: 'Your 30-day quick-start', p: 'Exactly what to do in your first month - no guessing.' },
            ].map((r) => (
              <div className="offer__row" key={r.h}>
                <span className="offer__ic"><Icon name={r.ic} /></span>
                <span className="offer__txt"><strong>{r.h}</strong><span>{r.p}</span></span>
              </div>
            ))}
            <div className="offer__row offer__row--bump">
              <span className="offer__ic"><Icon name="users" /></span>
              <span className="offer__txt">
                <span className="offer__bumptag">Optional upgrade</span>
                <strong>The Inner Circle community</strong>
                <span>A private group of people doing this for real - ask questions, stay accountable, get unstuck.</span>
              </span>
              <span className="offer__val">Add-on</span>
            </div>
            <div className="offer__total">
              <span className="l">Limited channels available</span>
              <span className="r">Apply below</span>
            </div>
          </Reveal>
          <Reveal className="center" style={{ marginTop: 30 }}>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
              Apply for your channel <Icon name="arrow-right" />
            </a>
            <p style={{ marginTop: 14, fontSize: 14, color: 'var(--fg-subtle)', textAlign: 'center', maxWidth: 'none', margin: '14px auto 0' }}>
              We only have a limited number of channels. Book a call to see if you qualify.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ──── COMMUNITY ──── */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="community">
            <div>
              <span className="eyebrow">Optional next step</span>
              <h3>You're never stuck on your own</h3>
              <p>
                Once you're set up, you can join <strong style={{ color: '#fff' }}>The Inner Circle</strong> - 
                a private community of ordinary people doing exactly this. Ask questions, get unstuck, and 
                stay accountable with people a few steps ahead of you.
              </p>
              <div className="community__opt"><Icon name="info" /> Completely optional - add it now or later.</div>
            </div>
            <div>
              <div className="community__faces">
                {[
                  'https://i.pravatar.cc/104?img=12',
                  'https://i.pravatar.cc/104?img=32',
                  'https://i.pravatar.cc/104?img=25',
                  'https://i.pravatar.cc/104?img=53',
                  'https://i.pravatar.cc/104?img=68',
                ].map((src, f) => (
                  <span className="f" key={f} style={{ overflow: 'hidden' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '999px' }} />
                  </span>
                ))}
              </div>
              <p style={{ marginTop: 16, fontSize: 15 }}>Members helping members - every day.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── APPLY ──── */}
      <section className="section section--sand" id="pricing">
        <div className="container">
          <SectionHead
            eyebrow="Limited availability"
            title="We only have a finite number of channels"
            lead="Not everyone gets one. Book a call with our team to find out if you're the right fit, pick your niche, and secure your channel before they're gone."
          />
          <Reveal className="center" style={{ marginTop: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, marginBottom: 24 }}>
              <Icon name="users" />
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-900)' }}>{SPOTS_LEFT} of {SPOTS_TOTAL} channels remaining</span>
            </div>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
              Book your call <Icon name="arrow-right" />
            </a>
            <p style={{ marginTop: 16, fontSize: 15, color: 'var(--fg-muted)', maxWidth: 'none', margin: '16px auto 0' }}>
              A ~15-minute conversation to see if HeadStartChannels is right for you.
            </p>
          </Reveal>
          <Reveal className="guarantee-badge" delay={80}>
            <span className="guarantee-badge__ic"><Icon name="shield-check" /></span>
            <span>
              <b>Our 14-day promise</b>
              <span>If we don't deliver a working, earning channel, you get your money back. No questions, no hassle.</span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* ──── FAQ ──── */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHead eyebrow="Honest answers" title="Your questions, answered plainly" />
          <div className="faq">
            {[
              { q: 'Is this a scam?', a: "Fair question - you've probably been pitched a hundred things before. Here's the honest answer: you get a real channel, a real plan, and real support. We show our own channels on camera, we use our real names, and you're protected by a 14-day money-back guarantee." },
              { q: "How is the channel already making money?", a: "The channel already meets YouTube's Partner Programme requirements - meaning it's eligible to earn from ads the moment you start posting. You're not starting from zero." },
              { q: "I don't have an AdSense account. Can I still start?", a: "Yes. You don't need an existing AdSense account to begin. We walk you through getting set up to receive payouts as part of onboarding, so not having one today isn't a blocker. It's one of the things we handle with you on the way in." },
              { q: 'How does transferring the channel work?', a: "It's a standard YouTube Brand Account transfer, and it's straightforward. We invite you, you accept, and the channel moves to you. We stay on as a manager for a short handover period, then after 7 days we're removed entirely. From that point the channel is fully yours, on your account, under your control." },
              { q: "How do I know you won't keep access and take my channel later?", a: "After the handover, we are removed from the channel completely. There's no backdoor and no lingering access. You become the sole owner on your own Google account, and you can verify we've been removed yourself in your channel's permissions. Your work stays yours." },
              { q: 'Do I have to be on camera?', a: 'No. These are faceless channels. You never have to film yourself or show your face. Everything is done behind the scenes.' },
              { q: 'Do I need tech skills or experience?', a: "Not at all. This is built for total beginners - people who've never made a video before. If you can follow simple written steps, you can do this." },
              { q: 'How much time does it take each week?', a: "Most people spend a few hours a week - often fitting it around a full-time job or family. It's designed to work around your life, not the other way around." },
              { q: 'What if it doesn\'t work for me?', a: "You're covered by our 14-day money-back guarantee. If we don't deliver a working, earning channel, you get your money back. The risk sits with us, not you." },
              { q: 'What exactly do I get?', a: "Your pre-monetised channel, the day-one playbook, the niche menu, title/thumbnail/script templates, a simple onboarding walkthrough, and a 30-day quick-start plan. The Inner Circle community is available as an optional add-on. We'll walk you through everything on the call." },
              { q: 'How do I know if I qualify?', a: "Book a call with our team. We'll ask a few questions about where you're at, what you're looking for, and whether one of our available niches fits you. Not everyone's a match, and that's fine - we'd rather be honest than waste your time." },
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

      {/* ──── FINAL CTA / MISSION ──── */}
      <section className="section section--sand final">
        <div className="container container--narrow">
          <Reveal><span className="pill-tag" style={{ marginBottom: 4 }}><Icon name="flag" /> Our mission</span></Reveal>
          <Reveal delay={60}>
            <h2>We're on a mission to make <b>1,000 ordinary people</b> profitable creators.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>There's a spot in this round with your name on it. Ready to start ahead?</p>
          </Reveal>
          <Reveal delay={160}>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
              Apply for your channel <Icon name="arrow-right" />
            </a>
            <div className="trust" style={{ marginTop: 22 }}>
              <span className="trust__item"><Icon name="shield-check" /> 14-day money-back guarantee</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── FOOTER ──── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div>
              <Logo light />
              <p className="footer__tag">Skip the grind. Start with a YouTube channel that already earns - and a simple plan to grow it.</p>
            </div>
            <nav className="footer__links" aria-label="Legal">
              <a href="/terms">Terms of Service</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/earnings-disclaimer">Earnings Disclaimer</a>
              <a href="mailto:kei@headstartchannels.com">Contact</a>
            </nav>
          </div>
          <div className="footer__legal">
            <p><strong>Creativetube Ltd</strong>, registered in England & Wales.</p>
            <p>
              We make no guarantee of income. Any figures shown are examples of our own or customers'
              results and are not typical. Your results depend on your effort, consistency, and factors
              outside our control. This is not financial advice. &copy; 2026 Creativetube Ltd.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

