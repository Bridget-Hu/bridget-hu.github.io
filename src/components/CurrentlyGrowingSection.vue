<script setup lang="ts">
import { BookOpen, Hammer, Music2, Telescope } from 'lucide-vue-next'
import type { Component } from 'vue'

import { currentItems, type CurrentItemKind } from '@/data/current'
import SectionHeading from './SectionHeading.vue'

const iconMap: Record<CurrentItemKind, Component> = {
  building: Hammer,
  learning: BookOpen,
  exploring: Telescope,
  enjoying: Music2,
}
</script>

<template>
  <section id="current" class="garden-section current-section section-anchor">
    <div class="page-container current-layout">
      <div class="current-intro">
        <SectionHeading
          eyebrow="Garden Log"
          title="Currently Growing"
          description="A small record of what has my attention right now."
        />
        <div class="watering-note" aria-hidden="true">
          <span></span>
          tend with patience
        </div>
      </div>

      <div class="current-board" data-garden-reveal>
        <div class="current-board-header">
          <span>Bridget's field notes</span>
          <span aria-hidden="true">04 ongoing</span>
        </div>
        <dl class="current-list">
          <div
            v-for="item in currentItems"
            :key="item.kind"
            class="current-item"
          >
            <dt>
              <span class="current-icon">
                <component :is="iconMap[item.kind]" :size="18" stroke-width="1.8" aria-hidden="true" />
              </span>
              {{ item.label }}
            </dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
