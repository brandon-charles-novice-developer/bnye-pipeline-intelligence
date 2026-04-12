import { NavLink } from 'react-router-dom'
import { brand, glass, semantic } from '../../tokens/colors'

const navItems = [
  { to: '/',              label: 'Mission Control' },
  { to: '/pipeline',      label: 'Pipeline' },
  { to: '/sprint',        label: 'Sprint' },
  { to: '/architecture',  label: 'Architecture' },
]

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
      style={{
        backgroundColor: glass.headerBg,
        backdropFilter: glass.blur,
        WebkitBackdropFilter: glass.blur,
        borderBottom: `1px solid ${glass.cardBorder}`,
      }}
    >
      <div className="flex items-center gap-6">
        <h1 className="text-base font-bold tracking-tight" style={{ color: brand.primary }}>
          Pipeline Intelligence
        </h1>

        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: isActive ? brand.primary : semantic.muted,
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <a
        href="/"
        className="text-xs font-medium hover:underline"
        style={{ color: semantic.muted }}
      >
        Command Center
      </a>
    </header>
  )
}
