function Logo() {
  const lead = '#15875B';
  const trail = '#8FCFAE';
  return (
    <a
      href="#/"
      className="logo"
      aria-label="HeadStart Channels home"
      style={{ textDecoration: 'none' }}
    >
      <svg className="logo__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M16 22 L28 32 L16 42" stroke={trail} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 18 L48 32 L32 46" stroke={lead} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo__word"><b>HeadStart</b> <span>Channels</span></span>
    </a>
  );
}

export default function Privacy() {
  return (
    <>
      <nav className="nav">
        <div className="container nav__inner">
          <Logo />
        </div>
      </nav>

      <div className="container" style={{ maxWidth: '800px', padding: '48px 24px 80px' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
          fontWeight: 800, 
          color: 'var(--ink-900)', 
          marginBottom: '16px',
          lineHeight: 1.1
        }}>
          Privacy Policy
        </h1>
        
        <p style={{ fontSize: '16px', color: 'var(--fg-muted)', marginBottom: '32px' }}>
          Last updated: September 23, 2026
        </p>

        <div style={{ 
          fontSize: '17px', 
          lineHeight: 1.7, 
          color: 'var(--ink-700)'
        }}>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            Who We Are
          </h2>
          <p>
            HeadStart Channels operates the website at <strong>headstartchannels.com</strong>. We provide done-for-you YouTube channel services and educational resources for professionals and business owners who want to build profitable YouTube channels.
          </p>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            What Information We Collect
          </h2>
          <p>
            When you register for our free training, sign up for webinars, or use our contact forms, we collect:
          </p>
          <ul style={{ marginLeft: '24px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Your name</li>
            <li style={{ marginBottom: '8px' }}>Your email address</li>
            <li style={{ marginBottom: '8px' }}>Information you voluntarily provide in forms or communications</li>
          </ul>
          <p>
            We also collect standard web analytics data such as pages visited, time on site, and referral sources to improve our services.
          </p>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            How We Use Your Information
          </h2>
          <p>
            We use your information to:
          </p>
          <ul style={{ marginLeft: '24px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Deliver the free training and resources you've requested</li>
            <li style={{ marginBottom: '8px' }}>Send you occasional emails about HeadStart Channels products, services, and educational content</li>
            <li style={{ marginBottom: '8px' }}>Respond to your inquiries and provide customer support</li>
            <li style={{ marginBottom: '8px' }}>Improve our website and services</li>
          </ul>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            Email Service Provider
          </h2>
          <p>
            We use <strong>MailerLite</strong> to manage our email list and send communications. When you provide your email address through our forms, it is stored and processed by MailerLite in accordance with their privacy policy. MailerLite is a third-party service provider that helps us manage email subscriptions and communications.
          </p>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            We Do Not Sell Your Data
          </h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. Your email address and personal information are used solely for the purposes described in this privacy policy.
          </p>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            Unsubscribe
          </h2>
          <p>
            You can unsubscribe from our emails at any time by clicking the "unsubscribe" link at the bottom of any email we send you. Once you unsubscribe, we will stop sending you marketing emails, though we may still need to contact you regarding any services you've purchased or inquiries you've made.
          </p>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            Cookies and Analytics
          </h2>
          <p>
            We may use cookies and similar technologies to improve your experience on our website and understand how visitors use our site. We use analytics tools to track website traffic and user behavior in aggregate form.
          </p>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            Data Security
          </h2>
          <p>
            We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
          </p>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
          </p>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '24px', 
            fontWeight: 700, 
            color: 'var(--ink-900)', 
            marginTop: '40px',
            marginBottom: '16px'
          }}>
            Contact Us
          </h2>
          <p>
            If you have questions about this privacy policy or how we handle your personal information, please contact us at:
          </p>
          <p style={{ marginTop: '16px' }}>
            <strong>Email:</strong> <a href="mailto:support@headstartchannels.com" style={{ color: 'var(--green-700)', textDecoration: 'none' }}>support@headstartchannels.com</a>
          </p>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div>
              <Logo />
              <p className="footer__tag">A YouTube channel you own, with a team on it, that doesn't eat your evenings.</p>
            </div>
            <nav className="footer__links" aria-label="Legal">
              <a href="/terms">Terms of Service</a>
              <a href="#/privacy">Privacy Policy</a>
              <a href="/earnings-disclaimer">Earnings Disclaimer</a>
              <a href="mailto:support@headstartchannels.com">Contact</a>
            </nav>
          </div>
          <div className="footer__legal">
            <p>
              We make no promise of income. Any figures shown are examples from real clients and aren't
              typical. What a channel earns depends on the niche, the work that goes in, and factors
              outside anyone's control. Nothing here is financial advice. &copy; 2026 HeadStart Channels.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
