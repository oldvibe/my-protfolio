'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { MagneticLink } from '@/components/magnetic-link';

const HeroScene = dynamic(() => import('@/components/hero-scene'), { ssr: false, loading: () => <div className="hero-scene-fallback" aria-hidden="true" /> });

export function Hero() {
  const openPortrait = () => window.dispatchEvent(new Event('open-portrait-dialog'));
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <div className="hero-raster" aria-hidden="true" /><HeroScene />
    <div className="hero-top-meta"><span><i /> BASED IN MOROCCO</span><span>SCROLL TO EXPLORE <ArrowDownRight size={13} /></span></div>
    <div className="hero-content"><p className="section-eyebrow" data-reveal>FULL-STACK DEVELOPER <b>×</b> UI / UX THINKING</p><h1 id="hero-title"><span data-reveal>BUILDING</span><span className="outline" data-reveal>WHAT'S NEXT.</span></h1><p className="hero-copy" data-reveal>I&apos;m <strong>Yasyn Nait Edderhm</strong> — a software developer who turns complex problems into considered systems and clear digital experiences.</p><div className="hero-ctas" data-reveal><MagneticLink className="button button-primary" href="#projects">EXPLORE PROJECTS <ArrowDownRight size={16} /></MagneticLink><a className="text-action" href="#about">MORE ABOUT ME <ArrowDownRight size={16} /></a></div></div>
    <div className="hero-portrait-wrap"><div className="portrait-orbit orbit-a" aria-hidden="true" /><div className="portrait-orbit orbit-b" aria-hidden="true" /><button className="hero-portrait" type="button" onClick={openPortrait} aria-label="View portrait and professional details"><Image src="/assets/yasyn-portrait.webp" fill priority sizes="(max-width: 760px) 86vw, 46vw" alt="Yasyn Nait Edderhm wearing a black suit" /><span className="portrait-label">CLICK TO EXPAND <ArrowUpRight size={14} /></span></button><div className="hero-code-card" aria-hidden="true"><span>01 / CURRENT MODE</span><b>DESIGN<br />+ ENGINEER</b><i /></div></div>
    <div className="hero-footer"><span>YNE / PORTFOLIO</span><span>2026</span><span>01 — 05</span></div>
  </section>;
}
