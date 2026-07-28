<script setup lang="ts">
import { MoonStar, SunMedium } from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type GardenTheme = 'day' | 'evening'

const STORAGE_KEY = 'bridget-garden-theme'
const theme = ref<GardenTheme>('day')
const isEvening = computed(() => theme.value === 'evening')
const nextThemeLabel = computed(() => (isEvening.value ? 'Day' : 'Evening'))

function isGardenTheme(value: string | null): value is GardenTheme {
  return value === 'day' || value === 'evening'
}

function applyTheme(nextTheme: GardenTheme, persist = true) {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme

  if (!persist) return
  try {
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
  } catch {
    // Theme switching still works when storage is unavailable.
  }
}

function toggleTheme() {
  applyTheme(isEvening.value ? 'day' : 'evening')
}

function handleStorage(event: StorageEvent) {
  if (event.key === STORAGE_KEY && isGardenTheme(event.newValue)) {
    applyTheme(event.newValue, false)
  }
}

onMounted(() => {
  const initialTheme = document.documentElement.dataset.theme
  applyTheme(initialTheme === 'evening' ? 'evening' : 'day', false)
  window.addEventListener('storage', handleStorage)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorage)
})
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="`Switch to ${nextThemeLabel} theme`"
    :aria-pressed="isEvening"
    @click="toggleTheme"
  >
    <span class="theme-toggle-track" aria-hidden="true">
      <span class="theme-toggle-thumb" :class="{ evening: isEvening }">
        <MoonStar v-if="isEvening" :size="13" stroke-width="2" />
        <SunMedium v-else :size="14" stroke-width="2" />
      </span>
    </span>
    <span class="theme-toggle-label">{{ isEvening ? 'Evening' : 'Day' }}</span>
  </button>
</template>
