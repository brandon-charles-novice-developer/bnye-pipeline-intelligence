// Architecture — React Flow nodes and edges mirroring real system
// Layout: horizontal left-to-right in 5 layers

// Layout helper: compute x,y from layer and index within that layer
const LAYER_X = {
  'data-source': 0,
  'search': 200,
  'knowledge': 400,
  'agent': 650,
  'orchestrator': 900,
  'output': 1150,
}

const LAYER_SPACING_Y = 120
const LAYER_OFFSETS_Y = {
  'data-source': 0,
  'search': 40,
  'knowledge': 120,
  'agent': 60,
  'orchestrator': 140,
  'output': 40,
}

function pos(layer, index) {
  return {
    x: LAYER_X[layer],
    y: LAYER_OFFSETS_Y[layer] + index * LAYER_SPACING_Y,
  }
}

export const nodes = [
  // Data Source Layer (left)
  { id: 'gmail',     type: 'custom', position: pos('data-source', 0), data: { label: 'Gmail',           description: 'Email search, traction detection, draft creation',        status: 'connected',    category: 'data-source', tools: ['gmail_search_messages', 'gmail_read_thread', 'gmail_create_draft'] } },
  { id: 'calendar',  type: 'custom', position: pos('data-source', 1), data: { label: 'Google Calendar',  description: 'Interview scheduling, free time lookup',                  status: 'connected',    category: 'data-source', tools: ['gcal_list_events', 'gcal_create_event', 'gcal_find_free_time'] } },
  { id: 'granola',   type: 'custom', position: pos('data-source', 2), data: { label: 'Granola',          description: 'Meeting transcripts and conversation context',            status: 'connected',    category: 'data-source', tools: ['get_meetings', 'get_meeting_transcript'] } },
  { id: 'figma',     type: 'custom', position: pos('data-source', 3), data: { label: 'Figma',            description: 'Design context and screenshot capture',                   status: 'disconnected', category: 'data-source', tools: ['get_design_context', 'get_screenshot'] } },

  // Search Layer
  { id: 'linkedin',  type: 'custom', position: pos('search', 0), data: { label: 'LinkedIn',          description: 'Profile research, job search, InMail, company intel',     status: 'degraded',     category: 'search',      tools: ['search_jobs', 'get_person_profile', 'send_message'] } },
  { id: 'indeed',    type: 'custom', position: pos('search', 1), data: { label: 'Indeed',             description: 'Job discovery, company data, salary estimates',           status: 'connected',    category: 'search',      tools: ['search_jobs', 'get_job_details', 'get_company_data'] } },
  { id: 'dice',      type: 'custom', position: pos('search', 2), data: { label: 'Dice',               description: 'Tech job search and skills matching',                     status: 'connected',    category: 'search',      tools: ['search_jobs', 'get_job_details'] } },

  // Knowledge Layer
  { id: 'qmd',       type: 'custom', position: pos('knowledge', 0), data: { label: 'QMD',              description: 'Local search engine: BM25 + vector + HYDE over vault',    status: 'connected',    category: 'knowledge',   tools: ['query', 'get', 'multi_get'] } },
  { id: 'vault',     type: 'custom', position: pos('knowledge', 1), data: { label: 'Obsidian Vault',   description: 'Second brain: pipeline notes, wiki, reflections',         status: 'connected',    category: 'knowledge',   tools: ['Read', 'Write', 'Glob'] } },

  // Agent Layer
  { id: 'scout',     type: 'custom', position: pos('agent', 0), data: { label: 'Scout',             description: 'Discovers and scores opportunities across job boards',     status: 'running',      category: 'agent',       connections: ['indeed', 'dice', 'linkedin', 'qmd'] } },
  { id: 'packager',  type: 'custom', position: pos('agent', 1), data: { label: 'Packager',          description: 'Builds cover letters, InMails, HM research packages',     status: 'idle',         category: 'agent',       connections: ['gmail', 'linkedin', 'qmd', 'drive'] } },
  { id: 'sync',      type: 'custom', position: pos('agent', 2), data: { label: 'Sync',              description: 'Reconciles pipeline across Gmail, Sheets, vault',         status: 'running',      category: 'agent',       connections: ['gmail', 'sheets', 'vault'] } },
  { id: 'triage',    type: 'custom', position: pos('agent', 3), data: { label: 'Triage',            description: 'Classifies messages, prioritizes actions, routes work',   status: 'idle',         category: 'agent',       connections: ['gmail', 'calendar', 'granola'] } },

  // Orchestrator Layer
  { id: 'claude',    type: 'custom', position: pos('orchestrator', 0), data: { label: 'Claude Code',       description: 'Primary orchestrator: dispatches agents, runs skills',     status: 'connected',    category: 'orchestrator' } },
  { id: 'cron',      type: 'custom', position: pos('orchestrator', 1), data: { label: 'CronCreate',        description: 'Scheduled triggers: 5 PM close-out, 11 PM build',        status: 'connected',    category: 'orchestrator' } },

  // Output Layer
  { id: 'sheets',    type: 'custom', position: pos('output', 0), data: { label: 'Google Sheets',     description: 'Pipeline tracker, application log, funnel metrics',       status: 'connected',    category: 'output' } },
  { id: 'drive',     type: 'custom', position: pos('output', 1), data: { label: 'Google Drive',      description: 'Cover letters, resumes, testimonials per company',        status: 'connected',    category: 'output' } },
  { id: 'decks',     type: 'custom', position: pos('output', 2), data: { label: 'Sprint Decks',      description: 'MARP execution decks in Obsidian vault',                  status: 'connected',    category: 'output' } },
]

export const edges = [
  // Scout → Data Sources
  { id: 'e-scout-indeed',   source: 'indeed',   target: 'scout',    label: 'listings',       animated: true },
  { id: 'e-scout-dice',     source: 'dice',     target: 'scout',    label: 'listings',       animated: true },
  { id: 'e-scout-linkedin', source: 'linkedin', target: 'scout',    label: 'jobs + profiles', animated: true },
  { id: 'e-scout-qmd',      source: 'qmd',      target: 'scout',    label: 'dedup check',    animated: false },

  // Packager → Data Sources
  { id: 'e-pack-gmail',     source: 'gmail',    target: 'packager', label: 'thread context',  animated: false },
  { id: 'e-pack-linkedin',  source: 'linkedin', target: 'packager', label: 'HM profiles',    animated: false },
  { id: 'e-pack-qmd',       source: 'qmd',      target: 'packager', label: 'wiki + voice',   animated: false },

  // Sync → Data Sources
  { id: 'e-sync-gmail',     source: 'gmail',    target: 'sync',     label: 'traction scan',  animated: true },
  { id: 'e-sync-vault',     source: 'vault',    target: 'sync',     label: 'pipeline notes', animated: false },

  // Triage → Data Sources
  { id: 'e-triage-gmail',   source: 'gmail',    target: 'triage',   label: 'inbox',          animated: false },
  { id: 'e-triage-cal',     source: 'calendar', target: 'triage',   label: 'meetings',       animated: false },
  { id: 'e-triage-granola', source: 'granola',  target: 'triage',   label: 'transcripts',    animated: false },

  // Orchestrator → Agents
  { id: 'e-claude-scout',   source: 'claude',   target: 'scout',    label: 'dispatch',       animated: true },
  { id: 'e-claude-pack',    source: 'claude',   target: 'packager', label: 'dispatch',       animated: true },
  { id: 'e-claude-sync',    source: 'claude',   target: 'sync',     label: 'dispatch',       animated: true },
  { id: 'e-claude-triage',  source: 'claude',   target: 'triage',   label: 'dispatch',       animated: true },
  { id: 'e-cron-claude',    source: 'cron',     target: 'claude',   label: 'scheduled',      animated: true },

  // Agents → Outputs
  { id: 'e-pack-drive',     source: 'packager', target: 'drive',    label: 'packages',       animated: false },
  { id: 'e-sync-sheets',    source: 'sync',     target: 'sheets',   label: 'pipeline data',  animated: true },
  { id: 'e-scout-decks',    source: 'scout',    target: 'decks',    label: 'candidates',     animated: false },
  { id: 'e-pack-decks',     source: 'packager', target: 'decks',    label: 'sprint deck',    animated: false },

  // Knowledge cross-links
  { id: 'e-vault-qmd',      source: 'vault',    target: 'qmd',      label: 'index',          animated: false },
]
