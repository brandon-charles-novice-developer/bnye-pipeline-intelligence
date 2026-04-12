// Pipeline Intelligence — design tokens (blue/emerald accent)

export const bg = {
  base:    '#1E1A2E',
  card:    '#252040',
  hover:   '#2D2750',
  divider: 'rgba(255, 255, 255, 0.06)',
}

export const brand = {
  primary: '#3B82F6',
  deep:    '#2563EB',
}

export const accent = {
  blue:    '#3B82F6',
  emerald: '#10B981',
  lilac:   '#C4B5FD',
}

export const semantic = {
  positive: '#22C55E',
  negative: '#EF4444',
  caution:  '#F59E0B',
  muted:    '#AFADAD',
  text:     '#FFFFFF',
}

export const chart = {
  primary:   '#3B82F6',
  secondary: '#10B981',
  tertiary:  '#C4B5FD',
  positive:  '#22C55E',
  caution:   '#F59E0B',
}

export const glass = {
  card:           'rgba(255, 255, 255, 0.05)',
  cardHover:      'rgba(255, 255, 255, 0.08)',
  cardBorder:     'rgba(255, 255, 255, 0.10)',
  cardBorderHover:'rgba(255, 255, 255, 0.15)',
  headerBg:       'rgba(30, 26, 46, 0.70)',
  zone1:          'rgba(30, 26, 46, 0.60)',
  zone2:          'rgba(59, 130, 246, 0.12)',
  zone3:          'rgba(37, 32, 64, 0.50)',
  blur:           'blur(14px)',
}

export const tooltipStyle = {
  backgroundColor: 'rgba(30, 26, 46, 0.85)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.10)',
  borderRadius: 12,
  fontSize: 12,
  color: '#FFFFFF',
  padding: '8px 12px',
}

// Pipeline status colors
export const statusColors = {
  warm:         { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' },
  applied:      { bg: 'rgba(59, 130, 246, 0.15)',  color: '#3B82F6' },
  interviewing: { bg: 'rgba(16, 185, 129, 0.15)',  color: '#10B981' },
  offer:        { bg: 'rgba(34, 197, 94, 0.15)',   color: '#22C55E' },
  rejected:     { bg: 'rgba(239, 68, 68, 0.15)',   color: '#EF4444' },
  watching:     { bg: 'rgba(175, 173, 173, 0.15)', color: '#AFADAD' },
}

// Agent model colors
export const modelColors = {
  'Claude Opus':   { bg: 'rgba(59, 130, 246, 0.15)',  color: '#3B82F6' },
  'Claude Sonnet': { bg: 'rgba(16, 185, 129, 0.15)',  color: '#10B981' },
  'Claude Haiku':  { bg: 'rgba(196, 181, 253, 0.15)', color: '#C4B5FD' },
}

// MCP server category colors
export const categoryColors = {
  'data-source': '#3B82F6',
  'search':      '#10B981',
  'knowledge':   '#C4B5FD',
}

// Architecture node category colors
export const nodeColors = {
  'mcp-server':    '#3B82F6',
  'agent':         '#10B981',
  'data-store':    '#C4B5FD',
  'orchestrator':  '#F59E0B',
  'output':        '#22C55E',
}
