import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import MetricCard from '../shared/MetricCard'
import LiveDot from '../shared/LiveDot'
import SectionLabel from '../shared/SectionLabel'
import { useCountUp } from '../../hooks/useCountUp'
import { useFadeIn } from '../../hooks/useFadeIn'
import { accent, semantic, statusColors, modelColors, categoryColors, tooltipStyle } from '../../tokens/colors'
import pipeline from '../../data/pipeline'
import agents from '../../data/agents'
import mcpServers from '../../data/mcpServers'

/* ── derived metrics (immutable) ── */

const FUNNEL_ORDER = ['watching', 'applied', 'warm', 'interviewing', 'offer']

const nonTerminal = pipeline.filter((e) => e.lifecycleStage !== 'terminal')
const warmContacts = pipeline.filter((e) => e.status === 'warm' || e.status === 'interviewing')

const oneDayAgo = Date.now() - 86_400_000
const appliedToday = pipeline.filter(
  (e) => e.dateApplied && new Date(e.dateApplied).getTime() >= oneDayAgo,
)

const totalAgentRuns = agents.reduce((sum, a) => sum + a.runsToday, 0)
const totalMcpCalls = mcpServers.reduce((sum, s) => sum + s.callsToday, 0)

const funnelData = FUNNEL_ORDER.map((status) => ({
  status,
  count: pipeline.filter((e) => e.status === status).length,
  fill: statusColors[status]?.color ?? '#AFADAD',
}))

const tractionEntries = pipeline.filter(
  (e) => e.status === 'warm' || e.status === 'interviewing' || e.status === 'offer',
)

/* ── tiny helpers ── */

const MCP_STATUS_COLORS = {
  connected: semantic.positive,
  degraded: semantic.caution,
  disconnected: semantic.negative,
}

function formatNumber(v) {
  return Math.round(v).toLocaleString()
}

function formatPct(v) {
  return `${Math.round(v)}%`
}

/* ── sub-sections ── */

function KpiScoreboard() {
  const fade = useFadeIn()
  const activePipeline = useCountUp({ target: nonTerminal.length, format: formatNumber })
  const warmCount = useCountUp({ target: warmContacts.length, delay: 100, format: formatNumber })
  const appliedCount = useCountUp({ target: appliedToday.length, delay: 200, format: formatNumber })
  const agentRuns = useCountUp({ target: totalAgentRuns, delay: 300, format: formatNumber })
  const mcpCalls = useCountUp({ target: totalMcpCalls, delay: 400, format: formatNumber })

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard label="Active Pipeline" value={activePipeline} sublabel="non-terminal entries" />
        <MetricCard label="Warm Contacts" value={warmCount} deltaPositive sublabel="warm + interviewing" />
        <MetricCard label="Applied Today" value={appliedCount} sublabel="last 24 hours" />
        <MetricCard label="Agent Runs" value={agentRuns} sublabel="runs today" />
        <MetricCard label="MCP Calls" value={mcpCalls} sublabel="calls today" />
      </div>
    </div>
  )
}

function PipelineFunnel() {
  const fade = useFadeIn()

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="glass-card rounded-card p-5">
        <SectionLabel>Pipeline Funnel</SectionLabel>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={funnelData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" allowDecimals={false} tick={{ fill: '#AFADAD', fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="status"
              tick={{ fill: '#AFADAD', fontSize: 12, textTransform: 'capitalize' }}
              width={100}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              formatter={(value) => [value, 'Count']}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function AgentCard({ agent }) {
  const modelStyle = modelColors[agent.model] ?? { bg: 'rgba(175,173,173,0.15)', color: '#AFADAD' }
  const firstAction = agent.recentActions?.[0]

  return (
    <div className="glass-card rounded-card p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {agent.status === 'running' ? (
            <LiveDot size={8} />
          ) : (
            <span
              className="inline-block rounded-full"
              style={{ width: 8, height: 8, backgroundColor: '#AFADAD', flexShrink: 0 }}
            />
          )}
          <span className="text-white font-semibold text-sm">{agent.name}</span>
        </div>
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
          style={{ backgroundColor: modelStyle.bg, color: modelStyle.color }}
        >
          {agent.model}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs" style={{ color: '#AFADAD' }}>
        <span>
          Success{' '}
          <span className="text-white font-medium">{formatPct(agent.successRate * 100)}</span>
        </span>
        <span>
          Runs{' '}
          <span className="text-white font-medium">{agent.runsToday}</span>
        </span>
      </div>

      {firstAction && (
        <p className="text-xs truncate mt-1" style={{ color: '#AFADAD' }}>
          {firstAction.details}
        </p>
      )}
    </div>
  )
}

function AgentStatusGrid() {
  const fade = useFadeIn()

  return (
    <div ref={fade.ref} className={fade.className}>
      <SectionLabel>Agent Status</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}

function McpServerCard({ server }) {
  const dotColor = MCP_STATUS_COLORS[server.status] ?? '#AFADAD'
  const catColor = categoryColors[server.category] ?? '#AFADAD'

  return (
    <div className="glass-card rounded-card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="inline-block rounded-full"
            style={{
              width: 8,
              height: 8,
              backgroundColor: dotColor,
              boxShadow: `0 0 6px ${dotColor}60`,
              flexShrink: 0,
            }}
          />
          <span className="text-white font-semibold text-sm">{server.name}</span>
        </div>
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
          style={{ backgroundColor: `${catColor}26`, color: catColor }}
        >
          {server.category}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs" style={{ color: '#AFADAD' }}>
        <span>
          Calls{' '}
          <span className="text-white font-medium">{server.callsToday}</span>
        </span>
        <span>
          Latency{' '}
          <span className="text-white font-medium">
            {server.avgLatency > 0 ? `${server.avgLatency}ms` : '--'}
          </span>
        </span>
      </div>
    </div>
  )
}

function McpHealthGrid() {
  const fade = useFadeIn()

  return (
    <div ref={fade.ref} className={fade.className}>
      <SectionLabel>MCP Health</SectionLabel>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mcpServers.map((server) => (
          <McpServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  )
}

function TractionAlertCard({ entry }) {
  const borderColor = entry.status === 'interviewing' || entry.status === 'offer'
    ? accent.emerald
    : accent.blue

  return (
    <div
      className="glass-card rounded-card p-4"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{entry.company}</span>
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: statusColors[entry.status]?.bg,
            color: statusColors[entry.status]?.color,
          }}
        >
          {entry.status}
        </span>
      </div>
      <p className="text-xs mt-1" style={{ color: '#AFADAD' }}>
        {entry.role}
      </p>
      <div className="flex items-center gap-4 text-xs mt-2" style={{ color: '#AFADAD' }}>
        {entry.contact && <span>Contact: <span className="text-white">{entry.contact}</span></span>}
        <span>{entry.daysSinceActivity === 0 ? 'Today' : `${entry.daysSinceActivity}d ago`}</span>
      </div>
    </div>
  )
}

function TractionAlerts() {
  const fade = useFadeIn()

  if (tractionEntries.length === 0) return null

  return (
    <div ref={fade.ref} className={fade.className}>
      <SectionLabel>Traction Alerts</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tractionEntries.map((entry) => (
          <TractionAlertCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}

/* ── main view ── */

export default function MissionControl() {
  return (
    <div className="flex flex-col gap-8">
      <KpiScoreboard />
      <PipelineFunnel />
      <AgentStatusGrid />
      <McpHealthGrid />
      <TractionAlerts />
    </div>
  )
}
