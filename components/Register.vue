<template>
  <div class="login-main">
    <div class="login-logo">
      <img src="/logo.svg" width="100%" alt="logo">
    </div>
    <template v-if="start === 0">
      <div class="login-title">Регистрация <span>шаг 1</span></div>
      <div class="login-input login-input-switch" ref="phone">
        <masked-input v-model="phone" mask="\+\7 (111) 111-11-11" placeholder="Номер телефона" v-if="type" type="tel"/>
        <input type="text" placeholder="Эл.почта" v-model="email" ref="email" v-else>
        <div class="login-input-switch-btn">
          <div class="login-input-switch-btn-line" :class="type?'login-input-switch-btn-phone':'login-input-switch-btn-email'" @click="type = !type">
            <div class="login-input-switch-btn-icon"></div>
          </div>
        </div>
      </div>
      <div class="login-input-password">
        <input :type="show ? 'text' : 'password'" placeholder="Пароль" v-model="password" ref="password">
        <div class="login-input-password-option" :class="{'login-input-password-hide':!show}" @click="show = !show"></div>
      </div>
      <div class="login-btn">
        <button @click="next">Далее</button>
      </div>
    </template>
    <template v-else>
      <div class="login-title">Регистрация <span>шаг 2</span></div>
      <div class="login-input">
        <input type="text" placeholder="Ваше имя" v-model="name" ref="name">
      </div>
      <div class="login-input">
        <input type="text" placeholder="Ваше фамилия" v-model="surname" ref="surname">
      </div>
      <div class="login-input-date">
        <div class="login-input-date-title">Дата рождения</div>
        <div class="login-input-date-list">
          <div class="login-input-date-item login-input-date-day">
            <div class="login-input-date-list-title" @click.stop="dayShow = !dayShow">
              <span>{{day}}</span>
              <div class="login-input-date-list-arrow"></div>
            </div>
            <div class="login-input-date-list-dropdown" v-show="dayShow" @mousedown.stop>
              <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
                <div style="overflow: hidden">
                  <div class="login-input-date-list-dropdown-item" v-for="(n,index) in 31" :key="index" @click="day = n; dayShow = false">{{n}}</div>
                </div>
              </vue-custom-scrollbar>
            </div>
          </div>
          <div class="login-input-date-item login-input-date-month">
            <div class="login-input-date-list-title" @click.stop="monthShow = !monthShow">
              <span>{{month_list[month]}}</span>
              <div class="login-input-date-list-arrow"></div>
            </div>
            <div class="login-input-date-list-dropdown" v-show="monthShow" @mousedown.stop>
              <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
                <div style="overflow: hidden">
                  <div class="login-input-date-list-dropdown-item" v-for="(n,index) in month_list" :key="index" @click="month = index; monthShow = false">{{n}}</div>
                </div>
              </vue-custom-scrollbar>
            </div>
          </div>
          <div class="login-input-date-item login-input-date-year">
            <div class="login-input-date-list-title" @click.stop="yearShow = !yearShow">
              <span>{{ year }}</span>
              <div class="login-input-date-list-arrow"></div>
            </div>
            <div class="login-input-date-list-dropdown" v-show="yearShow" @mousedown.stop>
              <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
                <div style="overflow: hidden">
                  <div class="login-input-date-list-dropdown-item" v-for="(n,index) in years" :key="index" @click="year = n; yearShow = false">{{n}}</div>
                </div>
              </vue-custom-scrollbar>
            </div>
          </div>
        </div>
      </div>
      <div class="login-btn login-btn-double">
        <button @click="prev">Назад</button>
        <button @click="finish">Завершить</button>
      </div>
    </template>
    <NuxtLink to="/">
      <div class="login-remembered">Войти</div>
    </NuxtLink>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import Request from "@/components/modal/Request";
import MaskedInput from 'vue-masked-input'
export default {
  name: "Register",
  components: {Request,vueCustomScrollbar,MaskedInput},
  created: function() {
    window.addEventListener('mousedown',this.hideDropdown);
  },
  destroyed: function() {
    window.removeEventListener('mousedown', this.hideDropdown);
  },
  computed : {
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1950}, (value, index) => 1951 + index)
    }
  },
  data() {
    return {
      show: false,
      type: true,
      phone: '',
      email: '',
      password: '',
      name: '',
      surname: '',
      last_name: '',
      start: 0,
      dayShow: false,
      monthShow: false,
      yearShow: false,
      day: 1,
      month: 0,
      year: 2000,
      month_list: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
    }
  },
  methods: {
    async next() {
      if (this.type && this.phone.replace(/[^0-9]/g, '').length !== 11) {
        return this.$refs.phone.firstChild.focus();
      } else if (!this.type && this.email.trim() === '') {
        return this.$refs.email.focus();
      } else if (this.password.trim() === '') {
        return this.$refs.password.focus();
      }
      let data  = {
        password: this.password.trim()
      };
      if (this.type) {
        data.phone  = this.phone.replace(/[^0-9]/g, '').trim();
      } else {
        data.email  = this.email.trim();
      }
      const res = await this.$store.dispatch('localStorage/next', data);
      if (res.hasOwnProperty('errors')) {
        for (const [key, value] of Object.entries(res.errors)) {
          this.$toast.error(`${value}`).goAway(2000);
        }
      } else {
        this.start++;
      }
    },
    prev() {
      this.start  = 0;
    },
    hideDropdown() {
      this.dayShow  = false;
      this.monthShow  = false;
      this.yearShow = false;
    },
    async finish() {
      if (this.name.trim() === '') {
        return this.$refs.name.focus();
      } else if (this.surname.trim() === '') {
        return this.$refs.surname.focus();
      }
      let data  = {
        password: this.password.trim(),
        name: this.name.trim(),
        surname: this.surname.trim(),
        birthdate: this.year+'-'+(this.month+1)+'-'+this.day
      };
      if (this.type) {
        data.phone  = this.phone.replace(/[^0-9]/g, '').trim();
      } else {
        data.email  = this.email.trim();
      }
      const res = await this.$store.dispatch('localStorage/finish', data);
      if (res.hasOwnProperty('errors')) {
        for (const [key, value] of Object.entries(res.errors)) {
          this.$toast.error(`${value}`).goAway(2000);
        }
      } else {
        await this.$router.replace({path: '/dashboard'});
      }
    }
  }
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
