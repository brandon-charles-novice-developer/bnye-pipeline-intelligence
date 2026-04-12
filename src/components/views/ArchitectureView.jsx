import { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { nodes as rawNodes, edges as rawEdges } from '../../data/architecture'
import { bg, glass, semantic } from '../../tokens/colors'
import { useFadeIn } from '../../hooks/useFadeIn'

/* ── colour per architecture category ── */
const CATEGORY_COLOR = {
  'data-source':   '#3B82F6',
  'search':        '#00FF88',
  'knowledge':     '#22D3EE',
  'agent':         '#00FF88',
  'orchestrator':  '#FBBF24',
  'output':        '#34D399',
}

const STATUS_DOT = {
  running:      { color: '#22C55E', glow: 'rgba(34,197,94,0.6)',  pulse: true },
  connected:    { color: '#22C55E', glow: 'rgba(34,197,94,0.6)',  pulse: true },
  idle:         { color: '#6B7280', glow: 'none',                  pulse: false },
  disconnected: { color: '#EF4444', glow: 'rgba(239,68,68,0.5)',  pulse: false },
  degraded:     { color: '#F59E0B', glow: 'rgba(245,158,11,0.5)', pulse: false },
}

/* ── StatusDot ── */
function StatusDot({ status }) {
  const cfg = STATUS_DOT[status] ?? STATUS_DOT.idle
  return (
    <span
      className={cfg.pulse ? 'live-pulse' : ''}
      style={{
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: '50%',
        backgroundColor: cfg.color,
        boxShadow: cfg.glow !== 'none' ? `0 0 6px ${cfg.glow}` : 'none',
        flexShrink: 0,
      }}
    />
  )
}

/* ── GlassNode (custom React Flow node) ── */
function GlassNode({ data }) {
  const accent = CATEGORY_COLOR[data.category] ?? '#3B82F6'
  return (
    <div
      style={{
        width: 178,
        background: glass.card,
        border: `1px solid ${glass.cardBorder}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 6,
        padding: '10px 12px',
        cursor: 'pointer',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: accent, width: 6, height: 6, border: 'none' }} />
      <Handle type="source" position={Position.Right} style={{ background: accent, width: 6, height: 6, border: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <StatusDot status={data.status} />
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>{data.label}</span>
      </div>

      <p style={{ color: semantic.muted, fontSize: 10, lineHeight: 1.35, margin: 0 }}>
        {data.description}
      </p>

      <span
        style={{
          display: 'inline-block',
          marginTop: 6,
          fontSize: 9,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: accent,
          background: `${accent}22`,
          padding: '2px 6px',
          borderRadius: 4,
        }}
      >
        {data.category}
      </span>
    </div>
  )
}

/* ── Must be defined outside component ── */
const nodeTypes = { custom: GlassNode }

/* ── Default edge style ── */
const defaultEdgeOptions = {
  style: { stroke: 'rgba(255,255,255,0.18)', strokeWidth: 1.5 },
  labelStyle: { fill: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 500 },
  labelBgStyle: { fill: '#0D0D12', fillOpacity: 0.9 },
  labelBgPadding: [6, 3],
  labelBgBorderRadius: 4,
}

/* ── Detail Panel ── */
function DetailPanel({ node, onClose }) {
  if (!node) return null
  const d = node.data
  const accent = CATEGORY_COLOR[d.category] ?? '#3B82F6'

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 300,
        height: '100%',
        background: 'rgba(13,13,18,0.95)',
        borderLeft: `1px solid ${glass.cardBorder}`,
        padding: '24px 20px',
        zIndex: 20,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: 0 }}>{d.label}</h3>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: '#fff',
            width: 28,
            height: 28,
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          X
        </button>
      </div>

      <p style={{ color: semantic.muted, fontSize: 13, lineHeight: 1.5, margin: 0 }}>{d.description}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <StatusDot status={d.status} />
        <span style={{ color: '#fff', fontSize: 12, textTransform: 'capitalize' }}>{d.status}</span>
      </div>

      <span
        style={{
          display: 'inline-block',
          width: 'fit-content',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: accent,
          background: `${accent}22`,
          padding: '3px 8px',
          borderRadius: 4,
        }}
      >
        {d.category}
      </span>

      {d.tools && d.tools.length > 0 && (
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {d.tools.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 10,
                  color: '#fff',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  padding: '3px 7px',
                  borderRadius: 4,
                  fontFamily: 'monospace',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {d.connections && d.connections.length > 0 && (
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connections</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {d.connections.map((c) => (
              <span key={c} style={{ fontSize: 11, color: semantic.muted }}>
                {'\u2192'} {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Main view ── */
export default function ArchitectureView() {
  const [nodes] = useNodesState(rawNodes)
  const [edges] = useEdgesState(rawEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const fade = useFadeIn()

  const handleNodeClick = useCallback((_event, node) => {
    setSelectedNode(node)
  }, [])

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  return (
    <div ref={fade.ref} className={fade.className} style={{ position: 'relative', height: 'calc(100vh - 80px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={2}
      >
        <Background color="rgba(255,255,255,0.04)" gap={20} size={1} />
        <Controls
          showInteractive={false}
          style={{
            background: 'rgba(13,13,18,0.9)',
            border: `1px solid ${glass.cardBorder}`,
            borderRadius: 6,
          }}
        />
      </ReactFlow>
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  )
}
