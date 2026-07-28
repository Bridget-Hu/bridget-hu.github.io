<script setup lang="ts">
import gsap from 'gsap'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { journeyEntries, type JourneyEntry } from '@/data/journey'
import SectionHeading from './SectionHeading.vue'

const stageLabels: Record<JourneyEntry['stage'], string> = {
  seed: 'Starting',
  shoot: 'Building',
  branch: 'Learning',
  leaf: 'Still Growing',
}

const timeline = ref<HTMLElement | null>(null)
let itemObserver: IntersectionObserver | undefined
let vineObserver: IntersectionObserver | undefined
let timelineItems: HTMLElement[] = []
let vinePaths: SVGPathElement[] = []

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timelineItems = Array.from(
    timeline.value?.querySelectorAll<HTMLElement>('.journey-entry') ?? [],
  )
  vinePaths = Array.from(
    timeline.value?.querySelectorAll<SVGPathElement>('.journey-vine-segment') ?? [],
  )

  if (reducedMotion) {
    timelineItems.forEach((item) => item.classList.add('journey-revealed'))
    return
  }

  gsap.set(timelineItems, { autoAlpha: 0, y: 22 })

  vinePaths.forEach((path) => {
    const length = path.getTotalLength()
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })
  })

  if (vinePaths.length && timeline.value) {
    vineObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        gsap.to(vinePaths, {
          strokeDashoffset: 0,
          duration: 0.62,
          stagger: 0.23,
          ease: 'power1.inOut',
        })
        vineObserver?.disconnect()
      },
      { threshold: 0.1 },
    )
    vineObserver.observe(timeline.value)
  }

  itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const item = entry.target as HTMLElement
        const itemIndex = Math.max(0, timelineItems.indexOf(item))
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
          delay: itemIndex * 0.06,
          ease: 'power2.out',
          onStart: () => item.classList.add('journey-revealed'),
        })
        itemObserver?.unobserve(item)
      })
    },
    {
      threshold: 0.22,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  timelineItems.forEach((item) => itemObserver?.observe(item))
})

onBeforeUnmount(() => {
  itemObserver?.disconnect()
  vineObserver?.disconnect()
  gsap.killTweensOf(timelineItems)
  gsap.killTweensOf(vinePaths)
})
</script>

<template>
  <section id="journey" class="garden-section journey-section section-anchor">
    <div class="page-container">
      <SectionHeading
        eyebrow="My Journey"
        title="A path that keeps unfolding."
        description="A few early milestones in a longer process of learning, leading, and making."
        centered
      />

      <div ref="timeline" class="journey-timeline">
        <svg
          class="journey-vine"
          viewBox="0 0 140 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            class="journey-vine-segment season-spring"
            d="M71 8C28 108 111 175 69 230"
          />
          <path
            class="journey-vine-segment season-summer"
            d="M69 230C29 330 112 405 67 458"
          />
          <path
            class="journey-vine-segment season-autumn"
            d="M67 458C30 560 110 650 68 690"
          />
          <path
            class="journey-vine-segment season-growing"
            d="M68 690C40 755 90 825 68 892"
          />
        </svg>

        <ol>
          <li
            v-for="(entry, index) in journeyEntries"
            :key="`${entry.year}-${index}`"
            class="journey-entry"
            :class="`journey-${entry.stage}`"
          >
            <article class="journey-note">
              <span class="journey-stage-label">{{ stageLabels[entry.stage] }}</span>
              <span class="journey-year">{{ entry.year }}</span>
              <p>{{ entry.text }}</p>
              <span class="journey-number" aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </article>
            <span class="journey-leaf-marker" aria-hidden="true">
              <i></i>
            </span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
