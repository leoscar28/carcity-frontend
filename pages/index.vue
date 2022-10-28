<template>
  <div>
    <TheHeader>
      <template #actions>
        <NuxtLink to="/renters" class="btn btn-outline-primary">
          <span class="d-none d-sm-inline">{{language[current][0]}}</span>
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
      <template #navbar>
        <LinkScrollTo target-id="about" class="header__nav-link">
          {{language[current][1]}}
        </LinkScrollTo>
        <LinkScrollTo target-id="infrastructure" class="header__nav-link">
          {{language[current][2]}}
        </LinkScrollTo>
        <!--        <LinkScrollTo target-id="plan" class="header__nav-link">-->
        <!--          План помещений-->
        <!--        </LinkScrollTo>-->
      </template>
    </TheHeader>
    <main>


      <section class="hero">
        <div class="container">

          <MainSlider v-if="slider.length" class="mb-4" />

          <UserBannerSection />

          <div class="row">
            <div class="col-lg-4 mb-3 mb-lg-0" v-for="(slideDetail,key) in sliderDetail" :key="key">
              <div class="panel d-flex h-100" data-aos="flip-up" data-aos-easing="ease-in-cubic">
                <div class="flex-shrink-0 pt-1">
                  <img src="~/assets/img/icons/user-arrow.svg" width="26" height="29" alt="">
                </div>
                <div class="flex-grow-1 ms-3">
                  <p class="mb-0 fs-18 fw-medium" v-if="current === 0">
                    {{slideDetail.title}}
                  </p>
                  <p class="mb-0 fs-18 fw-medium" v-else>
                    {{slideDetail.title_kz}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="about section">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 mb-3 mb-lg-0">
              <template v-for="(aboutItem,key) in about">
                <h2 class="section-title" :key="key" v-if="current === 0">
                  {{aboutItem.title}}
                </h2>
                <h2 class="section-title" :key="key" v-else>
                  {{aboutItem.title_kz}}
                </h2>
                <p class="section-paragraph" style="white-space: pre-wrap; text-align: left" v-if="current === 0">
                  {{aboutItem.description}}
                </p>
                <p class="section-paragraph" style="white-space: pre-wrap; text-align: left" v-else>
                  {{aboutItem.description_kz}}
                </p>
              </template>
            </div>
            <div class="col-lg-7">
              <AboutPanel
                v-for="item in aboutOption"
                :key="item.id"
                :icon="item.img"
                class="mb-3"
              >
                <span v-if="current === 0">
                  {{ item.title }}
                </span>
                <span v-else>
                  {{ item.title_kz }}
                </span>
              </AboutPanel>
            </div>
          </div>
        </div>
      </section>
      <section id="awards">
        <div class="container mb-5 mt-5 ">
          <div class="row">
            <div class="col-lg-8">
              <h2 class="section-title mb-3">
                {{language[current][14]}}
              </h2>
            </div>
          </div>
          <div id="awards-slider" class="glide">
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                <li class="glide__slide" v-for="(item,key) in awards" :key="key">
                  <div class="col-lg-12 mb-3">
                    <ServicePanel :img="item.img" class="h-100">
                      <template v-if="current === 0">
                        {{ item.title }}
                      </template>
                      <template v-else>
                        {{ item.title_kz }}
                      </template>
                    </ServicePanel>
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
        </div>
      </section>
      <section id="infrastructure" class="infrastructure section">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 text-white mb-3 mb-lg-0">
              <template v-for="(info,key) in infrastructure">
                <h2 class="section-title" :key="key">
                  <template v-if="current === 0">{{info.title.trim()}}</template>
                  <template v-else>{{info.title_kz.trim()}}</template>
                </h2>
                <p class="section-paragraph" style="white-space: pre-wrap; text-align: left" v-if="current === 0">{{info.description.trim()}}</p>
                <p class="section-paragraph" style="white-space: pre-wrap; text-align: left" v-else>{{info.description_kz.trim()}}</p>
              </template>
            </div>
            <div class="col-lg-7">
              <div class="row">
                <div v-for="(item,key) in infrastructureOption" :key="key" class="col-md-6 mb-3">
                  <InfrastructurePanel :icon="item.img" class="h-100">
                    <template v-if="current === 0">
                      {{ item.title }}
                    </template>
                    <template v-else>
                      {{ item.title_kz }}
                    </template>
                  </InfrastructurePanel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="services section">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <h2 class="section-title">
                {{language[current][13]}}
              </h2>
            </div>
          </div>
          <div class="row">
            <div v-for="(item,key) in vehicleMaintenance" class="col-lg-3 col-md-6 mb-3" :key="key">
              <ServicePanel :img="item.img" class="h-100">
                <template v-if="current === 0">
                  {{ item.title }}
                </template>
                <template v-else>
                  {{ item.title_kz }}
                </template>
              </ServicePanel>
            </div>
          </div>
        </div>
      </section>
    </main>
    <TheFooter :dark="$route.name !== 'index'" />
    <style>
      body {
        overflow: auto !important;
      }
    </style>
  </div>
</template>

<script>
import TheHeader from "/components/site/TheHeader";
import LinkScrollTo from "/components/site/LinkScrollTo";
import MainSlider from '/components/site/MainSlider';
import AboutPanel from '/components/site/AboutPanel';
import InfrastructurePanel from '/components/site/InfrastructurePanel';
import ServicePanel from '/components/site/ServicePanel';
import TheFooter from "/components/site/TheFooter";
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import UserBannerSection from "../components/UserBannerSection"
import Glide from '@glidejs/glide'

export default {
  name: 'IndexPage',
  components: {
    UserBannerSection,
    vueCustomScrollbar,LinkScrollTo,TheHeader,MainSlider,AboutPanel,InfrastructurePanel,ServicePanel,TheFooter
  },
  computed: {
    slider() {
      return this.$store.state.localStorage.slider;
    },
    current() {
      return this.$store.state.localStorage.current;
    },
    sliderDetail() {
      return this.$store.state.localStorage.sliderDetail;
    },
    about() {
      return this.$store.state.localStorage.about;
    },
    aboutOption() {
      return this.$store.state.localStorage.aboutOption;
    },
    infrastructure() {
      return this.$store.state.localStorage.infrastructure;
    },
    infrastructureOption() {
      return this.$store.state.localStorage.infrastructureOption;
    },
    vehicleMaintenance() {
      return this.$store.state.localStorage.vehicleMaintenance;
    },
    awards() {
      return this.$store.state.localStorage.awards;
    }
  },
  created() {
    this.$store.dispatch('localStorage/sliderGet')
    this.$store.dispatch('localStorage/sliderDetailGet');
    this.$store.dispatch('localStorage/aboutGet');
    this.$store.dispatch('localStorage/aboutOptionGet');
    this.$store.dispatch('localStorage/infrastructureGet');
    this.$store.dispatch('localStorage/infrastructureOptionGet');
    this.$store.dispatch('localStorage/vehicleMaintenanceGet');
    this.$store.dispatch('localStorage/awardsGet');
  },
  data () {
    return {
      ps: null,
      language: [
        ['Арендаторам','О нас','Инфраструктура','1 000 000+ офлайн-посетителей и 500 000+ онлайн-посетителей в год','1 200+ специализированных бутиков. Лучшие продавцы с уникальным ассортиментом','2 000 000+ наименований запчастей от ведущих мировых брендов','ТЦ «Car City» - крупнейший офлайн торговый центр в Средней Азии.','У нас вы найдёте большой ассортимент запчастей от ведущих мировых брендов, от конвейерных поставщиков до качественных аналогов. На европейские, японские, российские, корейские, китайские и прочие иномарки.','Наша философия основана на сохранении времени и денег покупателей, чтобы они могли жить лучше. Это сделало нас самым успешным ритейлером автомобильных запчастей в Казахстане.','Для любого автовладельца ТЦ «Car City» является синонимом низкой цены, гарантии и качества!','На территории торгового центра расположились сотни магазинов по продаже автозапчастей и\n' +
        '                  аксессуаров для любых марок, банк, уютные кофейни, банкоматы, терминалы и многое другое. Car City\n' +
        '                  является самым комфортным в Алматы.','Вы обязательно найдете все необходимое на одной территории. Наши услуги – это качественно новый уровень сервиса.','Все что нужно сразу, в одном месте.','На прилегающей территории ТЦ имеется ряд СТО с большим спектром услуг по\n' +
        '                  обслуживанию автотранспорта','Наши награды'],
        ['Жалға алушыларға','Бiз туралы','Инфрақұрылымы','Жылына 1 000 000 + офлайн-келушілер және 500 000 + онлайн-келушілер','1 200 + мамандандырылған дүкендер мен бутиктер.\n' +
        'Қайталанбайтын ассортименті бар таңдаулы сатушылар','2 000 000 + жетекші әлемдік брендтерден автобөлшектер.','«Car City» СО - Орталық Азиядағы ірі офлайн сауда орталығы','Сіз бізден, европалық, жапондық, ресейлік, корейлік, қытайлық және басқа да шетелдік\n' +
        'автомобильдерге конвейерлік жеткізушілерінен бастап олардың сапалы аналогтарына дейін жетекші\n' +
        'әлемдік брендтерден үлкен автобөлшектер ассортиментін таба аласыз.','Біздің философия сатып алушылардың уақыты мен ақшасын үнемдеу арқылы олардың өмірін\n' +
        'жақсартуға негізделген. Осы бізді Қазақстандағы ең сәтті автокөлік бөлшегінің ритейлері болуымызға\n' +
        'әсер етті.','«Car City» СО кез-келген автокөлік иесін үшін төмен баға мен сапа кепілдігінің синонимі болып\n' +
        'табылады!','Сауда орталағының аймағында кез-келген маркалы көлікке автобөлшек және аксессуар сататын жүздеген дүкендер, банк, жайлы кофейнялар, банкоматтар, терминалдар орналасқан. Car City Алматы қаласындағы ең ыңғайлы жер болып табылады.','Сіз міндетті түрде бір жерден бәрін таба аласыз. Біздің қызметтер – сервистің жаңа сапалы деңгейі.','Керектің барлығы бір жерде.','Сауда орталығының іргелес аумағында автотранспортқақызмет көрсету бойынша кең қызмет тізімі бар\n' +
        'ТҚКС жұмыс істейді.','Біздің марапаттарымыз']
      ],
    }
  },
  head: {
    title: ['Огромный выбор автозапчастей по доступным ценам на любые марки машин','Автокөліктердің кез келген маркасы үшін қолжетімді бағамен автокөлік бөлшектерінің үлкен таңдауы'],
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Низкие цены. Гарантия качества. Отличный сервис.  Более 50 миллионов позиций - запчасти, масла, автохимия, электроника, аксессуары'
      },
      { property: 'og:title', content: 'Огромный выбор автозапчастей по доступным ценам на любые марки машин' },
      { property: 'og:description', content: 'Низкие цены. Гарантия качества. Отличный сервис.  Более 50 миллионов позиций - запчасти, масла, автохимия, электроника, аксессуары' },
      { property: 'og:locale', content: 'ru_RU' }
    ]
  },
  mounted() {
    new Glide('#awards-slider', {
      animationTimingFunc: 'ease-in-out',
      animationDuration: 800,
      autoplay: 4000,
      perView: 4,
      gap: 15,
      type: 'carousel',
      breakpoints: {
        700: {
          peek: { before: 0, after: 120 },
          perView: 1,
          focusAt: "center"
        },
        1000: {
          peek: { before: 0, after: 120 },
          perView: 2
        }
      }
    }).mount()
  }
}
</script>
<style lang="scss" scoped>
  body {
    overflow: auto !important;
  }
  @import '/assets/scss/main.scss';
</style>
