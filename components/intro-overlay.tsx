'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function IntroOverlay({ reducedMotion }: { reducedMotion: boolean }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const alreadySeen = window.sessionStorage.getItem('yasyn-intro-seen') === 'true';
    if (alreadySeen || reducedMotion) {
      setVisible(false);
      return;
    }

    let hasStarted = false;
    const finish = () => {
      if (hasStarted) return;
      hasStarted = true;
      const overlay = overlayRef.current;
      if (!overlay) return;
      const timeline = gsap.timeline({ onComplete: () => setVisible(false) });
      timeline
        .to(overlay.querySelector('.intro-line'), { scaleX: 1, duration: 0.55, ease: 'power3.inOut' })
        .to(overlay.querySelectorAll('[data-intro-word]'), { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.11, ease: 'power4.out' }, '-=0.12')
        .to(overlay.querySelector('.intro-meta'), { opacity: 1, duration: 0.3 }, '-=0.26')
        .to(overlay, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, delay: 0.4, ease: 'power4.inOut' });
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    const safetyTimer = window.setTimeout(finish, 900);
    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(safetyTimer);
    };
  }, [reducedMotion]);

  const skip = () => {
    window.sessionStorage.setItem('yasyn-intro-seen', 'true');
    gsap.killTweensOf(overlayRef.current);
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="intro-overlay" ref={overlayRef} aria-label="Opening introduction">
      <div className="intro-line" aria-hidden="true" />
      <div className="intro-title" aria-hidden="true"><span data-intro-word>YASYN</span><span data-intro-word>NAIT EDDERHM</span></div>
      <div className="intro-meta"><span>INITIALIZING PORTFOLIO</span><button type="button" onClick={skip}>SKIP INTRO <b>↗</b></button></div>
    </div>
  );
}
