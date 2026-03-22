import { lazy, Suspense, useEffect, useMemo, useRef, useState, type CSSProperties, type FocusEvent, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { defaultForm, formats, lengths, moduleContent, navItems, STORAGE_KEY, tones, tools } from './data/workspaceData'
import { TopNav } from './components/TopNav'
import { ToolRail } from './components/ToolRail'
import { generateContentDraft } from './services/contentService'
import type { DraftPayload, NavItem, WorkspaceForm } from './types/workspace'
import './App.css'

const GrowthPage = lazy(() => import('./pages/GrowthPage'))
const ModulePage = lazy(() => import('./pages/ModulePage'))

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [activeNav, setActiveNav] = useState('growth')
  const [activeTool, setActiveTool] = useState('blog-post')
  const [activeFormat, setActiveFormat] = useState('case-study')
  const [toolQuery, setToolQuery] = useState('')
  const [form, setForm] = useState<WorkspaceForm>(defaultForm)
  const [generatedContent, setGeneratedContent] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [savedLabel, setSavedLabel] = useState('Unsaved')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [focusMode, setFocusMode] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 50, py: 50 })
  const copyTimeoutRef = useRef<number | null>(null)

  const selectedTool = useMemo(
    () => tools.find((tool) => tool.id === activeTool) ?? tools[1],
    [activeTool],
  )

  const filteredTools = useMemo(() => {
    const query = toolQuery.trim().toLowerCase()
    if (!query) {
      return tools
    }

    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) || tool.subtitle.toLowerCase().includes(query),
    )
  }, [toolQuery])

  const completionPercent = useMemo(() => {
    const requiredFieldCount = ['businessName', 'industry', 'description', 'keywords'].reduce(
      (count, key) => {
        const value = form[key as keyof WorkspaceForm]
        return value.trim() ? count + 1 : count
      },
      0,
    )

    const setupProgress = (requiredFieldCount / 4) * 60
    const contentProgress = generatedContent ? 30 : 0
    const draftProgress = savedLabel !== 'Unsaved' ? 10 : 0

    return Math.min(100, Math.round(setupProgress + contentProgress + draftProgress))
  }, [form, generatedContent, savedLabel])

  const activeNavFromPath = useMemo(() => {
    const found = navItems.find((item) => item.path === location.pathname)
    return found?.id ?? 'growth'
  }, [location.pathname])

  const selectedNav = navItems.find((item) => item.id === activeNav) ?? navItems[0]

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

  useEffect(() => {
    setActiveNav(activeNavFromPath)
  }, [activeNavFromPath])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        return
      }

      const parsed = JSON.parse(raw) as DraftPayload

      if (parsed.activePath && navItems.some((item) => item.path === parsed.activePath)) {
        navigate(parsed.activePath, { replace: true })
      }
      if (parsed.activeTool && tools.some((tool) => tool.id === parsed.activeTool)) {
        setActiveTool(parsed.activeTool)
      }
      if (parsed.activeFormat && formats.some((item) => item.id === parsed.activeFormat)) {
        setActiveFormat(parsed.activeFormat)
      }
      if (parsed.form) {
        setForm(parsed.form)
      }
      if (parsed.generatedContent) {
        setGeneratedContent(parsed.generatedContent)
        setSavedLabel('Draft restored')
      }
    } catch {
      setSavedLabel('Unsaved')
    }
  }, [navigate])

  useEffect(() => {
    const payload: DraftPayload = {
      activePath: location.pathname,
      activeTool,
      activeFormat,
      form,
      generatedContent,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [location.pathname, activeTool, activeFormat, form, generatedContent])

  useEffect(() => {
    if (activeNav !== 'growth') {
      return
    }

    const toolFromUrl = searchParams.get('tool')
    if (toolFromUrl && tools.some((tool) => tool.id === toolFromUrl) && toolFromUrl !== activeTool) {
      setActiveTool(toolFromUrl)
    }
  }, [activeNav, activeTool, searchParams])

  useEffect(() => {
    if (activeNav !== 'growth') {
      return
    }

    const currentTool = searchParams.get('tool')
    if (currentTool === activeTool) {
      return
    }

    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tool', activeTool)
    setSearchParams(nextParams, { replace: true })
  }, [activeNav, activeTool, searchParams, setSearchParams])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  const qualityScore = useMemo(() => {
    const descriptionScore = Math.min(40, Math.round(form.description.length / 4))
    const keywordCount = form.keywords
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean).length
    const keywordScore = Math.min(35, keywordCount * 8)
    const outputScore = generatedContent ? 25 : 0
    return Math.min(100, descriptionScore + keywordScore + outputScore)
  }, [form.description, form.keywords, generatedContent])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const handleFormValue = (field: keyof WorkspaceForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSavedLabel('Unsaved')
  }

  const saveDraft = () => {
    setSavedLabel(`Saved ${new Date().toLocaleTimeString()}`)
  }

  const resetWorkflow = () => {
    setForm(defaultForm)
    setGeneratedContent('')
    setErrorMessage('')
    setSavedLabel('Unsaved')
  }

  const generateContent = async () => {
    if (
      !form.businessName.trim() ||
      !form.industry.trim() ||
      !form.description.trim() ||
      !form.keywords.trim()
    ) {
      setErrorMessage('Complete Business Name, Industry, Description, and Keywords before generating.')
      return
    }

    setErrorMessage('')
    setIsGenerating(true)

    try {
      const formatLabel = formats.find((item) => item.id === activeFormat)?.label ?? 'Article'
      const result = await generateContentDraft({
        toolName: selectedTool.name,
        formatLabel,
        form,
      })
      setGeneratedContent(result.markdown)
      setSavedLabel('Unsaved')
    } catch {
      setErrorMessage('Unable to generate content right now. Please retry in a moment.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyGeneratedContent = async () => {
    if (!generatedContent) {
      return
    }

    try {
      await navigator.clipboard.writeText(generatedContent)
      setCopied(true)
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current)
      }
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setErrorMessage('Clipboard permission denied. Try copying manually from the preview panel.')
    }
  }

  const downloadGeneratedContent = () => {
    if (!generatedContent) {
      return
    }

    const blob = new Blob([generatedContent], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${selectedTool.id}-draft.md`
    anchor.click()
    URL.revokeObjectURL(url)
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

  const navigateToNav = (item: NavItem) => {
    if (item.id === 'growth') {
      navigate({ pathname: item.path, search: `?tool=${activeTool}` })
      return
    }
    navigate(item.path)
  }

  return (
    <div className="page-frame">
      <TopNav
        navItems={navItems}
        activeNav={activeNav}
        onNavigate={navigateToNav}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className="app-shell">
        <div className="ambient-layer" aria-hidden="true">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
        </div>

        <ToolRail
          toolQuery={toolQuery}
          onToolQueryChange={setToolQuery}
          filteredTools={filteredTools}
          activeTool={activeTool}
          onToolSelect={setActiveTool}
        />

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
              <Suspense fallback={<div className="route-loading">Loading workspace module...</div>}>
                {activeNav === 'growth' ? (
                  <GrowthPage
                    title={`${selectedTool.name} Studio`}
                    activeFormat={activeFormat}
                    form={form}
                    formats={formats}
                    tones={tones}
                    lengths={lengths}
                    generatedContent={generatedContent}
                    copied={copied}
                    errorMessage={errorMessage}
                    isGenerating={isGenerating}
                    completionPercent={completionPercent}
                    qualityScore={qualityScore}
                    toolsMatched={filteredTools.length}
                    savedLabel={savedLabel}
                    onFormatChange={setActiveFormat}
                    onFieldChange={handleFormValue}
                    onGenerate={generateContent}
                    onSaveDraft={saveDraft}
                    onReset={resetWorkflow}
                    onCopy={copyGeneratedContent}
                    onDownload={downloadGeneratedContent}
                    onFocus={() => setFocusMode(true)}
                    onBlur={handleCardBlurCapture}
                    focusMode={focusMode}
                  />
                ) : (
                  <ModulePage title={selectedNav.label} module={moduleContent[activeNav]} />
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App
