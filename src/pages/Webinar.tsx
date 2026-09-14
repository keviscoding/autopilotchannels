import { useEffect, useMemo, useRef, useState } from 'react';
import { PopupButton } from '@typeform/embed-react';
import { captureAttribution } from '../webinar/attribution';
import {
  WEBINAR,
  formatDay,
  formatTime,
  formatWeekdayOnly,
  googleCalendarUrl,
  isLive,
  localZoneLabel,
  nextSession,
  type Session,
} from '../webinar/schedule';

const APPLICATION_TYPEFORM_ID = 'uNrHKe9G';

// WebinarJam's inline form, so registering never leaves this page. Accent set to
// our green and the background to white to match .wb-card.
const WJ_HASH = '8wgyk5by';
const WJ_EMBED_SRC =
  `https://event.webinarjam.com/register/${WJ_HASH}/embed-form` +
  '?formButtonText=Save%20my%20place' +
  '&formAccentColor=%2315875B&formAccentOpacity=1' +
  '&formBgColor=%23ffffff&formBgOpacity=1';

/**
 * WebinarJam's embed script scrapes window.location.href for keys beginning
 * with utm_ and forwards them into the registration form, which is the only way
 * our per-video tag reaches their side of the funnel and shows up against a
 * registrant. It ignores a plain ?source=, so mirror it across before the script
 * reads the URL. Keeps the link we put in video descriptions short.
 */
function mirrorSourceIntoUtm(source: string | undefined) {
  if (typeof window === 'undefined' || !source) return;
  if (window.location.href.includes('utm_content=')) return;
  const hash = window.location.hash || '#/webinar';
  const q = hash.indexOf('?');
  const path = q === -1 ? hash : hash.slice(0, q);
  const params = new URLSearchParams(q === -1 ? '' : hash.slice(q + 1));
  params.set('utm_source', 'youtube');
  params.set('utm_medium', 'video');
  params.set('utm_content', source);
  // replaceState does not fire hashchange, so the router is left alone.
  window.history.replaceState(null, '', `${window.location.pathname}${path}?${params.toString()}`);
}

/** The registration form itself, inline. Falls back to the hosted page. */
function WjEmbed({ attribution }: { attribution: Record<string, string> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el || el.dataset.wjLoaded) return;
    el.dataset.wjLoaded = '1';
    mirrorSourceIntoUtm(attribution.source);
    const s = document.createElement('script');
    s.src = WJ_EMBED_SRC;
    s.async = true;
    s.onerror = () => setFailed(true);
    el.appendChild(s);
  }, [attribution.source]);

  const qs = new URLSearchParams(attribution).toString();
  const hosted = WEBINAR.registrationUrl + (qs ? '?' + qs : '');

  return (
    <div className="wj-embed">
      <div className="wj-embed-wrapper" data-webinar-hash={WJ_HASH} ref={wrap} />
      <p className="wj-embed__fallback">
        {failed ? 'The form did not load. ' : 'Form not showing? '}
        <a href={hosted}>Register here instead</a>.
      </p>
    </div>
  );
}

const proofClips = [
  { id: 'mcns8yAYJU8', name: 'Guilherme', caption: 'From flatlined uploads to $7K a month' },
  { id: 'YOALp81wuhU', name: 'Sasha', caption: '53, new to YouTube, monetized in 17 days' },
];

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
  return (
    <a href="#/" className="logo" aria-label="HeadStart Channels home" style={{ textDecoration: 'none' }}>
      <svg className="logo__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M16 22 L28 32 L16 42" stroke="#8FCFAE" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 18 L48 32 L32 46" stroke="#15875B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo__word"><b>HeadStart</b> <span>Channels</span></span>
    </a>
  );
}

/** Reads the video tag and stashes it, so it survives the trip through WebinarJam. */
function useAttribution() {
  return useMemo(() => captureAttribution(), []);
}

/** Every secondary CTA sends people to the one form rather than a second copy of it. */
function toRegister(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/** Thumbnail until clicked, then the embed. Keeps YouTube off the page on load. */
function YtClip({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    <div className="ytclip">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="ytclip__poster" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
          <img src={src} alt="" onError={() => setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)} />
          <span className="ytclip__play" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

function Countdown({ target, now }: { target: Date; now: Date }) {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const total = Math.floor(ms / 1000);
  const parts = [
    { label: total >= 86400 ? 'days' : 'hours', value: total >= 86400 ? Math.floor(total / 86400) : Math.floor(total / 3600) },
    { label: total >= 86400 ? 'hours' : 'minutes', value: total >= 86400 ? Math.floor((total % 86400) / 3600) : Math.floor((total % 3600) / 60) },
    { label: total >= 86400 ? 'minutes' : 'seconds', value: total >= 86400 ? Math.floor((total % 3600) / 60) : total % 60 },
  ];
  return (
    <div className="wb-count">
      {parts.map((p) => (
        <div className="wb-count__cell" key={p.label}>
          <b>{String(p.value).padStart(2, '0')}</b>
          <span>{p.label}</span>
        </div>
      ))}
    </div>
  );
}

function RegisterButton({
  children,
  large,
  attribution,
}: {
  children: React.ReactNode;
  large?: boolean;
  attribution: Record<string, string>;
}) {
  const cls = 'btn btn--primary' + (large ? ' btn--lg' : '');
  if (WEBINAR.registrationUrl) {
    const qs = new URLSearchParams(attribution).toString();
    const href = WEBINAR.registrationUrl + (qs ? (WEBINAR.registrationUrl.includes('?') ? '&' : '?') + qs : '');
    return (
      <a className={cls} href={href}>
        {children}
      </a>
    );
  }
  if (WEBINAR.typeformId) {
    return (
      <PopupButton id={WEBINAR.typeformId} hidden={attribution} className={cls}>
        {children}
      </PopupButton>
    );
  }
  if (WEBINAR.telegram) {
    return (
      <a className={cls} href={WEBINAR.telegram} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <PopupButton id={APPLICATION_TYPEFORM_ID} hidden={attribution} className={cls}>
      {children}
    </PopupButton>
  );
}

export default function Webinar() {
  const now = useNow();
  const attribution = useAttribution();
  const [session, setSession] = useState<Session>(() => nextSession());
  const live = isLive(session, now);

  // Roll to next week's slot without a refresh once this one is over.
  useEffect(() => {
    if (now.getTime() > session.end.getTime()) setSession(nextSession(now));
  }, [now, session.end]);

  const agenda = [
    {
      ic: 'compass',
      h: 'The four checks a niche has to pass before it is worth a dollar',
      p: "How old the opportunity is, whether several channels are winning or just one got lucky, why absolute views matter more than percentages, and what a video costs to make in that lane. You will be able to run all four yourself on any idea by the time we finish.",
    },
    {
      ic: 'lightbulb',
      h: 'Where the video ideas come from once you run out of your own',
      p: "The title patterns that repeat inside a niche, and how to read them instead of guessing. A production team without good ideas just makes bad videos faster.",
    },
    {
      ic: 'users',
      h: 'What a video actually costs, line by line',
      p: "Where we find editors, what each part of a video costs to produce, and what a month of production realistically costs before any money comes back. Most people either overspend here or pay for videos nobody watches.",
    },
    {
      ic: 'shield-alert',
      h: 'The AI shortcut that is getting channels terminated right now',
      p: "Where AI is genuinely good enough to publish, and where using it will get your channel wiped. This is the most expensive mistake being made in this business at the moment, and it is being sold to beginners as the clever way to do it.",
    },
    {
      ic: 'line-chart',
      h: 'Why the first thirty days look like failure, and how to read them',
      p: "The flat start, why it happens, and how to tell a channel that is not working apart from a channel YouTube has not gathered enough data on yet. This is where nearly everyone quits, usually about two weeks too early.",
    },
    {
      ic: 'message-circle',
      h: 'Bring your niche and get a straight answer on it',
      p: "Put what you are considering in the chat and Kevis works through them on air, out loud, with a yes or a no and the reason behind it. Bring a channel you already have if you have one. This only happens live, and it is the part people say made the session worth turning up for.",
    },
  ];

  return (
    <main className="wb">
      <nav className="nav">
        <div className="container nav__inner">
          <Logo />
          <div className="nav__cta">
            <a className="btn btn--primary" href="#/webinar#register" onClick={toRegister}>
              Register
            </a>
          </div>
        </div>
      </nav>

      <header className="wb-hero">
        <div className="container container--narrow">
          <span className="pill-tag">
            Free live workshop, {formatWeekdayOnly(session.start)} {formatTime(session.start)}
          </span>
          <h1>
            How a faceless YouTube channel <em>actually gets built</em>
          </h1>
          <p className="wb-hero__sub">
            A channel you run yourself is a second job. A channel a team runs is an asset. This is the
            session where we show you how the second one gets built: how a niche gets judged, where the
            ideas come from, who makes the videos and what it costs. Then you ask questions and Kevis
            answers them on the spot.
          </p>
        </div>
      </header>

      <section className="container container--narrow" id="register">
        <div className="wb-card">
          <p className="wb-card__tag">
            {live ? 'Happening right now' : 'This session'}
          </p>
          <p className="wb-card__when">
            {formatDay(session.start)}
            <span>
              {formatTime(session.start)} {localZoneLabel(session.start)}, your time
            </span>
          </p>
          {!live && <Countdown target={session.start} now={now} />}
          <div className="wb-card__act">
            {live ? (
              <RegisterButton large attribution={attribution}>
                Get the link and join <Icon name="arrow-right" />
              </RegisterButton>
            ) : (
              <WjEmbed attribution={attribution} />
            )}
            <a className="wb-card__cal" href={googleCalendarUrl(session)} target="_blank" rel="noreferrer">
              <Icon name="calendar-plus" /> Add to calendar
            </a>
          </div>
          <p className="wb-card__meta">
            Set aside a couple of hours. The session itself runs about 75 minutes and the questions
            after it usually run longer than people expect. It is interactive, so come ready to type in
            the chat, because Kevis asks the room questions throughout and works from the answers. Free
            to attend, and registration closes when we start. The recording goes out for 48 hours,
            though the questions only happen live and that is the part people say was worth most.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <h2 className="section-title">The people who have already done it</h2>
          <div className="yt-grid">
            {proofClips.map((v) => (
              <div className="proof-card" key={v.id}>
                <YtClip id={v.id} title={`${v.name} on his channel`} />
                <div className="proof-card__body">
                  <span className="proof-card__label"><Icon name="badge-check" /> Client result</span>
                  <h4>{v.name}</h4>
                  <p>{v.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="wb-note" style={{ marginTop: 18 }}>
            These are individual client results and they are not typical. Most channels take longer
            and earn less. What any channel does depends on the niche, the money put into videos and
            things nobody controls, and plenty of people who start never get there at all.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <h2 className="section-title">What we go through</h2>
          <div className="wb-agenda">
            {agenda.map((a, i) => (
              <div className="wb-item" key={a.h}>
                <span className="wb-item__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="wb-item__ic"><Icon name={a.ic} /></span>
                <div>
                  <h3>{a.h}</h3>
                  <p>{a.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <h2 className="section-title">What you leave with, whether or not you ever buy anything</h2>
          <div className="checks checks--pair">
            {[
              {
                ic: 'list-checks',
                h: 'The four-check niche filter, written down',
                p: 'So you can run it yourself on any idea you have, that night, without us.',
              },
              {
                ic: 'wallet',
                h: 'Real production numbers',
                p: 'Per video and per month, so you can work out whether this fits what you can actually spend.',
              },
              {
                ic: 'message-square-reply',
                h: 'A straight answer on your own niche',
                p: 'If you bring one to the chat, you get a yes or a no and the reasoning behind it.',
              },
            ].map((c) => (
              <div className="check" key={c.h}>
                <span className="check__ic"><Icon name={c.ic} /></span>
                <div>
                  <strong>{c.h}</strong>
                  <span>{c.p}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="wb-note" style={{ marginTop: 22 }}>
            At the end Kevis explains how we build these for people who would rather have it done than
            do it, because that is our business and pretending otherwise would be silly. It comes after
            the teaching, not instead of it, and you are free to leave before it.
          </p>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container container--narrow">
          <div className="wb-fit">
            <div>
              <p className="fit__tag">Come along if</p>
              <ul>
                <li><Icon name="check" /> You want a channel you own that pays, without it becoming a second job</li>
                <li><Icon name="check" /> You would rather see the reasoning than be told to trust the process</li>
                <li><Icon name="check" /> You are weighing up doing this yourself against getting it installed</li>
              </ul>
            </div>
            <div>
              <p className="fit__tag">Give it a miss if</p>
              <ul>
                <li><Icon name="x" /> You want a list of tools and no explanation of why they matter</li>
                <li><Icon name="x" /> You are looking for a way to get paid this week</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow wb-host">
          <h2 className="section-title">Who is running it</h2>
          <p>
            Kevis. He has built faceless channels from scratch, runs a number of them now, and has
            coached roughly a hundred people through the same thing, which means he has watched every
            way it goes wrong as well as the ways it goes right. The reason the sessions are live is
            that the useful answers come out of real questions about real channels, not from a script.
          </p>
          <div className="wb-host__act">
            <a className="btn btn--primary btn--lg" href="#/webinar#register" onClick={toRegister}>
              Save my place <Icon name="arrow-right" />
            </a>
            <p>
              Want the results first? <a href="#/">See what clients have done</a>.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer__legal" style={{ borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
            <p>
              We make no promise of income. Any figures mentioned are examples from real clients and
              are not typical. What a channel earns depends on the niche, the work that goes in, and
              factors outside anyone's control. Nothing in the session is financial advice.
              &copy; 2026 HeadStart Channels.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
