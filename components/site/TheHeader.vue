<template>
  <header id="header" class="header" :class="{ 'header--has-navbar': $slots.navbar }">
    <div class="header__main">
      <div class="container">
        <div class="header__main-row">
          <div class="d-flex align-items-center">
            <div class="header__logo me-4">
              <a href="/">
                <img src="~/assets/img/carcity-logo.png" alt="">
              </a>
            </div>

            <!--            <LocaleDropdown />-->
          </div>

          <div class="header__info-row d-none d-lg-flex">
            <div class="header__info">
              <img src="~/assets/img/icons/clock.svg" class="header__info-icon" alt="">
              <div>
                <span class="header__info-title">Работаем ежедневно</span>
                <span class="header__info-data">09:00 - 19:00</span>
              </div>
            </div>

            <div class="header__info">
              <img src="~/assets/img/icons/phone.svg" class="header__info-icon" alt="">
              <div>
                <span class="header__info-title">Администрация ТЦ</span>
                <a href="tel:+77273191300" class="header__info-data">+7 727 319 13 00</a>
              </div>
            </div>

            <div class="header__info">
              <img src="~/assets/img/icons/placemark.svg" class="header__info-icon" alt="">
              <div>
                <span class="header__info-title">Как добраться?</span>
                <address class="header__info-data">
                  Алматы, мкр. Баянаул 57а
                </address>
              </div>
            </div>
          </div>

          <div>
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="$slots.navbar" class="header__navbar">
      <div class="container">
        <nav class="header__nav">
          <slot name="navbar" />
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { throttle } from '~/utils/utils'

export default {
  data () {
    this.handleScrollThrottled = throttle(this.handleScroll, 100)
    return {
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScrollThrottled)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScrollThrottled)
  },

  methods: {
    handleScroll (ev) {
      const headerEl = document.getElementById('header')
      const scrollTop = window.pageYOffset

      if (scrollTop >= 300) {
        headerEl.classList.add('header--navbar-hidden')
      } else {
        headerEl.classList.remove('header--navbar-hidden')
      }
    }
  }
}
</script>
