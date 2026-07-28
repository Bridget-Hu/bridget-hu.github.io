<script setup lang="ts">
import type { ProjectVisual } from '@/data/projects'

defineProps<{
  type: ProjectVisual
  title: string
}>()
</script>

<template>
  <div
    class="project-visual"
    :class="`visual-${type}`"
    role="img"
    :aria-label="`${title} original botanical illustration`"
  >
    <svg v-if="type === 'fern'" viewBox="0 0 560 250" aria-hidden="true">
      <path class="illustration-stem" d="M91 218C183 184 264 126 345 41" />
      <path class="illustration-branch" d="M142 192L112 144M174 172L212 121M210 148L175 96M245 123L286 78M279 94L250 54M315 65L353 33" />
      <path class="fern-leaf" d="M113 144C78 140 58 119 62 94C92 92 116 109 113 144Z" />
      <path class="fern-leaf leaf-alt" d="M211 121C244 119 267 96 265 69C235 68 210 88 211 121Z" />
      <path class="fern-leaf" d="M176 96C143 94 123 73 126 48C155 48 178 65 176 96Z" />
      <path class="fern-leaf leaf-alt" d="M286 78C314 75 333 56 331 34C305 34 285 51 286 78Z" />
      <path class="fern-leaf" d="M250 54C226 48 213 31 218 13C240 16 255 31 250 54Z" />
      <circle class="fern-check" cx="390" cy="137" r="48" />
      <path class="fern-check-mark" d="M368 138L384 154L414 119" />
      <path class="illustration-dots" d="M439 80H505M439 104H486M439 128H513M439 152H480M439 176H499" />
    </svg>

    <svg v-else-if="type === 'dialogue'" viewBox="0 0 560 250" aria-hidden="true">
      <path class="dialogue-stem" d="M280 213C279 176 277 139 280 102" />
      <path class="dialogue-leaf leaf-left-dialogue" d="M269 136C202 142 160 110 157 61C218 54 266 85 269 136Z" />
      <path class="dialogue-leaf leaf-right-dialogue" d="M291 121C354 127 398 95 404 48C345 39 297 69 291 121Z" />
      <path class="dialogue-vein" d="M259 125C226 105 194 84 169 69M301 111C333 93 365 74 393 57" />
      <path class="dialogue-line" d="M91 185H210M350 180H472M117 208H229M327 204H443" />
      <circle class="dialogue-dot" cx="253" cy="174" r="5" />
      <circle class="dialogue-dot" cx="307" cy="174" r="5" />
      <path class="dialogue-connection" d="M258 174C271 162 289 162 302 174" />
    </svg>

    <svg v-else-if="type === 'receipt'" viewBox="0 0 560 250" aria-hidden="true">
      <path class="receipt-paper" d="M176 24H368V220L352 210L336 220L320 210L304 220L288 210L272 220L256 210L240 220L224 210L208 220L192 210L176 220Z" />
      <path class="receipt-row" d="M210 67H327M210 96H293M210 145H329M210 170H306" />
      <circle class="receipt-scatter" cx="114" cy="66" r="5" />
      <circle class="receipt-scatter" cx="90" cy="112" r="4" />
      <circle class="receipt-scatter" cx="130" cy="151" r="6" />
      <path class="receipt-flow" d="M140 107C159 106 166 106 184 106" />
      <path class="receipt-sprig" d="M382 194C419 168 447 139 466 103" />
      <path class="receipt-leaf" d="M414 166C413 139 429 123 450 122C451 146 438 165 414 166Z" />
      <path class="receipt-leaf" d="M443 133C465 133 479 119 479 101C459 100 443 112 443 133Z" />
    </svg>

    <svg v-else viewBox="0 0 560 250" aria-hidden="true">
      <path class="growth-axis" d="M70 205H494M92 219V44" />
      <path class="growth-grid-line" d="M92 166H494M92 126H494M92 86H494" />
      <path class="growth-curve" d="M99 190C165 183 191 150 243 158C299 166 325 104 377 109C421 113 443 70 487 47" />
      <circle class="growth-point" cx="147" cy="176" r="6" />
      <circle class="growth-point" cx="243" cy="158" r="6" />
      <circle class="growth-point" cx="377" cy="109" r="6" />
      <circle class="growth-point point-end" cx="487" cy="47" r="7" />
      <path class="chart-leaf" d="M476 55C455 47 447 31 452 16C471 20 483 35 476 55Z" />
      <path class="chart-leaf leaf-second" d="M481 51C500 43 512 29 510 13C492 14 479 29 481 51Z" />
      <path class="chart-leaf-vein" d="M478 53L456 24M480 51L506 19" />
    </svg>

    <span class="visual-caption" aria-hidden="true">observe · shape · improve</span>
  </div>
</template>
