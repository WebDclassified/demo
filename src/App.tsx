import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3,
  BookOpen,
  Briefcase,
  ChartNoAxesColumn,
  Clock3,
  FileText,
  House,
  Lightbulb,
  List,
  Mail,
  MessageCircle,
  Newspaper,
  MoonStar,
  Rocket,
  Send,
  Sparkles,
  Tag,
  Sun,
  Target,
  WandSparkles,
} from 'lucide-react'
import './App.css'

type Tool = {
  id: string
  name: string
  subtitle: string
  icon: ComponentType<{ size?: number }>
}

type NavItem = {
  id: string
  label: string
  icon: ComponentType<{ size?: number }>
}

const tools: Tool[] = [
  { id: 'newsletter', name: 'Newsletter', subtitle: 'Email campaigns', icon: Mail },
  { id: 'blog-post', name: 'Blog Post', subtitle: 'SEO content', icon: FileText },
  { id: 'linkedin', name: 'LinkedIn', subtitle: 'Professional posts', icon: Briefcase },
  { id: 'threads', name: 'Threads', subtitle: 'Short-form posts', icon: MessageCircle },
  { id: 'instagram', name: 'Instagram', subtitle: 'Social content', icon: Sparkles },
  { id: 'cold-email', name: 'Cold Email', subtitle: 'Sales outreach', icon: Send },
]

const formats = [
  { id: 'how-to', label: 'How-To', icon: Lightbulb },
  { id: 'listicle', label: 'Listicle', icon: List },
  { id: 'opinion', label: 'Opinion', icon: BookOpen },
  { id: 'case-study', label: 'Case Study', icon: Briefcase },
  { id: 'news', label: 'News', icon: Newspaper },
]

const navItems: NavItem[] = [
  { id: 'growth', label: 'Growth', icon: House },
  { id: 'prompt', label: 'Prompt Enhancer', icon: Sparkles },
  { id: 'pricing', label: 'Pricing', icon: Tag },
  { id: 'crm', label: 'RealTech CRM', icon: Rocket },
  { id: 'analytics', label: 'Howdy Analytics', icon: BarChart3 },
]

function App() {
  const [activeNav, setActiveNav] = useState('growth')
  const [activeTool, setActiveTool] = useState('blog-post')
  const [activeFormat, setActiveFormat] = useState('case-study')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [focusMode, setFocusMode] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 50, py: 50 })

  const selectedTool = useMemo(
    () => tools.find((tool) => tool.id === activeTool) ?? tools[1],
    [activeTool],
  )

  useEffect(() => {
    const savedTheme = localStorage.getItem('growthhub-theme')

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('growthhub-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const handleStagePointerMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - bounds.left) / bounds.width
    const relativeY = (event.clientY - bounds.top) / bounds.height

    setTilt({
      x: (relativeX - 0.5) * 4,
      y: (relativeY - 0.5) * 4,
      px: relativeX * 100,
      py: relativeY * 100,
    })
  }

  const resetStagePointer = () => {
    setTilt({ x: 0, y: 0, px: 50, py: 50 })
  }

  const handleCardBlurCapture = (event: FocusEvent<HTMLElement>) => {
    window.requestAnimationFrame(() => {
      const nextFocused = event.currentTarget.contains(document.activeElement)
      if (!nextFocused) {
        setFocusMode(false)
      }
    })
  }

  const stageStyle = {
    '--tilt-x': `${tilt.x.toFixed(3)}deg`,
    '--tilt-y': `${tilt.y.toFixed(3)}deg`,
    '--spot-x': `${tilt.px.toFixed(2)}%`,
    '--spot-y': `${tilt.py.toFixed(2)}%`,
  } as CSSProperties

  const selectedNav = navItems.find((item) => item.id === activeNav) ?? navItems[0]

  const renderModuleStage = () => {
    if (activeNav === 'growth') {
      return (
        <>
          <header className="stage-header">
            <div>
              <p className="eyebrow">AI Content Engine</p>
              <div className="title-row">
                <h2>{selectedTool.name} Studio</h2>
                <span className="live-pill">
                  <Sparkles size={14} />
                  Live Optimization
                </span>
              </div>
            </div>
            <div className="header-actions">
              <button type="button" className="ghost-btn">
                Change Tool / Start Over
              </button>
            </div>
          </header>

          <section className="progress-wrap" aria-label="Progress">
            <p>32% Complete</p>
            <div className="progress-track">
              <span />
            </div>
            <div className="steps">
              <div className="step active">
                <span>1</span>
                <small>Setup</small>
              </div>
              <div className="step active">
                <span>2</span>
                <small>Content</small>
              </div>
              <div className="step">
                <span>3</span>
                <small>Ready</small>
              </div>
            </div>
          </section>

          <section className="kpi-row" aria-label="Performance stats">
            <article className="kpi-card">
              <ChartNoAxesColumn size={16} />
              <div>
                <strong>+128%</strong>
                <small>Reach growth</small>
              </div>
            </article>
            <article className="kpi-card">
              <Clock3 size={16} />
              <div>
                <strong>4.3 min</strong>
                <small>Avg setup time</small>
              </div>
            </article>
            <article className="kpi-card">
              <Target size={16} />
              <div>
                <strong>92%</strong>
                <small>Audience match</small>
              </div>
            </article>
          </section>

          <motion.section
            className={`content-card ${focusMode ? 'focus-mode' : ''}`}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            onFocusCapture={() => setFocusMode(true)}
            onBlurCapture={handleCardBlurCapture}
          >
            <div className="card-head">
              <div>
                <p className="eyebrow">Step 1 of 3</p>
                <h3>{selectedTool.name} Setup</h3>
                <p className="muted">Define audience and choose a content format.</p>
              </div>
            </div>

            <div className="card-grid">
              <div className="form-grid">
                <label>
                  Business Name
                  <input defaultValue="Acme Tech" />
                </label>
                <label>
                  Industry
                  <input defaultValue="Marketing" />
                </label>
                <label className="full">
                  Description
                  <textarea
                    rows={5}
                    defaultValue="People under age 25 holding a degree in Computer Science and Engineering."
                  />
                </label>
              </div>

              <div>
                <p className="format-title">Blog Format</p>
                <div className="format-grid">
                  {formats.map((format) => {
                    const Icon = format.icon
                    const selected = format.id === activeFormat

                    return (
                      <button
                        type="button"
                        key={format.id}
                        className={`format-btn ${selected ? 'selected' : ''}`}
                        onClick={() => setActiveFormat(format.id)}
                      >
                        <Icon size={16} />
                        {format.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button type="button" className="primary-btn">
                Continue to Content
              </button>
            </div>
          </motion.section>
        </>
      )
    }

    return (
      <section className="module-stage" aria-label={`${selectedNav.label} view`}>
        <div className="module-head">
          <p className="eyebrow">Workspace Module</p>
          <h2>{selectedNav.label}</h2>
          <p className="muted">Live section preview with premium transitions and glass UI components.</p>
        </div>
        <div className="module-grid">
          <article className="module-card">
            <h3>Pipeline Health</h3>
            <p className="muted">Track live conversion metrics and campaign effectiveness in one place.</p>
            <button type="button" className="ghost-btn">
              Open Dashboard
            </button>
          </article>
          <article className="module-card">
            <h3>AI Suggestions</h3>
            <p className="muted">Get instant recommendations tailored to this module context.</p>
            <button type="button" className="ghost-btn">
              Generate Suggestions
            </button>
          </article>
          <article className="module-card">
            <h3>Team Activity</h3>
            <p className="muted">Review recent actions, approvals, and content quality checkpoints.</p>
            <button type="button" className="ghost-btn">
              View Activity
            </button>
          </article>
        </div>
      </section>
    )
  }

  return (
    <div className="page-frame">
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
                onClick={() => setActiveNav(item.id)}
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
            onClick={toggleTheme}
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

      <div className="app-shell">
        <div className="ambient-layer" aria-hidden="true">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
        </div>

        <aside className="tool-rail">
        <div className="rail-header">
          <div className="rail-mark">
            <WandSparkles size={18} />
          </div>
          <div>
            <p className="eyebrow">Workspace</p>
            <h1>GrowthHub</h1>
          </div>
        </div>

        <div className="tool-list">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            const isActive = tool.id === activeTool

            return (
              <motion.button
                key={tool.id}
                type="button"
                className={`tool-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTool(tool.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.32, delay: index * 0.05 }}
              >
                <span className="tool-icon">
                  <Icon size={16} />
                </span>
                <span className="tool-copy">
                  <span>{tool.name}</span>
                  <small>{tool.subtitle}</small>
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="rail-tip">
          <Target size={16} />
          <p>Pick a tool first. The content wizard adapts automatically.</p>
        </div>
        </aside>

        <main
          className={`main-stage ${focusMode ? 'is-focusing' : ''}`}
          style={stageStyle}
          onMouseMove={handleStagePointerMove}
          onMouseLeave={resetStagePointer}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderModuleStage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App
