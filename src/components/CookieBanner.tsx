'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    // Disable Google Analytics
    window.gtag?.('consent', 'update', {
      analytics_storage: 'denied'
    });
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>We use cookies to improve your experience and analyze site traffic. By continuing to use our site, you consent to our use of cookies.</p>
        <div className="cookie-buttons">
          <button onClick={handleAccept} className="cookie-accept">Accept</button>
          <button onClick={handleDecline} className="cookie-decline">Decline</button>
        </div>
      </div>
    </div>
  );
}