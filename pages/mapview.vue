<template>
  <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
    <TheHeader>
      <template #actions>
        <NuxtLink to="/renters" class="btn btn-outline-primary">
          <span class="d-none d-sm-inline">Арендаторам</span>
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
          О Car Сity
        </LinkScrollTo>
        <LinkScrollTo target-id="infrastructure" class="header__nav-link">
          Инфраструктура
        </LinkScrollTo>
        <!--        <LinkScrollTo target-id="plan" class="header__nav-link">-->
        <!--          План помещений-->
        <!--        </LinkScrollTo>-->
      </template>
    </TheHeader>
    <main class="page-content" style="background: none;">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link to="/" class="text-gray-600 text-decoration-none">{{language[current][1]}}</nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{language[current][2]}}
            </li>
          </ol>
        </nav>
        <div class="map-all">
          <div class="map-left">
            <div class="map-left-title">Что вы ищете?</div>
            <div class="map-left-input">
              <input type="text" placeholder="Поиск">
            </div>
            <div class="map-left-list">
              <vue-custom-scrollbar class="scroll-area" style="height: 660px" :settings="{ suppressScrollX: false }">
                <div class="map-left-list-main">
                  <div @click="roomId = room.id" class="map-left-list-item" v-for="(room,key) in list" :key="key">
                    <div class="map-left-list-item-description">
                      <div class="map-left-list-item-description-title">Помещение: {{room.title}}</div>
                      <div class="map-left-list-item-description-status" v-if="room.status === 2">Сдан в аренду</div>
                      <div class="map-left-list-item-description-status" v-else-if="room.status === 1">Свободно</div>
                      <div class="map-left-list-item-description-status" v-else>Не активен</div>
                    </div>
                    <div class="map-left-list-item-id">{{room.id}}</div>
                  </div>
                </div>
              </vue-custom-scrollbar>
            </div>
          </div>
          <div class="map-right">
            <map-main :selected="selected" :room-ids="roomIds" :key="'room'+roomId"></map-main>
            <div class="map-right-footer" onselectstart="return false">
              <div class="map-right-footer-item" :class="{'map-right-footer-item-sel':(selected === key)}" v-for="(tier,key) in tiers" :key="key" v-show="tier.id !== 6 && tier.id !== 1" @click="selected = key">{{tier.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <TheFooter />
  </vue-custom-scrollbar>
</template>

<script>
import TheHeader from "/components/site/TheHeader";
import TheFooter from "@/components/site/TheFooter";
import vueCustomScrollbar from 'vue-custom-scrollbar';
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import MapMain from "@/components/MapMain";
export default {
  name: "mapview",
  components: {vueCustomScrollbar,MapMain,TheHeader,TheFooter},
  computed: {
    roomIds() {
      return [this.roomId];
    },
    current() {
      return this.$store.state.localStorage.current;
    },
    tiers() {
      return this.$store.state.localStorage.tiers;
    },
    rooms() {
      return this.$store.state.localStorage.rooms;
    },
    list() {
      return this.rooms.filter(room => (room.tier.id - 1) === this.selected)
    }
  },
  async created() {
    await this.$store.dispatch('localStorage/tiersGet');
    await this.$store.dispatch('localStorage/roomGet');
  },
  data() {
    return {
      roomId:null,
      selected: 1,
      language: [
        ['Личный кабинет','Главная','Карта','У нас предусмотрены гибкие условия для аренды, индивидуальный подход к каждому арендатору','Заявка на аренду','С нами сотрудничают','Все необходимые условия для размещения вашего бизнеса','Наименование TOO/ИП','Введите наименование','Введите свои данные','БИН/ИИН','Введите БИН/ИИН','Категория товара или услуги','Введите категория товара или услугу','Требуемая площадь помещения','Минимальная','Максимальная','Другие условия для работы/комментарии','Введите комментарий','Контактное лицо','Введите контактное лицо','Телефон для связи','Введите телефон','Email','Введите email','Я принимаю условия','пользовательского соглашения','политики конфиденциальности','Отмена','Отправить','Отправляем данные...'],
        ['Жеке кабинет','Басты бет','Карта','Бізде жалға алу бойынша икемді жағдай, әр жалға алушымен жеке тіл табысу қарастырылған','Жалға алу туралы өтініш','Бізбен бірге қызмет жасайды','Сіздің бизнесіңіздің орналасуына барлық керекті шарттар','TOO/ИП атауы','Атын енгізіңіз','Мәліметтеріңізді енгізіңіз','БСН/ЖСН','БСН/ЖСН енгізіңіз','Өнім немесе қызмет санаты','Өнім немесе қызмет санатын енгізіңіз','Қажетті бөлме ауданы','Ең аз','Максималды','Басқа жұмыс шарттары/түсініктемелері','Пікір енгізіңіз','Байланыстағы адам','Байланыстағы адамды енгізіңіз','Байланыс телефоны','Телефонды енгізіңіз','Email','Электрондық поштаны енгізіңіз','Мен шарттарды қабылдаймын','пайдаланушы келісімі','құпиялылық саясаты','Модалды жабу','Жіберу','Деректерди жиберу...']
      ],
    }
  },
  head: {
    title: 'Карта помещении',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Арендуйте бутик или витрину в крупнейшем торговом центре автозапчастей Car City. Огромный трафик покупателей, паркинг и богатая инфраструктура'
      },
      { property: 'og:title', content: 'Аренда помещений под продажу автозапчастей и аксессуаров от 3 кв. м.' },
      { property: 'og:description', content: 'Арендуйте бутик или витрину в крупнейшем торговом центре автозапчастей Car City. Огромный трафик покупателей, паркинг и богатая инфраструктура' },
      { property: 'og:locale', content: 'ru_RU' },
      { name: 'yandex-verification', content: '374e8ea4b23100e6' },
      { name: 'google-site-verification', content: 'uQkO_Vx3W9DhoBuJkz1iI5a0cB6BV914qW4VS4VyPLY' }
    ]
  },
}
</script>

<style lang="scss">
.map-main {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
@import '/assets/Map.scss';
</style>
