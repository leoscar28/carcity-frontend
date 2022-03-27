<template>
  <div id="partners-slider" class="glide">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <li class="glide__slide">
          <div class="partner">
            <img src="~/assets/img/partners/autopiter.png" width="170" height="51" alt="">
          </div>
        </li>
        <li class="glide__slide">
          <div class="partner">
            <img src="~/assets/img/partners/watem.png" width="170" height="34" alt="">
          </div>
        </li>
        <li class="glide__slide">
          <div class="partner">
            <img src="~/assets/img/partners/armtek.png" width="170" height="25" alt="">
          </div>
        </li>

        <li class="glide__slide">
          <div class="partner">
            <img src="~/assets/img/partners/phaeton.png" width="170" height="37" alt="">
          </div>
        </li>
        <li class="glide__slide">
          <div class="partner">
            <img src="~/assets/img/partners/avtotreid.png" width="170" height="26" alt="">
          </div>
        </li>
      </ul>
    </div>

    <!--    <div class="glide__arrows glide__arrows&#45;&#45;circle glide__arrows&#45;&#45;circle-sm" data-glide-el="controls">-->
    <!--      <button class="glide__arrow glide__arrow&#45;&#45;left" data-glide-dir="<">-->
    <!--        <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
    <!--          <path d="M12.3985 2.7325L10.166 0.5L0.666016 10L10.166 19.5L12.3985 17.2675L5.14685 10L12.3985 2.7325Z" fill="currentColor" />-->
    <!--        </svg>-->
    <!--      </button>-->
    <!--      <button class="glide__arrow glide__arrow&#45;&#45;right" data-glide-dir=">">-->
    <!--        <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
    <!--          <path d="M0.601483 2.7325L2.83398 0.5L12.334 10L2.83398 19.5L0.601483 17.2675L7.85315 10L0.601483 2.7325Z" fill="currentColor" />-->
    <!--        </svg>-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import Glide from '@glidejs/glide'

export default {
  mounted () {
    this.partnersSlider = new Glide('#partners-slider', {
      animationTimingFunc: 'ease-in-out',
      animationDuration: 800,
      autoplay: 3000,
      perView: 5,
      // gap: 10,
      type: 'carousel',
      breakpoints: {
        1280: { perView: 4 },
        992: { perView: 3 },
        768: { perView: 2 },
        576: { perView: 1 }
      }
    }).mount()
  }
}
</script>
