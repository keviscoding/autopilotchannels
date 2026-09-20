import { useEffect, useMemo, useRef } from 'react';
import { PopupButton } from '@typeform/embed-react';
import { readAttribution } from '../webinar/attribution';

const APPLICATION_TYPEFORM_ID = 'uNrHKe9G';
const F = '/toolkit/files/';

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

/** The five tools named on the closing slide, in the order you use them. */
const tools = [
  {
    n: '01',
    ic: 'list',
    h: 'Top 30 high-RPM niches for 2026',
    p: "Thirty patterns that pay, with real comparison channels against each one so you can go and look rather than take our word for it. Kevis promised twenty on the call. There are thirty in here.",
    files: [
      { label: 'Read it', href: F + '01-top-30-high-rpm-niches-2026.pdf', meta: 'PDF, 8 pages' },
      { label: 'Spreadsheet', href: F + '01-top-30-high-rpm-niches-2026.csv', meta: 'CSV' },
    ],
  },
  {
    n: '02',
    ic: 'search',
    h: '50 search seeds and the costume protocol',
    p: "The seven-day routine on a blank YouTube account that teaches the algorithm to show you the market instead of your own habits. Then you read the homepage as a map. This is how you find a niche nobody handed you.",
    files: [{ label: 'Read it', href: F + '03-50-search-seeds-and-costume-protocol.pdf', meta: 'PDF, 5 pages' }],
  },
  {
    n: '03',
    ic: 'clipboard-check',
    h: 'The niche validation scorecard',
    p: "Twelve criteria, scored nought to two, with hard gates that kill a niche outright. Run it before you spend a single dollar on an editor. A pass means worth a controlled test, not guaranteed money, and the document says so.",
    files: [
      { label: 'Read it', href: F + '02-niche-validation-scorecard.pdf', meta: 'PDF, 4 pages' },
      { label: 'Fillable sheet', href: F + '02-niche-validation-scorecard-fillable.csv', meta: 'CSV' },
    ],
  },
  {
    n: '04',
    ic: 'git-branch',
    h: 'Pivot or persist',
    p: "A decision tree for the month where nothing is happening and you cannot tell whether the niche is wrong or the channel is simply young. This is the document that stops people quitting two weeks early.",
    files: [{ label: 'Read it', href: F + '04-pivot-or-persist.pdf', meta: 'PDF, 4 pages' }],
  },
  {
    n: '05',
    ic: 'messages-square',
    h: 'What Would Kevis Do',
    p: "Scenario by scenario, the messy situations that usually cost people a call: one video takes off then silence, monetized but the RPM is junk, a competitor copies you. What to do, in order, and when to stop.",
    files: [{ label: 'Read it', href: F + '06-what-would-kevis-do.pdf', meta: 'PDF, 5 pages' }],
  },
];

const extras = [
  {
    ic: 'check-check',
    h: 'More checks is better',
    p: 'The one-page checklist Kevis actually runs, with worked examples of a good and a bad banger-to-flop ratio.',
    href: F + 'more-checks-is-better.pdf',
    meta: 'PDF, 2 pages',
  },
  {
    ic: 'calendar-range',
    h: 'First 10 videos planner',
    p: 'Once a niche passes, this is how the first ten uploads get planned so you are testing a format rather than guessing ten times.',
    href: F + '05-first-10-videos-planner.pdf',
    meta: 'PDF, 3 pages',
  },
  {
    ic: 'compass',
    h: 'Start here',
    p: 'A fifteen-minute first pass for tonight, and the order to use everything else in. Open this one first if you want to be told what to do.',
    href: F + '00-start-here.pdf',
    meta: 'PDF, 2 pages',
  },
];

export default function Toolkit() {
  const attribution = useMemo(() => readAttribution(), []);

  return (
    <main className="wb">
      <nav className="nav">
        <div className="container nav__inner">
          <Logo />
          <div className="nav__cta">
            <a className="btn btn--primary" href={F + 'headstart-toolkit.zip'} download>
              Download all
            </a>
          </div>
        </div>
      </nav>

      <header className="wb-hero">
        <div className="container container--narrow">
          <span className="pill-tag">You stayed to the end</span>
          <h1>
            Your free <em>HeadStart Toolkit</em>
          </h1>
          <p className="wb-hero__sub">
            Everything Kevis just walked through, in the files the team actually uses. Find a market,
            score it honestly, know when to pivot, and plan the first ten videos. No email needed, no
            upsell wall. Take it and go and use it tonight.
          </p>
          <div className="tk-hero__act">
            <a className="btn btn--primary btn--lg" href={F + 'headstart-toolkit.zip'} download>
              Download everything <Icon name="arrow-down" />
            </a>
            <span className="tk-hero__meta">One zip, 3.7 MB, 13 files. Or take them one at a time below.</span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container container--narrow">
          <h2 className="section-title">The five tools, in the order you use them</h2>
          <div className="tk-list">
            {tools.map((t) => (
              <div className="tk-file" key={t.h}>
                <span className="tk-file__n">{t.n}</span>
                <div className="tk-file__body">
                  <h3>
                    <span className="tk-file__ic"><Icon name={t.ic} /></span>
                    {t.h}
                  </h3>
                  <p>{t.p}</p>
                  <div className="tk-file__act">
                    {t.files.map((f) => (
                      <a key={f.href} className="tk-dl" href={f.href} download>
                        <Icon name="download" /> {f.label}
                        <em>{f.meta}</em>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container container--narrow">
          <h2 className="section-title">Three more things in the folder</h2>
          <div className="tk-list">
            {extras.map((e) => (
              <div className="tk-file" key={e.h}>
                <div className="tk-file__body">
                  <h3>
                    <span className="tk-file__ic"><Icon name={e.ic} /></span>
                    {e.h}
                  </h3>
                  <p>{e.p}</p>
                  <div className="tk-file__act">
                    <a className="tk-dl" href={e.href} download>
                      <Icon name="download" /> Download
                      <em>{e.meta}</em>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <h2 className="section-title">Optional: turn the toolkit into a coach</h2>
          <p className="tk-lead">
            The toolkit includes a pack you can paste into Claude so it answers questions using these
            documents instead of generic YouTube advice. It will refuse to invent RPM figures or
            earnings, which is the entire point. Takes about two minutes and it is free on Claude's free
            plan.
          </p>
          <ol className="tk-steps">
            <li>
              Download the two files: <a href={F + 'claude-project-instructions.md'} download>the instructions</a> and{' '}
              <a href={F + 'claude-project-knowledge.md'} download>the knowledge pack</a>.
            </li>
            <li>
              Go to <a href="https://claude.ai" target="_blank" rel="noreferrer">claude.ai</a>, open
              Projects in the sidebar, and create a new project. Call it HeadStart Toolkit.
            </li>
            <li>
              Find the project's custom instructions, then open the instructions file in any text editor,
              copy all of it, and paste it in.
            </li>
            <li>
              Upload the knowledge pack to the project's knowledge, along with the three CSVs if you want
              it scoring spreadsheets with you.
            </li>
            <li>
              Then ask it things like <code>Score this channel against the HeadStart scorecard: [URL]</code> or{' '}
              <code>Scenario: my video three took off and four to eight died. What would Kevis do?</code>
            </li>
          </ol>
          <p className="wb-note" style={{ marginTop: 18 }}>
            If you do not use Claude, the same files work pasted into ChatGPT or Gemini as a single
            prompt. You lose the persistent project, not the content.
          </p>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container container--narrow tk-cta">
          <h2 className="section-title">If you would rather it were done than do it</h2>
          <p>
            The toolkit is the honest version of doing this yourself, and plenty of people will get a
            channel running from it alone. The other route is that we install it with you: we do the
            niche research, put a production team on your channel, and sit with you through the first
            thirty days when the numbers look like nothing is happening.
          </p>
          <div className="tk-cta__act">
            <PopupButton
              id={APPLICATION_TYPEFORM_ID}
              hidden={attribution}
              className="btn btn--primary btn--lg"
            >
              Apply for a Channel Install <Icon name="arrow-right" />
            </PopupButton>
            <a className="tk-cta__alt" href="#/">
              Or see what clients have done first
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer__legal" style={{ borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
            <p>
              Everything in this toolkit is educational. Where a figure appears as a teaching range,
              treat it as a starting hypothesis and check it in your own YouTube Studio before you spend
              money against it. Comparison channel statistics are snapshots taken when the document was
              written, not promises. We make no claim of income, nothing here is financial advice, and
              plenty of people who try this never earn from it.
              &copy; 2026 HeadStart Channels, CREATIVETUBE LTD.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
