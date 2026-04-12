import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import MissionControl from './components/views/MissionControl'
import PipelineTable from './components/views/PipelineTable'
import SprintDashboard from './components/views/SprintDashboard'
import ArchitectureView from './components/views/ArchitectureView'

function AppInner() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<MissionControl />} />
        <Route path="/pipeline" element={<PipelineTable />} />
        <Route path="/sprint" element={<SprintDashboard />} />
        <Route path="/architecture" element={<ArchitectureView />} />
      </Routes>
    </AppShell>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppInner />
    </BrowserRouter>
  )
}
