import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ProjectVisual } from '@/components/project-visual';
import { projectBySlug, projects } from '@/lib/projects';

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = projectBySlug(slug);
    return project ? { title: `${project.title} — Yasyn Nait Edderhm`, description: project.summary } : {};
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const sections = [
    ['Context', project.caseStudy.context],
    ['Problem', project.caseStudy.problem],
    ['Solution', project.caseStudy.solution],
    ['My contribution', project.contribution],
    ['Architecture', project.caseStudy.architecture],
    ['Challenges', project.caseStudy.challenges],
    ['Lessons learned', project.caseStudy.lessons],
  ];
  return <main className="case-study"><header className="case-nav"><Link href="/#projects"><ArrowLeft size={17} /> BACK TO PROJECTS</Link><span>YASYN NAIT EDDERHM / {project.number}</span></header><section className={`case-hero accent-${project.accent}`}><p>{project.number} / {project.eyebrow}</p><h1>{project.title}</h1><p className="case-summary">{project.summary}</p><div className="case-visual"><ProjectVisual project={project} /></div></section><section className="case-content"><div className="case-side"><p>CASE STUDY</p><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>{project.repository && <a href={project.repository} target="_blank" rel="noopener noreferrer">VIEW REPOSITORY <ArrowUpRight size={15} /></a>}{project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">{project.externalLabel ?? 'OPEN PROJECT'} <ArrowUpRight size={15} /></a>}</div><div className="case-sections">{sections.map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p></article>)}</div></section><footer className="case-footer"><Link href="/#projects">← BACK TO ALL PROJECTS</Link><a href="mailto:bobies431@gmail.com">LET&apos;S BUILD TOGETHER ↗</a></footer></main>;
}
