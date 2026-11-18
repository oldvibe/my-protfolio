export type Project = {
  slug: 'atlasmatch' | 'replyflow-ai' | 'inception' | '01blog';
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  contribution: string;
  technologies: string[];
  accent: 'crimson' | 'violet' | 'teal' | 'amber';
  repository?: string;
  externalUrl?: string;
  externalLabel?: string;
  caseStudy: {
    context: string;
    problem: string;
    solution: string;
    architecture: string;
    challenges: string;
    lessons: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'atlasmatch',
    number: '01',
    title: 'AtlasMatch',
    eyebrow: 'WORLD CUP 2030 / TRAVEL & COMMUNITY',
    summary: 'A travel and community platform for exploring host cities, matches, and local catalog data around the 2030 World Cup.',
    contribution: 'Focused on the backend catalog architecture: cities, matches, hotels, restaurants, transport, places, API design, entity relationships, and Flyway migrations.',
    technologies: ['Java 17', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL 17', 'Flyway', 'JPA / Hibernate', 'Docker'],
    accent: 'crimson',
    repository: 'https://github.com/oldvibe/transendence/tree/dev',
    caseStudy: {
      context: 'AtlasMatch is being shaped as a practical way for fans to discover host cities and their match-day surroundings.',
      problem: 'The catalog needed a clear, maintainable data model for several connected domain areas without mixing future community features into the current release.',
      solution: 'A modular catalog foundation exposes read-only endpoints for the seeded city, match, hotel, restaurant, transport, and place data.',
      architecture: 'Spring Boot with JPA and PostgreSQL 17. Flyway owns the schema and seed data; Docker Compose provides a repeatable local stack.',
      challenges: 'Keeping domain relationships, migrations, seed data, and public catalogue responses consistent while preserving room for later features.',
      lessons: 'Clear ownership boundaries and migration discipline make a growing product easier to reason about.',
    },
  },
  {
    slug: 'replyflow-ai',
    number: '02',
    title: 'ReplyFlow AI',
    eyebrow: 'MULTILINGUAL PRODUCT EXPERIMENT',
    summary: 'A multilingual customer-response concept that helps small businesses shape clear replies in English, French, and Arabic.',
    contribution: 'Designed and prototyped an interaction model around labelled template responses and tone-aware selection.',
    technologies: ['Product design', 'Prototype', 'English / French / Arabic', 'Response templates'],
    accent: 'violet',
    externalUrl: 'https://replyflow-ai.pages.dev/',
    externalLabel: 'Open live prototype',
    caseStudy: {
      context: 'ReplyFlow explores a calmer way to help small teams handle everyday customer questions across multiple languages.',
      problem: 'A useful prototype needed to be honest about what was automated while still making the response-selection flow feel tangible.',
      solution: 'The current prototype uses clearly labelled, preset templates with friendly and professional response directions.',
      architecture: 'A front-end product prototype focused on interaction states, language cues, and clear content hierarchy.',
      challenges: 'Making the “AI” concept legible without representing planned live generation as an implemented capability.',
      lessons: 'Trust improves when a product names the difference between what exists today and what is planned.',
    },
  },
  {
    slug: 'inception',
    number: '03',
    title: 'Inception',
    eyebrow: 'CONTAINERIZED INFRASTRUCTURE',
    summary: 'A containerized service environment exploring service isolation, networking, persistent storage, and dependable configuration.',
    contribution: 'Worked through the practical relationship between service containers, reverse proxying, data persistence, and Linux-based operations.',
    technologies: ['Docker', 'Docker Compose', 'NGINX', 'Linux', 'Networking'],
    accent: 'teal',
    caseStudy: {
      context: 'Inception is a systems project centred on building a small service environment from clearly separated containers.',
      problem: 'Infrastructure is easy to make “work once”; the real challenge is making it understandable, isolated, and repeatable.',
      solution: 'Services are defined around explicit responsibilities, connected through Docker networking, and supported by persistent storage where required.',
      architecture: 'Docker Compose orchestrates the local environment, with NGINX serving as the front-facing routing layer.',
      challenges: 'Working through network boundaries, volume behaviour, configuration dependencies, and startup order.',
      lessons: 'The shape of the infrastructure affects how confidently a team can operate and evolve a system.',
    },
  },
  {
    slug: '01blog',
    number: '04',
    title: '01Blog',
    eyebrow: 'COMMUNITY WEB APPLICATION',
    summary: 'A community-oriented full-stack application exploring backend architecture, authentication, and interactive web experiences.',
    contribution: 'Used the project to explore the connection between application structure, identity flows, and a social interface.',
    technologies: ['Spring Boot', 'Angular', 'PostgreSQL', 'REST APIs'],
    accent: 'amber',
    caseStudy: {
      context: '01Blog is an exploration of the moving pieces that turn a content experience into a community product.',
      problem: 'Community-facing interactions need both an approachable interface and dependable foundations for users and data.',
      solution: 'The project brings together a service-led application structure, authentication thinking, and interactive front-end states.',
      architecture: 'A full-stack web application approach using Spring Boot, Angular, PostgreSQL, and REST APIs.',
      challenges: 'Balancing a coherent user flow with the backend concerns behind account-based interaction.',
      lessons: 'The most convincing interfaces are supported by equally thoughtful structure underneath them.',
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
