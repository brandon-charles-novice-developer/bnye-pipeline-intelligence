// Pipeline Intelligence — design tokens (high-contrast ops)

export const bg = {
  base:    '#0D0D12',
  card:    '#141418',
  hover:   '#1A1A20',
  divider: 'rgba(255, 255, 255, 0.06)',
}

export const brand = {
  primary: '#00FF88',
  deep:    '#00CC6A',
}

export const accent = {
  blue:    '#22D3EE',
  emerald: '#00FF88',
  lilac:   '#22D3EE',
}

export const semantic = {
  positive: '#22C55E',
  negative: '#EF4444',
  caution:  '#F59E0B',
  muted:    '#6B7280',
  text:     '#FFFFFF',
}

export const chart = {
  primary:   '#00FF88',
  secondary: '#22D3EE',
  tertiary:  '#3B82F6',
  positive:  '#22C55E',
  caution:   '#F59E0B',
}

export const glass = {
  card:           'rgba(255, 255, 255, 0.03)',
  cardHover:      'rgba(255, 255, 255, 0.05)',
  cardBorder:     'rgba(0, 255, 136, 0.12)',
  cardBorderHover:'rgba(0, 255, 136, 0.25)',
  headerBg:       'rgba(13, 13, 18, 0.92)',
  zone1:          'rgba(13, 13, 18, 0.60)',
  zone2:          'rgba(0, 255, 136, 0.08)',
  zone3:          'rgba(20, 20, 24, 0.50)',
  blur:           'none',
}

export const tooltipStyle = {
  backgroundColor: 'rgba(13, 13, 18, 0.95)',
  border: '1px solid rgba(0, 255, 136, 0.12)',
  borderRadius: 6,
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
  'Claude Opus':   { bg: 'rgba(34, 211, 238, 0.15)',  color: '#22D3EE' },
  'Claude Sonnet': { bg: 'rgba(0, 255, 136, 0.15)',   color: '#00FF88' },
  'Claude Haiku':  { bg: 'rgba(59, 130, 246, 0.15)',  color: '#3B82F6' },
}

// MCP server category colors
export const categoryColors = {
  'data-source': '#3B82F6',
  'search':      '#00FF88',
  'knowledge':   '#22D3EE',
}

// Architecture node category colors
export const nodeColors = {
  'mcp-server':    '#3B82F6',
  'agent':         '#00FF88',
  'data-store':    '#22D3EE',
  'orchestrator':  '#FBBF24',
  'output':        '#34D399',
}
