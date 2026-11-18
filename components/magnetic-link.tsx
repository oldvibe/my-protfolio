'use client';

import type { AnchorHTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode };

export function MagneticLink({ children, className, ...props }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = ref.current;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!element || !canHover || reducedMotion) return;

    const move = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - (box.left + box.width / 2)) * 0.16;
      const y = (event.clientY - (box.top + box.height / 2)) * 0.16;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const reset = () => { element.style.transform = ''; };
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    return () => {
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
    };
  }, []);

  return <a {...props} className={className} ref={ref}>{children}</a>;
}
