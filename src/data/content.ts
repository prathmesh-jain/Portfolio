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

export interface Job {
  company: string
  role: string
  team?: string
  location: string
  start: string
  /** leave undefined while it's your current job */
  end?: string
  logo?: string
  summary: string
  highlights: { what: string; result: string }[]
}

/**
 * Work history, newest first. When you join a new company, add it at the top
 * and set `end` on the previous job (e.g. end: 'Jan 2027').
 */
export const experience: Job[] = [
  {
    company: 'Tata Consultancy Services',
    role: 'Full Stack AI Engineer',
    team: 'Research & Innovation, CTO team, BFSI Americas',
    location: 'Mumbai',
    start: 'Oct 2024',
    logo: '/images/tcs.webp',
    summary: 'Built multi-agent AI systems, and the FastAPI + React apps around them, for US banking clients.',
    highlights: [
      { what: 'Compliance screening', result: '1–2 days → under 5 min' },
      { what: 'Payment message repair', result: 'under 30 seconds' },
      { what: 'Credit memo generation', result: '50% less research time' },
    ],
  },
]

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
  /** short handwritten margin note */
  note: string
  /** set for team projects so credit is shared honestly */
  team?: { size: number }
  /** illustration used when there is no screenshot */
  mock?: 'telegram' | 'memory'
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
    slug: 'memory-dump',
    index: '01',
    title: 'Memory Dump',
    tagline: 'A private memory library that never confuses an AI guess with a fact.',
    summary:
      'Upload photos and documents, answer a few optional questions like “Is this Mummy?”, then ask “photos of me with Rohan”. Faces, scenes and documents are read in the background, every answer links to its source, and nothing a model suggests becomes true until you confirm it.',
    status: 'In development',
    note: 'AI guesses never become facts',
    mock: 'memory',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'pgvector', 'Better Auth', 'Hindsight', 'YuNet + AuraFace', 'OpenAI', 'Oracle Object Storage', 'Docker'],
    links: {},
    cover: '',
    stats: [
      { value: 'Suggestions only', label: 'no face is auto-assigned to a person' },
      { value: '512-D', label: 'face embeddings, never sent to an LLM' },
      { value: '1 bank / user', label: 'isolated long-term memory' },
      { value: '0 brokers', label: 'Postgres is the job queue' },
    ],
    problem: [
      'Photo apps can find faces, but they don’t know that this face is “Mummy” or that “bhai” and “elder brother” mean the same person. And AI tools that “remember” things mix up what you told them with what they guessed, so you can’t tell which answers to trust. Reject a wrong guess and it comes back next week.',
      'I wanted a memory app where what you confirmed, what was only suggested and what you rejected stay separate all the way from upload to search.',
    ],
    flowTitle: 'Upload once, the worker does the rest',
    flow: [
      { title: 'Upload', detail: 'Next.js app; files stream through FastAPI into Oracle object storage, hashed on the way in.', tag: 'client' },
      { title: 'Job queue', detail: 'Every change and its follow-up job commit in one Postgres transaction; workers claim jobs with SKIP LOCKED.', tag: 'postgres' },
      { title: 'Worker', detail: 'EXIF + thumbnail, faces (YuNet + AuraFace), pgvector matching, scene descriptions, document text.', tag: 'pipeline' },
      { title: 'Questions', detail: '“Is this Mummy?” Answers are stored as confirmed, rejected or skipped, never merged.', tag: 'review' },
      { title: 'Memory & search', detail: 'One Hindsight document per file and person, rendered from the database; results are re-checked before showing.', tag: 'recall' },
    ],
    flowNotes: [
      'Sign-in with Better Auth (Google + email codes); FastAPI only trusts short-lived JWTs it verifies against the JWKS.',
      'Every table carries user_id and child rows use composite (id, user_id) keys, so the database itself refuses cross-user references.',
      'Each worker stage is independent: a failed scene description never loses the faces found in the same photo.',
    ],
    decisions: [
      {
        title: 'Guesses stay guesses',
        body: 'Unknown isn’t false, skipped isn’t rejected, inferred isn’t confirmed. Face matches are only ever suggestions, and a rejected fact is kept as a tombstone so it can’t be suggested again.',
      },
      {
        title: 'The database is the truth, memory is a projection',
        body: 'Hindsight never sees raw events. It gets one document per file and person, re-rendered from current state. Search results from stale or deleted documents are dropped, and a generated answer is shown only if every memory behind it still checks out.',
      },
      {
        title: 'Postgres as the queue',
        body: 'Jobs are enqueued in the same transaction as the change that needs them, so nothing is ever saved without its follow-up work. No extra broker to run or lose messages.',
      },
      {
        title: 'Understand how people actually talk',
        body: 'Relationship words like “bhai”, “jiju” and “Mummy” map to canonical relations, so “who is my bhai?” is answered straight from your records, even when the memory engine is down.',
      },
    ],
    gallery: [],
  },
  {
    slug: 'bizassist',
    index: '02',
    title: 'BizAssist',
    tagline: 'A multi-agent business assistant that loads only the tools it needs.',
    summary:
      'Document Q&A, file analysis and Google Sheets automation behind one chat. The interesting part is semantic tool discovery, which cut prompt context from ~3000 tokens to under 1000.',
    status: 'Live demo · Open source',
    note: "~3000 → <1000 tokens of context",
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
    note: "the AI literally can’t oversell stock",
    stack: ['TypeScript', 'Node.js', 'Fastify', 'Vercel AI SDK', 'Zod', 'PostgreSQL', 'Drizzle'],
    links: {
      live: 'https://t.me/SmartKiranaBot',
      liveLabel: 'Open in Telegram',
      github: 'https://github.com/prathmesh-jain/SmartKiranaBot',
    },
    mock: 'telegram',
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
    slug: 'transcribe',
    index: '04',
    title: 'Transcribe',
    tagline: 'Turning hours-long spiritual discourses into searchable PDF transcripts.',
    summary:
      'General transcription tools break on long pravachans that switch between Hindi, English and Sanskrit shlokas. Three of us built a service that handles them, and people use it every day.',
    status: 'Live · 25+ daily users',
    note: "25+ people use this every day!",
    team: { size: 3 },
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
        body: 'Prompt tweaks for Sanskrit and mixed-language speech can quietly make things worse. A daily eval run publishing to Langfuse tells us if accuracy drifts, instead of finding out from users.',
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
    slug: 'expensegauge',
    index: '05',
    title: 'ExpenseGauge',
    tagline: 'A money tracker that keeps working when the network doesn’t.',
    summary:
      'An Expo app for tracking spending across accounts. Writes queue up on the phone and sync when the connection comes back, the server quietly drops duplicates, and balances stay correct because every change runs in a transaction.',
    status: 'Android app · Open source',
    note: 'works with zero signal',
    stack: ['React Native', 'Expo Router', 'TypeScript', 'Zustand', 'Node.js', 'Express 5', 'MongoDB', 'PDFKit', 'Brevo'],
    links: {
      live: 'https://expensegauge.vercel.app',
      github: 'https://github.com/prathmesh-jain/expensegauge-mobile',
    },
    cover: '/images/expensegauge.webp',
    coverFit: 'contain',
    stats: [
      { value: 'Offline queue', label: 'survives restarts, retries with backoff' },
      { value: 'clientId', label: 'idempotent sync, no duplicate expenses' },
      { value: 'AES-256-GCM', label: 'expense details encrypted at rest' },
      { value: 'On-device ML', label: 'Naive Bayes category suggestions' },
    ],
    problem: [
      'Expense apps that need the network to save a transaction lose entries exactly when you’re out spending: in shops, on trains, in basements. And the naive fix, “retry later”, creates a new problem: the same expense saved twice, and balances that slowly drift.',
      'It also had to handle a second kind of user: an admin who creates accounts for other people, assigns them balances and sees where the money went.',
    ],
    flowTitle: 'Write on the phone, settle on the server',
    flow: [
      { title: 'Local write', detail: 'The expense is saved on the device and shown at once, tagged with a client-generated ID.', tag: 'device' },
      { title: 'Offline queue', detail: 'Persisted in AsyncStorage, survives app restarts, retries 5xx / 408 / 429 with backoff and jitter.', tag: 'queue' },
      { title: 'Express API', detail: 'A unique index on clientId turns a retried request into a no-op instead of a duplicate.', tag: 'idempotent' },
      { title: 'Transaction', detail: 'Expense, account balance and running balance are written together in one MongoDB transaction.', tag: 'consistent' },
      { title: 'Reports', detail: 'Monthly stats are cached per user; PDF reports are built with PDFKit and emailed through Brevo.', tag: 'output' },
    ],
    flowNotes: [
      'If a queued expense points at an account deleted in the meantime, it falls back to the Primary account instead of failing the sync.',
      'Google Sign-In and email login, short-lived access tokens with rotating refresh tokens kept in Secure Store.',
      'The backend tells the app about updates: OTA, APK or Play Store, optional or forced.',
    ],
    decisions: [
      {
        title: 'Make retries harmless',
        body: 'Offline sync means the same request can arrive twice. Every expense carries a clientId with a unique index behind it, so the server can accept retries forever without creating duplicates.',
      },
      {
        title: 'Store the running balance',
        body: 'Each transaction saves the balance after it (afterBalance). The app can draw balance history immediately instead of replaying every past transaction.',
      },
      {
        title: 'Refresh the token once',
        body: 'When the access token expires, only one refresh request goes out. Every other request waits for it and then retries, and the user is logged out only if the refresh itself fails.',
      },
      {
        title: 'Guess categories on the phone, carefully',
        body: 'A small Naive Bayes model bundled with the app suggests a category as you type, even offline. When it isn’t confident it says “Other” instead of guessing.',
      },
      {
        title: 'Encrypt what’s personal',
        body: 'Expense details are encrypted with AES-256-GCM in a schema setter, so controllers never deal with it. An idempotent migration encrypted old rows while the app stayed live.',
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
