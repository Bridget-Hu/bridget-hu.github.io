<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type ParticleKind = 'star' | 'leaf' | 'seed' | 'petal' | 'flower-center'

interface Particle {
  x: number
  y: number
  velocityX: number
  velocityY: number
  life: number
  decay: number
  size: number
  rotation: number
  rotationSpeed: number
  color: string
  kind: ParticleKind
  gravity: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
const particles: Particle[] = []
const MAX_PARTICLES = 120
const STAR_COLORS = ['#d3ad61', '#e1c985', '#c7984f']
const NATURE_COLORS = ['#879d76', '#a5b991', '#b68a65']
const PETAL_COLORS = ['#e2b789', '#d7a471', '#f0d2a5', '#c99b73']

let context: CanvasRenderingContext2D | null = null
let animationFrame = 0
let lastFrameTime = 0
let lastPointerX = 0
let lastPointerY = 0
let lastSpawnTime = 0
let trailStep = 0
let enabled = false
let runtimeListenersAttached = false
let pointerQuery: MediaQueryList | undefined
let motionQuery: MediaQueryList | undefined

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)]
}

function addParticle(particle: Particle) {
  if (particles.length >= MAX_PARTICLES) particles.shift()
  particles.push(particle)
}

function resizeCanvas() {
  if (!canvas.value || !context) return

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(window.innerWidth * pixelRatio)
  canvas.value.height = Math.round(window.innerHeight * pixelRatio)
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
}

function requestDraw() {
  if (!enabled || document.hidden || animationFrame) return
  lastFrameTime = performance.now()
  animationFrame = window.requestAnimationFrame(drawFrame)
}

function drawStar(particle: Particle) {
  if (!context) return
  const unit = Math.max(1, Math.round(particle.size / 3))

  context.fillRect(-unit / 2, -particle.size / 2, unit, particle.size)
  context.fillRect(-particle.size / 2, -unit / 2, particle.size, unit)
  context.globalAlpha *= 0.55
  context.fillRect(-unit / 2, -unit / 2, unit, unit)
}

function drawLeaf(particle: Particle) {
  if (!context) return

  context.beginPath()
  context.moveTo(-particle.size * 0.65, 0)
  context.quadraticCurveTo(0, -particle.size * 0.72, particle.size * 0.7, 0)
  context.quadraticCurveTo(0, particle.size * 0.58, -particle.size * 0.65, 0)
  context.fill()
  context.globalAlpha *= 0.55
  context.strokeStyle = '#536b4f'
  context.lineWidth = 0.7
  context.beginPath()
  context.moveTo(-particle.size * 0.5, 0)
  context.lineTo(particle.size * 0.45, 0)
  context.stroke()
}

function drawSeed(particle: Particle) {
  if (!context) return

  context.beginPath()
  context.ellipse(0, 0, particle.size * 0.42, particle.size * 0.72, 0, 0, Math.PI * 2)
  context.fill()
}

function drawPixelPetal(particle: Particle) {
  if (!context) return
  const unit = Math.max(1.5, particle.size / 3)

  context.fillRect(-unit / 2, -unit * 1.5, unit, unit * 3)
  context.fillRect(-unit * 1.5, -unit / 2, unit * 3, unit)
}

function drawFlowerCenter(particle: Particle) {
  if (!context) return
  const size = Math.max(2, particle.size)
  context.fillRect(-size / 2, -size / 2, size, size)
}

function drawParticle(particle: Particle) {
  if (!context) return

  context.save()
  context.translate(particle.x, particle.y)
  context.rotate(particle.rotation)
  context.globalAlpha = Math.max(0, particle.life) * 0.86
  context.fillStyle = particle.color

  if (particle.kind === 'star') drawStar(particle)
  if (particle.kind === 'leaf') drawLeaf(particle)
  if (particle.kind === 'seed') drawSeed(particle)
  if (particle.kind === 'petal') drawPixelPetal(particle)
  if (particle.kind === 'flower-center') drawFlowerCenter(particle)

  context.restore()
}

function drawFrame(time: number) {
  animationFrame = 0
  if (!enabled || document.hidden || !context) return

  const delta = Math.min((time - lastFrameTime) / 16.67, 1.8)
  lastFrameTime = time
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)

  for (let index = particles.length - 1; index >= 0; index -= 1) {
    const particle = particles[index]
    particle.x += particle.velocityX * delta
    particle.y += particle.velocityY * delta
    particle.velocityY += particle.gravity * delta
    particle.rotation += particle.rotationSpeed * delta
    particle.life -= particle.decay * delta
    particle.size *= 1 - 0.006 * delta

    if (particle.life <= 0 || particle.size < 0.55) {
      particles.splice(index, 1)
      continue
    }

    drawParticle(particle)
  }

  if (particles.length) animationFrame = window.requestAnimationFrame(drawFrame)
}

function spawnTrail(event: PointerEvent) {
  if (!enabled || document.hidden) return

  const now = performance.now()
  const distance = Math.hypot(event.clientX - lastPointerX, event.clientY - lastPointerY)
  if (distance < 7 || now - lastSpawnTime < 24) return

  lastPointerX = event.clientX
  lastPointerY = event.clientY
  lastSpawnTime = now
  trailStep += 1

  const natureParticle = trailStep % 8 === 0
  const kind: ParticleKind = natureParticle
    ? trailStep % 16 === 0
      ? 'seed'
      : 'leaf'
    : 'star'

  addParticle({
    x: event.clientX + (Math.random() - 0.5) * 7,
    y: event.clientY + (Math.random() - 0.5) * 7,
    velocityX: (Math.random() - 0.5) * 0.32,
    velocityY: -0.2 - Math.random() * 0.28,
    life: 1,
    decay: natureParticle ? 0.025 : 0.035,
    size: natureParticle ? 4.8 + Math.random() * 2.7 : 3.2 + Math.random() * 3,
    rotation: Math.random() * Math.PI,
    rotationSpeed: (Math.random() - 0.5) * 0.035,
    color: natureParticle ? randomItem(NATURE_COLORS) : randomItem(STAR_COLORS),
    kind,
    gravity: natureParticle ? 0.008 : 0.004,
  })

  requestDraw()
}

function spawnBloom(event: PointerEvent) {
  if (!enabled || document.hidden) return

  const petalCount = 8
  for (let index = 0; index < petalCount; index += 1) {
    const angle = (Math.PI * 2 * index) / petalCount
    const speed = 0.75 + Math.random() * 0.45
    addParticle({
      x: event.clientX,
      y: event.clientY,
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed - 0.14,
      life: 1,
      decay: 0.022,
      size: 4.4 + Math.random() * 1.8,
      rotation: angle,
      rotationSpeed: (index % 2 ? 1 : -1) * 0.018,
      color: PETAL_COLORS[index % PETAL_COLORS.length],
      kind: 'petal',
      gravity: 0.009,
    })
  }

  addParticle({
    x: event.clientX,
    y: event.clientY,
    velocityX: 0,
    velocityY: -0.12,
    life: 1,
    decay: 0.028,
    size: 5,
    rotation: 0,
    rotationSpeed: 0,
    color: '#c39145',
    kind: 'flower-center',
    gravity: 0.004,
  })

  requestDraw()
}

function stopAnimation() {
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  animationFrame = 0
  particles.length = 0
  context?.clearRect(0, 0, window.innerWidth, window.innerHeight)
}

function attachRuntimeListeners() {
  if (runtimeListenersAttached) return
  runtimeListenersAttached = true
  window.addEventListener('pointermove', spawnTrail, { passive: true })
  window.addEventListener('pointerdown', spawnBloom, { passive: true })
  window.addEventListener('resize', resizeCanvas, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)
}

function detachRuntimeListeners() {
  if (!runtimeListenersAttached) return
  runtimeListenersAttached = false
  window.removeEventListener('pointermove', spawnTrail)
  window.removeEventListener('pointerdown', spawnBloom)
  window.removeEventListener('resize', resizeCanvas)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
}

function syncEnabledState() {
  enabled = Boolean(pointerQuery?.matches && !motionQuery?.matches)
  if (canvas.value) canvas.value.hidden = !enabled
  if (enabled) {
    attachRuntimeListeners()
    resizeCanvas()
  } else {
    detachRuntimeListeners()
    stopAnimation()
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (animationFrame) window.cancelAnimationFrame(animationFrame)
    animationFrame = 0
    return
  }

  if (particles.length) requestDraw()
}

onMounted(() => {
  if (!canvas.value) return

  context = canvas.value.getContext('2d', { alpha: true })
  pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  syncEnabledState()
  pointerQuery.addEventListener('change', syncEnabledState)
  motionQuery.addEventListener('change', syncEnabledState)
})

onBeforeUnmount(() => {
  detachRuntimeListeners()
  stopAnimation()
  pointerQuery?.removeEventListener('change', syncEnabledState)
  motionQuery?.removeEventListener('change', syncEnabledState)
})
</script>

<template>
  <canvas ref="canvas" class="cursor-trail" aria-hidden="true"></canvas>
</template>
