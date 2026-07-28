<script setup lang="ts">
import { ArrowUpRight, FileClock, Github, Mail } from 'lucide-vue-next'
import { computed } from 'vue'

import { CONTACT_EMAIL, GITHUB_URL, RESUME_URL } from '@/data/contact'

const hasEmail = computed(() => !CONTACT_EMAIL.startsWith('REPLACE_'))
const hasResume = computed(() => Boolean(RESUME_URL))
</script>

<template>
  <section id="contact" class="garden-section contact-section section-anchor">
    <div class="page-container">
      <div class="contact-postcard">
        <div class="postcard-message">
          <p class="section-eyebrow">
            <span class="eyebrow-leaf" aria-hidden="true"></span>
            Contact
          </p>
          <h2>Let's grow something meaningful together.</h2>
          <p>
            I'm always open to thoughtful conversations, interesting projects, and new
            opportunities.
          </p>

          <svg class="postcard-sprig" viewBox="0 0 170 76" aria-hidden="true">
            <path d="M8 65C53 56 95 38 156 8" />
            <path d="M54 51C40 37 27 37 16 43C24 57 39 62 54 51Z" />
            <path d="M103 31C104 16 114 7 128 6C130 20 121 32 103 31Z" />
            <path d="M130 20C145 21 155 29 157 42C144 44 132 36 130 20Z" />
          </svg>
        </div>

        <div class="postcard-address">
          <div class="postcard-stamp" aria-hidden="true">
            <svg viewBox="0 0 70 70">
              <path d="M35 56V28" />
              <path d="M34 37C22 37 15 29 16 18C28 17 36 24 34 37Z" />
              <path d="M36 46C49 44 56 35 54 24C43 24 35 33 36 46Z" />
            </svg>
          </div>

          <div class="contact-links">
            <a :href="GITHUB_URL" target="_blank" rel="noopener noreferrer">
              <span class="contact-link-icon"><Github :size="20" aria-hidden="true" /></span>
              <span><strong>GitHub</strong><small>Bridget-Hu</small></span>
              <ArrowUpRight :size="18" aria-hidden="true" />
              <span class="sr-only">(opens in a new tab)</span>
            </a>

            <a v-if="hasEmail" :href="`mailto:${CONTACT_EMAIL}`">
              <span class="contact-link-icon"><Mail :size="20" aria-hidden="true" /></span>
              <span><strong>Email</strong><small>{{ CONTACT_EMAIL }}</small></span>
              <ArrowUpRight :size="18" aria-hidden="true" />
            </a>
            <div v-else class="contact-link-disabled" aria-label="Email coming soon">
              <span class="contact-link-icon"><Mail :size="20" aria-hidden="true" /></span>
              <span><strong>Email</strong><small>Email coming soon</small></span>
            </div>

            <a
              v-if="hasResume && RESUME_URL"
              :href="RESUME_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="contact-link-icon"><FileClock :size="20" aria-hidden="true" /></span>
              <span><strong>Resume</strong><small>View resume</small></span>
              <ArrowUpRight :size="18" aria-hidden="true" />
              <span class="sr-only">(opens in a new tab)</span>
            </a>
            <div v-else class="contact-link-disabled" aria-label="Resume coming soon">
              <span class="contact-link-icon"><FileClock :size="20" aria-hidden="true" /></span>
              <span><strong>Resume</strong><small>Resume coming soon</small></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
