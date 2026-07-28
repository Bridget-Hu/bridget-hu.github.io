<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const chickWalking = ref(false)
const plantGrown = ref(false)
const notesVisible = ref(false)
let chickTimer = 0
let notesTimer = 0

function walkChick() {
  if (chickWalking.value) return
  chickWalking.value = true
  chickTimer = window.setTimeout(() => {
    chickWalking.value = false
    chickTimer = 0
  }, 1350)
}

function growPlant() {
  plantGrown.value = true
}

function playVisualNotes() {
  notesVisible.value = true
  if (notesTimer) window.clearTimeout(notesTimer)
  notesTimer = window.setTimeout(() => {
    notesVisible.value = false
    notesTimer = 0
  }, 1500)
}

onBeforeUnmount(() => {
  if (chickTimer) window.clearTimeout(chickTimer)
  if (notesTimer) window.clearTimeout(notesTimer)
})
</script>

<template>
  <div class="pixel-decor-shelf" aria-label="Original interactive pixel farm keepsakes">
    <span class="pixel-shelf-sign" aria-hidden="true">little joys</span>

    <button
      class="pixel-decor-item decor-chicken"
      :class="{ walking: chickWalking }"
      type="button"
      aria-label="Let the original pixel chick walk a few steps"
      @click="walkChick"
    >
      <i class="decor-chick-body"></i>
      <i class="decor-chick-head"></i>
      <i class="decor-chick-eye"></i>
      <i class="decor-chick-beak"></i>
      <i class="decor-chick-legs"></i>
    </button>

    <button
      class="pixel-decor-item decor-plant"
      :class="{ grown: plantGrown }"
      type="button"
      :aria-label="plantGrown ? 'The original pixel plant has grown a new leaf' : 'Grow a leaf on the original pixel plant'"
      @click="growPlant"
    >
      <i class="decor-pot"></i>
      <i class="decor-stem"></i>
      <i class="decor-leaf decor-leaf-one"></i>
      <i class="decor-leaf decor-leaf-two"></i>
      <i class="decor-leaf decor-new-leaf"></i>
    </button>

    <button
      class="pixel-decor-item decor-piano"
      type="button"
      aria-label="Show visual notes from the original pixel piano; no sound will play"
      @click="playVisualNotes"
    >
      <i class="piano-case"></i>
      <i class="piano-keys"></i>
      <span class="piano-notes" :class="{ visible: notesVisible }" aria-hidden="true">
        ♪ ♫
      </span>
    </button>

    <span
      class="pixel-decor-item decor-seed-bag"
      role="img"
      aria-label="An original pixel seed bag"
    >
      <i></i>
      <b>+</b>
    </span>

  </div>
</template>
