export const profile = {
  name: 'Prathmesh Jain',
  role: 'Full Stack AI Engineer',
  company: 'TCS',
  location: 'Mumbai, India',
  email: 'prathmeshjain42@gmail.com',
  resume: '/Prathmesh_Jain_Resume.pdf',
  links: {
    github: 'https://github.com/prathmesh-jain',
    linkedin: 'https://www.linkedin.com/in/prathmeshjain22',
    leetcode: 'https://leetcode.com/spider_22/',
  },
}

export const tcs = {
  company: 'Tata Consultancy Services',
  team: 'Research & Innovation, CTO team, BFSI Americas',
  role: 'Full Stack AI Engineer',
  period: 'Oct 2024 – now',
  summary:
    'I build multi-agent AI systems, and the FastAPI + React apps around them, for US banking clients.',
  highlights: [
    { what: 'Compliance screening', result: '1–2 days → under 5 min' },
    { what: 'Payment message repair', result: 'under 30 seconds' },
    { what: 'Credit memo generation', result: '50% less research time' },
  ],
}

export const education = {
  degree: 'B.E. Computer Engineering',
  school: 'Vidyalankar Institute of Technology, Mumbai',
  year: '2024',
  note: 'GPA 9.2 / 10',
}

export interface FlowStep {
  title: string
  detail: string
  tag?: string
}

export interface Decision {
  title: string
  body: string
}

export interface Project {
  slug: string
  index: string
  title: string
  tagline: string
  summary: string
  status: string
  stack: string[]
  links: { live?: string; liveLabel?: string; github?: string }
  cover: string
  coverFit?: 'cover' | 'contain'
  stats: { value: string; label: string }[]
  problem: string[]
  flowTitle: string
  flow: FlowStep[]
  flowNotes?: string[]
  decisions: Decision[]
  gallery: { src: string; alt: string }[]
  galleryLayout?: 'wide' | 'phone'
}

export const projects: Project[] = [
  {
    slug: 'transcribe',
    index: '01',
    title: 'Transcribe',
    tagline: 'Turning hours-long spiritual discourses into searchable PDF transcripts.',
    summary:
      'General transcription tools break on long pravachans that switch between Hindi, English and Sanskrit shlokas. I built a service that handles them, and people use it every day.',
    status: 'Live · 25+ daily users',
    stack: ['React', 'FastAPI', 'Redis', 'PostgreSQL', 'Gemini', 'FFmpeg', 'Langfuse', 'Docker', 'Oracle Cloud', 'Cloudflare'],
    links: { live: 'https://transcribe.contextcrafter.in' },
    cover: '/images/transcribe.webp',
    stats: [
      { value: '50+', label: 'active users' },
      { value: '200+', label: 'lectures transcribed' },
      { value: '~1.5 h', label: 'average lecture length' },
      { value: '90%+', label: 'accuracy (daily eval)' },
      { value: '$0.10–0.15', label: 'cost per transcription' },
    ],
    problem: [
      'Spiritual discourses (pravachans) are long, often 1–3 hours, and the speaker moves between Hindi, English and Sanskrit shlokas mid-sentence. Off-the-shelf transcription tools either mangle the shlokas or choke on the length, and the good ones are expensive at this volume.',
      'People wanted something simple: upload the recording, come back later, download a clean, structured PDF they can read and search.',
    ],
    flowTitle: 'Three services talking over Redis queues',
    flow: [
      { title: 'Upload', detail: 'React app on Cloudflare Pages. Pick language, upload audio, watch live status.', tag: 'client' },
      { title: 'Backend API', detail: 'FastAPI handles auth, job records in PostgreSQL, and pushes a job to Redis.', tag: 'api' },
      { title: 'CPU worker', detail: 'FFmpeg converts audio and splits it into 20–25 min chunks on silence.', tag: 'cpu-bound' },
      { title: 'IO worker', detail: 'Transcribes each chunk with Gemini, aggregates into structured HTML, renders the PDF.', tag: 'io-bound' },
      { title: 'Eval', detail: 'A daily evaluation pipeline publishes accuracy metrics to self-hosted Langfuse.', tag: 'quality' },
    ],
    flowNotes: [
      'Orphan-task recovery re-queues jobs that a crashed worker left behind.',
      'If Redis goes down, the API fails over to the database so no upload is lost.',
      'Dockerised on Oracle Cloud; Cloudflare DDoS protection in front of both tiers.',
    ],
    decisions: [
      {
        title: 'Split CPU work from IO work',
        body: 'FFmpeg conversion and silence detection are CPU-heavy. Gemini calls mostly wait on the network. Putting them in separate workers means a long FFmpeg job never blocks transcription, and each side can be scaled on its own.',
      },
      {
        title: 'Chunk on silence, not on a timer',
        body: 'Cutting every N minutes can split a word or a shloka in half, and the model then garbles both sides. Splitting at natural pauses into 20–25 minute chunks keeps each chunk coherent while staying well inside the model’s limits.',
      },
      {
        title: 'Measure accuracy every day',
        body: 'Prompt tweaks for Sanskrit and mixed-language speech can quietly make things worse. A daily eval run publishing to Langfuse tells me if accuracy drifts, instead of finding out from users.',
      },
      {
        title: 'Design for the cheap path',
        body: 'Running on Oracle Cloud with Gemini keeps a 1.5-hour lecture at about $0.10–0.15, roughly 75% cheaper than leading alternatives. That matters for a tool used by a community, not a company.',
      },
    ],
    gallery: [
      { src: '/images/transcribe.webp', alt: 'Transcribe landing page' },
      { src: '/images/transcribe1.webp', alt: 'Uploading a lecture with language selection' },
      { src: '/images/transcribe2.webp', alt: 'Dashboard with transcription status and PDF downloads' },
      { src: '/images/transcribe3.webp', alt: 'Transcribe admin view' },
    ],
  },
  {
    slug: 'bizassist',
    index: '02',
    title: 'BizAssist',
    tagline: 'A multi-agent business assistant that loads only the tools it needs.',
    summary:
      'Document Q&A, file analysis and Google Sheets automation behind one chat. The interesting part is semantic tool discovery, which cut prompt context from ~3000 tokens to under 1000.',
    status: 'Live demo · Open source',
    stack: ['React', 'FastAPI', 'LangGraph', 'Qdrant', 'MongoDB', 'Zustand', 'SSE'],
    links: { live: 'https://bizassist.prathmeshjain.in', github: 'https://github.com/prathmesh-jain/BizAssist' },
    cover: '/images/bizassist.webp',
    stats: [
      { value: '~3000 → <1000', label: 'tokens of tool context per request' },
      { value: '5', label: 'graph roles: guardrails, chat, planner, executor, summariser' },
      { value: 'SSE', label: 'live tokens, tool activity and plan status' },
    ],
    problem: [
      'A business assistant needs a lot of tools: document search, invoice parsing, spreadsheet reads and writes, analysis. Sending every tool schema with every request bloats the prompt, costs more and makes the model pick the wrong tool more often.',
      'At the same time, simple questions shouldn’t go through a heavy planning loop, and long tasks shouldn’t leave the user staring at a spinner.',
    ],
    flowTitle: 'A LangGraph state machine with routing',
    flow: [
      { title: 'Guardrails', detail: 'Validates the request before anything expensive runs.', tag: 'gate' },
      { title: 'Chat or Planner', detail: 'Conversational questions answer directly; multi-step tasks get a plan.', tag: 'router' },
      { title: 'Tool discovery', detail: 'Tool metadata lives in a vector DB; only the relevant tools are loaded for this step.', tag: 'qdrant' },
      { title: 'Executor', detail: 'Runs tools: RAG over user documents, OCR, Google Sheets. Can interrupt to ask a clarifying question.', tag: 'tools' },
      { title: 'Summariser', detail: 'Condenses results; every stage streams progress to the UI over SSE.', tag: 'output' },
    ],
    flowNotes: [
      'Document RAG in Qdrant is filtered per user, so no one retrieves someone else’s files.',
      'Ingestion handles PDFs, text, invoices, contracts and image-based documents via multimodal OCR.',
    ],
    decisions: [
      {
        title: 'Retrieve tools like documents',
        body: 'Instead of hard-coding which tools each agent sees, tool descriptions are embedded and searched at runtime. Adding a new tool means indexing it, not editing prompts, and context dropped from ~3000 to under 1000 tokens.',
      },
      {
        title: 'Two paths: chat and plan',
        body: 'Routing simple questions straight to a chat node keeps them fast and cheap. Only real multi-step work pays for planner + executor.',
      },
      {
        title: 'Interrupts over guessing',
        body: 'When a request is ambiguous (which sheet? which month?), the graph pauses with a LangGraph interrupt and asks, instead of hallucinating an answer.',
      },
      {
        title: 'Stream everything',
        body: 'Long workflows stream tokens, tool calls and planner status over SSE into a Zustand store, so the user sees what the agent is doing while it works.',
      },
    ],
    gallery: [
      { src: '/images/bizassist.webp', alt: 'BizAssist landing page' },
      { src: '/images/bizassist1.webp', alt: 'BizAssist chat assistant' },
      { src: '/images/bizassist2.webp', alt: 'Document management' },
      { src: '/images/bizassist3.webp', alt: 'Google Sheets integration and model settings' },
    ],
  },
  {
    slug: 'smartkiranabot',
    index: '03',
    title: 'SmartKiranaBot',
    tagline: 'Running a kirana store’s inventory, billing and khata from Telegram.',
    summary:
      'Small shop owners already live in chat apps. This agent handles stock, GST bills, customer credit (khata) and analytics through a Telegram conversation, with database guardrails so the AI can’t oversell.',
    status: 'Live on Telegram · Open source',
    stack: ['TypeScript', 'Node.js', 'Fastify', 'Vercel AI SDK', 'Zod', 'PostgreSQL', 'Drizzle'],
    links: {
      live: 'https://t.me/SmartKiranaBot',
      liveLabel: 'Open in Telegram',
      github: 'https://github.com/prathmesh-jain/SmartKiranaBot',
    },
    cover: '',
    stats: [
      { value: 'Zod', label: 'validated tool calls for every action' },
      { value: 'Atomic', label: 'non-negative stock updates in Postgres' },
      { value: 'PDF + PPT', label: 'GST invoices and reports, delivered in chat' },
    ],
    problem: [
      'A kirana owner won’t learn a new dashboard. But letting an LLM write directly to inventory and billing is risky: one bad tool call can oversell stock or corrupt a customer’s balance.',
    ],
    flowTitle: 'Chat in, validated tools, safe writes',
    flow: [
      { title: 'Telegram webhook', detail: 'Fastify receives updates; idempotency keys drop duplicate deliveries.', tag: 'ingress' },
      { title: 'Agent', detail: 'Vercel AI SDK agent with durable shop memory that survives conversation resets.', tag: 'llm' },
      { title: 'Zod tools', detail: 'Inventory, draft billing, GST line calculations, khata, analytics.', tag: 'tools' },
      { title: 'PostgreSQL', detail: 'Drizzle with atomic, non-negative stock updates and conditional locks.', tag: 'guardrail' },
      { title: 'Artifacts', detail: 'Renders GST invoice PDFs and PowerPoint reports and sends them back into the chat.', tag: 'output' },
    ],
    decisions: [
      {
        title: 'Guardrails live in the database',
        body: 'The model is told not to oversell, but the real guarantee is an atomic update that refuses to take stock below zero, plus conditional locks against race conditions. The model can be wrong; the data can’t.',
      },
      {
        title: 'Webhooks are idempotent',
        body: 'Telegram can redeliver an update. Without idempotency the same bill could be created twice, so every update is processed once.',
      },
      {
        title: 'Bills are drafts first',
        body: 'Multi-turn bill editing lets the owner say “remove the second item” or “make it 3 kg” before finalising, which matches how billing actually happens at a counter.',
      },
    ],
    gallery: [],
  },
  {
    slug: 'expensegauge',
    index: '04',
    title: 'ExpenseGauge',
    tagline: 'An offline-first expense tracker that syncs when the network comes back.',
    summary:
      'A React Native app built for patchy connectivity: every action works offline with optimistic updates, then a background queue reconciles with the server.',
    status: 'Android app · Open source',
    stack: ['React Native', 'Expo', 'Node.js', 'Express', 'MongoDB', 'Zustand', 'NativeWind'],
    links: {
      live: 'https://expensegauge.vercel.app',
      github: 'https://github.com/prathmesh-jain/expensegauge-mobile',
    },
    cover: '/images/expensegauge.webp',
    coverFit: 'contain',
    stats: [
      { value: 'Offline-first', label: 'local store + background sync queue' },
      { value: 'JWT', label: 'short-lived access + rotating refresh tokens' },
      { value: 'Multi-account', label: 'bookkeeping with analytics' },
    ],
    problem: [
      'Expense apps that need the network to save a transaction lose entries exactly when you’re out spending: in shops, on trains, in basements.',
    ],
    flowTitle: 'Write locally, sync later',
    flow: [
      { title: 'Local write', detail: 'Transaction saved on device; UI updates optimistically.', tag: 'device' },
      { title: 'Sync queue', detail: 'Pending changes queued while offline.', tag: 'queue' },
      { title: 'Reconcile', detail: 'On reconnect, the queue replays against the API and resolves state.', tag: 'sync' },
      { title: 'API', detail: 'Express + MongoDB with transactional balance updates.', tag: 'server' },
    ],
    decisions: [
      {
        title: 'Optimistic by default',
        body: 'The app never waits for the server to show a change. The sync queue is responsible for eventually making the server agree.',
      },
      {
        title: 'Rotating refresh tokens',
        body: 'Short-lived access tokens with automatic refresh keep sessions secure without logging people out mid-week.',
      },
    ],
    gallery: [
      { src: '/images/expensegauge1.webp', alt: 'ExpenseGauge home screen' },
      { src: '/images/expensegauge2.webp', alt: 'ExpenseGauge transactions' },
      { src: '/images/expensegauge3.webp', alt: 'ExpenseGauge analytics' },
      { src: '/images/expensegauge4.webp', alt: 'ExpenseGauge accounts' },
    ],
    galleryLayout: 'phone',
  },
]

export const otherWork = [
  {
    title: 'react-stepper-lite',
    detail: 'A lightweight React stepper component, published on npm.',
    href: 'https://www.npmjs.com/package/react-stepper-lite',
  },
]

export const toolbox: { group: string; items: string[] }[] = [
  {
    group: 'AI / LLM',
    items: ['LangGraph', 'LangChain', 'CrewAI', 'Vercel AI SDK', 'RAG & evaluation', 'MCP / FastMCP', 'Langfuse', 'Azure OpenAI', 'Gemini', 'Mistral OCR'],
  },
  { group: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Fastify', 'Express', 'SSE', 'Async workers', 'Playwright'] },
  { group: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'React Native', 'Zustand', 'Redux Toolkit', 'Tailwind CSS'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Qdrant', 'Drizzle'] },
  { group: 'Infra', items: ['Docker', 'AWS EC2', 'Oracle Cloud', 'Cloudflare', 'Dokploy', 'Vercel'] },
]
