'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export function PortraitDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement;
      dialog.showModal();
      window.setTimeout(() => closeRef.current?.focus(), 0);
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (event: Event) => { event.preventDefault(); onClose(); };
    const handleClose = () => returnFocus.current?.focus();
    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('close', handleClose);
    };
  }, [onClose]);

  return (
    <dialog className="portrait-dialog" ref={dialogRef} aria-labelledby="portrait-dialog-title" onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
      <div className="portrait-dialog-frame">
        <button className="dialog-close" type="button" ref={closeRef} onClick={onClose} aria-label="Close portrait"><X size={20} /></button>
        <div className="dialog-image"><Image src="/assets/yasyn-portrait.webp" alt="Yasyn Nait Edderhm in a black suit" fill sizes="(max-width: 760px) 92vw, 54vw" priority /></div>
        <div className="dialog-copy"><span className="kicker">SOFTWARE DEVELOPER / UI &amp; UX</span><h2 id="portrait-dialog-title">Yasyn<br />Nait Edderhm<span>.</span></h2><p>Building systems, creating experiences, and learning through real engineering challenges.</p><a href="mailto:bobies431@gmail.com" onClick={onClose}>START A CONVERSATION <b>↗</b></a></div>
      </div>
    </dialog>
  );
}
