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
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const check = () => {
      if (done || !el) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        done = true;
        setTimeout(() => el.classList.add('in'), delay);
        window.removeEventListener('scroll', check);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [delay]);
  return <div ref={ref} className={('reveal ' + className).trim()} style={style}>{children}</div>;
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

/* ---- Countdown hook ---- */
const COHORT_DEADLINE = new Date('2026-06-30T23:59:59Z');
const SPOTS_TOTAL = 50;
const SPOTS_LEFT = 17;

function useCountdown(target: Date) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { ended: diff === 0, d, h, m, s };
}

/* ---- Testimonial data (real students from ViewMastery) ---- */
const videoTestimonials = [
  { name: 'Theo', result: 'Went from zero to fully monetised', url: 'https://www.youtube.com/embed/yOWLd09wWDM' },
  { name: 'Fahad', result: 'Monetised in 30 days', url: 'https://www.youtube.com/embed/oxBIrQxAsVs' },
  { name: 'Anton', result: '0 to 100K subscribers in 30 days', url: 'https://www.youtube.com/embed/z83xvrZG8fE' },
  { name: 'Pluto', result: '$0 to $5,400/month in 90 days', url: 'https://www.youtube.com/embed/8vrwgWtYaP0' },
  { name: 'Sasha', result: 'Monetised in 17 days, $3K first month', url: 'https://www.youtube.com/embed/1cC40iO-xuo' },
];

const screenshotTestimonials = [
  { src: '/momo-monetized.jpg', alt: 'Momo — Monetised in 4 videos' },
  { src: '/nhan-viewhunt.jpg', alt: 'Nhan — Following the system' },
  { src: '/robin-viewhunt.jpg', alt: 'Robin — Following the system' },
  { src: '/abd-viewhunt.jpg', alt: 'Abd — Following the system' },
];

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
            <button className="btn btn--primary" onClick={() => scrollTo('pricing')}>
              Claim your channel
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
              We hand you a YouTube channel that already meets the earning requirements — plus a plain-English, 
              step-by-step plan to grow it. No filming yourself. No tech skills needed. You start at the part where it works.
            </p>
          </Reveal>
          <Reveal delay={180} className="hero__ctarow">
            <button className="btn btn--primary btn--lg" onClick={() => scrollTo('pricing')}>
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
            eyebrow="See it for yourself"
            title="A real person showing you real channels"
            lead="No slides, no hype. Just actual channels, how the head start works, and exactly what you'd be getting. Plain English, no jargon."
          />
          <Reveal className="frame" style={{ maxWidth: 880, margin: '44px auto 0' }}>
            <div className="vsl" style={{ aspectRatio: '16/9', background: 'var(--dark-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="vsl__play"><Icon name="play" /></div>
              <span className="vsl__label"><Icon name="user-round" /> Your founder, on camera — no hiding</span>
            </div>
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
              { n: '01', ic: 'gift', h: 'Get your pre-monetised channel', p: "We hand you a channel that already meets YouTube's earning requirements. It's yours — from day one, it can earn ad revenue." },
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
            title="Real people. Real channels. Nothing staged."
            lead="We don't hide behind a logo. Here are real results from ordinary people who followed the system — with their permission."
          />
          <div className="proof-grid">
            {videoTestimonials.slice(0, 4).map((t, i) => (
              <Reveal className="proof-card" key={t.name} delay={(i % 2) * 90}>
                <div style={{ aspectRatio: '16/10', borderBottom: '1px solid var(--line)' }}>
                  <iframe
                    src={t.url}
                    title={`${t.name} testimonial`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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
            <span>These are real customer results shared with permission. They are not typical and not a guarantee — your results depend on your effort and other factors.</span>
          </Reveal>
        </div>
      </section>

      {/* ──── MORE RESULTS (screenshots + remaining videos) ──── */}
      <section className="section section--sand">
        <div className="container">
          <SectionHead
            eyebrow="More wins"
            title="From people who started exactly where you are"
          />
          {/* Sasha video */}
          <Reveal className="frame" style={{ maxWidth: 680, margin: '36px auto 0' }}>
            <div style={{ aspectRatio: '16/9' }}>
              <iframe
                src={videoTestimonials[4].url}
                title={`${videoTestimonials[4].name} testimonial`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
          <p style={{ textAlign: 'center', marginTop: 12, fontSize: 15, color: 'var(--fg-muted)', fontWeight: 600 }}>
            {videoTestimonials[4].name} — {videoTestimonials[4].result}
          </p>

          {/* Screenshot testimonials */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginTop: 48, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
            {screenshotTestimonials.map((img, i) => (
              <Reveal key={img.src} delay={i * 60} style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
                <img src={img.src} alt={img.alt} loading="lazy" />
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
            lead="No upsell maze, no hidden extras. Here's the whole package — laid out plainly, so you can see exactly what your $500 gets you."
          />
          <Reveal className="offer">
            {[
              { ic: 'tv', h: 'Your pre-monetised channel', p: "Already earning-ready from day one — it's yours to keep.", v: '$1,500' },
              { ic: 'map', h: 'The day-one playbook', p: 'The exact step-by-step plan, written in plain English.', v: '$300' },
              { ic: 'list-checks', h: 'Done-for-you niche menu', p: 'A vetted list of proven money-making topics to choose from.', v: '$200' },
              { ic: 'layout-template', h: 'Title, thumbnail & script templates', p: "So you're never staring at a blank page wondering what to do.", v: '$150' },
              { ic: 'compass', h: 'Simple onboarding walkthrough', p: 'We set you up and show you the ropes, step by step.', v: '$100' },
              { ic: 'calendar-check', h: 'Your 30-day quick-start', p: 'Exactly what to do in your first month — no guessing.', v: '$100' },
            ].map((r) => (
              <div className="offer__row" key={r.h}>
                <span className="offer__ic"><Icon name={r.ic} /></span>
                <span className="offer__txt"><strong>{r.h}</strong><span>{r.p}</span></span>
                <span className="offer__val"><s>{r.v}</s></span>
              </div>
            ))}
            <div className="offer__row offer__row--bump">
              <span className="offer__ic"><Icon name="users" /></span>
              <span className="offer__txt">
                <span className="offer__bumptag">Optional upgrade</span>
                <strong>The Inner Circle community</strong>
                <span>A private group of people doing this for real — ask questions, stay accountable, get unstuck.</span>
              </span>
              <span className="offer__val">Add-on</span>
            </div>
            <div className="offer__total">
              <span className="l">Real value of the core package</span>
              <span className="r"><s>$2,350</s> $500</span>
            </div>
          </Reveal>
          <Reveal className="center" style={{ marginTop: 30 }}>
            <button className="btn btn--primary btn--lg" onClick={() => scrollTo('pricing')}>
              Claim your head-start channel <Icon name="arrow-right" />
            </button>
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
                Once you're set up, you can join <strong style={{ color: '#fff' }}>The Inner Circle</strong> — 
                a private community of ordinary people doing exactly this. Ask questions, get unstuck, and 
                stay accountable with people a few steps ahead of you.
              </p>
              <div className="community__opt"><Icon name="info" /> Completely optional — add it now or later.</div>
            </div>
            <div>
              <div className="community__faces">
                {[0, 1, 2, 3, 4].map((f) => <span className="f" key={f}><Icon name="user" /></span>)}
              </div>
              <p style={{ marginTop: 16, fontSize: 15 }}>Members helping members — every day.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── PRICING ──── */}
      <section className="section section--sand" id="pricing">
        <div className="container">
          <SectionHead
            eyebrow="Your investment"
            title="Less than the years you'd spend grinding for free"
            lead="Other programmes charge this much for information alone — with no channel. You get the channel, the plan, and the support. One simple price."
          />
          <PricingBlock onCta={() => scrollTo('pricing')} />
        </div>
      </section>

      {/* ──── FAQ ──── */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHead eyebrow="Honest answers" title="Your questions, answered plainly" />
          <div className="faq">
            {[
              { q: 'Is this a scam?', a: "Fair question — you've probably been pitched a hundred things before. Here's the honest answer: you get a real channel, a real plan, and real support. We show our own channels on camera, we use our real names, and you're protected by a 14-day money-back guarantee." },
              { q: "How is the channel already making money?", a: "The channel already meets YouTube's Partner Programme requirements — meaning it's eligible to earn from ads the moment you start posting. You're not starting from zero." },
              { q: 'Do I have to be on camera?', a: 'No. These are faceless channels. You never have to film yourself or show your face. Everything is done behind the scenes.' },
              { q: 'Do I need tech skills or experience?', a: "Not at all. This is built for total beginners — people who've never made a video before. If you can follow simple written steps, you can do this." },
              { q: 'How much time does it take each week?', a: "Most people spend a few hours a week — often fitting it around a full-time job or family. It's designed to work around your life, not the other way around." },
              { q: 'What if it doesn\'t work for me?', a: "You're covered by our 14-day money-back guarantee. If we don't deliver a working, earning channel, you get your money back. The risk sits with us, not you." },
              { q: 'What exactly do I get for $500?', a: "Your pre-monetised channel, the day-one playbook, the niche menu, title/thumbnail/script templates, a simple onboarding walkthrough, and a 30-day quick-start plan. The Inner Circle community is available as an optional add-on." },
              { q: "Why $500 and not more (or less)?", a: "Other courses charge this for information alone. You're getting a real asset — a channel that would take most people a year or more to build to this point — plus the full plan and support to grow it. It's priced fairly because we want this to be accessible to ordinary people." },
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
            <p>There's a spot in this cohort with your name on it. Ready to start ahead?</p>
          </Reveal>
          <Reveal delay={160}>
            <button className="btn btn--primary btn--lg" onClick={() => scrollTo('pricing')}>
              Claim your head-start channel <Icon name="arrow-right" />
            </button>
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
              <p className="footer__tag">Skip the grind. Start with a YouTube channel that already earns — and a simple plan to grow it.</p>
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

/* ──── PRICING BLOCK (extracted for readability) ──── */
function PricingBlock({ onCta }: { onCta: () => void }) {
  const { ended, d, h, m, s } = useCountdown(COHORT_DEADLINE);
  const pct = Math.round(((SPOTS_TOTAL - SPOTS_LEFT) / SPOTS_TOTAL) * 100);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="price-wrap">
      <Reveal className="scarcity">
        <div className="scarcity__top">
          <span className="a">Founding cohort</span>
          <span className="b"><b>{SPOTS_LEFT}</b> of {SPOTS_TOTAL} channels left</span>
        </div>
        <div className="meter"><div className="meter__fill" style={{ width: pct + '%' }} /></div>
        <div className="scarcity__note">
          <Icon name="info" />
          {ended
            ? 'This cohort has closed — the price has now risen for the next round.'
            : 'Founding price holds until this cohort closes. Then it rises — and stays risen.'}
        </div>
        {!ended && (
          <div className="countdown">
            <div className="countdown__seg"><b>{pad(d)}</b><span>days</span></div>
            <div className="countdown__seg"><b>{pad(h)}</b><span>hrs</span></div>
            <div className="countdown__seg"><b>{pad(m)}</b><span>min</span></div>
            <div className="countdown__seg"><b>{pad(s)}</b><span>sec</span></div>
          </div>
        )}
      </Reveal>

      <Reveal className="price-card" delay={80}>
        <div className="price-card__head">
          <div className="k">Founding price · one-time</div>
          <div className="n"><s>$997</s>$500</div>
          <div className="sub">No subscription. No hidden fees. The channel is yours to keep.</div>
        </div>
        <div className="price-card__body">
          <ul className="price-card__list">
            {[
              'Your pre-monetised channel — yours to keep',
              'The day-one playbook (plain English)',
              'Done-for-you niche menu',
              'Title, thumbnail & script templates',
              'Onboarding walkthrough + 30-day quick-start',
            ].map((item) => (
              <li key={item}><Icon name="check-circle-2" /> {item}</li>
            ))}
          </ul>
          <button className="btn btn--primary btn--block btn--lg" onClick={onCta}>
            Claim your head-start channel <Icon name="arrow-right" />
          </button>
        </div>
      </Reveal>

      <Reveal className="guarantee-badge" delay={120}>
        <span className="guarantee-badge__ic"><Icon name="shield-check" /></span>
        <span>
          <b>Our 14-day promise</b>
          <span>If we don't deliver a working, earning channel, you get your money back. No questions, no hassle.</span>
        </span>
      </Reveal>
    </div>
  );
}
