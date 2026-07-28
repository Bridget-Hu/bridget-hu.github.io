<script setup lang="ts">
import PixelChicken from './PixelChicken.vue'
</script>

<template>
  <div class="hero-farm-landscape">
    <svg
      class="hero-landscape-art"
      viewBox="0 0 560 620"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect class="hero-scene-sky" x="18" y="24" width="524" height="548" rx="176" />

      <g class="hero-sun-parallax hero-sun-intro">
        <circle class="hero-sun-halo" cx="420" cy="116" r="67" />
        <circle class="hero-sun-core" cx="420" cy="116" r="35" />
        <path class="hero-sun-texture" d="M420 60V74M420 158V172M364 116H378M462 116H476" />
      </g>

      <g class="hero-cloud-parallax hero-cloud-intro">
        <path class="hero-cloud cloud-one-modern" d="M64 146C69 126 86 116 104 121C113 102 141 102 150 123C171 119 187 133 188 151H64Z" />
        <path class="hero-cloud cloud-two-modern" d="M329 195C333 181 345 174 358 177C366 160 389 161 396 179C411 177 423 188 424 201H329Z" />
        <path class="hero-cloud cloud-three-modern" d="M224 92C227 81 237 75 247 78C253 65 272 66 278 80C290 78 300 87 301 97H224Z" />
      </g>

      <g class="hero-hill-far-parallax hero-hill-intro">
        <path class="hero-hill hero-hill-far" d="M18 385C85 326 142 326 205 370C271 306 352 296 421 355C467 327 510 336 542 368V515H18Z" />
      </g>
      <g class="hero-hill-near-parallax hero-hill-intro">
        <path class="hero-hill hero-hill-middle" d="M18 425C92 361 175 370 231 418C292 357 378 358 433 413C476 381 516 390 542 418V520H18Z" />
        <path class="hero-hill hero-hill-near" d="M18 466C91 414 164 423 221 463C303 400 407 410 542 469V527H18Z" />
      </g>

      <g class="hero-midground-parallax hero-hill-intro hero-windmill" aria-hidden="true">
        <path class="hero-windmill-tower" d="M445 489H492L481 355H459Z" />
        <rect class="hero-windmill-door" x="462" y="448" width="15" height="41" rx="3" />
        <g class="hero-windmill-blades">
          <path d="M469 356L460 294L476 294L475 356Z" />
          <path d="M474 351L536 342L536 358L474 357Z" />
          <path d="M469 356L478 418L462 418L463 356Z" />
          <path d="M469 351L407 360L407 344L469 345Z" />
        </g>
        <circle class="hero-windmill-hub" cx="470" cy="352" r="10" />
      </g>

      <g class="hero-ground-intro" shape-rendering="crispEdges">
        <path class="hero-meadow" d="M18 490C120 468 215 481 300 492C384 470 468 472 542 494V523H18Z" />
        <rect class="hero-soil-top" x="18" y="511" width="524" height="18" />
        <rect class="hero-soil-middle" x="18" y="529" width="524" height="47" />
        <rect class="hero-soil-deep" x="18" y="576" width="524" height="26" />
        <g class="hero-soil-pixels">
          <rect x="54" y="542" width="27" height="8" />
          <rect x="110" y="565" width="18" height="7" />
          <rect x="177" y="537" width="35" height="8" />
          <rect x="255" y="558" width="25" height="7" />
          <rect x="338" y="541" width="31" height="8" />
          <rect x="416" y="566" width="20" height="7" />
          <rect x="479" y="539" width="29" height="8" />
        </g>
      </g>
    </svg>

    <svg
      class="hero-foreground-art"
      viewBox="0 0 560 620"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g class="hero-foreground-parallax hero-ground-intro" shape-rendering="crispEdges">
        <g class="hero-grass-tuft tuft-one">
          <rect x="70" y="492" width="5" height="24" />
          <rect x="61" y="499" width="9" height="5" />
          <rect x="75" y="501" width="10" height="5" />
        </g>
        <g class="hero-grass-tuft tuft-two">
          <rect x="365" y="491" width="5" height="26" />
          <rect x="355" y="497" width="11" height="5" />
          <rect x="370" y="502" width="12" height="5" />
        </g>
        <g class="hero-grass-tuft tuft-three">
          <rect x="511" y="497" width="5" height="19" />
          <rect x="503" y="502" width="9" height="5" />
        </g>

        <g class="hero-pixel-flower flower-one">
          <rect class="flower-stem" x="118" y="497" width="4" height="19" />
          <rect class="flower-petal" x="113" y="489" width="7" height="7" />
          <rect class="flower-petal" x="121" y="489" width="7" height="7" />
          <rect class="flower-center" x="118" y="492" width="5" height="5" />
        </g>
        <g class="hero-pixel-flower flower-two">
          <rect class="flower-stem" x="399" y="499" width="4" height="17" />
          <rect class="flower-petal flower-petal-warm" x="394" y="491" width="7" height="7" />
          <rect class="flower-petal flower-petal-warm" x="402" y="491" width="7" height="7" />
          <rect class="flower-center" x="399" y="494" width="5" height="5" />
        </g>

        <path class="hero-small-stone" d="M154 512H186V504H178V498H163V502H157Z" />

        <g class="hero-watering-can">
          <rect class="watering-body" x="438" y="494" width="30" height="22" />
          <rect class="watering-top" x="445" y="488" width="16" height="7" />
          <path class="watering-handle" d="M463 495C478 485 485 495 478 506" />
          <path class="watering-spout" d="M438 499L422 493V501L438 507Z" />
        </g>
      </g>
    </svg>

    <PixelChicken />
  </div>
</template>
