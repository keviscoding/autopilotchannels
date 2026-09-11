import { useEffect, useRef, useState } from 'react';
import { PopupButton } from '@typeform/embed-react';
import {
  WEBINAR,
  formatDay,
  formatTime,
  googleCalendarUrl,
  icsHref,
  localZoneLabel,
  nextSession,
} from '../webinar/schedule';

const APPLICATION_TYPEFORM_ID = 'uNrHKe9G';

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

export default function WebinarConfirmed() {
  const [session] = useState(() => nextSession());

  // A Typeform redirect can leave the page scroll-locked.
  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--paper)', padding: '32px 20px 80px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <Logo />
        </div>

        <span className="pill-tag">You're registered</span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 1.4rem + 3vw, 3rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'var(--ink-900)',
            margin: '20px 0 0',
          }}
        >
          You're in. Here's when, and one thing to do now.
        </h1>

        <div className="wb-card" style={{ marginTop: 30 }}>
          <p className="wb-card__tag">Your session</p>
          <p className="wb-card__when">
            {formatDay(session.start)}
            <span>
              {formatTime(session.start)} {localZoneLabel(session.start)}, your time
            </span>
          </p>
          <div className="wb-card__act">
            <a className="btn btn--primary btn--lg" href={googleCalendarUrl(session)} target="_blank" rel="noreferrer">
              <Icon name="calendar-plus" /> Add to Google Calendar
            </a>
            <a className="wb-card__cal" href={icsHref(session)} download="headstart-workshop.ics">
              <Icon name="download" /> Apple or Outlook
            </a>
          </div>
          <p className="wb-card__meta">
            Put it in your calendar now. The people who do are the ones who actually turn up, and this
            only works if you're in the room asking things.
          </p>
        </div>

        {WEBINAR.telegram && (
          <div className="wb-note">
            <span className="wb-note__ic"><Icon name="send" /></span>
            <div>
              <h3>Join the Telegram before you close this</h3>
              <p>
                The joining link gets posted there before we start, along with the reminder. It's also
                where the recording goes if you miss it.
              </p>
              <a className="btn btn--ghost" href={WEBINAR.telegram} target="_blank" rel="noreferrer">
                Open the Telegram <Icon name="arrow-right" />
              </a>
            </div>
          </div>
        )}

        <p style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink-900)', margin: '52px auto 8px', maxWidth: '44ch' }}>
          While you wait, watch this one.
        </p>
        <p style={{ fontSize: 16, color: 'var(--fg-muted)', margin: '0 auto 20px', maxWidth: '52ch', lineHeight: 1.55 }}>
          It's a client with a job who kept it, talking through what the first month actually involved.
          It covers most of what people ask in the first ten minutes of the session.
        </p>

        <div className="frame" style={{ maxWidth: 680, margin: '0 auto', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/mcns8yAYJU8"
              title="Client interview"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="wb-skip">
          <h3>Already know you want this done for you?</h3>
          <p>
            You don't have to wait for the session. Put an application in and we'll look at it before
            then. If it's a fit we'll set up a proper conversation about installing a channel for you.
          </p>
          <PopupButton id={APPLICATION_TYPEFORM_ID} className="btn btn--primary">
            Apply for a Channel Install <Icon name="arrow-right" />
          </PopupButton>
        </div>

        <p style={{ fontSize: 14, color: 'var(--fg-subtle)', margin: '48px auto 0', maxWidth: '56ch', lineHeight: 1.6 }}>
          We make no promise of income. Any figures mentioned are examples from real clients and are not
          typical. What a channel earns depends on the niche, the work that goes in, and factors outside
          anyone's control.
        </p>
      </div>
    </main>
  );
}
