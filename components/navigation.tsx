'use client';

import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PortraitDialog } from '@/components/portrait-dialog';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#about', label: 'About' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portraitOpen, setPortraitOpen] = useState(false);
  const [active, setActive] = useState('home');
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = links.map((link) => document.querySelector(link.href)).filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: '-35% 0px -52% 0px', threshold: [0.01, 0.3, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const openPortrait = () => setPortraitOpen(true);
    window.addEventListener('open-portrait-dialog', openPortrait);
    return () => window.removeEventListener('open-portrait-dialog', openPortrait);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const focusable = Array.from(menu?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
    focusable[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); }
      if (event.key === 'Tab' && focusable.length) {
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return <>
    <header className="site-nav">
      <a className="brand" href="#home" aria-label="Go to home"><span>Y<span>.</span></span><b>YASYN<br />NAIT EDDERHM</b></a>
      <nav className="nav-links" aria-label="Primary navigation">{links.slice(1, 5).map((link) => <a key={link.href} className={active === link.href.slice(1) ? 'is-active' : ''} href={link.href}>{link.label}</a>)}</nav>
      <div className="nav-actions"><button type="button" className="avatar-button" onClick={() => setPortraitOpen(true)} aria-haspopup="dialog" aria-label="Open Yasyn's portrait"><Image src="/assets/yasyn-avatar.webp" width={42} height={42} alt="" /></button><a className="nav-contact" href="mailto:bobies431@gmail.com">LET'S TALK <b>↗</b></a><button type="button" className="mobile-menu-button" ref={menuButtonRef} onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>
    <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} ref={menuRef} aria-hidden={!menuOpen}>
      <div className="mobile-menu-count">00 — 05</div><nav aria-label="Mobile navigation">{links.map((link, index) => <a key={link.href} href={link.href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}><span>0{index + 1}</span>{link.label}<b>↘</b></a>)}</nav><a className="mobile-menu-mail" href="mailto:bobies431@gmail.com" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>bobies431@gmail.com <b>↗</b></a>
    </div>
    <PortraitDialog open={portraitOpen} onClose={() => setPortraitOpen(false)} />
  </>;
}
