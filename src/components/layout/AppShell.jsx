import Header from './Header'
import GradientMesh from './GradientMesh'

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <GradientMesh />
      <Header />
      <main
        className="flex-1 overflow-auto relative"
        style={{ zIndex: 1 }}
      >
        {children}
      </main>
    </div>
  )
}
