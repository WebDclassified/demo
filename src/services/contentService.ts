import type { GenerationInput, GenerationResult } from '../types/workspace'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined

const localGenerate = (input: GenerationInput): GenerationResult => {
  const keywordList = input.form.keywords
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  const markdown = [
    `# ${input.formatLabel}: ${input.form.businessName} Growth Playbook`,
    '',
    '## Context',
    `- Tool: ${input.toolName}`,
    `- Industry: ${input.form.industry}`,
    `- Tone: ${input.form.tone}`,
    `- Target Length: ${input.form.length}`,
    '',
    '## Audience',
    input.form.description,
    '',
    '## Core Angles',
    ...keywordList.map((keyword, index) => `${index + 1}. ${keyword}`),
    '',
    '## Suggested Outline',
    '1. Hook: Why this audience is currently underserved',
    `2. Pain-point breakdown specific to ${input.form.industry.toLowerCase()} teams`,
    '3. A practical strategy framework with clear examples',
    '4. Counterarguments and how to address them',
    `5. CTA: Join ${input.form.businessName} next step offer`,
    '',
    '## CTA Variants',
    '- Book a strategy walkthrough',
    '- Download the implementation checklist',
    '- Try the starter workflow in GrowthHub',
  ].join('\n')

  const qualityScore = Math.min(
    100,
    Math.round(
      Math.min(40, input.form.description.length / 4) +
        Math.min(30, keywordList.length * 8) +
        (input.form.tone ? 15 : 0) +
        (input.form.length ? 15 : 0),
    ),
  )

  return {
    markdown,
    qualityScore,
    generatedAt: new Date().toISOString(),
  }
}

export const generateContentDraft = async (input: GenerationInput): Promise<GenerationResult> => {
  if (!API_BASE_URL) {
    await new Promise((resolve) => window.setTimeout(resolve, 450))
    return localGenerate(input)
  }

  const response = await fetch(`${API_BASE_URL}/content/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(`Generation API failed with ${response.status}`)
  }

  const payload = (await response.json()) as GenerationResult
  return payload
}
