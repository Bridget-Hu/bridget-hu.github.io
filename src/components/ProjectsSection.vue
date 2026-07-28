<script setup lang="ts">
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard.vue'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="work" class="garden-section projects-section section-anchor">
    <div class="page-container">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects that helped me learn, build, and grow."
        description="Each project started with a real question and became a chance to practice thoughtful engineering."
      />

      <div class="projects-grid">
        <ProjectCard
          v-for="project in projects"
          :key="project.index"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>
