'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/projects';
import { ProjectVisual } from '@/components/project-visual';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState('01');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || window.matchMedia('(max-width: 840px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      const travel = () => Math.max(0, track.scrollWidth - window.innerWidth + 90);
      gsap.to(track, {
        x: () => -travel(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(1200, travel() * 1.05)}`,
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(projects.length - 1, Math.floor(self.progress * projects.length));
            const next = projects[index].number;
            setCurrent((previous) => previous === next ? previous : next);
          },
        },
      });
    }, section);
    return () => context.revert();
  }, []);

  return <section className="projects-section" id="projects" ref={sectionRef} aria-labelledby="projects-title">
    <div className="projects-shell"><div className="projects-heading"><div><div className="section-number"><span>02</span><i /> SELECTED SYSTEMS</div><h2 id="projects-title">Engineering,<br /><span>in motion.</span></h2></div><div className="projects-header-copy"><p>Scroll through a set of products and systems built to explore real technical questions.</p><span><b>{current}</b> / 04</span></div></div><div className="projects-viewport"><div className="projects-track" ref={trackRef}>{projects.map((project) => <article className={`project-card accent-${project.accent}`} key={project.slug}><div className="project-visual-wrap"><ProjectVisual project={project} /></div><div className="project-content"><p className="project-number">{project.number} <span>{project.eyebrow}</span></p><h3>{project.title}</h3><p className="project-summary">{project.summary}</p><p className="project-contribution"><b>MY FOCUS</b>{project.contribution}</p><div className="project-tags">{project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}</div><Link href={`/projects/${project.slug}`} className="project-case-link">EXPLORE CASE STUDY <ArrowUpRight size={16} /></Link></div></article>)}<div className="projects-end" aria-hidden="true"><span>MORE<br />TO<br />BUILD.</span><i>↘</i></div></div></div></div>
  </section>;
}
