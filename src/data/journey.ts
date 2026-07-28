export interface JourneyEntry {
  year: string
  text: string
  stage: 'seed' | 'shoot' | 'branch' | 'leaf'
}

export const journeyEntries: JourneyEntry[] = [
  {
    year: '2025',
    text: 'Started studying Software Engineering',
    stage: 'seed',
  },
  {
    year: '2026',
    text: 'Led the AI Interview project',
    stage: 'shoot',
  },
  {
    year: '2026',
    text: 'Explored modeling, OCR, and full-stack development',
    stage: 'branch',
  },
  {
    year: 'Now',
    text: 'Building Jade Craft and learning more about AI agents, computer systems, and practical software engineering',
    stage: 'leaf',
  },
]
