import { useEffect, useMemo, useRef, useState } from 'react';
import { PopupButton } from '@typeform/embed-react';
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

/**
 * Reads ?source= and utm tags so we can tell which video filled the room.
 * utm_campaign is forced to 'webinar' so webinar-sourced applications stay a
 * separate cohort from page-sourced ones, while source keeps the video tag.
 */
function useAttribution() {
  return useMemo(() => {
    const out: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const hashQ = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';
      const searchQ = window.location.search.replace(/^\?/, '');
      const params = new URLSearchParams([searchQ, hashQ].filter(Boolean).join('&'));
      for (const key of ['source', 'utm_source', 'utm_medium', 'utm_content']) {
        const v = params.get(key);
        if (v) out[key] = v;
      }
    }
    out.source = out.source || 'webinar';
    out.utm_campaign = 'webinar';
    return out;
  }, []);
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
      h: 'How a niche gets judged before anyone spends money',
      p: "How old the opportunity is, whether several channels are winning or just one got lucky, why absolute views matter more than percentages, and what a video costs to make in that lane. This is the part that decides whether the money you put into videos comes back.",
    },
    {
      ic: 'lightbulb',
      h: 'Where the video ideas come from',
      p: "The title patterns that repeat inside a niche, and how to read them instead of guessing. A production team without good ideas just makes bad videos faster.",
    },
    {
      ic: 'users',
      h: 'Who actually makes the videos, and what it costs',
      p: "Where we find editors, what a long video really costs to produce, and where AI is good enough to publish and where it gets you mass terminated. Most people either overspend here or publish slop.",
    },
    {
      ic: 'line-chart',
      h: 'What the first thirty days look like',
      p: "The flat start, why it happens, and how to tell a channel that is not working apart from a channel YouTube has not gathered enough data on yet. This is where nearly everyone quits.",
    },
    {
      ic: 'message-circle',
      h: 'Then you ask whatever you want',
      p: "Bring your niche idea, your channel, or the thing you are stuck on. People tell us this part is worth more than the rest of it, because you are watching the reasoning rather than reading a summary of it.",
    },
  ];

  return (
    <main className="wb">
      <nav className="nav">
        <div className="container nav__inner">
          <Logo />
          <div className="nav__cta">
            <RegisterButton attribution={attribution}>Register</RegisterButton>
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
            A working session rather than a pitch. We judge a niche in front of you, show where the
            video ideas come from, what the production actually costs and what the first month really
            looks like. Then you ask questions and Kevis answers them on the spot.
          </p>
        </div>
      </header>

      <section className="container container--narrow">
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
            <RegisterButton large attribution={attribution}>
              {live ? 'Get the link and join' : 'Save my place'} <Icon name="arrow-right" />
            </RegisterButton>
            <a className="wb-card__cal" href={googleCalendarUrl(session)} target="_blank" rel="noreferrer">
              <Icon name="calendar-plus" /> Add to calendar
            </a>
          </div>
          <p className="wb-card__meta">
            Set aside a couple of hours. The session itself runs about 75 minutes and the questions
            after it usually run longer than people expect. Free to attend, and registration closes
            when we start. The recording goes out for 48 hours, though the questions only happen live
            and that is the part people say was worth most.
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
            <RegisterButton large attribution={attribution}>
              Save my place <Icon name="arrow-right" />
            </RegisterButton>
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
