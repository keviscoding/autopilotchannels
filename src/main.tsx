import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Bootstrap: redirect bare path URLs to hash routes before HashRouter loads
// This handles https://headstartchannels.com/free-training → /#/free-training
if (typeof window !== 'undefined' && !window.location.hash && window.location.pathname !== '/') {
  const knownRoutes = [
    '/free-training',
    '/webinar',
    '/webinar/confirmed',
    '/toolkit',
    '/booked',
    '/course',
  ];
  const pathname = window.location.pathname;
  const search = window.location.search;
  
  // Check exact match or /course/:id pattern
  const isKnownRoute = knownRoutes.includes(pathname) || pathname.startsWith('/course/');
  
  if (isKnownRoute) {
    window.location.replace('/#' + pathname + search);
    // Don't render on this tick; the replace will reload
  } else {
    // Unknown route, render normally (LandingPage will show via HashRouter default)
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
} else {
  // Normal case: hash exists or we're at root
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
