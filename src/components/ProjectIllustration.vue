<script setup lang="ts">
import { computed } from 'vue'

import type { ProjectVisual } from '@/data/projects'

const props = defineProps<{
  type: ProjectVisual
  title: string
}>()

const captions: Record<ProjectVisual, string> = {
  fern: 'diagnose · repair · verify',
  dialogue: 'listen · respond · grow',
  receipt: 'capture · order · record',
  growth: 'measure · model · improve',
}

const caption = computed(() => captions[props.type])
</script>

<template>
  <div
    class="project-visual"
    :class="`visual-${type}`"
    role="img"
    :aria-label="`${title} original farm-inspired illustration: ${caption}`"
  >
    <svg v-if="type === 'fern'" viewBox="0 0 560 250" aria-hidden="true">
      <g class="fern-frond">
        <path class="illustration-stem" d="M58 218C132 193 196 151 258 70" />
        <path class="illustration-branch" d="M97 201L72 160M126 184L164 140M156 163L127 123M188 139L224 103M218 105L191 77M246 82L273 50" />
        <path class="fern-leaf" d="M73 160C43 157 28 138 33 116C59 116 77 132 73 160Z" />
        <path class="fern-leaf leaf-alt" d="M164 140C193 138 213 119 211 96C184 95 163 112 164 140Z" />
        <path class="fern-leaf" d="M128 123C99 121 82 103 86 81C111 82 130 97 128 123Z" />
        <path class="fern-leaf leaf-alt" d="M224 103C250 100 267 84 265 64C242 64 223 78 224 103Z" />
        <path class="fern-leaf" d="M191 77C169 72 157 57 161 40C181 43 194 57 191 77Z" />
      </g>

      <g class="diagnostic-path">
        <path class="project-flow-path" d="M277 205C314 184 322 158 338 137C358 111 390 102 419 76M338 137C377 147 407 161 435 186" />
        <g class="flow-node node-diagnose">
          <circle cx="286" cy="201" r="14" />
          <circle cx="283" cy="198" r="5" />
          <path d="M287 202L293 208" />
        </g>
        <g class="flow-node node-repair">
          <circle cx="339" cy="137" r="14" />
          <path d="M333 143L345 131M334 130L346 142" />
        </g>
        <g class="flow-node node-verify">
          <circle cx="422" cy="75" r="15" />
          <path d="M415 75L420 81L430 68" />
        </g>
      </g>

      <g class="project-toolbox">
        <path class="toolbox-handle" d="M451 158V149C451 141 458 137 467 137H478C487 137 494 141 494 149V158" />
        <rect class="toolbox-body" x="435" y="157" width="75" height="43" rx="4" />
        <path class="toolbox-lid" d="M435 169H510" />
        <rect class="toolbox-latch" x="469" y="165" width="9" height="10" rx="1" />
        <path class="toolbox-tool" d="M451 183L461 173M487 184L497 176" />
      </g>
    </svg>

    <svg v-else-if="type === 'dialogue'" viewBox="0 0 560 250" aria-hidden="true">
      <g class="conversation-plant plant-speaker-left">
        <path class="dialogue-stem" d="M167 211C169 177 169 145 166 112" />
        <path class="dialogue-leaf" d="M160 148C116 152 89 129 88 94C128 89 159 112 160 148Z" />
        <path class="dialogue-leaf leaf-alt" d="M173 134C209 137 233 117 236 87C201 82 175 104 173 134Z" />
        <path class="dialogue-vein" d="M152 141L99 102M181 128L226 94" />
      </g>

      <g class="conversation-plant plant-speaker-right">
        <path class="dialogue-stem" d="M393 211C391 177 391 145 394 112" />
        <path class="dialogue-leaf leaf-alt" d="M400 148C444 152 471 129 472 94C432 89 401 112 400 148Z" />
        <path class="dialogue-leaf" d="M387 134C351 137 327 117 324 87C359 82 385 104 387 134Z" />
        <path class="dialogue-vein" d="M408 141L461 102M379 128L334 94" />
      </g>

      <g class="dialogue-bubble bubble-left">
        <rect x="119" y="35" width="126" height="48" rx="20" />
        <path d="M217 77L233 95L228 75" />
        <circle cx="156" cy="59" r="4" />
        <circle cx="177" cy="59" r="4" />
        <circle cx="198" cy="59" r="4" />
      </g>
      <g class="dialogue-bubble bubble-right">
        <rect x="315" y="26" width="126" height="48" rx="20" />
        <path d="M337 69L321 87L326 67" />
        <path class="feedback-line" d="M340 50H414M349 61H400" />
      </g>
      <path class="dialogue-connection" d="M216 182C250 158 310 158 344 182" />
      <circle class="dialogue-dot" cx="216" cy="182" r="5" />
      <circle class="dialogue-dot" cx="344" cy="182" r="5" />
    </svg>

    <svg v-else-if="type === 'receipt'" viewBox="0 0 560 250" shape-rendering="crispEdges" aria-hidden="true">
      <g class="loose-bookkeeping-items">
        <circle class="bookkeeping-coin coin-one" cx="92" cy="68" r="13" />
        <circle class="bookkeeping-coin coin-two" cx="126" cy="116" r="10" />
        <ellipse class="bookkeeping-seed seed-one" cx="82" cy="164" rx="8" ry="12" transform="rotate(-24 82 164)" />
        <rect class="bookkeeping-pixel pixel-one" x="137" y="55" width="9" height="9" />
        <rect class="bookkeeping-pixel pixel-two" x="105" y="191" width="7" height="7" />
      </g>

      <path class="receipt-flow" d="M153 121H195" />
      <path class="receipt-flow-arrow" d="M184 112L197 121L184 130" />

      <g class="pixel-receipt-paper">
        <path class="receipt-paper" d="M204 30H387V218H376V209H365V218H354V209H343V218H332V209H321V218H310V209H299V218H288V209H277V218H266V209H255V218H244V209H233V218H222V209H211V218H204Z" />
        <rect class="receipt-pixel-header" x="229" y="53" width="91" height="12" />
        <g class="structured-rows">
          <g class="structured-row row-one">
            <rect x="229" y="87" width="22" height="8" />
            <rect x="262" y="87" width="83" height="8" />
            <rect x="356" y="87" width="9" height="8" />
          </g>
          <g class="structured-row row-two">
            <rect x="229" y="113" width="22" height="8" />
            <rect x="262" y="113" width="67" height="8" />
            <rect x="340" y="113" width="25" height="8" />
          </g>
          <g class="structured-row row-three">
            <rect x="229" y="139" width="22" height="8" />
            <rect x="262" y="139" width="91" height="8" />
            <rect x="356" y="139" width="9" height="8" />
          </g>
          <g class="structured-row row-four">
            <rect x="229" y="165" width="22" height="8" />
            <rect x="262" y="165" width="61" height="8" />
            <rect x="334" y="165" width="31" height="8" />
          </g>
        </g>
      </g>

      <g class="ordered-seeds">
        <circle cx="425" cy="82" r="8" />
        <circle cx="425" cy="115" r="8" />
        <circle cx="425" cy="148" r="8" />
        <path d="M444 82H492M444 115H485M444 148H499" />
      </g>
    </svg>

    <svg v-else viewBox="0 0 560 250" aria-hidden="true">
      <path class="growth-axis" d="M70 205H494M92 219V44" />
      <path class="growth-grid-line" d="M92 166H494M92 126H494M92 86H494" />

      <g class="irrigation-system">
        <path class="irrigation-channel" d="M101 194C142 174 172 197 207 176C245 153 268 173 304 145C337 119 365 139 397 105C420 81 448 82 480 53" />
        <path class="irrigation-branch" d="M208 176L185 145M304 145L279 116M397 105L372 77" />
        <circle class="water-node" cx="185" cy="145" r="4" />
        <circle class="water-node" cx="279" cy="116" r="4" />
        <circle class="water-node" cx="372" cy="77" r="4" />
      </g>

      <path class="growth-curve" d="M99 190C165 183 191 150 243 158C299 166 325 104 377 109C421 113 443 70 487 47" />
      <circle class="growth-point" cx="147" cy="176" r="6" />
      <circle class="growth-point" cx="243" cy="158" r="6" />
      <circle class="growth-point" cx="377" cy="109" r="6" />
      <circle class="growth-point point-end" cx="487" cy="47" r="7" />
      <path class="chart-leaf" d="M476 55C455 47 447 31 452 16C471 20 483 35 476 55Z" />
      <path class="chart-leaf leaf-second" d="M481 51C500 43 512 29 510 13C492 14 479 29 481 51Z" />
      <path class="chart-leaf-vein" d="M478 53L456 24M480 51L506 19" />

      <g class="data-leaf-nodes">
        <path d="M129 166C116 158 111 147 115 137C128 141 135 151 129 166Z" />
        <path d="M265 146C252 137 248 126 253 116C266 121 272 132 265 146Z" />
        <path d="M402 96C389 88 385 77 390 67C403 72 409 82 402 96Z" />
        <path class="node-vein" d="M126 161L117 142M262 141L255 121M399 91L392 72" />
      </g>
    </svg>

    <span class="project-gold-star" aria-hidden="true"></span>
    <span class="visual-caption" aria-hidden="true">{{ caption }}</span>
  </div>
</template>
