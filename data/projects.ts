import type { Project } from '@/types/project';

export const projects: Project[] = [
  // ─── Organization ────────────────────────────────────────────────
  {
    slug: 'jewelry-merchant-platform',
    title: 'Jewelry Merchant Platform',
    description: [
      'Full-stack platform built for a jewellery retail merchant.',
      'Web admin panel for inventory management and gold-scheme (chit) enrollment.',
      'Customer-facing mobile storefront for browsing stock and joining schemes.',
    ],
    category: 'Full-Stack Platform',
    type: 'organization',
    techStack: [
      'React',
      'PrimeReact',
      'Node.js',
      'Express',
      'Knex.js',
      'MySQL',
      'Swagger / OpenAPI',
    ],
    architectureNotes: [
      'Two clients, one API: a React + PrimeReact admin panel and a mobile storefront share a single Express service.',
      'Knex.js query builder over MySQL for relational inventory, scheme, and enrollment data, with explicit migrations.',
      'REST contract documented with Swagger / OpenAPI so both clients build against one source of truth.',
    ],
  },

  // ─── Personal ────────────────────────────────────────────────────
  {
    slug: 'handloom-materials-management-system',
    title: 'Handloom Materials Management System',
    description: [
      'Commerce platform connecting handloom weavers with raw-material supply.',
      'Manages material catalogues, orders, and stock for weaver co-operatives.',
    ],
    category: 'Full-Stack Platform',
    type: 'personal',
    techStack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    architectureNotes: [
      'Redux centralises cart, catalogue, and auth state on the React client.',
      'Express REST API backed by MongoDB collections for flexible product / material schemas.',
    ],
  },
  {
    slug: 'file-upload-ai-analysis',
    title: 'File Upload System / AI Analysis',
    description: [
      'Cloud storage service with AI-powered document understanding.',
      'Users upload files; the system extracts, summarises, and answers questions about their contents.',
    ],
    category: 'AI / ML',
    type: 'personal',
    techStack: ['Next.js', 'TypeScript', 'AWS S3', 'MongoDB', 'OpenAI API'],
    architectureNotes: [
      'Next.js App Router serves both UI and API routes; uploads stream to AWS S3 via pre-signed URLs.',
      'File metadata and extracted analysis are persisted in MongoDB, keyed to the S3 object.',
      'OpenAI API performs parsing, summarisation, and retrieval-style Q&A over uploaded content.',
    ],
  },
  {
    slug: 'autonomous-cloud-security-agent',
    title: 'Autonomous Cloud Security Agent',
    description: [
      'AI DevSecOps system that triages cloud security alerts autonomously.',
      'Ingests findings, reasons over context, and proposes or executes remediations.',
    ],
    category: 'Security',
    type: 'personal',
    techStack: ['Python', 'FastAPI', 'LangChain', 'Google Gemini', 'React'],
    architectureNotes: [
      'FastAPI service exposes an alert-ingestion endpoint and an agent-run API.',
      'LangChain orchestrates a Gemini-backed agent loop with tools for enrichment and remediation.',
      'React dashboard surfaces agent decisions, reasoning traces, and human-approval gates.',
    ],
  },
  {
    slug: 'cryptographic-ai-governance-gateway',
    title: 'Cryptographic AI Governance Gateway',
    description: [
      'Stateless interception proxy sitting between enterprise apps and LLM providers.',
      'Enforces policy, redacts sensitive data, and cryptographically attests every exchange.',
    ],
    category: 'Security',
    type: 'personal',
    techStack: ['Python', 'FastAPI'],
    architectureNotes: [
      'Fully stateless FastAPI proxy — horizontally scalable, no session store.',
      'Inline request / response inspection with policy enforcement and PII redaction before egress.',
      'Cryptographic signing of transcripts for tamper-evident audit trails.',
    ],
  },
  {
    slug: 'authentication-system',
    title: 'Authentication System',
    description: [
      'Identity and access-management service.',
      'Handles registration, login, sessions, and credential recovery.',
    ],
    category: 'Security',
    type: 'personal',
    techStack: ['Next.js', 'React', 'TypeScript', 'MongoDB'],
    architectureNotes: [
      'Next.js App Router route handlers implement the auth API; React drives the flows.',
      'MongoDB stores users, hashed credentials, and session / token records.',
      'Built as a drop-in identity layer reusable across other personal projects.',
    ],
  },

  // ─── Experiments (stubs) ─────────────────────────────────────────
  {
    slug: 'exp-mail-inbox',
    title: 'Mail Inbox',
    description: ['Experiment — a minimal web email client / threaded inbox UI.'],
    category: 'Full-Stack Platform',
    type: 'experiment',
    techStack: ['Next.js', 'TypeScript'],
    architectureNotes: ['Stub — exploring threaded-inbox layout and message state.'],
  },
  {
    slug: 'exp-docker-demo',
    title: 'Docker Demo',
    description: ['Experiment — containerising a sample app with Docker.'],
    category: 'Infrastructure',
    type: 'experiment',
    techStack: ['Docker'],
    architectureNotes: ['Stub — multi-stage builds and Compose networking.'],
  },
  {
    slug: 'exp-aws-amplify-practice',
    title: 'AWS Amplify Practice',
    description: ['Experiment — hosting, auth, and data via AWS Amplify.'],
    category: 'Infrastructure',
    type: 'experiment',
    techStack: ['AWS Amplify', 'React'],
    architectureNotes: ['Stub — Amplify hosting, auth, and data categories.'],
  },
  {
    slug: 'exp-jenkins-ci',
    title: 'Jenkins CI',
    description: ['Experiment — a Jenkins pipeline for build / test / deploy.'],
    category: 'Infrastructure',
    type: 'experiment',
    techStack: ['Jenkins'],
    architectureNotes: ['Stub — declarative pipeline, stages, and credentials.'],
  },
];

export default projects;
