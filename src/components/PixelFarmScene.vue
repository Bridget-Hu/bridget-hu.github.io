<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const showDream = ref(false)
let dreamTimer = 0

function revealDream() {
  showDream.value = true
  if (dreamTimer) window.clearTimeout(dreamTimer)
  dreamTimer = window.setTimeout(() => {
    showDream.value = false
    dreamTimer = 0
  }, 2400)
}

onBeforeUnmount(() => {
  if (dreamTimer) window.clearTimeout(dreamTimer)
})
</script>

<template>
  <figure class="pixel-farm-card">
    <div class="pixel-farm-card-header" aria-hidden="true">
      <span><i></i> Bridget's build patch</span>
      <span>sunny</span>
    </div>

    <svg
      class="pixel-farm-scene"
      viewBox="0 0 240 150"
      shape-rendering="crispEdges"
      role="img"
      aria-labelledby="pixel-farm-title pixel-farm-description"
    >
      <title id="pixel-farm-title">Bridget's original pixel garden patch</title>
      <desc id="pixel-farm-description">
        A cottage, growing plant, windmill, hills, clouds, and a tiny interactive chick.
      </desc>

      <rect class="pixel-sky" width="240" height="92" />
      <rect class="pixel-sun" x="194" y="18" width="19" height="19" />
      <rect class="pixel-sun-ray ray-one" x="198" y="11" width="11" height="4" />
      <rect class="pixel-sun-ray ray-two" x="198" y="40" width="11" height="4" />
      <rect class="pixel-sun-ray ray-three" x="186" y="23" width="5" height="10" />
      <rect class="pixel-sun-ray ray-four" x="216" y="23" width="5" height="10" />
      <g class="pixel-sun-particles">
        <rect class="sun-speck speck-one" x="179" y="13" width="3" height="3" />
        <rect class="sun-speck speck-two" x="225" y="15" width="2" height="2" />
        <rect class="sun-speck speck-three" x="181" y="43" width="2" height="2" />
        <rect class="sun-speck speck-four" x="222" y="45" width="3" height="3" />
      </g>

      <g class="pixel-cloud-layer">
        <g class="pixel-cloud cloud-one">
          <rect x="23" y="22" width="31" height="8" />
          <rect x="31" y="16" width="17" height="8" />
        </g>
        <g class="pixel-cloud cloud-two">
          <rect x="132" y="35" width="25" height="7" />
          <rect x="139" y="30" width="12" height="7" />
        </g>
      </g>

      <g class="pixel-far-layer">
        <path class="pixel-hill hill-back" d="M0 79H14V70H32V64H53V69H70V76H89V64H105V59H124V66H142V74H161V68H178V62H198V69H218V75H240V96H0Z" />
        <path class="pixel-hill hill-front" d="M0 86H22V79H44V83H65V77H88V83H112V76H135V84H158V78H182V84H207V77H226V83H240V101H0Z" />
      </g>

      <g class="pixel-windmill" aria-hidden="true">
        <path class="windmill-tower" d="M154 105H177L171 65H160Z" />
        <rect class="windmill-door" x="162" y="88" width="7" height="17" />
        <g class="pixel-windmill-blades">
          <rect x="163" y="43" width="6" height="42" />
          <rect x="145" y="61" width="42" height="6" />
          <rect class="windmill-blade-light" x="164" y="43" width="3" height="16" />
          <rect class="windmill-blade-light" x="171" y="62" width="16" height="3" />
        </g>
        <rect class="windmill-hub" x="161" y="59" width="10" height="10" />
      </g>

      <g class="pixel-cottage">
        <rect class="cottage-wall" x="43" y="58" width="68" height="43" />
        <path class="cottage-roof" d="M34 61H42V52H51V44H101V51H110V59H119V65H34Z" />
        <rect class="cottage-roof-light" x="51" y="49" width="49" height="5" />
        <rect class="cottage-door" x="69" y="75" width="18" height="26" />
        <rect class="cottage-door-light" x="73" y="79" width="10" height="15" />
        <rect class="cottage-knob" x="81" y="88" width="3" height="3" />
        <rect class="cottage-window" x="49" y="70" width="14" height="14" />
        <path class="cottage-window-line" d="M56 70V84M49 77H63" />
        <rect class="cottage-chimney" x="91" y="35" width="10" height="18" />
        <g class="pixel-smoke">
          <rect x="94" y="27" width="6" height="6" />
          <rect x="101" y="20" width="5" height="5" />
          <rect x="105" y="13" width="4" height="4" />
        </g>
      </g>

      <rect class="pixel-grass" y="96" width="240" height="18" />
      <path class="pixel-path" d="M74 96H92V106H104V116H118V150H74Z" />
      <rect class="pixel-soil" y="114" width="240" height="36" />

      <g class="pixel-field-row">
        <rect x="132" y="119" width="96" height="5" />
        <rect x="132" y="132" width="96" height="5" />
        <rect x="132" y="145" width="96" height="5" />
      </g>

      <g class="pixel-growth-sequence" aria-hidden="true">
        <rect class="farm-seed" x="143" y="140" width="5" height="4" />
        <g class="farm-sprout">
          <rect class="growth-stem" x="165" y="132" width="3" height="11" />
          <rect class="growth-leaf" x="159" y="133" width="7" height="4" />
        </g>
        <g class="farm-growing-plant">
          <rect class="growth-stem" x="192" y="119" width="4" height="25" />
          <rect class="growth-leaf" x="184" y="128" width="10" height="6" />
          <rect class="growth-leaf growth-leaf-right" x="195" y="121" width="11" height="6" />
          <rect class="growth-leaf growth-leaf-top" x="188" y="114" width="10" height="7" />
        </g>
        <g class="pixel-crop crop-four" transform="translate(214 126)">
          <rect class="crop-stem" x="5" y="5" width="3" height="10" />
          <rect class="crop-leaf" x="0" y="5" width="7" height="4" />
          <rect class="crop-leaf crop-leaf-right" x="7" y="2" width="7" height="4" />
        </g>
      </g>

      <g class="pixel-garden-sign">
        <rect class="sign-post" x="22" y="103" width="5" height="31" />
        <rect class="sign-board" x="10" y="99" width="31" height="18" />
        <text x="25.5" y="112" text-anchor="middle">BH</text>
      </g>

      <g class="pixel-fence">
        <rect x="8" y="135" width="61" height="4" />
        <rect x="14" y="127" width="5" height="20" />
        <rect x="34" y="127" width="5" height="20" />
        <rect x="55" y="127" width="5" height="20" />
      </g>
    </svg>

    <button
      class="hero-pixel-chick"
      type="button"
      aria-label="Ask the tiny farm chick about its dream"
      @click.stop="revealDream"
    >
      <span class="hero-chick-body"></span>
      <span class="hero-chick-head"></span>
      <span class="hero-chick-eye"></span>
      <span class="hero-chick-beak"></span>
      <span class="hero-chick-leg hero-chick-leg-one"></span>
      <span class="hero-chick-leg hero-chick-leg-two"></span>
    </button>

    <Transition name="farm-dream">
      <span v-if="showDream" class="farm-dream-message" role="status">
        <b aria-hidden="true">♥</b>
        A tiny farm dream.
      </span>
    </Transition>

    <figcaption aria-hidden="true">ideas planted here</figcaption>
  </figure>
</template>
