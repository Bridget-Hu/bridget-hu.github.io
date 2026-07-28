<script setup lang="ts">
import gsap from 'gsap'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import PixelFarmScene from './PixelFarmScene.vue'

const stage = ref<HTMLElement | null>(null)
const composition = ref<SVGSVGElement | null>(null)
let animationContext: gsap.Context | undefined

interface ParallaxLayer {
  setX: gsap.QuickToFunc
  setY: gsap.QuickToFunc
  strengthX: number
  strengthY: number
}

const parallaxLayers: ParallaxLayer[] = []
const parallaxTargets: Element[] = []

function registerParallaxLayer(
  selector: string,
  strengthX: number,
  strengthY: number,
  duration: number,
) {
  if (!stage.value) return
  const targets = Array.from(stage.value.querySelectorAll<HTMLElement | SVGElement>(selector))
  if (!targets.length) return

  parallaxTargets.push(...targets)
  parallaxLayers.push({
    setX: gsap.quickTo(targets, 'x', { duration, ease: 'power3.out' }),
    setY: gsap.quickTo(targets, 'y', { duration, ease: 'power3.out' }),
    strengthX,
    strengthY,
  })
}

function handlePointerMove(event: PointerEvent) {
  if (!stage.value || !parallaxLayers.length || window.innerWidth < 768) return

  const bounds = stage.value.getBoundingClientRect()
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2

  parallaxLayers.forEach((layer) => {
    layer.setX(x * layer.strengthX)
    layer.setY(y * layer.strengthY)
  })
}

function resetParallax() {
  parallaxLayers.forEach((layer) => {
    layer.setX(0)
    layer.setY(0)
  })
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hasFinePointer = window.matchMedia(
    '(min-width: 768px) and (hover: hover) and (pointer: fine)',
  ).matches

  if (!reducedMotion && stage.value && composition.value) {
    animationContext = gsap.context(() => {
      const stems = Array.from(
        composition.value?.querySelectorAll<SVGPathElement>('.plant-stem-path') ?? [],
      )

      stems.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
      })

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
      timeline
        .to(stems, {
          strokeDashoffset: 0,
          duration: 1.35,
          stagger: 0.12,
        })
        .from(
          '.plant-leaf',
          {
            autoAlpha: 0,
            scale: 0.72,
            duration: 0.65,
            stagger: 0.12,
            transformOrigin: 'center center',
          },
          '-=0.8',
        )
        .from(
          '.plant-label',
          {
            autoAlpha: 0,
            y: 8,
            duration: 0.45,
            stagger: 0.1,
          },
          '-=0.35',
        )
    }, stage.value)
  }

  if (!reducedMotion && hasFinePointer && stage.value) {
    registerParallaxLayer('.plant-sun, .paper-contour, .pixel-far-layer', 2.2, 1.4, 1.35)
    registerParallaxLayer('.pixel-cloud-layer', 3.4, 2, 1.2)
    registerParallaxLayer(
      '.plant-stems, .plant-base, .pixel-cottage, .pixel-windmill, .pixel-growth-sequence',
      4.7,
      3.1,
      1.05,
    )
    registerParallaxLayer('.plant-leaf, .plant-label, .plant-caption, .pixel-garden-sign', 6.2, 4.1, 0.9)
    stage.value.addEventListener('pointermove', handlePointerMove, { passive: true })
    stage.value.addEventListener('pointerleave', resetParallax)
  }
})

onBeforeUnmount(() => {
  stage.value?.removeEventListener('pointermove', handlePointerMove)
  stage.value?.removeEventListener('pointerleave', resetParallax)
  gsap.killTweensOf(parallaxTargets)
  parallaxLayers.length = 0
  parallaxTargets.length = 0
  animationContext?.revert()
})
</script>

<template>
  <div ref="stage" class="plant-hero-stage">
    <svg
      ref="composition"
      class="plant-hero-art"
      viewBox="0 0 560 620"
      role="img"
      aria-labelledby="plant-hero-title plant-hero-description"
    >
      <title id="plant-hero-title">A growing digital plant</title>
      <desc id="plant-hero-description">
        An original illustration with leaves labeled Build, Learn, and Explore.
      </desc>

      <circle class="plant-sun" cx="300" cy="260" r="214" />
      <path class="paper-contour contour-one" d="M72 410C132 350 155 296 139 225" />
      <path class="paper-contour contour-two" d="M434 91C481 157 494 223 478 288" />
      <path class="paper-contour contour-three" d="M83 477C173 522 374 551 484 468" />

      <g class="plant-base">
        <path class="book-page page-back" d="M151 526C214 510 267 517 297 542V579C256 559 207 557 151 571Z" />
        <path class="book-page page-front" d="M297 542C337 516 395 510 452 526V571C400 556 348 558 297 579Z" />
        <path class="book-spine" d="M297 541V579" />
        <path class="pot-rim-svg" d="M232 486H364L352 514H244Z" />
        <path class="pot-body-svg" d="M250 512H347L333 558H265Z" />
        <ellipse class="pot-soil-svg" cx="298" cy="493" rx="61" ry="12" />
        <text class="plant-b" x="298" y="539" text-anchor="middle">b</text>
      </g>

      <g class="plant-stems">
        <path class="plant-stem-path stem-main" d="M298 491C286 427 309 374 292 321C276 271 290 215 306 157C314 127 317 104 314 81" />
        <path class="plant-stem-path stem-build" d="M293 328C252 302 216 267 194 225" />
        <path class="plant-stem-path stem-learn" d="M300 262C344 243 381 207 401 169" />
        <path class="plant-stem-path stem-explore" d="M304 178C271 156 244 127 230 95" />
        <path class="plant-stem-path stem-tip" d="M314 82C340 72 357 53 365 31" />
      </g>

      <g class="plant-leaf leaf-build">
        <path class="leaf-shape leaf-sage" d="M198 226C152 224 126 194 126 151C166 147 203 169 212 207C213 215 208 222 198 226Z" />
        <path class="leaf-vein" d="M202 216C179 195 158 177 136 160" />
        <path class="leaf-vein leaf-vein-small" d="M178 194L178 169M161 180L151 200" />
      </g>

      <g class="plant-leaf leaf-learn">
        <path class="leaf-shape leaf-lake" d="M397 170C413 124 449 107 489 120C484 160 456 188 415 188C406 187 400 181 397 170Z" />
        <path class="leaf-vein" d="M407 177C436 160 458 143 478 128" />
        <path class="leaf-vein leaf-vein-small" d="M435 160L431 136M455 146L463 164" />
      </g>

      <g class="plant-leaf leaf-explore">
        <path class="leaf-shape leaf-warm" d="M233 97C196 90 177 63 182 28C219 29 247 50 250 81C249 89 243 95 233 97Z" />
        <path class="leaf-vein" d="M239 88C221 70 205 53 190 37" />
        <path class="leaf-vein leaf-vein-small" d="M219 68L218 45M204 53L196 70" />
      </g>

      <g class="plant-leaf leaf-tip">
        <path class="leaf-shape leaf-light" d="M364 33C366 4 386 -11 411 -7C412 19 397 39 374 43C368 42 365 39 364 33Z" />
        <path class="leaf-vein" d="M371 36C384 22 395 10 404 0" />
      </g>

      <g class="plant-label label-build-plant">
        <rect x="82" y="244" width="92" height="34" rx="17" />
        <circle cx="100" cy="261" r="4" />
        <text x="112" y="266">Build</text>
      </g>
      <g class="plant-label label-learn-plant">
        <rect x="403" y="202" width="94" height="34" rx="17" />
        <circle cx="421" cy="219" r="4" />
        <text x="433" y="224">Learn</text>
      </g>
      <g class="plant-label label-explore-plant">
        <rect x="121" y="102" width="108" height="34" rx="17" />
        <circle cx="139" cy="119" r="4" />
        <text x="151" y="124">Explore</text>
      </g>

      <g class="plant-caption">
        <path d="M398 470H476" />
        <text x="398" y="460">a work in progress</text>
      </g>
    </svg>

    <PixelFarmScene />
  </div>
</template>
