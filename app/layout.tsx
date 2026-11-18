import type { Metadata } from 'next';
import './globals.css';
import './overrides.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: 'Yasyn Nait Edderhm — Software Developer',
  description: 'Full-stack developer from Morocco building reliable systems and thoughtful digital experiences.',
  metadataBase: new URL(siteUrl ?? 'http://localhost:3000'),
  alternates: siteUrl ? { canonical: '/' } : undefined,
  openGraph: {
    title: 'Yasyn Nait Edderhm — Software Developer',
    description: 'Building systems. Creating experiences.',
    type: 'website',
    images: ['/assets/yasyn-portrait.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yasyn Nait Edderhm — Software Developer',
    description: 'Building systems. Creating experiences.',
    images: ['/assets/yasyn-portrait.webp'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yasyn Nait Edderhm',
    jobTitle: 'Software Developer',
    url: siteUrl,
    sameAs: ['https://github.com/oldvibe', 'https://linkedin.com/in/yasyn-nait-edderhm'],
    alumniOf: ['1337 Rabat (UM6P)', 'Zone 01 Oujda'],
    knowsAbout: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL', 'Docker'],
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {children}
      </body>
    </html>
  );
}
