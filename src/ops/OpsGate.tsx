import { useState, type ReactNode } from 'react';
import { OPS_ACCESS_CODE, OPS_ACCESS_STORAGE_KEY } from './opsConfig';

function isUnlocked(): boolean {
  try {
    return localStorage.getItem(OPS_ACCESS_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export default function OpsGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === OPS_ACCESS_CODE.toUpperCase()) {
      try { localStorage.setItem(OPS_ACCESS_STORAGE_KEY, 'true'); } catch { /* ignore */ }
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="gate">
      <form className="gate__card" onSubmit={submit}>
        <a href="/" className="logo gate__logo" aria-label="HeadStart Channels home">
          <svg className="logo__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M16 22 L28 32 L16 42" stroke="#8FCFAE" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 18 L48 32 L32 46" stroke="#15875B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="logo__word"><b>HeadStart</b> <span>Channels</span></span>
        </a>
        <h1 className="gate__title">Internal Ops Access</h1>
        <p className="gate__sub">This dashboard is for authorized team members only.</p>
        <input
          className="gate__input"
          type="text"
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          placeholder="Access code"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(false); }}
          aria-label="Access code"
        />
        {error && <p className="gate__error">That code isn't right. Check with your team lead.</p>}
        <button type="submit" className="btn btn--primary btn--block btn--lg">Unlock Dashboard</button>
        <p className="gate__help">
          Lost your code? <a href="mailto:support@headstartchannels.com">Contact support</a>.
        </p>
      </form>
    </div>
  );
}
