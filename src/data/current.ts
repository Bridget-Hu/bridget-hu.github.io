export type CurrentItemKind = 'building' | 'learning' | 'exploring' | 'enjoying'

export interface CurrentItem {
  label: string
  value: string
  kind: CurrentItemKind
}

export const currentItems: CurrentItem[] = [
  {
    label: 'Building',
    value: 'Jade Craft',
    kind: 'building',
  },
  {
    label: 'Learning',
    value: 'Computer Systems',
    kind: 'learning',
  },
  {
    label: 'Exploring',
    value: 'AI Agents and Backend Engineering',
    kind: 'exploring',
  },
  {
    label: 'Enjoying',
    value: 'Piano, films, and Stardew Valley',
    kind: 'enjoying',
  },
]
