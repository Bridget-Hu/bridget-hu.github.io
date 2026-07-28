<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const DREAM_DURATION_MS = 2100
const INTERACTION_LOCK_MS = 520
const DESKTOP_STEP_PX = 12

const showDream = ref(false)
const isWalking = ref(false)
const stepOffset = ref(0)
const interactionLocked = ref(false)

let dreamTimer = 0
let walkTimer = 0
let lockTimer = 0
let walkQuery: MediaQueryList | undefined
let canWalk = false

const chickLabel = computed(() =>
  showDream.value
    ? 'Tiny farm chick says: A tiny farm dream.'
    : 'Ask the original pixel farm chick about its dream',
)

function syncWalkMode() {
  canWalk = Boolean(walkQuery?.matches && navigator.maxTouchPoints === 0)
  if (!canWalk) {
    stepOffset.value = 0
    isWalking.value = false
  }
}

function revealDream() {
  if (interactionLocked.value) return

  interactionLocked.value = true
  showDream.value = true

  if (canWalk) {
    stepOffset.value = stepOffset.value === 0 ? DESKTOP_STEP_PX : 0
    isWalking.value = true
    if (walkTimer) window.clearTimeout(walkTimer)
    walkTimer = window.setTimeout(() => {
      isWalking.value = false
      walkTimer = 0
    }, INTERACTION_LOCK_MS)
  }

  if (dreamTimer) window.clearTimeout(dreamTimer)
  dreamTimer = window.setTimeout(() => {
    showDream.value = false
    dreamTimer = 0
  }, DREAM_DURATION_MS)

  if (lockTimer) window.clearTimeout(lockTimer)
  lockTimer = window.setTimeout(() => {
    interactionLocked.value = false
    lockTimer = 0
  }, INTERACTION_LOCK_MS)
}

onMounted(() => {
  walkQuery = window.matchMedia(
    '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  )
  syncWalkMode()
  walkQuery.addEventListener('change', syncWalkMode)
})

onBeforeUnmount(() => {
  if (dreamTimer) window.clearTimeout(dreamTimer)
  if (walkTimer) window.clearTimeout(walkTimer)
  if (lockTimer) window.clearTimeout(lockTimer)
  walkQuery?.removeEventListener('change', syncWalkMode)
})
</script>

<template>
  <div class="pixel-chicken-parallax">
    <button
      class="pixel-chicken"
      :class="{ walking: isWalking }"
      :style="{ '--chick-step': `${stepOffset}px` }"
      type="button"
      :aria-label="chickLabel"
      :aria-describedby="showDream ? 'hero-chicken-dream' : undefined"
      @click.stop="revealDream"
    >
      <span class="pixel-chicken-sprite" aria-hidden="true">
        <i class="pixel-chicken-body"></i>
        <i class="pixel-chicken-wing"></i>
        <i class="pixel-chicken-head"></i>
        <i class="pixel-chicken-eye"></i>
        <i class="pixel-chicken-beak"></i>
        <i class="pixel-chicken-leg leg-left"></i>
        <i class="pixel-chicken-leg leg-right"></i>
      </span>
    </button>

    <Transition name="chicken-dream">
      <span
        v-if="showDream"
        id="hero-chicken-dream"
        class="chicken-dream-message"
        role="status"
      >
        <b aria-hidden="true">♥</b>
        A tiny farm dream.
      </span>
    </Transition>
  </div>
</template>
