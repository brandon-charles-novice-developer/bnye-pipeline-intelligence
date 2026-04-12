import { useState, useMemo } from 'react'
import { semantic, statusColors, accent, glass } from '../../tokens/colors'
import { useFadeIn } from '../../hooks/useFadeIn'
import EmptyState from '../shared/EmptyState'
import pipeline from '../../data/pipeline'

const COLUMNS = [
  { key: 'company',   label: 'Company' },
  { key: 'role',      label: 'Role' },
  { key: 'track',     label: 'Track' },
  { key: 'status',    label: 'Status' },
  { key: 'fitScore',  label: 'Fit Score' },
  { key: 'daysSinceActivity', label: 'Days Active' },
  { key: 'origin',    label: 'Origin' },
]

const TRACK_COLORS = {
  AdTech:        { bg: 'rgba(59, 130, 246, 0.15)', color: accent.blue },
  'Platform/AI': { bg: 'rgba(196, 181, 253, 0.15)', color: accent.lilac },
}

function fitScoreColor(score) {
  if (score >= 8) return semantic.positive
  if (score >= 6) return semantic.caution
  return semantic.muted
}

function SortArrow({ direction }) {
  if (!direction) return null
  return (
    <span style={{ marginLeft: 4, fontSize: 10 }}>
      {direction === 'asc' ? '\u25B2' : '\u25BC'}
    </span>
  )
}

function StatusBadge({ status }) {
  const colors = statusColors[status] || { bg: 'rgba(175,173,173,0.15)', color: semantic.muted }
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.color,
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  )
}

function TrackBadge({ track }) {
  const colors = TRACK_COLORS[track] || TRACK_COLORS.AdTech
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.color,
        padding: '2px 8px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 500,
      }}
    >
      {track}
    </span>
  )
}

function nextSortState(currentKey, currentDir, clickedKey) {
  if (currentKey !== clickedKey) return { sortKey: clickedKey, sortDir: 'asc' }
  if (currentDir === 'asc') return { sortKey: clickedKey, sortDir: 'desc' }
  return { sortKey: null, sortDir: null }
}

export default function PipelineTable() {
  const fade = useFadeIn()
  const [filter, setFilter] = useState('')
  const [sortKey, setSortKey] = useState('fitScore')
  const [sortDir, setSortDir] = useState('desc')

  const rows = useMemo(() => {
    const term = filter.toLowerCase()
    const filtered = [...pipeline].filter((row) => {
      if (!term) return true
      return (
        row.company.toLowerCase().includes(term) ||
        row.role.toLowerCase().includes(term) ||
        row.track.toLowerCase().includes(term) ||
        row.status.toLowerCase().includes(term) ||
        row.origin.toLowerCase().includes(term)
      )
    })

    if (!sortKey) return filtered

    return filtered.sort((a, b) => {
      const va = a[sortKey] ?? ''
      const vb = b[sortKey] ?? ''
      const cmp = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb))
      return sortDir === 'desc' ? -cmp : cmp
    })
  }, [filter, sortKey, sortDir])

  function handleSort(key) {
    const next = nextSortState(sortKey, sortDir, key)
    setSortKey(next.sortKey)
    setSortDir(next.sortDir)
  }

  return (
    <div ref={fade.ref} className={fade.className} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <input
        className="glass-input"
        type="text"
        placeholder="Filter by company, role, track, status, or origin..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: '100%', maxWidth: 420, fontFamily: 'Inter, sans-serif', fontSize: 13 }}
      />

      <div className="glass-card rounded-card" style={{ overflow: 'auto' }}>
        {rows.length === 0 ? (
          <EmptyState message="No pipeline entries match your filter" icon="O" />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif' }}>
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: sortKey === col.key ? semantic.text : semantic.muted,
                      cursor: 'pointer',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
                      background: glass.headerBg,
                      position: 'sticky',
                      top: 0,
                    }}
                  >
                    {col.label}
                    <SortArrow direction={sortKey === col.key ? sortDir : null} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = glass.cardHover }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)'
                  }}
                >
                  <td style={cellStyle}>{row.company}</td>
                  <td style={{ ...cellStyle, color: semantic.muted, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.role}</td>
                  <td style={cellStyle}><TrackBadge track={row.track} /></td>
                  <td style={cellStyle}><StatusBadge status={row.status} /></td>
                  <td style={{ ...cellStyle, fontVariantNumeric: 'tabular-nums', color: fitScoreColor(row.fitScore), fontWeight: 600 }}>{row.fitScore}</td>
                  <td style={{ ...cellStyle, fontVariantNumeric: 'tabular-nums', color: semantic.muted }}>{row.daysSinceActivity}d</td>
                  <td style={{ ...cellStyle, color: semantic.muted, textTransform: 'capitalize' }}>{row.origin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const cellStyle = {
  padding: '10px 14px',
  fontSize: 13,
  color: semantic.text,
  whiteSpace: 'nowrap',
  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
}
