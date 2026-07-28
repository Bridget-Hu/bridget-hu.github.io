export type ProjectVisual = 'fern' | 'dialogue' | 'receipt' | 'growth'
export type ProjectTone = 'sage' | 'lake' | 'clay' | 'moss'

export interface Project {
  index: string
  title: string
  category: string
  role: string
  description: string
  technologies: string[]
  visual: ProjectVisual
  tone: ProjectTone
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'Jade Craft',
    category: 'AI Agent · Cybersecurity Training',
    role: 'Project Lead',
    description:
      'An AI-powered cybersecurity troubleshooting and training platform designed around diagnosis, repair, verification, and skill evaluation.',
    technologies: ['Next.js', 'React', 'Fastify', 'TypeScript', 'AI Agent'],
    visual: 'fern',
    tone: 'moss',
  },
  {
    index: '02',
    title: 'AI Interview',
    category: 'Full-stack Application',
    role: 'Team Lead',
    description:
      'An intelligent interview practice platform covering interview workflows, evaluation, and desktop application delivery.',
    technologies: ['Vue 3', 'FastAPI', 'Electron', 'SQLite'],
    visual: 'dialogue',
    tone: 'lake',
  },
  {
    index: '03',
    title: 'OCR Bookkeeping App',
    category: 'OCR · API Integration',
    role: 'Developer',
    description:
      'A lightweight bookkeeping application that extracts transaction information from images and converts it into structured records.',
    technologies: ['FastAPI', 'PaddleOCR', 'Cloud OCR API'],
    visual: 'receipt',
    tone: 'clay',
  },
  {
    index: '04',
    title: 'MathorCup Modeling',
    category: 'Optimization · Data Analysis',
    role: 'Modeling Team Member',
    description:
      'A petroleum price regulation optimization project involving data analysis, model predictive control, and rule-based strategies.',
    technologies: ['Python', 'Pandas', 'Optimization', 'MPC'],
    visual: 'growth',
    tone: 'sage',
  },
]
