import { Search, Target, WandSparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Tool } from '../types/workspace'

type ToolRailProps = {
  toolQuery: string
  onToolQueryChange: (value: string) => void
  filteredTools: Tool[]
  activeTool: string
  onToolSelect: (toolId: string) => void
}

export function ToolRail({
  toolQuery,
  onToolQueryChange,
  filteredTools,
  activeTool,
  onToolSelect,
}: ToolRailProps) {
  return (
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
        <label className="tool-search">
          <Search size={14} />
          <input
            value={toolQuery}
            onChange={(event) => onToolQueryChange(event.target.value)}
            placeholder="Search tools"
            aria-label="Search tools"
          />
        </label>

        {filteredTools.map((tool, index) => {
          const Icon = tool.icon
          const isActive = tool.id === activeTool

          return (
            <motion.button
              key={tool.id}
              type="button"
              className={`tool-item ${isActive ? 'active' : ''}`}
              onClick={() => onToolSelect(tool.id)}
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

        {filteredTools.length === 0 ? <p className="tool-empty">No tools match your search.</p> : null}
      </div>

      <div className="rail-tip">
        <Target size={16} />
        <p>Pick a tool first. The content wizard adapts automatically.</p>
      </div>
    </aside>
  )
}
