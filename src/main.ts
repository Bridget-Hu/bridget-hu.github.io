import { createApp } from 'vue'

import App from './App.vue'
import './styles/main.css'
import './styles/interactions.css'
import './styles/theme.css'

type GardenTheme = 'day' | 'evening'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
document.documentElement.classList.toggle('garden-motion', !reducedMotion)

let initialTheme: GardenTheme = 'day'
try {
  const storedTheme = window.localStorage.getItem('bridget-garden-theme')
  if (storedTheme === 'day' || storedTheme === 'evening') {
    initialTheme = storedTheme
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    initialTheme = 'evening'
  }
} catch {
  // Keep the bright natural default when storage is unavailable.
}
document.documentElement.dataset.theme = initialTheme

createApp(App).mount('#app')
