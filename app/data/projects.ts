import type { Project } from '../types/project';

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

  // ─── Personal (The Workbench) ────────────────────────────────────
  {
    slug: 'fleet-management-system',
    title: 'Real-Time Fleet & Logistics Management',
    description: [
      'Low-latency vehicle telemetry tracking, spatial dispatching, and dynamic route monitoring.',
      'Event-driven FastAPI backend using PostGIS spatial indexing and Redis Pub/Sub for live location streaming.',
      'Interactive React + Vite dashboard displaying vehicle coordinates, geofences, and live telemetry feeds.',
    ],
    category: 'Geospatial & Real-Time',
    type: 'personal',
    githubUrl: 'https://github.com/rajavelavan/fleet_management_system',
    liveUrl: 'https://fleet-management-phi-lovat.vercel.app',
    image: '/projects/fleet-management.png',
    techStack: [
      'FastAPI',
      'PostgreSQL',
      'PostGIS',
      'Redis',
      'React',
      'TypeScript',
      'Docker',
    ],
    architectureNotes: [
      'FastAPI backend decoupled into ingestion routes, telemetry streams, and spatial dispatch services.',
      'PostGIS spatial queries compute nearest-vehicle lookups and geofencing triggers in sub-10ms.',
      'Redis Pub/Sub broadcasts vehicle heartbeat packets asynchronously to connected clients.',
    ],
  },
  {
    slug: 'cryptographic-ai-governance-gateway',
    title: 'Cryptographic AI Governance Gateway',
    description: [
      'Stateless interception proxy sitting between enterprise applications and LLM providers to mitigate data leakage.',
      'High-throughput regex and DLP pattern engine sanitizes PII, keys, and credentials before egress.',
      'Signs interaction transcripts cryptographically to produce tamper-evident audit trails for compliance.',
    ],
    category: 'AI Governance & Infrastructure',
    type: 'personal',
    githubUrl: 'https://github.com/rajavelavan/Enterprise-AI-security-Gateway',
    image: '/projects/ai-governance-gateway.png',
    techStack: [
      'Python',
      'FastAPI',
      'Cryptographic Attestation',
      'DLP Engine',
      'LLM Proxy',
    ],
    architectureNotes: [
      'Horizontally scalable, zero-session reverse proxy architecture built on FastAPI async handlers.',
      'Configurable DLP policies block prohibited prompts or redact sensitive payloads in-flight.',
      'Cryptographic attestations verify the integrity of model inputs and responses for compliance audits.',
    ],
  },
  {
    slug: 'handloom-materials-management-system',
    title: 'Handloom Materials Management System',
    description: [
      'Commerce and inventory platform connecting artisan handloom weavers with raw-material yarn suppliers.',
      'Digitizes yarn catalog browsing, cooperative purchase orders, and stock allocation for weaver societies.',
      'Redux-driven state management with Express REST APIs and flexible MongoDB document schemas.',
    ],
    category: 'Commerce & Supply Chain',
    type: 'personal',
    githubUrl: 'https://github.com/rajavelavan/handloom_materials_management_system',
    image: '/projects/handloom-management.png',
    techStack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    architectureNotes: [
      'Designed specifically for cooperative workflow: yarn batch tracking, pricing, and member order quotas.',
      'Centralized client state with Redux Toolkit for cart, catalog filters, and multi-stage checkout.',
      'Node.js/Express service handling inventory locks and transactional order management over MongoDB.',
    ],
  },

  // ─── Deep Dives (Featured in Chapter 03) ────────────────────────
  {
    slug: 'file-upload-ai-analysis',
    title: 'File Upload System / AI Analysis',
    description: [
      'Cloud storage service with AI-powered document understanding.',
      'Users upload files; the system extracts, summarises, and answers questions about their contents.',
    ],
    category: 'Cloud Storage & Document Intelligence',
    type: 'deep-dive',
    githubUrl: 'https://github.com/rajavelavan/file_upload_system',
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
    category: 'Autonomous Agents & DevSecOps',
    type: 'deep-dive',
    githubUrl: 'https://github.com/rajavelavan/devSecOps-agent',
    techStack: ['Python', 'FastAPI', 'LangChain', 'Google Gemini', 'React'],
    architectureNotes: [
      'FastAPI service exposes an alert-ingestion endpoint and an agent-run API.',
      'LangChain orchestrates a Gemini-backed agent loop with tools for enrichment and remediation.',
      'React dashboard surfaces agent decisions, reasoning traces, and human-approval gates.',
    ],
  },
  {
    slug: 'authentication-system',
    title: 'Authentication System',
    description: [
      'Identity and access-management service.',
      'Handles registration, login, sessions, and credential recovery.',
    ],
    category: 'Identity & Access Management',
    type: 'experiment',
    githubUrl: 'https://github.com/rajavelavan/authentication_system',
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
    category: 'Frontend Architecture',
    type: 'experiment',
    githubUrl: 'https://github.com/rajavelavan/mail_inbox',
    techStack: ['Next.js', 'TypeScript'],
    architectureNotes: ['Stub — exploring threaded-inbox layout and message state.'],
  },
  {
    slug: 'exp-docker-demo',
    title: 'Docker Demo',
    description: ['Experiment — containerising a sample app with Docker.'],
    category: 'Containerization',
    type: 'experiment',
    githubUrl: 'https://github.com/rajavelavan/docker-demo-hmms',
    techStack: ['Docker'],
    architectureNotes: ['Stub — multi-stage builds and Compose networking.'],
  },
  {
    slug: 'exp-aws-amplify-practice',
    title: 'AWS Amplify Practice',
    description: ['Experiment — hosting, auth, and data via AWS Amplify.'],
    category: 'Cloud Services',
    type: 'experiment',
    githubUrl: 'https://github.com/rajavelavan/aws-amplify-practice',
    techStack: ['AWS Amplify', 'React'],
    architectureNotes: ['Stub — Amplify hosting, auth, and data categories.'],
  },
  {
    slug: 'exp-jenkins-ci',
    title: 'Jenkins CI',
    description: ['Experiment — a Jenkins pipeline for build / test / deploy.'],
    category: 'CI/CD Automation',
    type: 'experiment',
    githubUrl: 'https://github.com/rajavelavan/sample_for_jenkins',
    techStack: ['Jenkins'],
    architectureNotes: ['Stub — declarative pipeline, stages, and credentials.'],
  },
];

export default projects;
