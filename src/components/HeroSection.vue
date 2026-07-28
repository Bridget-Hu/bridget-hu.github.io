<script setup lang="ts">
import { ArrowDownRight, Github, UserRound } from 'lucide-vue-next'

import { GITHUB_URL } from '@/data/contact'
import PlantHeroVisual from './PlantHeroVisual.vue'
</script>

<template>
  <section id="home" class="hero-section section-anchor">
    <div class="page-container hero-layout">
      <div class="hero-content">
        <p class="hero-eyebrow hero-copy-item copy-step-one">
          <span aria-hidden="true"></span>
          Software Engineering Student
        </p>
        <h1 class="hero-copy-item copy-step-two">Hello, I'm <span>Bridget Hu.</span></h1>
        <p class="hero-statement hero-copy-item copy-step-three">
          Growing through <strong>building.</strong>
        </p>
        <p class="hero-support hero-copy-item copy-step-four">
          I enjoy building practical software, exploring AI applications, and learning
          through real projects.
        </p>
        <p
          class="identity-line hero-copy-item copy-step-five"
          aria-label="Developer, Project Lead, Explorer"
        >
          <span>Developer</span><i aria-hidden="true"></i><span>Project Lead</span
          ><i aria-hidden="true"></i><span>Explorer</span>
        </p>
        <div class="hero-actions hero-copy-item copy-step-six">
          <a class="button button-primary" href="#work">
            Explore My Work
            <ArrowDownRight :size="18" aria-hidden="true" />
          </a>
          <a class="button button-secondary" href="#about">
            <UserRound :size="17" aria-hidden="true" />
            About Me
          </a>
          <a
            class="button button-text"
            :href="GITHUB_URL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github :size="18" aria-hidden="true" />
            GitHub
            <span class="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <PlantHeroVisual />
    </div>

    <div class="page-container hero-footnote" aria-hidden="true">
      <span class="hero-footnote-leaf"></span>
      A small corner of the internet, always growing
    </div>
  </section>
</template>
