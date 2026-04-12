// System commands — mirrors real CLI skill inventory

const commands = [
  { name: '/hunt', category: 'discovery', description: 'Scan job boards with 9-criterion scoring and deduplication', frequency: 'daily' },
  { name: '/go', category: 'packaging', description: 'Generate full application package: cover letter, InMail, HM research', frequency: 'daily' },
  { name: '/done', category: 'pipeline', description: 'Log application as submitted, sync to Sheet and memory', frequency: 'daily' },
  { name: '/pulse', category: 'intelligence', description: 'Lifecycle-grouped pipeline dashboard with Gmail traction scan', frequency: 'daily' },
  { name: '/sync', category: 'pipeline', description: 'Full pipeline sync across Gmail, JSON, Sheet, and vault', frequency: 'daily' },
  { name: '/status', category: 'pipeline', description: 'Check company status with 90-day Gmail thread history', frequency: 'on-demand' },
  { name: '/prep', category: 'intelligence', description: 'Interview preparation with company research and talking points', frequency: 'on-demand' },
  { name: '/debrief', category: 'intelligence', description: 'Post-interview analysis from Granola transcript', frequency: 'on-demand' },
  { name: '/sprint-close', category: 'system', description: 'Parse today\'s deck, update pipeline, run exhaustive hunt', frequency: 'daily (5 PM)' },
  { name: '/sprint-build', category: 'system', description: 'Build full application packages from candidates list', frequency: 'daily (11 PM)' },
  { name: '/morning', category: 'system', description: 'Generate priority-ordered daily execution queue', frequency: 'daily' },
  { name: '/stand', category: 'intelligence', description: 'Strategic funnel metrics, velocity, and aging analysis', frequency: 'weekly' },
  { name: '/ingest', category: 'intelligence', description: 'Ingest source document into the LLM Wiki knowledge base', frequency: 'on-demand' },
  { name: '/query', category: 'intelligence', description: 'Ask questions against compiled wiki articles', frequency: 'on-demand' },
  { name: '/ghost', category: 'packaging', description: 'Answer as candidate voice — loads tone, metrics, stories', frequency: 'on-demand' },
  { name: '/challenge', category: 'intelligence', description: 'Devil\'s advocate pressure-test for ideas and positioning', frequency: 'on-demand' },
  { name: '/tidy', category: 'system', description: 'Inbox maintenance — scan, learn noise patterns, clean up', frequency: 'weekly' },
  { name: '/compound', category: 'intelligence', description: 'Capture solved problem as reusable learning', frequency: 'after solving' },
  { name: '/sprint-arm', category: 'system', description: 'Register autonomous CronCreate triggers', frequency: 'weekly' },
  { name: '/sprint-status', category: 'system', description: 'Dashboard — trigger state, deck readiness, learning health', frequency: 'on-demand' },
  { name: '/cal', category: 'system', description: 'Quick calendar entry from natural language input', frequency: 'on-demand' },
  { name: '/task', category: 'system', description: 'Add job search action to Google Tasks', frequency: 'on-demand' },
  { name: '/connect', category: 'intelligence', description: 'Cross-domain bridge finder between two topics', frequency: 'on-demand' },
  { name: '/aristotle', category: 'intelligence', description: 'First principles deconstructor for any challenge', frequency: 'on-demand' },
]

export default commands
