import { MoonStar, Sun, WandSparkles } from 'lucide-react'
import type { NavItem } from '../types/workspace'

type TopNavProps = {
  navItems: NavItem[]
  activeNav: string
  onNavigate: (item: NavItem) => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function TopNav({ navItems, activeNav, onNavigate, theme, onToggleTheme }: TopNavProps) {
  return (
    <header className="top-nav">
      <div className="brand-tile">
        <WandSparkles size={16} />
      </div>

      <nav className="top-nav-menu" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              type="button"
              key={item.id}
              className={`nav-link ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item)}
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="top-actions">
        <button
          type="button"
          className="top-theme-btn"
          onClick={onToggleTheme}
          aria-label="Toggle dark and light theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <MoonStar size={15} />}
        </button>
        <span className="powered-chip">Powered by Howdy Analytics</span>
        <button type="button" className="profile-pill" aria-label="Admin profile">
          <span className="profile-role">Admin</span>
          <span className="avatar-btn">H</span>
        </button>
      </div>
    </header>
  )
}
