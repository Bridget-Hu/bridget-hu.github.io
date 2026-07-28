<script setup lang="ts">
import { Clock3 } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { Project } from '@/data/projects'
import ProjectIllustration from './ProjectIllustration.vue'

defineProps<{
  project: Project
}>()

const card = ref<HTMLElement | null>(null)
let interactionFrame = 0
let interactionQuery: MediaQueryList | undefined
let canTilt = false

function syncInteractionMode() {
  canTilt = Boolean(interactionQuery?.matches)
  if (!canTilt) resetCard()
}

function handlePointerMove(event: PointerEvent) {
  if (!canTilt || !card.value) return
  if (interactionFrame) window.cancelAnimationFrame(interactionFrame)

  interactionFrame = window.requestAnimationFrame(() => {
    interactionFrame = 0
    if (!card.value) return

    const bounds = card.value.getBoundingClientRect()
    const relativeX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
    const relativeY = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height))
    const rotateX = (0.5 - relativeY) * 2.8
    const rotateY = (relativeX - 0.5) * 3.8

    card.value.style.setProperty('--card-rotate-x', `${rotateX.toFixed(2)}deg`)
    card.value.style.setProperty('--card-rotate-y', `${rotateY.toFixed(2)}deg`)
    card.value.style.setProperty('--card-glow-x', `${(relativeX * 100).toFixed(1)}%`)
    card.value.style.setProperty('--card-glow-y', `${(relativeY * 100).toFixed(1)}%`)
  })
}

function resetCard() {
  if (interactionFrame) window.cancelAnimationFrame(interactionFrame)
  interactionFrame = 0
  card.value?.style.setProperty('--card-rotate-x', '0deg')
  card.value?.style.setProperty('--card-rotate-y', '0deg')
  card.value?.style.setProperty('--card-glow-x', '50%')
  card.value?.style.setProperty('--card-glow-y', '45%')
}

onMounted(() => {
  interactionQuery = window.matchMedia(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  )
  syncInteractionMode()
  interactionQuery.addEventListener('change', syncInteractionMode)
})

onBeforeUnmount(() => {
  if (interactionFrame) window.cancelAnimationFrame(interactionFrame)
  interactionQuery?.removeEventListener('change', syncInteractionMode)
})
</script>

<template>
  <article
    ref="card"
    class="project-card"
    :class="`project-${project.tone}`"
    tabindex="0"
    data-garden-reveal
    @pointermove="handlePointerMove"
    @pointerleave="resetCard"
    @pointercancel="resetCard"
    @blur="resetCard"
  >
    <div class="project-card-header">
      <span class="project-index">{{ project.index }}</span>
      <span class="project-role">{{ project.role }}</span>
    </div>

    <ProjectIllustration :type="project.visual" :title="project.title" />

    <div class="project-copy">
      <p class="project-category">{{ project.category }}</p>
      <h3>{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <ul class="tech-list" :aria-label="`${project.title} technologies`">
        <li v-for="technology in project.technologies" :key="technology">
          {{ technology }}
        </li>
      </ul>
    </div>

    <div class="project-status" aria-label="Project details coming soon">
      <Clock3 :size="15" aria-hidden="true" />
      Details coming soon
    </div>
  </article>
</template>
