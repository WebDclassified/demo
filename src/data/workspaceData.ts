import {
  BarChart3,
  BookOpen,
  Briefcase,
  FileText,
  House,
  Lightbulb,
  List,
  Mail,
  MessageCircle,
  Newspaper,
  Rocket,
  Send,
  Sparkles,
  Tag,
} from 'lucide-react'
import type {
  FormatItem,
  ModuleContent,
  NavItem,
  Tool,
  WorkspaceForm,
} from '../types/workspace'

export const STORAGE_KEY = 'growthhub-workspace-v5'

export const tools: Tool[] = [
  { id: 'newsletter', name: 'Newsletter', subtitle: 'Email campaigns', icon: Mail },
  { id: 'blog-post', name: 'Blog Post', subtitle: 'SEO content', icon: FileText },
  { id: 'linkedin', name: 'LinkedIn', subtitle: 'Professional posts', icon: Briefcase },
  { id: 'threads', name: 'Threads', subtitle: 'Short-form posts', icon: MessageCircle },
  { id: 'instagram', name: 'Instagram', subtitle: 'Social content', icon: Sparkles },
  { id: 'cold-email', name: 'Cold Email', subtitle: 'Sales outreach', icon: Send },
]

export const formats: FormatItem[] = [
  { id: 'how-to', label: 'How-To', icon: Lightbulb },
  { id: 'listicle', label: 'Listicle', icon: List },
  { id: 'opinion', label: 'Opinion', icon: BookOpen },
  { id: 'case-study', label: 'Case Study', icon: Briefcase },
  { id: 'news', label: 'News', icon: Newspaper },
]

export const tones = ['Expert', 'Friendly', 'Bold', 'Conversational']
export const lengths = ['Short', 'Standard', 'Long-Form']

export const navItems: NavItem[] = [
  { id: 'growth', label: 'Growth', path: '/', icon: House },
  { id: 'prompt', label: 'Prompt Enhancer', path: '/prompt-enhancer', icon: Sparkles },
  { id: 'pricing', label: 'Pricing', path: '/pricing', icon: Tag },
  { id: 'crm', label: 'RealTech CRM', path: '/crm', icon: Rocket },
  { id: 'analytics', label: 'Howdy Analytics', path: '/analytics', icon: BarChart3 },
]

export const moduleContent: Record<string, ModuleContent> = {
  prompt: {
    subtitle: 'Prompt Lab',
    title: 'Prompt Enhancer',
    description: 'Shape better prompts with intent presets, context injection, and quality checks.',
    cards: [
      {
        title: 'Prompt Score',
        description: 'Instantly measure clarity, specificity, and likely response quality.',
        action: 'Run Analysis',
      },
      {
        title: 'Template Library',
        description: 'Use tested prompt templates for social, SEO, outbound, and nurturing.',
        action: 'Browse Templates',
      },
      {
        title: 'Context Blocks',
        description: 'Save reusable context chunks for audience, tone, and conversion goals.',
        action: 'Open Contexts',
      },
    ],
  },
  pricing: {
    subtitle: 'Revenue Engine',
    title: 'Pricing Workspace',
    description: 'Tune plans, monitor conversion impact, and compare packaging performance.',
    cards: [
      {
        title: 'Plan Optimizer',
        description: 'Simulate package and price combinations before pushing live.',
        action: 'Simulate Plans',
      },
      {
        title: 'Discount Intelligence',
        description: 'Track offer fatigue and find highest-performing discount windows.',
        action: 'View Insights',
      },
      {
        title: 'Billing Health',
        description: 'Watch churn risk, failed renewals, and expansion opportunities.',
        action: 'Open Billing',
      },
    ],
  },
  crm: {
    subtitle: 'Pipeline Command',
    title: 'RealTech CRM',
    description: 'Centralize lead progression, owner actions, and engagement history.',
    cards: [
      {
        title: 'Lead Prioritization',
        description: 'Auto-rank opportunities by fit score and revenue probability.',
        action: 'Prioritize Leads',
      },
      {
        title: 'Deal Velocity',
        description: 'Track stage delays and blockers with AI-generated follow-ups.',
        action: 'Inspect Deals',
      },
      {
        title: 'Task Automation',
        description: 'Generate reminders and next actions from meeting notes.',
        action: 'Manage Automations',
      },
    ],
  },
  analytics: {
    subtitle: 'Data Studio',
    title: 'Howdy Analytics',
    description: 'Get campaign intelligence, funnel anomalies, and growth recommendations.',
    cards: [
      {
        title: 'Executive Dashboard',
        description: 'One-screen summary of pipeline, CAC, LTV, and conversion trend.',
        action: 'Open Dashboard',
      },
      {
        title: 'Attribution Lens',
        description: 'Understand which channels influence assisted and direct conversions.',
        action: 'Compare Channels',
      },
      {
        title: 'Anomaly Alerts',
        description: 'Detect traffic spikes, drop-offs, and tracking inconsistencies early.',
        action: 'View Alerts',
      },
    ],
  },
}

export const defaultForm: WorkspaceForm = {
  businessName: 'Acme Tech',
  industry: 'Marketing',
  description: 'People under age 25 holding a degree in Computer Science and Engineering.',
  keywords: 'student growth, career path, cs community',
  tone: 'Expert',
  length: 'Standard',
}
