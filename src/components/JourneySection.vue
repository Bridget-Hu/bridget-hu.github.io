<script setup lang="ts">
import gsap from 'gsap'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { journeyEntries } from '@/data/journey'
import SectionHeading from './SectionHeading.vue'

const timeline = ref<HTMLElement | null>(null)
let itemObserver: IntersectionObserver | undefined
let vineObserver: IntersectionObserver | undefined
let timelineItems: HTMLElement[] = []
let vinePath: SVGPathElement | null = null

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timelineItems = Array.from(
    timeline.value?.querySelectorAll<HTMLElement>('.journey-entry') ?? [],
  )
  vinePath = timeline.value?.querySelector<SVGPathElement>('.journey-vine-line') ?? null

  if (reducedMotion) return

  gsap.set(timelineItems, { autoAlpha: 0, y: 24 })

  if (vinePath) {
    const length = vinePath.getTotalLength()
    gsap.set(vinePath, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    vineObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || !vinePath) return
        gsap.to(vinePath, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power1.inOut',
        })
        vineObserver?.disconnect()
      },
      { threshold: 0.12 },
    )
    if (timeline.value) vineObserver.observe(timeline.value)
  }

  itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        gsap.to(entry.target, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        })
        itemObserver?.unobserve(entry.target)
      })
    },
    {
      threshold: 0.25,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  timelineItems.forEach((item) => itemObserver?.observe(item))
})

onBeforeUnmount(() => {
  itemObserver?.disconnect()
  vineObserver?.disconnect()
  gsap.killTweensOf(timelineItems)
  if (vinePath) gsap.killTweensOf(vinePath)
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
            class="journey-vine-line"
            d="M71 8C28 108 111 175 69 273C29 366 112 447 67 540C30 617 110 716 68 892"
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
              <span class="journey-year">{{ entry.year }}</span>
              <p>{{ entry.text }}</p>
              <span class="journey-number" aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </article>
            <span class="journey-leaf-marker" aria-hidden="true"></span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
