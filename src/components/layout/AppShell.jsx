import Header from './Header'
import GradientMesh from './GradientMesh'

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <GradientMesh />
      <Header />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 2xl:px-12 w-full pt-2 pb-3">
        <p className="text-xs leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          <span style={{ color: 'var(--text-tertiary)' }}>Why I built this — </span>
          An enterprise-scale workflow required coordinating 12 data sources, 4 AI models, and 6 output systems with zero manual handoffs. I built an event-driven platform where 5 microservices and 4 specialized agents dispatch in parallel.
        </p>
      </div>
      <main
        className="flex-1 overflow-auto relative"
        style={{ zIndex: 1 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 2xl:px-12 w-full pb-8">
          {children}
        </div>
      </main>
    </div>
  )
}
