# Pipeline Intelligence

AI-powered job search pipeline management dashboard. Part of the B.Nye Command Center portfolio.

## Views

- **Mission Control** — KPI scoreboard, pipeline funnel, agent status, MCP health, traction alerts
- **Pipeline Table** — Sortable, filterable pipeline with status badges and fit scoring
- **Sprint Dashboard** — Autonomous sprint cycle visualization, 9-criterion scoring, learning engine
- **Architecture View** — Interactive React Flow system diagram with click-to-detail nodes

## Stack

- React 19 + Vite 7
- Tailwind CSS 3.4 (glassmorphic dark theme)
- Recharts 3 (charts and visualizations)
- React Flow v12 (architecture diagram)
- React Router 7

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Design

Dark glassmorphic design system with blue/emerald accent palette. All shared components, hooks, and tokens in `src/tokens/`, `src/hooks/`, `src/components/shared/`.
