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
