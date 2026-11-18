'use client';

import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { MagneticLink } from '@/components/magnetic-link';

const email = 'bobies431@gmail.com';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-grid" aria-hidden="true" /><div className="contact-inner"><div className="section-number light"><span>05</span><i /> OPEN CHANNEL</div><h2 id="contact-title">Let&apos;s build something<br /><span>remarkable.</span></h2><p>Have an interesting project, internship opportunity, or technical challenge? My inbox is open.</p><div className="contact-actions"><MagneticLink className="button button-light" href={`mailto:${email}`}>START A CONVERSATION <ArrowUpRight size={17} /></MagneticLink><button className="copy-email" type="button" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'EMAIL COPIED' : 'COPY EMAIL'}</button></div><div className="contact-bottom"><div><a href="https://github.com/oldvibe" target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={13} /></a><a href="https://linkedin.com/in/yasyn-nait-edderhm" target="_blank" rel="noopener noreferrer">LINKEDIN <ArrowUpRight size={13} /></a></div><span>© {new Date().getFullYear()} YASYN NAIT EDDERHM</span><a href="#home">BACK TO TOP ↑</a></div></div></section>;
}
