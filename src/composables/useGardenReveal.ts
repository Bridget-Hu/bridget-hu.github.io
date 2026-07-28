import { onBeforeUnmount, onMounted } from 'vue'

export function useGardenReveal() {
  let observer: IntersectionObserver | undefined
  let motionQuery: MediaQueryList | undefined

  function setupReveal() {
    observer?.disconnect()
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-garden-reveal]'))
    const reducedMotion = Boolean(motionQuery?.matches)

    document.documentElement.classList.toggle('garden-motion', !reducedMotion)

    if (reducedMotion) {
      targets.forEach((target) => target.classList.add('garden-reveal-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('garden-reveal-visible')
          observer?.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -9% 0px',
        threshold: 0.12,
      },
    )

    targets.forEach((target) => observer?.observe(target))
  }

  onMounted(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setupReveal()
    motionQuery.addEventListener('change', setupReveal)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    motionQuery?.removeEventListener('change', setupReveal)
    document.documentElement.classList.remove('garden-motion')
  })
}
