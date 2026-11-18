import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { ExperienceShell } from '@/components/experience-shell';
import { Hero } from '@/components/hero';
import { JourneySection } from '@/components/journey-section';
import { Navigation } from '@/components/navigation';
import { ProjectsSection } from '@/components/projects-section';
import { SkillsConstellation } from '@/components/skills-constellation';

export default function HomePage() {
  return (
    <ExperienceShell>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <SkillsConstellation />
        <JourneySection />
        <ContactSection />
      </main>
    </ExperienceShell>
  );
}
