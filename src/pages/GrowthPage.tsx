import { Check, ChartNoAxesColumn, Clock3, Copy, Download, RefreshCw, Save, Sparkles, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import type { FormatItem, WorkspaceForm } from '../types/workspace'

type GrowthPageProps = {
  title: string
  activeFormat: string
  form: WorkspaceForm
  formats: FormatItem[]
  tones: string[]
  lengths: string[]
  generatedContent: string
  copied: boolean
  errorMessage: string
  isGenerating: boolean
  completionPercent: number
  qualityScore: number
  toolsMatched: number
  savedLabel: string
  onFormatChange: (formatId: string) => void
  onFieldChange: (field: keyof WorkspaceForm, value: string) => void
  onGenerate: () => void
  onSaveDraft: () => void
  onReset: () => void
  onCopy: () => Promise<void>
  onDownload: () => void
  onFocus: () => void
  onBlur: (event: React.FocusEvent<HTMLElement>) => void
  focusMode: boolean
}

export default function GrowthPage({
  title,
  activeFormat,
  form,
  formats,
  tones,
  lengths,
  generatedContent,
  copied,
  errorMessage,
  isGenerating,
  completionPercent,
  qualityScore,
  toolsMatched,
  savedLabel,
  onFormatChange,
  onFieldChange,
  onGenerate,
  onSaveDraft,
  onReset,
  onCopy,
  onDownload,
  onFocus,
  onBlur,
  focusMode,
}: GrowthPageProps) {
  return (
    <>
      <header className="stage-header">
        <div>
          <p className="eyebrow">AI Content Engine</p>
          <div className="title-row">
            <h2>{title}</h2>
            <span className="live-pill">
              <Sparkles size={14} />
              Live Optimization
            </span>
            <span className="status-pill">{savedLabel}</span>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" className="ghost-btn" onClick={onSaveDraft}>
            <Save size={14} />
            Save Draft
          </button>
          <button type="button" className="ghost-btn" onClick={onReset}>
            <RefreshCw size={14} />
            Reset
          </button>
        </div>
      </header>

      <section className="progress-wrap" aria-label="Progress">
        <p>{completionPercent}% Complete</p>
        <div className="progress-track">
          <span style={{ width: `${completionPercent}%` }} />
        </div>
        <div className="steps">
          <div className={`step ${completionPercent >= 20 ? 'active' : ''}`}>
            <span>1</span>
            <small>Setup</small>
          </div>
          <div className={`step ${completionPercent >= 60 ? 'active' : ''}`}>
            <span>2</span>
            <small>Content</small>
          </div>
          <div className={`step ${completionPercent >= 90 ? 'active' : ''}`}>
            <span>3</span>
            <small>Ready</small>
          </div>
        </div>
      </section>

      <section className="kpi-row" aria-label="Performance stats">
        <article className="kpi-card">
          <ChartNoAxesColumn size={16} />
          <div>
            <strong>{qualityScore}%</strong>
            <small>Quality score</small>
          </div>
        </article>
        <article className="kpi-card">
          <Clock3 size={16} />
          <div>
            <strong>{form.length}</strong>
            <small>Output depth</small>
          </div>
        </article>
        <article className="kpi-card">
          <Target size={16} />
          <div>
            <strong>{toolsMatched}</strong>
            <small>Tools matched</small>
          </div>
        </article>
      </section>

      <motion.section
        className={`content-card ${focusMode ? 'focus-mode' : ''}`}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        onFocusCapture={onFocus}
        onBlurCapture={onBlur}
      >
        <div className="card-head">
          <div>
            <p className="eyebrow">Step 1 of 3</p>
            <h3>{title} Setup</h3>
            <p className="muted">Define audience and choose a content format.</p>
          </div>
        </div>

        <div className="card-grid">
          <div className="form-grid">
            <label>
              Business Name
              <input value={form.businessName} onChange={(event) => onFieldChange('businessName', event.target.value)} />
            </label>
            <label>
              Industry
              <input value={form.industry} onChange={(event) => onFieldChange('industry', event.target.value)} />
            </label>
            <label className="full">
              Description
              <textarea
                rows={5}
                value={form.description}
                onChange={(event) => onFieldChange('description', event.target.value)}
              />
            </label>
            <label className="full">
              Keywords
              <input
                value={form.keywords}
                onChange={(event) => onFieldChange('keywords', event.target.value)}
                placeholder="example: seo automation, student funnel, thought leadership"
              />
            </label>
          </div>

          <div className="options-panel">
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
                    onClick={() => onFormatChange(format.id)}
                  >
                    <Icon size={16} />
                    {format.label}
                  </button>
                )
              })}
            </div>

            <div className="option-controls">
              <label>
                Tone
                <select value={form.tone} onChange={(event) => onFieldChange('tone', event.target.value)}>
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Length
                <select value={form.length} onChange={(event) => onFieldChange('length', event.target.value)}>
                  {lengths.map((length) => (
                    <option key={length} value={length}>
                      {length}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <section className="output-panel" aria-label="Generated output">
          <div className="output-head">
            <h3>Generated Content</h3>
            <div className="output-actions">
              <button type="button" className="ghost-btn" onClick={onCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button type="button" className="ghost-btn" onClick={onDownload}>
                <Download size={14} />
                Download
              </button>
            </div>
          </div>

          {errorMessage ? <p className="error-text">{errorMessage}</p> : null}

          {generatedContent ? (
            <pre className="output-content">{generatedContent}</pre>
          ) : (
            <p className="muted">Generate content to see a complete draft here.</p>
          )}
        </section>

        <div className="card-footer">
          <button type="button" className="primary-btn" onClick={onGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Content'}
          </button>
        </div>
      </motion.section>
    </>
  )
}
