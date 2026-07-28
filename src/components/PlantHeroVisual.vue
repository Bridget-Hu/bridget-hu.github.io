<script setup lang="ts">
import gsap from 'gsap'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import PixelFarmScene from './PixelFarmScene.vue'

interface ParallaxLayer {
  setX: gsap.QuickToFunc
  setY: gsap.QuickToFunc
  strengthX: number
  strengthY: number
}

const stage = ref<HTMLElement | null>(null)
const composition = ref<SVGSVGElement | null>(null)
const parallaxLayers: ParallaxLayer[] = []
const parallaxTargets: Element[] = []

let animationContext: gsap.Context | undefined
let introTimeline: gsap.core.Timeline | undefined
let pointerQuery: MediaQueryList | undefined
let motionQuery: MediaQueryList | undefined
let parallaxAttached = false
let hasTouchInput = false

function registerParallaxLayer(
  selector: string,
  strengthX: number,
  strengthY: number,
  duration: number,
) {
  if (!stage.value) return

  const targets = Array.from(
    stage.value.querySelectorAll<HTMLElement | SVGElement>(selector),
  )
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
  if (!stage.value || !parallaxAttached) return

  const bounds = stage.value.getBoundingClientRect()
  const normalizedX = Math.max(
    -1,
    Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
  )
  const normalizedY = Math.max(
    -1,
    Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
  )

  parallaxLayers.forEach((layer) => {
    layer.setX(normalizedX * layer.strengthX)
    layer.setY(normalizedY * layer.strengthY)
  })
}

function resetParallax() {
  parallaxLayers.forEach((layer) => {
    layer.setX(0)
    layer.setY(0)
  })
}

function setupParallax() {
  if (!stage.value || parallaxAttached) return

  registerParallaxLayer('.hero-sun-parallax', 1.5, 1, 1.35)
  registerParallaxLayer('.hero-hill-far-parallax', 2.4, 1.5, 1.3)
  registerParallaxLayer('.hero-hill-near-parallax', 3.2, 2, 1.2)
  registerParallaxLayer('.hero-cloud-parallax', 4.4, 2.5, 1.15)
  registerParallaxLayer('.hero-midground-parallax', 5.2, 3.2, 1.05)
  registerParallaxLayer('.hero-plant-parallax', 6.4, 4, 0.95)
  registerParallaxLayer('.hero-foreground-parallax', 8, 5.2, 0.88)
  registerParallaxLayer('.pixel-chicken-parallax', 5, 3.2, 0.96)

  stage.value.addEventListener('pointermove', handlePointerMove, { passive: true })
  stage.value.addEventListener('pointerleave', resetParallax)
  parallaxAttached = true
}

function teardownParallax() {
  if (!stage.value) return

  stage.value.removeEventListener('pointermove', handlePointerMove)
  stage.value.removeEventListener('pointerleave', resetParallax)
  if (parallaxTargets.length) {
    gsap.killTweensOf(parallaxTargets)
    gsap.set(parallaxTargets, { x: 0, y: 0 })
  }
  parallaxLayers.length = 0
  parallaxTargets.length = 0
  parallaxAttached = false
}

function syncInteractionMode() {
  const reducedMotion = Boolean(motionQuery?.matches)
  stage.value?.classList.toggle('hero-reduced-motion', reducedMotion)

  if (reducedMotion && introTimeline) {
    introTimeline.progress(1).pause()
  }

  if (!reducedMotion && pointerQuery?.matches && !hasTouchInput) {
    setupParallax()
  } else {
    teardownParallax()
  }
}

function handleVisibilityChange() {
  if (!stage.value) return

  stage.value.classList.toggle('scene-paused', document.hidden)
  if (document.hidden) {
    introTimeline?.pause()
  } else if (!motionQuery?.matches && introTimeline && introTimeline.progress() < 1) {
    introTimeline.resume()
  }
}

function buildIntroAnimation() {
  if (!stage.value || !composition.value) return

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

    introTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
    introTimeline
      .from('.hero-sun-intro', { autoAlpha: 0, scale: 0.94, duration: 0.55 }, 0)
      .from('.hero-cloud-intro', { autoAlpha: 0, x: -8, duration: 0.5 }, 0.08)
      .from(
        '.hero-hill-intro',
        { autoAlpha: 0, y: 8, duration: 0.5, stagger: 0.08 },
        0.12,
      )
      .from('.hero-ground-intro', { autoAlpha: 0, y: 10, duration: 0.45 }, 0.2)
      .to(
        stems,
        { strokeDashoffset: 0, duration: 1.1, stagger: 0.08, ease: 'power1.inOut' },
        0.34,
      )
      .from(
        '.plant-leaf',
        {
          autoAlpha: 0,
          scale: 0.7,
          duration: 0.55,
          stagger: 0.1,
          transformOrigin: 'center center',
        },
        0.82,
      )
      .from(
        '.plant-label',
        { autoAlpha: 0, y: 7, duration: 0.38, stagger: 0.09 },
        1.28,
      )
      .from(
        '.plant-bud',
        { autoAlpha: 0, scale: 0.55, duration: 0.42, transformOrigin: 'center bottom' },
        1.62,
      )
  }, stage.value)
}

onMounted(() => {
  if (!stage.value || !composition.value) return

  hasTouchInput = navigator.maxTouchPoints > 0
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  pointerQuery = window.matchMedia(
    '(min-width: 768px) and (hover: hover) and (pointer: fine)',
  )

  if (!motionQuery.matches) buildIntroAnimation()
  syncInteractionMode()
  handleVisibilityChange()

  pointerQuery.addEventListener('change', syncInteractionMode)
  motionQuery.addEventListener('change', syncInteractionMode)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  teardownParallax()
  pointerQuery?.removeEventListener('change', syncInteractionMode)
  motionQuery?.removeEventListener('change', syncInteractionMode)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  introTimeline?.kill()
  animationContext?.revert()
})
</script>

<template>
  <div ref="stage" class="plant-hero-stage">
    <PixelFarmScene />

    <svg
      ref="composition"
      class="plant-hero-art"
      viewBox="0 0 560 620"
      role="img"
      aria-labelledby="plant-hero-title plant-hero-description"
    >
      <title id="plant-hero-title">A growing plant in a modern digital garden</title>
      <desc id="plant-hero-description">
        An original natural illustration with soft hills, a windmill, pixel soil, a tiny
        chicken, and leaves labeled Build, Learn, and Explore.
      </desc>

      <g class="hero-plant-parallax">
        <g class="plant-stems">
          <path class="plant-stem-path stem-main" d="M299 523C290 456 307 406 294 346C281 290 292 229 307 168C314 133 318 105 315 78" />
          <path class="plant-stem-path stem-build" d="M295 360C251 342 218 317 190 278" />
          <path class="plant-stem-path stem-learn" d="M300 286C345 269 378 243 401 208" />
          <path class="plant-stem-path stem-explore" d="M306 198C272 177 249 153 235 119" />
          <path class="plant-stem-path stem-tip" d="M315 81C337 75 351 61 359 43" />
        </g>

        <g class="plant-leaf leaf-build">
          <path class="leaf-shape leaf-sage" d="M195 281C149 281 122 251 122 208C164 204 200 227 209 264C210 273 205 279 195 281Z" />
          <path class="leaf-vein" d="M200 271C178 251 154 231 133 215" />
          <path class="leaf-vein leaf-vein-small" d="M176 249L176 225M158 235L148 254" />
        </g>

        <g class="plant-leaf leaf-learn">
          <path class="leaf-shape leaf-lake" d="M397 210C414 164 450 148 490 161C485 201 457 229 416 228C407 227 400 221 397 210Z" />
          <path class="leaf-vein" d="M407 217C437 200 459 183 479 168" />
          <path class="leaf-vein leaf-vein-small" d="M436 200L432 176M456 185L464 204" />
        </g>

        <g class="plant-leaf leaf-explore">
          <path class="leaf-shape leaf-warm" d="M238 122C201 115 181 88 186 53C223 54 251 75 254 106C253 114 247 120 238 122Z" />
          <path class="leaf-vein" d="M244 113C226 95 210 78 194 62" />
          <path class="leaf-vein leaf-vein-small" d="M224 93L223 70M209 78L201 95" />
        </g>

        <g class="plant-leaf leaf-tip">
          <path class="leaf-shape leaf-light" d="M358 45C360 16 380 1 405 5C406 31 391 51 368 55C362 54 359 51 358 45Z" />
          <path class="leaf-vein" d="M365 48C378 34 389 22 398 12" />
        </g>

        <g class="plant-bud">
          <path class="bud-stem" d="M315 79C316 65 315 54 314 45" />
          <path class="bud-calyx" d="M314 52C301 49 296 40 299 31C309 33 315 41 314 52Z" />
          <path class="bud-petal" d="M314 45C307 31 313 18 324 13C331 26 327 39 314 45Z" />
        </g>

        <g class="plant-label label-build-plant">
          <rect x="71" y="302" width="92" height="34" rx="17" />
          <circle cx="89" cy="319" r="4" />
          <text x="101" y="324">Build</text>
        </g>
        <g class="plant-label label-learn-plant">
          <rect x="402" y="247" width="94" height="34" rx="17" />
          <circle cx="420" cy="264" r="4" />
          <text x="432" y="269">Learn</text>
        </g>
        <g class="plant-label label-explore-plant">
          <rect x="108" y="134" width="108" height="34" rx="17" />
          <circle cx="126" cy="151" r="4" />
          <text x="138" y="156">Explore</text>
        </g>

        <g class="plant-caption">
          <path d="M382 455H479" />
          <text x="382" y="445">a work in progress</text>
        </g>
      </g>
    </svg>
  </div>
</template>
