<template>
  <header id="header" class="header" :class="{ 'header--has-navbar': !isRentersPage }">
    <div class="header__main">
      <div class="container">
        <div class="header__main-row">
          <div class="d-flex align-items-center">
            <div class="header__logo me-4">
              <nuxt-link to="/">
                <img src="~/assets/img/carcity-logo.png" alt="">
              </nuxt-link>
            </div>
            <LocaleDropdown />
          </div>

          <div class="header__info-row d-none d-lg-flex">
            <div class="header__info">
              <img src="~/assets/img/icons/clock.svg" class="header__info-icon" alt="">
              <div>
                <span class="header__info-title">{{language[current][6]}}</span>
                <span class="header__info-data">
                  <template v-if="current === 0">
                    09.00 - 19.00
                  </template>
                  <template v-else-if="current === 1">
                    <span class="font-12">09.00 - 19.00</span>
                  </template>
                </span>
              </div>
            </div>
            <div class="header__info">
              <img src="~/assets/img/icons/phone.svg" class="header__info-icon" alt="">
              <div>
                <span class="header__info-title">{{language[current][5]}}</span>
                <a :href="'tel:'+phone.phone" class="header__info-data" v-for="(phone,key) in contact" :key="key">
                  <template v-if="current === 0">
                    {{phone.phone}}
                  </template>
                  <template v-else-if="current === 1">
                    <span class="font-12">{{phone.phone}}</span>
                  </template>
                </a>
              </div>
            </div>

            <div class="header__info">
              <img src="~/assets/img/icons/placemark.svg" class="header__info-icon" alt="">
              <div>
                <span class="header__info-title">{{language[current][4]}}</span>
                <a href="https://go.2gis.com/yrh1n4" target="_blank" class="header__info-data">
                  <template v-if="current === 0">
                    Алматы, мкр. Баян-аул 57а
                  </template>
                  <template v-else-if="current === 1">
                    <span class="font-12">Алматы қ, Баян-аул ш-н ауданы 57а</span>
                  </template>
                </a>
              </div>
            </div>
          </div>

          <div :class="isActive ? 'header__info-row d-lg-flex is-active' : 'header__info-row d-lg-flex'">
            <div class="mobile-menu">
              <NuxtLink :to="{ name: 'index', hash: '#about' }" class="mob__nav-link" @click.native="closeHamburger">
                {{language[current][0]}}
              </NuxtLink>
              <NuxtLink :to="{ name: 'index', hash: '#infrastructure' }" class="mob__nav-link" @click.native="closeHamburger">
                {{language[current][1]}}
              </NuxtLink>
<!--              <NuxtLink :to="{ name: 'index', hash: '#' }" class="mob__nav-link" @click="closeHamburger">
                <img src="~/assets/img/icons/icn1.svg" class="header__info-icon" alt="">
                Поиск автозапчастей
              </NuxtLink>
              <NuxtLink :to="{ name: 'index', hash: '#' }" class="mob__nav-link" @click="closeHamburger">
                <img src="~/assets/img/icons/icn2.svg" class="header__info-icon" alt="">
                Список бутиков
              </NuxtLink>-->
            </div>

          </div>

          <div>
            <template v-if="isRentersPage">
              <NuxtLink to="partner" class="btn btn-outline-primary">
                <span class="d-none d-sm-inline">{{language[current][3]}}</span>
                <svg
                  class="d-sm-none"
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.6 11.25C11.4469 11.25 10.8924 11.875 9 11.875C7.10759 11.875 6.55714 11.25 5.4 11.25C2.41875 11.25 0 13.6016 0 16.5V18.125C0 19.1602 0.863839 20 1.92857 20H16.0714C17.1362 20 18 19.1602 18 18.125V16.5C18 13.6016 15.5813 11.25 12.6 11.25ZM16.7143 18.125C16.7143 18.4688 16.425 18.75 16.0714 18.75H1.92857C1.575 18.75 1.28571 18.4688 1.28571 18.125V16.5C1.28571 14.293 3.12991 12.5 5.4 12.5C6.1875 12.5 6.97098 13.125 9 13.125C11.025 13.125 11.8125 12.5 12.6 12.5C14.8701 12.5 16.7143 14.293 16.7143 16.5V18.125ZM9 10C11.8406 10 14.1429 7.76172 14.1429 5C14.1429 2.23828 11.8406 0 9 0C6.15938 0 3.85714 2.23828 3.85714 5C3.85714 7.76172 6.15938 10 9 10ZM9 1.25C11.1254 1.25 12.8571 2.93359 12.8571 5C12.8571 7.06641 11.1254 8.75 9 8.75C6.87455 8.75 5.14286 7.06641 5.14286 5C5.14286 2.93359 6.87455 1.25 9 1.25Z" fill="currentColor" />
                </svg>
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/renters" class="btn btn-outline-primary">
                <span class="d-none d-sm-inline" :class="{'font-13':(current === 1)}">{{language[current][2]}}</span>
                <svg
                  class="d-sm-none"
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="currentColor"
                >
                  <g><rect fill="none" height="24" width="24" /></g>
                  <g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" /></g>
                </svg>
              </NuxtLink>
            </template>
          </div>
          <div id="hamburger" :class="isActive ? 'hamburger is-active' : 'hamburger'" @click="toggleHamburger">
            <span class="line" />
            <span class="line" />
            <span class="line" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isRentersPage" class="header__navbar hide-mob">
      <div class="container">
        <nav class="header__nav">
          <NuxtLink :to="{ name: 'index', hash: '#about' }" class="header__nav-link">
            {{language[current][0]}}
          </NuxtLink>
          <NuxtLink :to="{ name: 'index', hash: '#infrastructure' }" class="header__nav-link">
            {{language[current][1]}}
          </NuxtLink>
          <!--        <NuxtLink :to="{ name: 'index', hash: '#about' }" class="header__nav-link">-->
          <!--          План помещений-->
          <!--        </NuxtLink>-->
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { throttle } from '~/utils/utils'
import LocaleDropdown from "@/components/site/LocaleDropdown";
export default {
  components: {LocaleDropdown},
  data () {
    this.handleScrollThrottled = throttle(this.handleScroll, 100)
    return {
      isActive: false,
      language: [
        ['О нас','Инфраструктура','Арендаторам','Личный кабинет','Как добраться?','Администрация ТЦ','Работаем ежедневно'],
        ['Бiз туралы','Инфрақұрылым','Жалға алушыларға','Жеке кабинет','Қалай жетуге болады?','СО әкімшілігі','жұмыс кестесі']
      ]
    }
  },
  created() {
    this.$store.dispatch('localStorage/contactGet');
  },
  computed: {
    isRentersPage () {
      return this.$route.name === 'renters'
    },
    current() {
      return this.$store.state.localStorage.current;
    },
    contact() {
      return this.$store.state.localStorage.contact;
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
    },
    toggleHamburger () {
      this.isActive = !this.isActive
    },
    closeHamburger (ev) {
      this.isActive = false
    }
  }
}
</script>
<style lang="scss">
  .font-13 {
    font-size: 13px;
  }
  .font-12 {
    font-size: 12px;
  }
</style>
