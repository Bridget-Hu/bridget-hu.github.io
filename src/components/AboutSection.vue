<script setup lang="ts">
import { Leaf } from 'lucide-vue-next'

import SectionHeading from './SectionHeading.vue'

const interests = [
  'Software Engineering',
  'AI Applications',
  'Full-stack Development',
  'Project Leadership',
  'Always Learning',
]
</script>

<template>
  <section id="about" class="garden-section about-section section-anchor">
    <div class="page-container about-layout">
      <div class="about-heading-column">
        <SectionHeading
          eyebrow="About"
          title="A little about me"
          description="I learn by making things, asking better questions, and sharing the process with others."
        />
        <svg class="about-sprig" viewBox="0 0 180 92" aria-hidden="true">
          <path d="M10 78C51 62 92 43 161 12" />
          <path d="M62 55C47 42 32 42 22 48C29 63 45 68 62 55Z" />
          <path d="M104 36C105 18 117 8 132 7C135 23 125 36 104 36Z" />
          <path d="M137 23C152 25 163 34 165 47C151 50 138 41 137 23Z" />
        </svg>
      </div>

      <article class="about-note">
        <span class="paper-clip" aria-hidden="true"></span>
        <p class="about-note-number" aria-hidden="true">Garden note 01</p>
        <p>I'm a software engineering student at South China Normal University.</p>
        <p>
          I enjoy turning ideas into practical projects, collaborating with teams, and
          learning how technology can solve real problems.
        </p>
        <p>
          I'm currently exploring AI applications, full-stack development, computer systems,
          and practical software engineering.
        </p>

        <div class="about-tags" aria-label="Areas of interest">
          <span v-for="interest in interests" :key="interest">
            <Leaf :size="13" aria-hidden="true" />
            {{ interest }}
          </span>
        </div>
      </article>
    </div>
  </section>
</template>
