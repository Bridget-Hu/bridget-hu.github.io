<script setup lang="ts">
import { Clock3 } from 'lucide-vue-next'

import type { Project } from '@/data/projects'
import ProjectIllustration from './ProjectIllustration.vue'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article class="project-card" :class="`project-${project.tone}`" tabindex="0">
    <div class="project-card-header">
      <span class="project-index">{{ project.index }}</span>
      <span class="project-role">{{ project.role }}</span>
    </div>

    <ProjectIllustration :type="project.visual" :title="project.title" />

    <div class="project-copy">
      <p class="project-category">{{ project.category }}</p>
      <h3>{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <ul class="tech-list" :aria-label="`${project.title} technologies`">
        <li v-for="technology in project.technologies" :key="technology">
          {{ technology }}
        </li>
      </ul>
    </div>

    <div class="project-status" aria-label="Project details coming soon">
      <Clock3 :size="15" aria-hidden="true" />
      Details coming soon
    </div>
  </article>
</template>
