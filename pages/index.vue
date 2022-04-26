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
          <MainSlider class="mb-4" />
          <div class="row">
            <div class="col-lg-4 mb-3 mb-lg-0">
              <div class="panel d-flex h-100" data-aos="flip-up" data-aos-easing="ease-in-cubic">
                <div class="flex-shrink-0 pt-1">
                  <img src="~/assets/img/icons/user-arrow.svg" width="26" height="29" alt="">
                </div>
                <div class="flex-grow-1 ms-3">
                  <p class="mb-0 fs-18 fw-medium">
                    {{language[current][3]}}
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 mb-3 mb-lg-0">
              <div class="panel d-flex h-100" data-aos="flip-up" data-aos-easing="ease-in-cubic">
                <div class="flex-shrink-0 pt-1">
                  <img src="~/assets/img/icons/store.svg" width="28" height="24" alt="">
                </div>
                <div class="flex-grow-1 ms-3">
                  <p class="mb-0 fs-18 fw-medium">
                    {{language[current][4]}}
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 mb-3 mb-lg-0">
              <div class="panel d-flex h-100" data-aos="flip-up" data-aos-easing="ease-in-cubic">
                <div class="flex-shrink-0 pt-1">
                  <img src="~/assets/img/icons/stock.svg" width="28" height="21" alt="">
                </div>
                <div class="flex-grow-1 ms-3">
                  <p class="mb-0 fs-18 fw-medium">
                    {{language[current][5]}}
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
              <h2 class="section-title">
                {{language[current][1]}}
              </h2>
              <p class="section-paragraph">
                {{language[current][6]}}
              </p>
              <p class="section-paragraph">
                {{language[current][7]}}
              </p>
              <p class="section-paragraph">
                {{language[current][8]}}
              </p>
              <p class="section-paragraph">
                {{language[current][9]}}
              </p>
            </div>
            <div class="col-lg-7">
              <AboutPanel
                v-for="item in aboutItems[current]"
                :key="item.id"
                :icon="item.iconUrl"
                class="mb-3"
              >
                {{ item.title }}
              </AboutPanel>
            </div>
          </div>
        </div>
      </section>
      <section id="infrastructure" class="infrastructure section">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 text-white mb-3 mb-lg-0">
              <h2 class="section-title">
                {{language[current][2]}}
              </h2>
              <p class="section-paragraph">
                {{language[current][10]}}
              </p>
              <p class="section-paragraph">
                {{language[current][11]}}
              </p>
              <p class="section-paragraph">
                {{language[current][12]}}
              </p>
            </div>
            <div class="col-lg-7">
              <div class="row">
                <div v-for="item in infrastructureItems[current]" :key="item.id" class="col-md-6 mb-3">
                  <InfrastructurePanel :icon="item.iconUrl" class="h-100">
                    {{ item.title }}
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
            <div v-for="item in serviceItems[current]" :key="item.id" class="col-lg-3 col-md-6 mb-3">
              <ServicePanel :img="item.imgUrl" class="h-100">
                {{ item.title }}
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
export default {
  name: 'IndexPage',
  components: {
    vueCustomScrollbar,LinkScrollTo,TheHeader,MainSlider,AboutPanel,InfrastructurePanel,ServicePanel,TheFooter
  },
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    }
  },
  methods: {
    scrollHandle(evt) {
      let el  = document.getElementById('scroll');
      console.log(el.scrollTop);
    }
  },
  data () {
    return {
      ps: null,
      language: [
        ['Арендаторам','О нас','Инфраструктура','1 000 000+ офлайн-посетителей и 500 000+ онлайн-посетителей в год','1 200+ специализированных бутиков. Лучшие продавцы с уникальным ассортиментом','2 000 000+ наименований запчастей от ведущих мировых брендов','ТЦ «Car City» - крупнейший офлайн торговый центр в Средней Азии.','У нас вы найдёте большой ассортимент запчастей от ведущих мировых брендов, от конвейерных поставщиков до качественных аналогов. На европейские, японские, российские, корейские, китайские и прочие иномарки.','Наша философия основана на сохранении времени и денег покупателей, чтобы они могли жить лучше. Это сделало нас самым успешным ритейлером автомобильных запчастей в Казахстане.','Для любого автовладельца ТЦ «Car City» является синонимом низкой цены, гарантии и качества!','На территории торгового центра расположились сотни магазинов по продаже автозапчастей и\n' +
        '                  аксессуаров для любых марок, банк, уютные кофейни, банкоматы, терминалы и многое другое. Car City\n' +
        '                  является самым комфортным в Алматы.','Вы обязательно найдете все необходимое на одной территории. Наши услуги – это качественно новый уровень сервиса.','Все что нужно сразу, в одном месте.','На прилегающей территории ТЦ имеется ряд СТО с большим спектром услуг по\n' +
        '                  обслуживанию автотранспорта'],
        ['Жалға алушыларға','Бiз туралы','Инфрақұрылымы','Жылына 1 000 000 + офлайн-келушілер және 500 000 + онлайн-келушілер','1 200 + мамандандырылған дүкендер мен бутиктер.\n' +
        'Қайталанбайтын ассортименті бар таңдаулы сатушылар','2 000 000 + жетекші әлемдік брендтерден автобөлшектер.','«Car City» СО - Орталық Азиядағы ірі офлайн сауда орталығы','Сіз бізден, европалық, жапондық, ресейлік, корейлік, қытайлық және басқа да шетелдік\n' +
        'автомобильдерге конвейерлік жеткізушілерінен бастап олардың сапалы аналогтарына дейін жетекші\n' +
        'әлемдік брендтерден үлкен автобөлшектер ассортиментін таба аласыз.','Біздің философия сатып алушылардың уақыты мен ақшасын үнемдеу арқылы олардың өмірін\n' +
        'жақсартуға негізделген. Осы бізді Қазақстандағы ең сәтті автокөлік бөлшегінің ритейлері болуымызға\n' +
        'әсер етті.','«Car City» СО кез-келген автокөлік иесін үшін төмен баға мен сапа кепілдігінің синонимі болып\n' +
        'табылады!','Сауда орталағының аймағында кез-келген маркалы көлікке автобөлшек және аксессуар сататын жүздеген дүкендер, банк, жайлы кофейнялар, банкоматтар, терминалдар орналасқан. Car City Алматы қаласындағы ең ыңғайлы жер болып табылады.','Сіз міндетті түрде бір жерден бәрін таба аласыз. Біздің қызметтер – сервистің жаңа сапалы деңгейі.','Керектің барлығы бір жерде.','Сауда орталығының іргелес аумағында автотранспортқақызмет көрсету бойынша кең қызмет тізімі бар\n' +
        'ТҚКС жұмыс істейді.']
      ],
      aboutItems: [
        [{ id: 1, iconUrl: require('~/assets/img/icons/secure-check.svg'), title: 'На рынке с 2005 года' },
          { id: 2, iconUrl: require('~/assets/img/icons/expand.svg'), title: 'Площадь торгового центра – 31 585 кв. м.' },
          { id: 3, iconUrl: require('~/assets/img/icons/achievement.svg'), title: 'Ежегодный победитель в номинации «Лучший Автомагазин» с 2017 года' },
          { id: 4, iconUrl: require('~/assets/img/icons/user-placemark.svg'), title: 'Удобное месторасположение по геолокации' }],
        [{ id: 1, iconUrl: require('~/assets/img/icons/secure-check.svg'), title: '2005 жылдан бері нарықта' },
          { id: 2, iconUrl: require('~/assets/img/icons/expand.svg'), title: 'Сауда орталығының ауданы – 31 585 ш. м.' },
          { id: 3, iconUrl: require('~/assets/img/icons/achievement.svg'), title: '2017 жылдан бері «Ең үздік автодүкен» номинациясы бойынша жыл сайынғы жеңімпаз' },
          { id: 4, iconUrl: require('~/assets/img/icons/user-placemark.svg'), title: 'Геолокация бойынша қолайлы орналасқан' }],
      ],
      infrastructureItems: [
        [{ id: 1, iconUrl: require('~/assets/img/icons/payment-card.svg'), title: 'Банкоматы Halyk Bank , Банк ЦентрКредит, ForteBank, Kaspi Bank, Сбербанк' },
          { id: 2, iconUrl: require('~/assets/img/icons/bank.svg'), title: 'Отделение банка НурБанк' },
          { id: 3, iconUrl: require('~/assets/img/icons/monitor.svg'), title: 'Терминалы 24KZ, QIWI, Interpay, Kaspi Postomat' },
          { id: 4, iconUrl: require('~/assets/img/icons/cup.svg'), title: 'Кофейни' },
          { id: 5, iconUrl: require('~/assets/img/icons/user-arrow.svg'), title: 'Услуги курьерской службы - AlemTat, Avis Logistics' },
          { id: 6, iconUrl: require('~/assets/img/icons/car.svg'), title: 'Парковка на 500 автомашин' }],
        [{ id: 1, iconUrl: require('~/assets/img/icons/payment-card.svg'), title: 'Halyk Bank , Банк ЦентрКредит, ForteBank, Kaspi Bank, Сбербанк банкоматтары' },
          { id: 2, iconUrl: require('~/assets/img/icons/bank.svg'), title: 'Нұрбанк банкінің бөлімшесі' },
          { id: 3, iconUrl: require('~/assets/img/icons/monitor.svg'), title: '24KZ, QIWI, Interpay, Kaspi Postomat терминалдары' },
          { id: 4, iconUrl: require('~/assets/img/icons/cup.svg'), title: 'Кофейнялар' },
          { id: 5, iconUrl: require('~/assets/img/icons/user-arrow.svg'), title: 'Алем ТАТ, Avis Logistics курьерлік компанияларының қызметтері' },
          { id: 6, iconUrl: require('~/assets/img/icons/car.svg'), title: '500 автокөлікке арналған көлік қоятын орын' }]
      ],
      serviceItems: [
        [{ id: 1, imgUrl: require('~/assets/img/demo/service1.png'), title: 'Пункт замены масла' },
          { id: 2, imgUrl: require('~/assets/img/demo/service2.png'), title: 'Геометрия ходовой части' },
          { id: 3, imgUrl: require('~/assets/img/demo/service3.png'), title: 'Токарные работы' },
          { id: 4, imgUrl: require('~/assets/img/demo/service4.png'), title: 'Компьютерная диагностика' },
          { id: 5, imgUrl: require('~/assets/img/demo/service5.png'), title: 'Реставрация трещин лобовых стёкол' },
          { id: 6, imgUrl: require('~/assets/img/demo/service6.png'), title: 'Заправка кондиционеров' },
          { id: 7, imgUrl: require('~/assets/img/demo/service7.png'), title: 'Ремонт двигателя, ходовой части' },
          { id: 8, imgUrl: require('~/assets/img/demo/service8.png'), title: 'Шиномонтаж' }],
        [{ id: 1, imgUrl: require('~/assets/img/demo/service1.png'), title: 'Май алмастыру пункті' },
          { id: 2, imgUrl: require('~/assets/img/demo/service2.png'), title: 'Жүрістік бөлігінің геометриясы' },
          { id: 3, imgUrl: require('~/assets/img/demo/service3.png'), title: 'Жону жұмыстары' },
          { id: 4, imgUrl: require('~/assets/img/demo/service4.png'), title: 'Компьютерлік диагностика' },
          { id: 5, imgUrl: require('~/assets/img/demo/service5.png'), title: 'Алдыңғы әйнектегі сызаттарды қалпына келтіру' },
          { id: 6, imgUrl: require('~/assets/img/demo/service6.png'), title: 'Кондиционерлерді қайта толтыру' },
          { id: 7, imgUrl: require('~/assets/img/demo/service7.png'), title: 'Қозғалтқыш және жүрістік бөлікті жөндеу' },
          { id: 8, imgUrl: require('~/assets/img/demo/service8.png'), title: 'Доңғалақ ауыстыру' }]
      ]
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
  }
}
</script>
<style lang="scss" scoped>
  body {
    overflow: auto !important;
  }
  @import '/assets/scss/main.scss';
</style>
