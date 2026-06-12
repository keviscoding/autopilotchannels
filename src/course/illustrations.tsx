/*
 * Clean, static, explanatory diagrams for the course.
 * Brand palette: ink #16221F, green #15875B, sand #F2EDE4, line #E7E1D6,
 * coral #DC6B41. No gradients beyond one soft area fill, no decoration.
 * Each diagram carries a mechanism, not ornament.
 */
import type { ReactNode } from 'react';

const INK = '#16221F';
const INK_MUTED = '#55615B';
const GREEN = '#15875B';
const GREEN_SOFT = '#D2EBDD';
const CORAL = '#DC6B41';
const LINE = '#E7E1D6';
const SAND = '#F2EDE4';

export function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="fig">
      <div className="fig__frame">{children}</div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}

/* 1.1 — The channel is a system of functions, not one skill. */
export function SystemDiagram() {
  const funcs = ['Topic', 'Title', 'Thumbnail', 'Script', 'Voice', 'Edit'];
  return (
    <svg viewBox="0 0 640 320" width="100%" role="img" aria-label="Six functions feeding one channel output">
      {funcs.map((f, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 40 + col * 196;
        const y = 24 + row * 70;
        return (
          <g key={f}>
            <rect x={x} y={y} width={164} height={48} rx={12} fill="#fff" stroke={LINE} strokeWidth={1.5} />
            <text x={x + 82} y={y + 30} textAnchor="middle" fontSize="17" fontWeight="600" fill={INK} fontFamily="Hanken Grotesk, sans-serif">{f}</text>
            <line x1={x + 82} y1={y + 48} x2={320} y2={232} stroke={LINE} strokeWidth={1.5} />
          </g>
        );
      })}
      <rect x={180} y={232} width={280} height={60} rx={16} fill={GREEN} />
      <text x={320} y={262} textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="Bricolage Grotesque, sans-serif">One published video</text>
      <text x={320} y={282} textAnchor="middle" fontSize="13" fill={GREEN_SOFT} fontFamily="Hanken Grotesk, sans-serif">every function shows up in the result</text>
    </svg>
  );
}

/* 1.2 — Output is multiplicative; the weakest layer caps it. */
export function MultiplicativeDiagram() {
  // Two scenarios, same except CTR.
  const rowY = (i: number) => 60 + i * 96;
  const Bar = ({ y, ctr, reach, label, weak }: { y: number; ctr: string; reach: number; label: string; weak?: boolean }) => (
    <g>
      <text x={20} y={y - 14} fontSize="14" fontWeight="700" fill={INK} fontFamily="Hanken Grotesk, sans-serif">{label}</text>
      {/* factors */}
      <g fontFamily="Hanken Grotesk, sans-serif">
        <rect x={20} y={y} width={92} height={40} rx={9} fill="#fff" stroke={LINE} strokeWidth={1.5} />
        <text x={66} y={y + 18} textAnchor="middle" fontSize="12" fill={INK_MUTED}>Impressions</text>
        <text x={66} y={y + 33} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>10,000</text>
        <text x={120} y={y + 26} textAnchor="middle" fontSize="16" fill={INK_MUTED}>×</text>
        <rect x={132} y={y} width={92} height={40} rx={9} fill={weak ? '#FCEAE2' : '#fff'} stroke={weak ? CORAL : LINE} strokeWidth={1.5} />
        <text x={178} y={y + 18} textAnchor="middle" fontSize="12" fill={weak ? CORAL : INK_MUTED}>Click rate</text>
        <text x={178} y={y + 33} textAnchor="middle" fontSize="13" fontWeight="700" fill={weak ? CORAL : INK}>{ctr}</text>
        <text x={232} y={y + 26} textAnchor="middle" fontSize="16" fill={INK_MUTED}>=</text>
        <rect x={244} y={y} width={120} height={40} rx={9} fill={GREEN_SOFT} stroke={GREEN} strokeWidth={1.5} />
        <text x={304} y={y + 18} textAnchor="middle" fontSize="12" fill={GREEN}>Clicks in</text>
        <text x={304} y={y + 33} textAnchor="middle" fontSize="13" fontWeight="700" fill={GREEN}>{reach.toLocaleString()}</text>
      </g>
      {/* reach bar */}
      <rect x={384} y={y + 6} width={236} height={28} rx={8} fill={SAND} />
      <rect x={384} y={y + 6} width={Math.max(10, (reach / 800) * 236)} height={28} rx={8} fill={weak ? CORAL : GREEN} />
    </g>
  );
  return (
    <svg viewBox="0 0 640 280" width="100%" role="img" aria-label="Same video, two click rates, very different reach">
      <Bar y={rowY(0)} ctr="8%" reach={800} label="Strong thumbnail + title" />
      <Bar y={rowY(1)} ctr="2%" reach={200} label="Same video, weak thumbnail + title" weak />
      <text x={20} y={264} fontSize="13" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">
        One layer dropped 4x. The reach dropped 4x, then the algorithm stops showing it, and it compounds down.
      </text>
    </svg>
  );
}

/* 2.1 — Demand outruns supply: the gap you hunt. */
export function SupplyDemandGap() {
  return (
    <svg viewBox="0 0 640 300" width="100%" role="img" aria-label="Demand taller than supply; the gap between them is the opportunity">
      {/* demand bar */}
      <rect x={120} y={40} width={120} height={200} rx={10} fill={GREEN} />
      <text x={180} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} fontFamily="Hanken Grotesk, sans-serif">Demand</text>
      <text x={180} y={150} textAnchor="middle" fontSize="13" fill="#fff" fontFamily="Hanken Grotesk, sans-serif">what viewers</text>
      <text x={180} y={168} textAnchor="middle" fontSize="13" fill="#fff" fontFamily="Hanken Grotesk, sans-serif">want to watch</text>
      {/* supply bar */}
      <rect x={400} y={160} width={120} height={80} rx={10} fill={INK} />
      <text x={460} y={146} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} fontFamily="Hanken Grotesk, sans-serif">Supply</text>
      <text x={460} y={205} textAnchor="middle" fontSize="13" fill="#fff" fontFamily="Hanken Grotesk, sans-serif">videos serving it</text>
      {/* the gap bracket */}
      <line x1={300} y1={40} x2={300} y2={160} stroke={CORAL} strokeWidth={2} strokeDasharray="5 5" />
      <text x={316} y={104} fontSize="15" fontWeight="700" fill={CORAL} fontFamily="Hanken Grotesk, sans-serif">the gap</text>
      <text x={316} y={124} fontSize="12.5" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">where a new channel</text>
      <text x={316} y={140} fontSize="12.5" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">can blow up fast</text>
      <line x1={120} y1={240} x2={520} y2={240} stroke={LINE} strokeWidth={1.5} />
    </svg>
  );
}

/* 13.1 — The retention graph drops hardest at the start. */
export function RetentionDrop() {
  return (
    <svg viewBox="0 0 640 250" width="100%" role="img" aria-label="Audience retention falls steeply in the first seconds, then levels off">
      <line x1={50} y1={20} x2={50} y2={200} stroke={LINE} strokeWidth={1.5} />
      <line x1={50} y1={200} x2={610} y2={200} stroke={LINE} strokeWidth={1.5} />
      <text x={42} y={36} textAnchor="end" fontSize="12" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">100%</text>
      <text x={325} y={228} textAnchor="middle" fontSize="12" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">Time into the video</text>
      {/* effort zone */}
      <rect x={50} y={20} width={120} height={180} fill={GREEN_SOFT} opacity={0.7} />
      <text x={110} y={120} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREEN} fontFamily="Hanken Grotesk, sans-serif">80% of your</text>
      <text x={110} y={138} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GREEN} fontFamily="Hanken Grotesk, sans-serif">effort here</text>
      {/* steep early drop then level */}
      <path d="M50 28 C70 70 110 120 170 140 C260 168 420 178 610 184" fill="none" stroke={CORAL} strokeWidth={3.5} strokeLinecap="round" />
      <text x={400} y={165} fontSize="12.5" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">survive the first 30s and most of them stay</text>
    </svg>
  );
}

/* 14.4 — Storytelling causes virality through satisfaction. */
export function StoryToVirality() {
  const steps = [
    ['Character grows', 'toward a clear goal'],
    ['Viewer is satisfied', 'they got the payoff'],
    ['Algorithm reads it', 'satisfaction signals'],
    ['Pushed wider', 'to more viewers'],
  ];
  return (
    <svg viewBox="0 0 640 150" width="100%" role="img" aria-label="Character growth leads to satisfaction, which the algorithm reads and rewards with reach">
      <g fontFamily="Hanken Grotesk, sans-serif">
        {steps.map((s, i) => {
          const x = 12 + i * 158;
          const last = i === steps.length - 1;
          return (
            <g key={i}>
              <rect x={x} y={45} width={140} height={62} rx={12} fill={last ? GREEN : '#fff'} stroke={last ? GREEN : LINE} strokeWidth={1.5} />
              <text x={x + 70} y={73} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={last ? '#fff' : INK}>{s[0]}</text>
              <text x={x + 70} y={91} textAnchor="middle" fontSize="11.5" fill={last ? GREEN_SOFT : INK_MUTED}>{s[1]}</text>
              {!last && <text x={x + 150} y={80} textAnchor="middle" fontSize="18" fill={INK_MUTED}>→</text>}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* 11.3 — Attention decays without re-hooks; re-hooks pull it back up. */
export function ReHookCurve() {
  return (
    <svg viewBox="0 0 640 250" width="100%" role="img" aria-label="Attention decays steadily without re-hooks, but climbs back at each section with them">
      <line x1={40} y1={20} x2={40} y2={200} stroke={LINE} strokeWidth={1.5} />
      <line x1={40} y1={200} x2={610} y2={200} stroke={LINE} strokeWidth={1.5} />
      {/* section boundaries */}
      {[180, 330, 480].map((x) => <line key={x} x1={x} y1={30} x2={x} y2={200} stroke={LINE} strokeWidth={1} strokeDasharray="3 4" />)}
      {/* no re-hook: steady decay */}
      <path d="M40 60 L180 110 L330 150 L480 178 L600 192" fill="none" stroke={CORAL} strokeWidth={3} strokeLinecap="round" strokeDasharray="6 5" />
      <text x={510} y={188} fontSize="12.5" fill={CORAL} fontFamily="Hanken Grotesk, sans-serif">no re-hook</text>
      {/* re-hooked: dips then climbs at each seam */}
      <path d="M40 60 L160 95 L180 60 L310 95 L330 58 L460 92 L480 55 L600 78" fill="none" stroke={GREEN} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x={120} y={44} fontSize="12.5" fontWeight="700" fill={GREEN} fontFamily="Hanken Grotesk, sans-serif">re-hooked at each seam</text>
      <text x={325} y={224} textAnchor="middle" fontSize="13" fill={INK} fontFamily="Hanken Grotesk, sans-serif">Each dashed line is a new subject. With a fresh hook there, attention climbs instead of bleeding out.</text>
    </svg>
  );
}

/* 12.1 — Monotone drifts; dynamic delivery holds. */
export function VoiceDynamics() {
  return (
    <svg viewBox="0 0 640 200" width="100%" role="img" aria-label="A flat monotone line versus a dynamic, varied delivery">
      <text x={40} y={50} fontSize="13.5" fontWeight="700" fill={CORAL} fontFamily="Hanken Grotesk, sans-serif">Monotone</text>
      <path d="M150 60 L600 60" fill="none" stroke={CORAL} strokeWidth={3} strokeLinecap="round" />
      <text x={375} y={84} textAnchor="middle" fontSize="12" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">same energy throughout, attention drifts</text>

      <text x={40} y={140} fontSize="13.5" fontWeight="700" fill={GREEN} fontFamily="Hanken Grotesk, sans-serif">Dynamic</text>
      <path d="M150 140 Q190 105 230 140 T310 140 Q350 100 390 150 Q430 175 470 130 T560 140 L600 138" fill="none" stroke={GREEN} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x={375} y={184} textAnchor="middle" fontSize="12" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">loud to emphasise, soft to make them lean in</text>
    </svg>
  );
}

/* 10.2 — The repeating outlier is the demand signal. */
export function TopicOutlier() {
  // heights: most average, a few of one topic spike
  const bars = [60, 50, 200, 55, 65, 190, 48, 70, 205, 58];
  const outlier = [false, false, true, false, false, true, false, false, true, false];
  return (
    <svg viewBox="0 0 640 260" width="100%" role="img" aria-label="One topic spikes every time it appears on a channel, while the rest stay flat">
      <line x1={40} y1={30} x2={40} y2={220} stroke={LINE} strokeWidth={1.5} />
      <line x1={40} y1={220} x2={610} y2={220} stroke={LINE} strokeWidth={1.5} />
      {bars.map((h, i) => {
        const x = 60 + i * 54;
        return (
          <rect key={i} x={x} y={220 - h} width={36} height={h} rx={6}
                fill={outlier[i] ? GREEN : SAND} stroke={outlier[i] ? GREEN : LINE} strokeWidth={1.5} />
        );
      })}
      <text x={168} y={36} fontSize="13" fontWeight="700" fill={GREEN} fontFamily="Hanken Grotesk, sans-serif">same topic, every time</text>
      <text x={325} y={248} textAnchor="middle" fontSize="13" fill={INK} fontFamily="Hanken Grotesk, sans-serif">A channel's videos. The repeating spike is what the audience actually wants.</text>
    </svg>
  );
}

/* 9.1 — The simple production pipeline. */
export function ProductionPipeline() {
  const stages = ['Topic', 'Script', 'Voice', 'Edit', 'Thumbnail', 'Review', 'Publish'];
  return (
    <svg viewBox="0 0 640 180" width="100%" role="img" aria-label="A card moves left to right through seven simple stages">
      <g fontFamily="Hanken Grotesk, sans-serif">
        {stages.map((s, i) => {
          const x = 16 + i * 88;
          const last = i === stages.length - 1;
          return (
            <g key={s}>
              <rect x={x} y={70} width={74} height={44} rx={10} fill={last ? GREEN : '#fff'} stroke={last ? GREEN : LINE} strokeWidth={1.5} />
              <text x={x + 37} y={97} textAnchor="middle" fontSize="13" fontWeight={last ? '700' : '600'} fill={last ? '#fff' : INK}>{s}</text>
              {!last && <text x={x + 84} y={97} textAnchor="middle" fontSize="15" fill={INK_MUTED}>→</text>}
            </g>
          );
        })}
        <text x={320} y={150} textAnchor="middle" fontSize="13.5" fill={INK}>One card per video. Each person finishes, attaches their work, and the next is pinged.</text>
      </g>
    </svg>
  );
}

/* 8.2 — Where to hire what. */
export function HiringSources() {
  const rows = [
    ['Upwork', 'General, lower budget', 'Move comms off-platform'],
    ['Twitter', 'High-end editors, thumbnails', 'Needs a real profile to trust'],
    ['Fiverr', 'Voiceover, specific talent', 'Avoid for editors'],
    ['Discord', 'Editors, thumbnail artists', 'DM in niche communities'],
  ];
  const cx = [20, 170, 380];
  return (
    <svg viewBox="0 0 640 260" width="100%" role="img" aria-label="Where to hire each role and what to watch for">
      <g fontFamily="Hanken Grotesk, sans-serif">
        {['Platform', 'Best for', 'Watch out for'].map((c, i) => (
          <text key={c} x={cx[i] + 4} y={34} fontSize="13" fontWeight="700" fill={GREEN} style={{ textTransform: 'uppercase' }}>{c}</text>
        ))}
        <line x1={20} y1={46} x2={620} y2={46} stroke={LINE} strokeWidth={1.5} />
        {rows.map((r, ri) => (
          <g key={ri}>
            {r.map((cell, ci) => (
              <text key={ci} x={cx[ci] + 4} y={82 + ri * 48} fontSize={ci === 0 ? '15.5' : '14'}
                    fontWeight={ci === 0 ? '700' : '400'} fill={ci === 0 ? INK : INK_MUTED}>{cell}</text>
            ))}
            {ri < rows.length - 1 && <line x1={20} y1={98 + ri * 48} x2={620} y2={98 + ri * 48} stroke={LINE} strokeWidth={1} />}
          </g>
        ))}
      </g>
    </svg>
  );
}

/* 8.3 — Judge the work, not the words. */
export function HiringSignal() {
  const Col = ({ x, title, color, items, mark }: { x: number; title: string; color: string; items: string[]; mark: string }) => (
    <g fontFamily="Hanken Grotesk, sans-serif">
      <rect x={x} y={20} width={280} height={210} rx={16} fill="#fff" stroke={color} strokeWidth={1.5} />
      <text x={x + 24} y={54} fontSize="16" fontWeight="700" fill={color}>{title}</text>
      {items.map((it, i) => (
        <g key={i}>
          <text x={x + 24} y={92 + i * 36} fontSize="15" fontWeight="700" fill={color}>{mark}</text>
          <text x={x + 44} y={92 + i * 36} fontSize="14" fill={INK}>{it}</text>
        </g>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 640 254" width="100%" role="img" aria-label="What to ignore versus what to judge when hiring">
      <Col x={20} title="Ignore" color={CORAL} mark="–" items={['The proposal essay', '"I love writing" fluff', 'Claimed credits (unverified)', 'Length of the pitch']} />
      <Col x={340} title="Judge" color={GREEN} mark="+" items={['Did they do the test task', 'Their actual samples', 'How fast they respond', 'Their hook, not their promise']} />
    </svg>
  );
}

/* 5.1 — The four formats compared. */
export function FormatComparison() {
  const rows = [
    ['Compilation', 'Med ($150+)', 'Branding + voice', 'Big fan base, lots of clips'],
    ['Documentary', 'High', 'Niche + quality', 'Niche down to one fan base'],
    ['Animation', 'Very high', 'Cost itself', 'High RPM, advanced only'],
    ['Explainer', 'Low', 'Speed only', 'Be first to the trend'],
  ];
  const cols = ['Format', 'Cost', 'Moat', 'Best when'];
  const cx = [20, 170, 300, 440];
  const cw = [150, 130, 140, 180];
  return (
    <svg viewBox="0 0 640 280" width="100%" role="img" aria-label="The four content formats compared by cost, moat, and best use">
      <g fontFamily="Hanken Grotesk, sans-serif">
        {cols.map((c, i) => (
          <text key={c} x={cx[i] + 4} y={36} fontSize="13" fontWeight="700" fill={GREEN} style={{ textTransform: 'uppercase' }}>{c}</text>
        ))}
        <line x1={20} y1={48} x2={620} y2={48} stroke={LINE} strokeWidth={1.5} />
        {rows.map((r, ri) => (
          <g key={ri}>
            {r.map((cell, ci) => (
              <text key={ci} x={cx[ci] + 4} y={84 + ri * 50} fontSize={ci === 0 ? '15.5' : '14'}
                    fontWeight={ci === 0 ? '700' : '400'} fill={ci === 0 ? INK : INK_MUTED}>{cell}</text>
            ))}
            {ri < rows.length - 1 && <line x1={20} y1={100 + ri * 50} x2={620} y2={100 + ri * 50} stroke={LINE} strokeWidth={1} />}
          </g>
        ))}
        <rect x={cx[0]} y={1} width={cw[0]} height={1} fill="none" />
      </g>
    </svg>
  );
}

/* 6.1 — Back-calculate inputs from the target. */
export function BackCalculation() {
  const Box = ({ x, top, mid, bot, accent }: { x: number; top: string; mid: string; bot: string; accent?: boolean }) => (
    <g fontFamily="Hanken Grotesk, sans-serif">
      <rect x={x} y={70} width={150} height={80} rx={12} fill={accent ? GREEN_SOFT : '#fff'} stroke={accent ? GREEN : LINE} strokeWidth={1.5} />
      <text x={x + 75} y={96} textAnchor="middle" fontSize="12" fill={INK_MUTED}>{top}</text>
      <text x={x + 75} y={120} textAnchor="middle" fontSize="17" fontWeight="800" fill={accent ? GREEN : INK} fontFamily="Bricolage Grotesque, sans-serif">{mid}</text>
      <text x={x + 75} y={138} textAnchor="middle" fontSize="11.5" fill={INK_MUTED}>{bot}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 220" width="100%" role="img" aria-label="Working backward from a revenue target to the views and uploads needed">
      <Box x={20} top="Target" mid="$10k/mo" bot="net revenue" accent />
      <text x={185} y={114} textAnchor="middle" fontSize="22" fill={INK_MUTED}>→</text>
      <Box x={205} top="÷ RPM ($6) × 1000" mid="~1.67M" bot="views / month" />
      <text x={370} y={114} textAnchor="middle" fontSize="22" fill={INK_MUTED}>→</text>
      <Box x={390} top="÷ views per video" mid="the number" bot="of uploads to plan" />
      <text x={320} y={186} textAnchor="middle" fontSize="13.5" fill={INK}>A number can be reverse-engineered into a plan. A wish can't.</text>
    </svg>
  );
}

/* 7.3 — Account security: isolate the owner. */
export function AccountSecurity() {
  return (
    <svg viewBox="0 0 640 240" width="100%" role="img" aria-label="Channel owned by a logged-out creation account, managed by your daily email">
      <g fontFamily="Hanken Grotesk, sans-serif">
        <rect x={40} y={40} width={200} height={70} rx={12} fill={GREEN_SOFT} stroke={GREEN} strokeWidth={1.5} />
        <text x={140} y={68} textAnchor="middle" fontSize="14.5" fontWeight="700" fill={GREEN}>Creation account</text>
        <text x={140} y={88} textAnchor="middle" fontSize="12.5" fill={INK_MUTED}>owns it, then logged out</text>

        <rect x={400} y={40} width={200} height={70} rx={12} fill="#fff" stroke={LINE} strokeWidth={1.5} />
        <text x={500} y={68} textAnchor="middle" fontSize="14.5" fontWeight="700" fill={INK}>Your daily email</text>
        <text x={500} y={88} textAnchor="middle" fontSize="12.5" fill={INK_MUTED}>Manager access only</text>

        <line x1={240} y1={75} x2={400} y2={75} stroke={LINE} strokeWidth={1.5} />
        <text x={320} y={66} textAnchor="middle" fontSize="12" fill={INK_MUTED}>invites as manager</text>

        <rect x={400} y={150} width={200} height={56} rx={12} fill="#FCEAE2" stroke={CORAL} strokeWidth={1.5} />
        <text x={500} y={174} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={CORAL}>Hacker hits this</text>
        <text x={500} y={192} textAnchor="middle" fontSize="12" fill={INK_MUTED}>reaches a manager, not the owner</text>
        <line x1={500} y1={150} x2={500} y2={110} stroke={CORAL} strokeWidth={1.5} strokeDasharray="4 4" />
      </g>
    </svg>
  );
}

/* 4.1 — CTR can't tell these apart. View velocity can. */
export function ViewVelocity() {
  return (
    <svg viewBox="0 0 640 280" width="100%" role="img" aria-label="Two videos with the same click rate but different view velocity">
      {/* left: still rising */}
      <g fontFamily="Hanken Grotesk, sans-serif">
        <line x1={40} y1={40} x2={40} y2={210} stroke={LINE} strokeWidth={1.5} />
        <line x1={40} y1={210} x2={290} y2={210} stroke={LINE} strokeWidth={1.5} />
        <path d="M40 200 L90 190 L140 170 L190 138 L240 92 L285 48" fill="none" stroke={GREEN} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
        <text x={165} y={30} textAnchor="middle" fontSize="14" fontWeight="700" fill={GREEN}>Still climbing: leave it</text>
        <text x={165} y={234} textAnchor="middle" fontSize="13" fill={INK_MUTED}>CTR: 14%</text>
      </g>
      {/* right: flat-lined */}
      <g fontFamily="Hanken Grotesk, sans-serif">
        <line x1={350} y1={40} x2={350} y2={210} stroke={LINE} strokeWidth={1.5} />
        <line x1={350} y1={210} x2={600} y2={210} stroke={LINE} strokeWidth={1.5} />
        <path d="M350 150 L400 120 L450 108 L500 104 L550 103 L595 103" fill="none" stroke={CORAL} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
        <text x={475} y={30} textAnchor="middle" fontSize="14" fontWeight="700" fill={CORAL}>Flat-lined: swap it</text>
        <text x={475} y={234} textAnchor="middle" fontSize="13" fill={INK_MUTED}>CTR: 14%</text>
      </g>
      <text x={320} y={262} textAnchor="middle" fontSize="13" fill={INK}>Same click rate. Only the slope of the view graph tells you which video is alive.</text>
    </svg>
  );
}

/* 3.1 — What keeps a channel monetised vs what kills it. */
export function MonetizationSafety() {
  const Col = ({ x, title, color, items, mark }: { x: number; title: string; color: string; items: string[]; mark: string }) => (
    <g fontFamily="Hanken Grotesk, sans-serif">
      <rect x={x} y={20} width={280} height={236} rx={16} fill="#fff" stroke={color} strokeWidth={1.5} />
      <text x={x + 24} y={54} fontSize="16" fontWeight="700" fill={color}>{title}</text>
      {items.map((it, i) => (
        <g key={i}>
          <text x={x + 24} y={92 + i * 38} fontSize="15" fontWeight="700" fill={color}>{mark}</text>
          <text x={x + 44} y={92 + i * 38} fontSize="14" fill={INK}>{it}</text>
        </g>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 640 280" width="100%" role="img" aria-label="What keeps a channel monetised versus what gets it demonetised">
      <Col x={20} title="Keeps it monetised" color={GREEN} mark="+" items={['Your own voiceover', 'Real reactions and emotion', 'Context added to any clips', 'Reads as a human, not a bot']} />
      <Col x={340} title="Gets it killed" color={CORAL} mark="–" items={['Raw reused / copyrighted clips', 'No voiceover (quote / motivation)', 'Physical violence, war footage', 'Reads as low-effort or bot-made']} />
    </svg>
  );
}

/* 2.2 — Unsaturated vs saturated, side by side. */
export function SaturationCompare() {
  const Col = ({ x, title, color, items, mark }: { x: number; title: string; color: string; items: string[]; mark: string }) => (
    <g fontFamily="Hanken Grotesk, sans-serif">
      <rect x={x} y={20} width={280} height={236} rx={16} fill="#fff" stroke={color} strokeWidth={1.5} />
      <text x={x + 24} y={54} fontSize="16" fontWeight="700" fill={color}>{title}</text>
      {items.map((it, i) => (
        <g key={i}>
          <text x={x + 24} y={92 + i * 38} fontSize="15" fontWeight="700" fill={color}>{mark}</text>
          <text x={x + 44} y={92 + i * 38} fontSize="14.5" fill={INK}>{it}</text>
        </g>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 640 280" width="100%" role="img" aria-label="Signs of an open niche versus a crowded one">
      <Col x={20} title="Room to enter" color={GREEN} mark="+" items={['New channels (under 3 months)', 'Ugly thumbnails still winning', 'Few big established players', 'Bad quality pulls big views']} />
      <Col x={340} title="Already crowded" color={CORAL} mark="–" items={['Competitors 2 to 3 years old', 'High polish needed to compete', '10+ big channels, same format', 'New channels stay buried']} />
    </svg>
  );
}

/* 2.3 — Revenue is a formula, not a vibe. */
export function RevenueFormula() {
  return (
    <svg viewBox="0 0 640 220" width="100%" role="img" aria-label="Monthly views divided by 1000, times RPM, equals monthly revenue">
      <g fontFamily="Hanken Grotesk, sans-serif">
        <rect x={20} y={40} width={150} height={56} rx={10} fill="#fff" stroke={LINE} strokeWidth={1.5} />
        <text x={95} y={64} textAnchor="middle" fontSize="12.5" fill={INK_MUTED}>Monthly views ÷ 1,000</text>
        <text x={95} y={84} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>3,100</text>

        <text x={185} y={74} textAnchor="middle" fontSize="20" fill={INK_MUTED}>×</text>

        <rect x={200} y={40} width={120} height={56} rx={10} fill="#fff" stroke={LINE} strokeWidth={1.5} />
        <text x={260} y={64} textAnchor="middle" fontSize="12.5" fill={INK_MUTED}>RPM</text>
        <text x={260} y={84} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>$6</text>

        <text x={335} y={74} textAnchor="middle" fontSize="20" fill={INK_MUTED}>=</text>

        <rect x={350} y={40} width={200} height={56} rx={10} fill={GREEN_SOFT} stroke={GREEN} strokeWidth={1.5} />
        <text x={450} y={64} textAnchor="middle" fontSize="12.5" fill={GREEN}>Monthly revenue</text>
        <text x={450} y={84} textAnchor="middle" fontSize="16" fontWeight="800" fill={GREEN}>$18,600</text>

        <text x={20} y={150} fontSize="14.5" fill={INK}>Gate 1: is the channel actually monetised? A viral video on an</text>
        <text x={20} y={172} fontSize="14.5" fill={INK}>unmonetised channel earns nothing.</text>
        <text x={20} y={196} fontSize="14.5" fill={INK_MUTED}>Gate 2: does the biggest channel clear ~$20k/mo, and the niche beat $10k?</text>
      </g>
    </svg>
  );
}

/* 2.4 — The moat runs both ways. */
export function MoatMatrix() {
  return (
    <svg viewBox="0 0 640 320" width="100%" role="img" aria-label="Pick niches that are easy for you to make and hard for others to copy">
      <g fontFamily="Hanken Grotesk, sans-serif">
        {/* quadrant grid */}
        <rect x={140} y={40} width={220} height={110} fill={SAND} stroke={LINE} strokeWidth={1.5} />
        <rect x={360} y={40} width={220} height={110} fill={GREEN_SOFT} stroke={GREEN} strokeWidth={2} />
        <rect x={140} y={150} width={220} height={110} fill="#FCEAE2" stroke={LINE} strokeWidth={1.5} />
        <rect x={360} y={150} width={220} height={110} fill={SAND} stroke={LINE} strokeWidth={1.5} />

        <text x={250} y={95} textAnchor="middle" fontSize="13" fill={INK_MUTED}>Hard for you,</text>
        <text x={250} y={112} textAnchor="middle" fontSize="13" fill={INK_MUTED}>hard to copy</text>
        <text x={470} y={92} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={GREEN}>Easy for you,</text>
        <text x={470} y={110} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={GREEN}>hard to copy</text>
        <text x={470} y={130} textAnchor="middle" fontSize="12" fill={GREEN}>the target</text>
        <text x={250} y={205} textAnchor="middle" fontSize="13" fill={CORAL}>Hard for you,</text>
        <text x={250} y={222} textAnchor="middle" fontSize="13" fill={CORAL}>easy to copy</text>
        <text x={470} y={205} textAnchor="middle" fontSize="13" fill={INK_MUTED}>Easy for you,</text>
        <text x={470} y={222} textAnchor="middle" fontSize="13" fill={INK_MUTED}>easy to copy (floods)</text>

        {/* axis labels */}
        <text x={360} y={290} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Cheaper for you to produce →</text>
        <text x={128} y={150} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK} transform="rotate(-90 128 150)">Harder to copy →</text>
      </g>
    </svg>
  );
}

/* 1.3 — The back-loaded curve. Flat, then vertical. */
export function FlatPartDiagram() {
  // curve points: flat then exponential
  const path = 'M40 240 L120 236 L200 230 L280 224 L360 214 L420 196 L470 168 L510 124 L545 72 L575 28';
  return (
    <svg viewBox="0 0 640 300" width="100%" role="img" aria-label="Income curve: long flat stretch, then a steep rise">
      {/* axes */}
      <line x1={40} y1={20} x2={40} y2={260} stroke={LINE} strokeWidth={1.5} />
      <line x1={40} y1={260} x2={600} y2={260} stroke={LINE} strokeWidth={1.5} />
      <text x={32} y={20} textAnchor="end" fontSize="12" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif" transform="rotate(-90 20 150)">Income</text>
      <text x={320} y={288} textAnchor="middle" fontSize="12" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">Time / videos published</text>
      {/* flat-part region */}
      <rect x={40} y={20} width={300} height={240} fill={SAND} opacity={0.6} />
      <text x={190} y={130} textAnchor="middle" fontSize="14" fontWeight="700" fill={CORAL} fontFamily="Hanken Grotesk, sans-serif">The flat part</text>
      <text x={190} y={150} textAnchor="middle" fontSize="12.5" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">inputs high, output near zero,</text>
      <text x={190} y={166} textAnchor="middle" fontSize="12.5" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">almost everyone quits here</text>
      {/* the curve */}
      <path d={path} fill="none" stroke={GREEN} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* quit marker */}
      <circle cx={280} cy={224} r={5} fill={CORAL} />
      {/* payback marker */}
      <circle cx={545} cy={72} r={5} fill={GREEN} />
      <text x={545} y={56} textAnchor="middle" fontSize="13" fontWeight="700" fill={GREEN} fontFamily="Hanken Grotesk, sans-serif">one video breaks</text>
      <text x={545} y={250} textAnchor="middle" fontSize="12" fill={INK_MUTED} fontFamily="Hanken Grotesk, sans-serif">same work as month one</text>
    </svg>
  );
}
