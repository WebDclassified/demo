import type { ComponentType } from 'react'

export type Tool = {
  id: string
  name: string
  subtitle: string
  icon: ComponentType<{ size?: number }>
}

export type NavItem = {
  id: string
  label: string
  path: string
  icon: ComponentType<{ size?: number }>
}

export type WorkspaceForm = {
  businessName: string
  industry: string
  description: string
  keywords: string
  tone: string
  length: string
}

export type FormatItem = {
  id: string
  label: string
  icon: ComponentType<{ size?: number }>
}

export type ModuleCard = {
  title: string
  description: string
  action: string
}

export type ModuleContent = {
  subtitle: string
  title: string
  description: string
  cards: ModuleCard[]
}

export type DraftPayload = {
  activePath?: string
  activeTool?: string
  activeFormat?: string
  form?: WorkspaceForm
  generatedContent?: string
}

export type GenerationInput = {
  toolName: string
  formatLabel: string
  form: WorkspaceForm
}

export type GenerationResult = {
  markdown: string
  qualityScore: number
  generatedAt: string
}
