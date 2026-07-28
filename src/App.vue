<script setup lang="ts">
import AboutSection from '@/components/AboutSection.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import BeyondCodeSection from '@/components/BeyondCodeSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import CurrentlyGrowingSection from '@/components/CurrentlyGrowingSection.vue'
import CursorTrail from '@/components/CursorTrail.vue'
import GrowthSection from '@/components/GrowthSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import JourneySection from '@/components/JourneySection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import { useGardenReveal } from '@/composables/useGardenReveal'

useGardenReveal()
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <CursorTrail />
    <div class="evening-fireflies" aria-hidden="true">
      <i></i><i></i><i></i><i></i><i></i>
    </div>
    <AppHeader />
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <GrowthSection />
      <JourneySection />
      <BeyondCodeSection />
      <CurrentlyGrowingSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
