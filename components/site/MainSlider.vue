<template>
  <div id="main-slider" class="glide">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <li class="glide__slide">
          <div class="main-slide">
            <img src="~/assets/img/demo/main-slide1.jpg" alt="" class="main-slide__img">
            <div class="main-slide__descr">
              <p>{{language[current][0]}}</p>
            </div>
          </div>
        </li>
        <li class="glide__slide">
          <div class="main-slide">
            <img src="~/assets/img/demo/main-slide2.jpg" alt="" class="main-slide__img">
            <div class="main-slide__descr">
              <p>{{language[current][1]}}</p>
            </div>
          </div>
        </li>
        <li class="glide__slide">
          <div class="main-slide">
            <img src="~/assets/img/demo/main-slide3.jpg" alt="" class="main-slide__img">
            <div class="main-slide__descr">
              <p>{{language[current][2]}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="glide__arrows glide__arrows--circle" data-glide-el="controls">
      <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
        <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.3985 2.7325L10.166 0.5L0.666016 10L10.166 19.5L12.3985 17.2675L5.14685 10L12.3985 2.7325Z" fill="currentColor" />
        </svg>
      </button>
      <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
        <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.601483 2.7325L2.83398 0.5L12.334 10L2.83398 19.5L0.601483 17.2675L7.85315 10L0.601483 2.7325Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide'

export default {
  mounted () {
    this.mainSlider = new Glide('#main-slider', {
      animationTimingFunc: 'ease-in-out',
      animationDuration: 800,
      autoplay: 4000,
      perView: 1,
      gap: 0,
      type: 'carousel'
    }).mount()
  },
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    }
  },
  data() {
    return {
      language: [
        ['Ваша машина будет довольна.\n' +
        'Любые автомобильные запчасти высокого качества.','CarCity.kz — официальный сайт крупнейшего торгового центра автозапчастей в РК','Выгодные цены. Качественные продукты. Выгодный шоппинг.'],
        ['Сіздің машинаңыз риза болады. Жоғары сападағы кез-келген автобөлшектер.','«Car City» СО – Орталық Азиядағы ең үлкен офлайн автобөлшектер сауда орталығы','Тиімді бағалар. Сапалы өнімдер. Пайдалы шоппинг.']
      ]
    }
  }
}
</script>
