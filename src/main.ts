import { createApp } from 'vue'

import App from './App.vue'
import './styles/main.css'
import './styles/interactions.css'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
document.documentElement.classList.toggle('garden-motion', !reducedMotion)

createApp(App).mount('#app')
