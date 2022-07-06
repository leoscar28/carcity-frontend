<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
      <TheHeader>
        <template #actions>
          <NuxtLink to="/login" class="btn btn-outline-primary">
            <span class="d-none d-sm-inline">{{language[current][0]}}</span>
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
      </TheHeader>
      <main class="page-content">
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

          <div class="jumbo">
            <div class="jumbo__descr">
              <p>
                {{language[current][3]}}
              </p>
              <div>
                <!--              <a href="#" class="btn btn-primary btn-icon me-2 mb-2 mb-sm-0">
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4993 0.166016L10.3243 1.34102L14.141 5.16602H0.666016V6.83268H14.141L10.316 10.6577L11.4993 11.8327L17.3327 5.99935L11.4993 0.166016Z" fill="currentColor" />
                  </svg>
                  <span>Подобрать помещение</span>
                </a>-->
                <button type="button" class="btn btn-outline-primary btn-icon" @click="showContactUsModal">
                  <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.83268 2.33268V15.666H10.166V2.33268H1.83268ZM0.999349 0.666016H10.9994C11.2204 0.666016 11.4323 0.753813 11.5886 0.910093C11.7449 1.06637 11.8327 1.27834 11.8327 1.49935V16.4993C11.8327 16.7204 11.7449 16.9323 11.5886 17.0886C11.4323 17.2449 11.2204 17.3327 10.9994 17.3327H0.999349C0.778335 17.3327 0.566374 17.2449 0.410093 17.0886C0.253813 16.9323 0.166016 16.7204 0.166016 16.4993V1.49935C0.166016 1.27834 0.253813 1.06637 0.410093 0.910093C0.566374 0.753813 0.778335 0.666016 0.999349 0.666016ZM5.99935 13.166C6.22036 13.166 6.43232 13.2538 6.58861 13.4101C6.74489 13.5664 6.83268 13.7783 6.83268 13.9993C6.83268 14.2204 6.74489 14.4323 6.58861 14.5886C6.43232 14.7449 6.22036 14.8327 5.99935 14.8327C5.77834 14.8327 5.56637 14.7449 5.41009 14.5886C5.25381 14.4323 5.16602 14.2204 5.16602 13.9993C5.16602 13.7783 5.25381 13.5664 5.41009 13.4101C5.56637 13.2538 5.77834 13.166 5.99935 13.166V13.166Z" fill="currentColor" />
                  </svg>
                  <span>{{language[current][4]}}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="mb-5 pb-4">
            <h2 class="section-title">
              {{language[current][5]}}
            </h2>
            <PartnersSlider />
          </div>

          <div>
            <h2 class="section-title mb-4">
              {{language[current][6]}}
            </h2>
            <div class="row">
              <div v-for="item in conditionItems[current]" :key="item.id" class="col-lg-4 col-md-6 mb-3">
                <ConditionPanel :icon="item.iconUrl" class="h-100">
                  {{ item.title }}
                </ConditionPanel>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AppModal v-model="contactUsModalVisible" :title="language[current][9]" @scroll.stop>
        <form ref="form" @submit.prevent>
          <div class="mb-3">
            <label for="name-input" class="form-label"><span class="text-danger">*</span> {{language[current][7]}}</label>
            <input id="name-input" :placeholder="language[current][8]" type="text" class="form-control" v-model="form.company" ref="company" name="company">
          </div>
          <div class="mb-3">
            <label for="bin-input" class="form-label"><span class="text-danger">*</span> {{language[current][10]}}</label>
            <input id="bin-input" :placeholder="language[current][11]" type="text" class="form-control" v-model="form.bin" ref="bin" name="bin" max="15">
          </div>
          <div class="mb-3">
            <label for="category-input" class="form-label"><span class="text-danger">*</span> {{language[current][12]}}</label>
            <input id="category-input" :placeholder="language[current][13]" type="text" class="form-control" v-model="form.category" ref="category" name="category" max="250">
          </div>
          <div>
            <label for="min-square-input" class="form-label"><span class="text-danger">*</span> {{language[current][14]}}</label>
            <div class="row">
              <div class="col-sm-6 mb-3">
                <input id="min-square-input" :placeholder="language[current][15]" type="text" class="form-control" v-model="form.min" ref="min" name="min" max="10">
              </div>
              <div class="col-sm-6 mb-3">
                <input id="max-square-input" :placeholder="language[current][16]" type="text" class="form-control" v-model="form.max" ref="max" name="max" max="10">
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="comment-input" class="form-label"><span class="text-danger">*</span> {{language[current][17]}}</label>
            <textarea id="comment-input" :placeholder="language[current][18]" type="text" class="form-control" v-model="form.comment" ref="comment" name="comment"/>
          </div>
          <div class="mb-3">
            <label for="user-input" class="form-label"><span class="text-danger">*</span> {{language[current][19]}}</label>
            <input id="user-input" :placeholder="language[current][20]" type="text" class="form-control" v-model="form.fullName" ref="fullName" name="fullName" max="250">
          </div>
          <div class="mb-3">
            <label for="tel-input" class="form-label"><span class="text-danger">*</span> {{language[current][21]}}</label>
            <input id="tel-input" :placeholder="language[current][22]" type="text" class="form-control" v-model="form.phone" ref="phone" name="phone" max="20" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="email-input" class="form-label">{{language[current][23]}}</label>
            <input id="email-input" :placeholder="language[current][24]" type="text" class="form-control" v-model="form.email" ref="email" name="email" max="100" autocomplete="off">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input id="accept-privacy-policy" class="form-check-input" type="checkbox" v-model="form.agree">
              <label class="form-check-label" for="accept-privacy-policy">
                {{language[current][25]}} <a href="/terms-of-use" target="_blank" class="text-decoration-none">{{language[current][26]}}</a> и <a href="/privacy-policy" target="_blank" class="text-decoration-none">{{language[current][27]}}</a>
              </label>
            </div>
          </div>
        </form>
        <template #footer>
          <button class="btn btn-secondary" @click="contactUsModalVisible = false" v-if="!email">
            {{language[current][28]}}
          </button>
          <button class="btn btn-primary" :style="[!form.agree?{'opacity':'.2'}:{}]" @click="send" v-if="!email">
            {{language[current][29]}}
          </button>
          <button class="btn btn-primary" v-else>
            {{language[current][30]}}
          </button>
        </template>
      </AppModal>
      <TheFooter :dark="$route.name !== 'index'" />
    </vue-custom-scrollbar>
  </div>
</template>
<script>
import TheHeader from "/components/site/TheHeader";
import PartnersSlider from "/components/site/PartnersSlider";
import ConditionPanel from "/components/site/ConditionPanel";
import AppModal from "/components/site/AppModal";
import TheFooter from "/components/site/TheFooter";
import vueCustomScrollbar from 'vue-custom-scrollbar';
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import emailjs from '@emailjs/browser';
export default {
  components: {
    vueCustomScrollbar,TheHeader,PartnersSlider,ConditionPanel,AppModal,TheFooter
  },
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    },
    email() {
      return this.$store.state.localStorage.email;
    }
  },
  data () {
    return {
      contactUsModalVisible: false,
      form: {
        company: '',
        bin: '',
        category: '',
        min: '',
        max: '',
        comment: '',
        fullName: '',
        phone: '',
        email: '',
        agree: false
      },
      language: [
        ['Личный кабинет','Главная','Арендаторам','У нас предусмотрены гибкие условия для аренды, индивидуальный подход к каждому арендатору','Заявка на аренду','С нами сотрудничают','Все необходимые условия для размещения вашего бизнеса','Наименование TOO/ИП','Введите наименование','Введите свои данные','БИН/ИИН','Введите БИН/ИИН','Категория товара или услуги','Введите категория товара или услугу','Требуемая площадь помещения','Минимальная','Максимальная','Другие условия для работы/комментарии','Введите комментарий','Контактное лицо','Введите контактное лицо','Телефон для связи','Введите телефон','Email','Введите email','Я принимаю условия','пользовательского соглашения','политики конфиденциальности','Отмена','Отправить','Отправляем данные...'],
        ['Жеке кабинет','Басты бет','Жалға алушыларға','Бізде жалға алу бойынша икемді жағдай, әр жалға алушымен жеке тіл табысу қарастырылған','Жалға алу туралы өтініш','Бізбен бірге қызмет жасайды','Сіздің бизнесіңіздің орналасуына барлық керекті шарттар','TOO/ИП атауы','Атын енгізіңіз','Мәліметтеріңізді енгізіңіз','БСН/ЖСН','БСН/ЖСН енгізіңіз','Өнім немесе қызмет санаты','Өнім немесе қызмет санатын енгізіңіз','Қажетті бөлме ауданы','Ең аз','Максималды','Басқа жұмыс шарттары/түсініктемелері','Пікір енгізіңіз','Байланыстағы адам','Байланыстағы адамды енгізіңіз','Байланыс телефоны','Телефонды енгізіңіз','Email','Электрондық поштаны енгізіңіз','Мен шарттарды қабылдаймын','пайдаланушы келісімі','құпиялылық саясаты','Модалды жабу','Жіберу','Деректерди жиберу...']
      ],
      conditionItems: [
        [{ id: 1, iconUrl: require('~/assets/img/icons/percent-orange.svg'), title: 'Выгодные условия аренды' },
          { id: 2, iconUrl: require('~/assets/img/icons/stock-orange.svg'), title: 'Удобная зона разгрузки' },
          { id: 3, iconUrl: require('~/assets/img/icons/bus-orange.svg'), title: 'Удобная транспортная развязка' },
          { id: 4, iconUrl: require('~/assets/img/icons/car-orange.svg'), title: 'Парковка на 500 автомашин' },
          { id: 5, iconUrl: require('~/assets/img/icons/secure-check-orange.svg'), title: 'Охрана здания 24/7' },
          { id: 6, iconUrl: require('~/assets/img/icons/user-placemark-orange.svg'), title: 'Насыщенная инфраструктура района' }],
        [{ id: 1, iconUrl: require('~/assets/img/icons/percent-orange.svg'), title: 'Тиімді жалға алу жағдайлары' },
          { id: 2, iconUrl: require('~/assets/img/icons/stock-orange.svg'), title: 'Ыңғайлы жүк түсіру аймағы' },
          { id: 3, iconUrl: require('~/assets/img/icons/bus-orange.svg'), title: 'Қолайлы көлік жол айырығы' },
          { id: 4, iconUrl: require('~/assets/img/icons/car-orange.svg'), title: '500 автокөлікке арналған көлік қоятын орын' },
          { id: 5, iconUrl: require('~/assets/img/icons/secure-check-orange.svg'), title: '24/7 ғимаратты күзету' },
          { id: 6, iconUrl: require('~/assets/img/icons/user-placemark-orange.svg'), title: 'Ауданның толық инфрақұрылымы' }]
      ]
    }
  },
  head: {
    title: 'Аренда помещений под продажу автозапчастей и аксессуаров от 3 кв. м.',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Арендуйте бутик или витрину в крупнейшем торговом центре автозапчастей Car City. Огромный трафик покупателей, паркинг и богатая инфраструктура'
      },
      { property: 'og:title', content: 'Аренда помещений под продажу автозапчастей и аксессуаров от 3 кв. м.' },
      { property: 'og:description', content: 'Арендуйте бутик или витрину в крупнейшем торговом центре автозапчастей Car City. Огромный трафик покупателей, паркинг и богатая инфраструктура' },
      { property: 'og:locale', content: 'ru_RU' }
    ]
  },
  methods: {
    showContactUsModal () {
      this.contactUsModalVisible = true
    },
    send() {
      let form  = this.form;
      let refs  = this.$refs;
      if (!form.agree || this.email) {
        return;
      }
      if (form.company.trim() === '') {
        return refs.company.focus();
      } else if (form.bin.trim() === '') {
        return refs.bin.focus();
      } else if (form.category.trim() === '') {
        return refs.category.focus();
      } else if (form.min.trim() === '') {
        return refs.min.focus();
      } else if (form.max.trim() === '') {
        return refs.max.focus();
      } else if (form.comment.trim() === '') {
        return refs.comment.focus();
      } else if (form.fullName.trim() === '') {
        return refs.fullName.focus();
      } else if (form.phone.trim() === '') {
        return refs.phone.focus();
      }
      this.$store.commit('localStorage/setEmail',true);
      emailjs.sendForm('service_7nc0w02', 'template_ul937oe', refs.form,  '2jmpXPP8YiXuqFWZE')
        .then((result) => {
          this.$store.commit('localStorage/setEmail',false);
          this.$toast.show('Ваша заявка отправлена!').goAway(5000);
          this.contactUsModalVisible = false;
          this.form = {
            company: '',
            bin: '',
            category: '',
            min: '',
            max: '',
            comment: '',
            fullName: '',
            phone: '',
            email: '',
            agree: false
          };
        }, (error) => {
          this.$store.commit('localStorage/setEmail',false);
          this.$toast.error(error.text).goAway(5000);
          this.contactUsModalVisible = false;
          this.form = {
            company: '',
            bin: '',
            category: '',
            min: '',
            max: '',
            comment: '',
            fullName: '',
            phone: '',
            email: '',
            agree: false
          };
        });
    }
  }
}
</script>
<style lang="scss">
@import '/assets/scss/main.scss';
</style>
