<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    description?: string
    centered?: boolean
  }>(),
  {
    description: undefined,
    centered: false,
  },
)
</script>

<template>
  <header
    class="section-heading"
    :class="{ 'section-heading-centered': centered }"
    data-garden-reveal
  >
    <p class="section-eyebrow">
      <span class="eyebrow-leaf" aria-hidden="true"></span>
      {{ eyebrow }}
    </p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="section-description">{{ description }}</p>
  </header>
</template>
