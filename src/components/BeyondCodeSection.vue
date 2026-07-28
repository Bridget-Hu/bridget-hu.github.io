<script setup lang="ts">
import { BookOpen, Clapperboard, Music2, Sprout } from 'lucide-vue-next'

import SectionHeading from './SectionHeading.vue'

const interests = [
  {
    title: 'Piano',
    detail: 'Amateur Grade 8',
    icon: Music2,
    style: 'music',
  },
  {
    title: 'Stardew Valley',
    detail: 'Building a farm full of animals',
    icon: Sprout,
    style: 'farm',
  },
  {
    title: 'Currently Reading',
    detail: "Computer Systems: A Programmer's Perspective",
    icon: BookOpen,
    style: 'reading',
  },
  {
    title: 'Stories & Films',
    detail: 'Interested in music, films, and meaningful stories',
    icon: Clapperboard,
    style: 'stories',
  },
]
</script>

<template>
  <section id="beyond" class="garden-section beyond-section section-anchor">
    <div class="page-container">
      <div class="beyond-intro">
        <SectionHeading
          eyebrow="Beyond Code"
          title="The quieter things that shape me."
          description="There is more to a good working life than the work itself."
        />

        <div class="pixel-chick" role="img" aria-label="A small original pixel-art chick">
          <span class="chick-body"></span>
          <span class="chick-head"></span>
          <span class="chick-eye"></span>
          <span class="chick-beak"></span>
          <span class="chick-leg leg-one"></span>
          <span class="chick-leg leg-two"></span>
        </div>
      </div>

      <div class="interest-board">
        <article
          v-for="(interest, index) in interests"
          :key="interest.title"
          class="interest-note"
          :class="`interest-${interest.style}`"
        >
          <span class="interest-tape" aria-hidden="true"></span>
          <div class="interest-note-header">
            <span class="interest-icon">
              <component :is="interest.icon" :size="21" stroke-width="1.7" aria-hidden="true" />
            </span>
            <span class="interest-index" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          <h3>{{ interest.title }}</h3>
          <p>{{ interest.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
