<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'

const growthStages = [
  {
    index: '01',
    title: 'Build',
    description: 'I learn best by turning ideas into working prototypes.',
    symbol: 'seed',
  },
  {
    index: '02',
    title: 'Collaborate',
    description: 'I enjoy breaking down goals, coordinating tasks, and growing with a team.',
    symbol: 'sprout',
  },
  {
    index: '03',
    title: 'Reflect',
    description: 'Every project helps me understand what to improve next.',
    symbol: 'leaf',
  },
]
</script>

<template>
  <section id="growth" class="garden-section growth-section section-anchor">
    <div class="page-container">
      <SectionHeading
        eyebrow="How I Grow"
        title="Progress has a natural rhythm."
        description="Build something real, grow alongside others, then pause long enough to understand what comes next."
      />

      <div class="growth-path">
        <svg class="growth-vine" viewBox="0 0 1000 130" preserveAspectRatio="none" aria-hidden="true">
          <path d="M60 76C210 6 300 122 474 67C633 17 745 110 940 43" />
        </svg>

        <ol class="growth-steps">
          <li
            v-for="stage in growthStages"
            :key="stage.title"
            class="growth-step"
            :class="`growth-${stage.symbol}`"
            data-garden-reveal
          >
            <div class="growth-symbol" aria-hidden="true">
              <svg v-if="stage.symbol === 'seed'" viewBox="0 0 70 70">
                <ellipse cx="35" cy="41" rx="15" ry="21" transform="rotate(24 35 41)" />
                <path d="M28 50C34 42 39 34 43 26" />
              </svg>
              <svg v-else-if="stage.symbol === 'sprout'" viewBox="0 0 70 70">
                <path d="M35 60C35 44 35 30 33 17" />
                <path d="M33 32C22 31 15 23 16 13C28 12 36 19 33 32Z" />
                <path d="M35 42C48 40 55 31 54 20C42 19 34 27 35 42Z" />
              </svg>
              <svg v-else viewBox="0 0 70 70">
                <path d="M13 55C27 43 40 31 56 14" />
                <path d="M30 41C15 42 7 34 7 23C20 19 32 27 30 41Z" />
                <path d="M42 29C43 14 52 7 63 8C64 20 56 31 42 29Z" />
              </svg>
            </div>
            <span class="growth-index">{{ stage.index }}</span>
            <h3>{{ stage.title }}</h3>
            <p>{{ stage.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
