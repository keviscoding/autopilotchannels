import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseGate from './CourseGate';
import { modules } from './courseData';
import './course.css';

export default function CourseApp() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const active = modules.find((m) => m.id === lessonId) ?? modules[0];
  const ActiveComponent = active.component;

  const go = (id: string) => {
    navigate(`/course/${id}`);
    setNavOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <CourseGate>
      <div className="course-shell">
        {/* Top bar */}
        <header className="course-top">
          <button className="course-top__menu" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle module list">
            <span /><span /><span />
          </button>
          <a href="/" className="logo" aria-label="HeadStart Channels home">
            <svg className="logo__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path d="M16 22 L28 32 L16 42" stroke="#8FCFAE" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M32 18 L48 32 L32 46" stroke="#15875B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="logo__word"><b>HeadStart</b> <span>Channels</span></span>
          </a>
          <a href="/" className="course-top__exit">Exit</a>
        </header>

        <div className="course-body">
          {/* Sidebar */}
          <nav className={'course-nav' + (navOpen ? ' course-nav--open' : '')} aria-label="Course modules">
            <p className="course-nav__label">The playbook</p>
            <ol className="course-nav__list">
              {modules.map((m) => {
                const available = !!m.component;
                const isActive = m.id === active.id;
                return (
                  <li key={m.id}>
                    <button
                      className={
                        'course-nav__item' +
                        (isActive ? ' is-active' : '') +
                        (available ? '' : ' is-locked')
                      }
                      onClick={() => available && go(m.id)}
                      disabled={!available}
                    >
                      <span className="course-nav__num">{String(m.number).padStart(2, '0')}</span>
                      <span className="course-nav__title">{m.title}</span>
                      {!available && <span className="course-nav__soon">Soon</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Content */}
          <main className="course-content">
            {ActiveComponent ? <ActiveComponent /> : (
              <div className="course-soon">
                <h1>Coming soon</h1>
                <p>This module is being written. Module 1 is live now — start there.</p>
                <button className="btn btn--primary" onClick={() => go(modules[0].id)}>Go to Module 1</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </CourseGate>
  );
}
