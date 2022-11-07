<template>
  <footer class="footer" :class="{'footer--dark': dark}" id="footer">
    <div class="container" v-if="$route.name !== 'renters'">
      <div class="row">
        <div class="col-lg-4 mb-3 mb-lg-0">
          <a class="footer__logo" href="#">
            <img :src="require(dark ? '~/assets/img/carcity-logo-white.png' : '~/assets/img/carcity-logo.png')" width="124" height="38" alt="">
          </a>
          <a class="footer__phone" :href="'tel:'+phone.phone" v-for="(phone,key) in contact" :key="key">
            <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 13.42V16.956C18.0001 17.2092 17.9042 17.453 17.7316 17.6382C17.559 17.8234 17.3226 17.9363 17.07 17.954C16.633 17.984 16.276 18 16 18C7.163 18 0 10.837 0 2C0 1.724 0.015 1.367 0.046 0.93C0.0637224 0.677444 0.176581 0.441011 0.361804 0.268409C0.547026 0.0958068 0.790823 -0.000114433 1.044 2.56579e-07H4.58C4.70404 -0.000125334 4.8237 0.045859 4.91573 0.12902C5.00776 0.212182 5.0656 0.326583 5.078 0.45C5.101 0.68 5.122 0.863 5.142 1.002C5.34073 2.38892 5.748 3.73783 6.35 5.003C6.445 5.203 6.383 5.442 6.203 5.57L4.045 7.112C5.36445 10.1865 7.81455 12.6365 10.889 13.956L12.429 11.802C12.4919 11.714 12.5838 11.6509 12.6885 11.6237C12.7932 11.5964 12.9042 11.6068 13.002 11.653C14.267 12.2539 15.6156 12.6601 17.002 12.858C17.141 12.878 17.324 12.9 17.552 12.922C17.6752 12.9346 17.7894 12.9926 17.8724 13.0846C17.9553 13.1766 18.0012 13.2961 18.001 13.42H18Z"
                fill="currentColor"
              />
            </svg>
            {{phone.phone}}
          </a>
        </div>

        <div class="w-100 d-lg-none" />

        <div class="col-lg-4 col-md-6">
          <ul class="footer__nav">
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'terms-of-use' }">
                {{language[current][0]}}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'privacy-policy' }">
                {{language[current][1]}}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'rules-shopping-center' }">
                {{language[current][2]}}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'rules-ad' }">
                {{language[current][3]}}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-6">
          <ul class="footer__nav">
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'index', hash: '#about' }">
                {{language[current][4]}}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'index', hash: '#infrastructure' }">
                {{language[current][5]}}
              </NuxtLink>
            </li>
              <li>
                <a href="javascript:void(0)" @click="$store.commit('localStorage/setFeedbackRequestModal', true)" class="footer__nav-link" >
                  {{language[current][22]}}
                </a>
              </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <template v-if="!status">
        <div class="row">
          <div class="col-12">
            <a class="footer__logo" href="#">
              <img :src="require(dark ? '~/assets/img/carcity-logo-white.png' : '~/assets/img/carcity-logo.png')" width="124" height="38" alt="">
            </a>
          </div>
          <div class="col-12 mt-2">
            <h6>{{language[current][23]}}</h6>
          </div>
        </div>
        <form ref="form" @submit.prevent>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <label for="form-company-input" class="form-label">{{language[current][7]}}</label>
                <input id="form-company-input" type="text" class="form-control bg-transparent" v-model="form.company" ref="form_company" :placeholder="language[current][6]">
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label for="form-min-input" class="form-label">{{language[current][8]}}</label>
                    <input id="form-min-input" type="text" class="form-control bg-transparent" ref="form_min" name="min" v-model="form.min" :placeholder="language[current][9]">
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="form-max-input" class="form-label bg-transparent" style="opacity: 0">-</label>
                    <input id="form-max-input" type="text" class="form-control bg-transparent" ref="form_max" name="max" v-model="form.max" :placeholder="language[current][10]">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="form-category-input" class="form-label">{{language[current][11]}}</label>
                <input id="form-category-input" type="text" class="form-control bg-transparent" ref="form_category" name="category" v-model="form.category" :placeholder="language[current][12]">
              </div>
              <div class="mb-3">
                <label for="form-name-input" class="form-label">{{language[current][14]}}</label>
                <input id="form-name-input" type="text" class="form-control bg-transparent" ref="form_name" name="fullName" v-model="form.fullName" :placeholder="language[current][13]">
              </div>
              <div class="mb-3">
                <label for="form-phone-input" class="form-label">{{language[current][15]}}</label>
                <input id="form-phone-input" type="text" class="form-control bg-transparent" ref="form_phone" name="phone" v-model="form.phone" :placeholder="language[current][16]">
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <label for="form-bin-input" class="form-label">БИН/ИИН</label>
                <input id="form-bin-input" type="text" class="form-control bg-transparent" ref="form_bin" name="bin" v-model="form.bin" :placeholder="language[current][17]">
              </div>
              <div class="mb-3">
                <label for="form-email-input" class="form-label">Email</label>
                <input id="form-email-input" type="text" class="form-control bg-transparent" ref="form_email" name="email" v-model="form.email" :placeholder="language[current][18]">
              </div>
              <div class="mb-3">
                <label for="form-comment-input" class="form-label">{{language[current][20]}}</label>
                <textarea id="form-comment-input" type="text" class="form-control" ref="form_comment" rows="8" name="comment" v-model="form.comment" :placeholder="language[current][19]"/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <div class="form-check" onselectstart="return false;">
                  <input id="footer-accept-privacy-policy" class="form-check-input" type="checkbox" v-model="form.check">
                  <label class="form-check-label" for="footer-accept-privacy-policy">
                    <template v-if="current === 1">
                      Мен <a href="/terms-of-use" target="_blank" class="text-decoration-none text-warning">пайдаланушы келісімінің</a> және <a href="/privacy-policy" target="_blank" class="text-decoration-none text-warning">құпиялылық саясатының</a> шарттарын қабылдаймын
                    </template>
                    <template v-else>
                      Я принимаю условия <a href="/terms-of-use" target="_blank" class="text-decoration-none text-warning">пользовательского соглашения</a> и <a href="/privacy-policy" target="_blank" class="text-decoration-none text-warning">политики конфиденциальности</a>
                    </template>
                  </label>
                </div>
              </div>
            </div>
            <div class="col-12">
              <button class="btn footer-btn" @click="send" :style="[!form.check?{'opacity':'.2'}:{}]">
                {{language[current][21]}}
              </button>
            </div>
          </div>
        </form>
      </template>
      <template v-else>
        <div class="row d-flex justify-content-center my-5" style="gap: 35px">
          <div class="col-auto">
            <img :src="require(dark ? '~/assets/img/carcity-logo-white.png' : '~/assets/img/carcity-logo.png')" width="124" height="38" alt="">
          </div>
          <div class="col-12 mt-2">
            <h6 class="text-center">Ваша заявка обрабатывается</h6>
          </div>
          <div class="col-auto">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </template>

      <div class="row mt-4">
        <div class="col-12 footer-border pt-3 d-block d-md-flex align-content-center justify-content-center" style="gap: 15px;">
          <a class="footer__phone" :href="'tel:'+phone.phone" v-for="(phone,key) in contact" :key="key">
            <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 13.42V16.956C18.0001 17.2092 17.9042 17.453 17.7316 17.6382C17.559 17.8234 17.3226 17.9363 17.07 17.954C16.633 17.984 16.276 18 16 18C7.163 18 0 10.837 0 2C0 1.724 0.015 1.367 0.046 0.93C0.0637224 0.677444 0.176581 0.441011 0.361804 0.268409C0.547026 0.0958068 0.790823 -0.000114433 1.044 2.56579e-07H4.58C4.70404 -0.000125334 4.8237 0.045859 4.91573 0.12902C5.00776 0.212182 5.0656 0.326583 5.078 0.45C5.101 0.68 5.122 0.863 5.142 1.002C5.34073 2.38892 5.748 3.73783 6.35 5.003C6.445 5.203 6.383 5.442 6.203 5.57L4.045 7.112C5.36445 10.1865 7.81455 12.6365 10.889 13.956L12.429 11.802C12.4919 11.714 12.5838 11.6509 12.6885 11.6237C12.7932 11.5964 12.9042 11.6068 13.002 11.653C14.267 12.2539 15.6156 12.6601 17.002 12.858C17.141 12.878 17.324 12.9 17.552 12.922C17.6752 12.9346 17.7894 12.9926 17.8724 13.0846C17.9553 13.1766 18.0012 13.2961 18.001 13.42H18Z"
                fill="currentColor"
              />
            </svg>
            {{phone.phone}}
          </a>
          <div class="d-block d-md-flex align-content-center justify-content-center" style="gap: 15px;">
            <NuxtLink class="footer__nav-link" :to="{ name: 'terms-of-use' }">
              {{language[current][0]}}
            </NuxtLink>
            <NuxtLink class="footer__nav-link" :to="{ name: 'privacy-policy' }">
              {{language[current][1]}}
            </NuxtLink>
            <NuxtLink class="footer__nav-link" :to="{ name: 'rules-shopping-center' }">
              {{language[current][2]}}
            </NuxtLink>
            <NuxtLink class="footer__nav-link" :to="{ name: 'rules-ad' }">
              {{language[current][3]}}
            </NuxtLink>
          </div>
        </div>
      </div>


    </div>
  </footer>
</template>

<script>
import emailjs from "@emailjs/browser";

export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    comm: {
      type: String,
      default: ''
    }
  },
  watch: {
    comm: function() {
      if (this.comm !== '') {
        this.form.comment = this.comm;
        this.send();
      }
    }
  },
  data() {
    return {
      status: false,
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
        check: false
      },
      language: [
        [
          'Пользовательское соглашение','Политика конфеденциальности','Правила ТЦ','Правила размещения объявлений','О нас',
          'Инфраструктура','Введите наименование','Наименование ТОО/ИП','Требуемая площадь помещения','Минимальная',
          'Максимальная','Категория товара или услуги','Введите категорию товара или услуги','Введите контактное лицо','Контактное лицо',
          'Телефон для связи','Введите телефон','Введите БИН/ИИН','Введите email','Введите комментарии',
          'Другие условия для работы/комментарии','Отправить', 'Служба поддержки', 'Оставьте заявку'
        ],
        [
          'Пайдаланушылық келісім','Құпиялылық саясаты','СО ережелері','Жарнама беру ережелери','Бiз туралы',
          'Инфрақұрылым','Атауды енгізіңіз','ЖШС/ЖК атауы','Бөлменің қажетті аумағы','Ең аз',
          'Ең үлкен','Тауарлар мен қызметтердің санаты','Тауардың немесе қызметтің санатын енгізіңіз','Байланыстағы адамды енгізіңіз','Байланыс тұлғасы',
          'Байланыс телефоны','Телефонды енгізіңіз','БСН/ЖСН енгізіңіз','Электрондық поштаны енгізіңіз','Пікірлерді енгізіңіз',
          'Басқа жұмыс шарттары/пікірлер','Жіберу', 'Қолдау қызметі', 'Өтініш қалдырыңыз']
      ]
    }
  },
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    },
    contact() {
      return this.$store.state.localStorage.contact;
    }
  },
  methods: {
    send() {
      let form  = this.form;
      let refs  = this.$refs;
      if (!form.check || this.status) {
        return;
      }
      if (form.company.trim() === '') {
        return refs.form_company.focus();
      } else if (form.bin.trim() === '') {
        return refs.form_bin.focus();
      } else if (form.category.trim() === '') {
        return refs.form_category.focus();
      } else if (form.min.trim() === '') {
        return refs.form_min.focus();
      } else if (form.max.trim() === '') {
        return refs.form_max.focus();
      } else if (form.comment.trim() === '') {
        return refs.form_comment.focus();
      } else if (form.fullName.trim() === '') {
        return refs.form_name.focus();
      } else if (form.phone.trim() === '') {
        return refs.form_phone.focus();
      }
      this.status = true;

      emailjs.sendForm('service_7nc0w02', 'template_ul937oe', refs.form,  '2jmpXPP8YiXuqFWZE')
        .then((result) => {
          this.status = false;
          this.$toast.show('Ваша заявка отправлена!').goAway(5000);
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
            check: false
          };
        }, (error) => {
          this.$toast.error(error.text).goAway(5000);
          this.status = false;
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
            check: false
          };
        });

    }
  }
}
</script>
<style lang="scss">
  .footer-btn {
    background: #fff !important;
    border-radius: 50px;
  }
  .footer-border {
    border-top: 1px solid white;
  }
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff !important;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent !important;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
