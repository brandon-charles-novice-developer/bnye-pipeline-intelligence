import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import SectionLabel from '../shared/SectionLabel'
import { useFadeIn } from '../../hooks/useFadeIn'
import { useCountUp } from '../../hooks/useCountUp'
import { brand, semantic, chart, tooltipStyle } from '../../tokens/colors'
import sprintData from '../../data/sprintData'

/* ── derived data (immutable) ── */

const PHASES = [
  { key: 'hunt', label: 'Hunt', stat: (d) => `${d.huntResults.found} found / ${d.huntResults.qualified} qualified` },
  { key: 'build', label: 'Build', stat: (d) => `${d.packagesBuilt.total} packages / ${d.packagesBuilt.coverLetters} letters` },
  { key: 'execute', label: 'Execute', stat: (d) => `${d.executed.applied} applied / ${d.executed.skipped} skipped` },
  { key: 'close', label: 'Close', stat: (d) => `${d.learningSignals.updated} signals / ${d.learningSignals.newRules} rules` },
]

const maxWeight = Math.max(...sprintData.scoringCriteria.map((c) => c.weight))

const historyData = [...sprintData.recentSprints].reverse().map((s) => ({
  ...s,
  label: s.date.slice(5),
  fill: chart.primary,
}))

const totalApplied = sprintData.recentSprints.reduce((sum, s) => sum + s.applied, 0)
const avgScore = (
  sprintData.recentSprints
    .filter((s) => s.topScore > 0)
    .reduce((sum, s) => sum + s.topScore, 0) /
  sprintData.recentSprints.filter((s) => s.topScore > 0).length
).toFixed(1)

const LOOP_NODES = [
  { label: 'Applied', sub: 'Submit packages' },
  { label: 'Outcomes', sub: 'Interview / Reject' },
  { label: 'Signals', sub: 'Pattern detection' },
  { label: 'Weights', sub: 'Adjust criteria' },
  { label: 'Scoring', sub: 'Rank candidates' },
  { label: 'Hunt', sub: 'Discover roles' },
]

/* ── helpers ── */

function formatRound(v) {
  return Math.round(v).toString()
}

/* ── sections ── */

function CycleVisualization() {
  const fade = useFadeIn()
  const { today } = sprintData

  return (
    <div ref={fade.ref} className={fade.className}>
      <SectionLabel right={<span className="text-xs text-white/50">{today.date}</span>}>
        Sprint Cycle
      </SectionLabel>
      <div className="grid grid-cols-4 gap-3">
        {PHASES.map((phase, i) => {
          const isActive = today.phase === phase.key
          return (
            <div key={phase.key} className="flex items-center gap-2">
              <div
                className="glass-card rounded-card p-4 flex-1 transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0.45,
                  borderColor: isActive ? brand.primary : 'transparent',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  boxShadow: isActive ? `0 0 20px ${brand.primary}30` : 'none',
                }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: isActive ? brand.primary : '#FFFFFF' }}>
                  {phase.label}
                </div>
                <div className="text-xs text-white/70 leading-relaxed">
                  {phase.stat(today)}
                </div>
              </div>
              {i < PHASES.length - 1 && (
                <span className="text-white/20 text-lg flex-shrink-0 hidden sm:block">&#x25B6;</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ScoringBreakdown() {
  const fade = useFadeIn()

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="glass-card rounded-card p-5">
        <SectionLabel>Scoring Criteria</SectionLabel>
        <div className="flex flex-col gap-3">
          {sprintData.scoringCriteria.slice(0, 5).map((criterion) => {
            const pct = (criterion.weight / maxWeight) * 100
            return (
              <div key={criterion.name} className="flex items-center gap-3">
                <div className="w-32 flex-shrink-0">
                  <div className="text-xs text-white font-medium truncate">{criterion.name}</div>
                  <div className="text-[10px] text-white/40 truncate">{criterion.description}</div>
                </div>
                <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${chart.primary}, ${chart.secondary})`,
                      opacity: 0.8 + (criterion.weight / maxWeight) * 0.2,
                    }}
                  />
                </div>
                <span className="text-xs text-white/60 font-mono w-10 text-right flex-shrink-0">
                  {(criterion.weight * 100).toFixed(0)}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function LearningEngine() {
  const fade = useFadeIn()
  const ruleCount = useCountUp({ target: sprintData.learningEngine.totalRules, format: formatRound })
  const updated = new Date(sprintData.learningEngine.lastUpdated).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="glass-card rounded-card p-5">
        <SectionLabel>Learning Engine</SectionLabel>

        <div className="flex items-center gap-6 mb-5">
          <div>
            <div className="text-3xl font-bold text-white">{ruleCount}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Active Rules</div>
          </div>
          <div className="text-xs text-white/40">
            Updated {updated}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[1fr_120px_1fr] gap-2 text-[10px] uppercase tracking-wider text-white/30 px-1 mb-1">
            <span>Criterion</span>
            <span className="text-center">Adjustment</span>
            <span>Reason</span>
          </div>
          {sprintData.learningEngine.recentAdjustments.slice(0, 3).map((adj) => {
            const increased = adj.newWeight > adj.oldWeight
            const arrow = increased ? '\u2191' : '\u2193'
            const color = increased ? semantic.positive : semantic.negative
            return (
              <div
                key={adj.criterion}
                className="grid grid-cols-[1fr_120px_1fr] gap-2 items-center px-1 py-2 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <span className="text-xs text-white font-medium">{adj.criterion}</span>
                <div className="text-center">
                  <span className="text-xs font-mono" style={{ color }}>
                    {(adj.oldWeight * 100).toFixed(0)}% {arrow} {(adj.newWeight * 100).toFixed(0)}%
                  </span>
                </div>
                <span className="text-[11px] text-white/50 leading-snug">{adj.reason}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function SprintHistory() {
  const fade = useFadeIn()
  const total = useCountUp({ target: totalApplied, format: formatRound })

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="glass-card rounded-card p-5">
        <SectionLabel
          right={
            <span className="text-xs text-white/50">
              {total} applied / avg top {avgScore}
            </span>
          }
        >
          Sprint History
        </SectionLabel>

        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={historyData} margin={{ left: 0, right: 0 }}>
            <XAxis dataKey="label" tick={{ fill: '#FFFFFF', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: '#FFFFFF', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              formatter={(value, name) => {
                const labels = { applied: 'Applied', topScore: 'Top Score', bottomScore: 'Low Score' }
                return [value, labels[name] || name]
              }}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="applied" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-7 gap-2 mt-3">
          {historyData.map((day) => (
            <div key={day.date} className="text-center">
              <div className="text-xs text-white font-medium">{day.applied}</div>
              <div className="text-[10px] text-white/30">
                {day.topScore > 0 ? `${day.topScore}-${day.bottomScore}` : '--'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeedbackLoop() {
  const fade = useFadeIn()

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="glass-card rounded-card p-5">
        <SectionLabel>Feedback Loop</SectionLabel>
        <div className="flex items-center justify-between gap-2 overflow-x-auto py-3">
          {LOOP_NODES.map((node, i) => (
            <div key={node.label} className="flex items-center gap-2 flex-shrink-0">
              <div
                className="glass-card rounded-card px-4 py-3 text-center min-w-[100px]"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
              >
                <div className="text-xs text-white font-semibold">{node.label}</div>
                <div className="text-[10px] text-white/40 mt-0.5">{node.sub}</div>
              </div>
              {i < LOOP_NODES.length - 1 && (
                <span className="text-white/20 text-sm flex-shrink-0">&#x25B6;</span>
              )}
            </div>
          ))}
          <span className="text-white/20 text-sm flex-shrink-0">&#x21BA;</span>
        </div>
        <div className="text-[11px] text-white/30 text-center mt-2">
          Closed loop: outcomes feed back into scoring weights, improving candidate selection each cycle
        </div>
      </div>
    </div>
  )
}

/* ── main view ── */

export default function SprintDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <CycleVisualization />
      <ScoringBreakdown />
      <LearningEngine />
      <SprintHistory />
      <FeedbackLoop />
    </div>
  )
}
