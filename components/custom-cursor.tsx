'use client';

import { useEffect } from 'react';

export function CustomCursor({ reducedMotion }: { reducedMotion: boolean }) {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (reducedMotion || !finePointer.matches) return;

    const root = document.documentElement;
    root.classList.add('custom-cursor-active');
    let frame = 0;
    let x = -100;
    let y = -100;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          root.style.setProperty('--cursor-x', `${x}px`);
          root.style.setProperty('--cursor-y', `${y}px`);
          frame = 0;
        });
      }
    };
    const enter = (event: PointerEvent) => {
      if ((event.target as Element).closest('a, button, [data-cursor="active"]')) root.classList.add('cursor-over-action');
    };
    const leave = () => root.classList.remove('cursor-over-action');
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', enter);
    document.addEventListener('pointerout', leave);
    return () => {
      root.classList.remove('custom-cursor-active', 'cursor-over-action');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', enter);
      document.removeEventListener('pointerout', leave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;
  return <><span className="cursor-core" aria-hidden="true" /><span className="cursor-halo" aria-hidden="true" /></>;
}
