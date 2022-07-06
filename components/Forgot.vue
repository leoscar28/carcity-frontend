<template>
  <div class="bg">
    <div class="login-main">
      <div class="login-logo">
        <img src="/logo.svg" width="100%" alt="logo">
      </div>
      <template v-if="$route.query.type && $route.query.type === 'email'">
        <div class="login-title">Введите e-mail который был привязан к аккаунту</div>
        <div class="login-input">
          <input type="text" placeholder="E-mail">
        </div>
        <div class="login-btn">
          <button>Отправить запрос</button>
        </div>
      </template>
      <template v-else>
        <div class="login-title">Введите номер телефона который был привязан к аккаунту</div>
        <div class="login-input">
          <input type="tel" v-mask="'###-###-##-##'" placeholder="___-___-__-__" ref="phone" v-model="phone" :readonly="!status">
        </div>
        <div class="login-btn">
          <button @click="restore">Отправить запрос</button>
        </div>
      </template>
      <NuxtLink to="/login">
        <div class="login-remembered">Я вспомнил пароль</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'
export default {
  name: "Forgot",
  directives: {mask},
  data() {
    return {
      phone: '',
      status: true,
    }
  },
  methods: {
    async restore() {
      if (this.status) {
        if (this.phone.length !== 13) {
          return this.$refs.phone.focus();
        }
        this.status = false;
        let phone = this.phone.replace(/\D/g, '');
        let res = await this.$store.dispatch('localStorage/restore', phone);
        this.status = true;
        if (res.hasOwnProperty('message')) {
          this.phone  = '';
          this.$toast.error(res.message).goAway(2000);
          return this.$refs.phone.focus();
        } else {
          this.phone  = '';
          this.$store.commit('localStorage/setRestoreUser',res);
          await this.$router.push('verify');
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
