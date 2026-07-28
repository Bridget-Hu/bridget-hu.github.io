<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Growth', href: '#growth', id: 'growth' },
  { label: 'Journey', href: '#journey', id: 'journey' },
  { label: 'Beyond', href: '#beyond', id: 'beyond' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

const menuOpen = ref(false)
const activeSection = ref('home')
const isScrolled = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const mobileMenu = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined

function closeMenu() {
  menuOpen.value = false
}

function updateScrollState() {
  isScrolled.value = window.scrollY > 12
}

function handleResize() {
  if (window.innerWidth >= 768) closeMenu()
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu()
    nextTick(() => menuButton.value?.focus())
  }
}

watch(menuOpen, async (isOpen) => {
  document.body.classList.toggle('menu-open', isOpen)
  if (isOpen) {
    await nextTick()
    mobileMenu.value?.querySelector<HTMLAnchorElement>('a')?.focus()
  }
})

onMounted(() => {
  updateScrollState()
  observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (visibleEntry?.target.id) activeSection.value = visibleEntry.target.id
    },
    {
      rootMargin: '-20% 0px -68% 0px',
      threshold: [0, 0.25, 0.55],
    },
  )

  navItems.forEach(({ id }) => {
    const section = document.getElementById(id)
    if (section) observer?.observe(section)
  })

  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', handleResize)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('keydown', handleEscape)
  document.body.classList.remove('menu-open')
})
</script>

<template>
  <header class="app-header" :class="{ 'header-scrolled': isScrolled }">
    <nav class="nav-container" aria-label="Primary navigation">
      <a class="brand-mark" href="#home" aria-label="Bridget Hu, home" @click="closeMenu">
        <span class="brand-symbol" aria-hidden="true">
          <i></i>
          <b>B</b>
        </span>
        <span class="brand-copy">
          <strong>Bridget Hu</strong>
          <small>Digital Garden</small>
        </span>
      </a>

      <div class="desktop-nav">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          :class="{ active: activeSection === item.id }"
          :aria-current="activeSection === item.id ? 'location' : undefined"
        >
          {{ item.label }}
        </a>
      </div>

      <button
        ref="menuButton"
        class="mobile-menu-button icon-button"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        :aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
        @click="menuOpen = !menuOpen"
      >
        <X v-if="menuOpen" :size="22" aria-hidden="true" />
        <Menu v-else :size="22" aria-hidden="true" />
      </button>

      <Transition name="nav-menu">
        <div
          v-if="menuOpen"
          id="mobile-navigation"
          ref="mobileMenu"
          class="mobile-nav"
          aria-label="Mobile navigation"
        >
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="item.href"
            :class="{ active: activeSection === item.id }"
            @click="closeMenu"
          >
            <span>{{ item.label }}</span>
            <span class="mobile-nav-leaf" aria-hidden="true"></span>
          </a>
        </div>
      </Transition>
    </nav>
  </header>
</template>
