<template>
  <div class="login-main">
    <div class="login-logo">
      <img src="/logo.svg" width="100%" alt="logo">
    </div>
    <div class="login-title">Войдите в систему</div>
    <div class="login-input">
      <input type="text" placeholder="Введите e-mail или телефон" v-model="login" ref="login" maxlength="50">
    </div>
    <div class="login-input-password">
      <input :type="show ? 'text' : 'password'" placeholder="Введите пароль" v-model="password" ref="password" maxlength="50">
      <div class="login-input-password-option" :class="{'login-input-password-hide':!show}" @click="show = !show"></div>
    </div>
    <NuxtLink to="/reset">
      <div class="login-forgot">Не помню пароль</div>
    </NuxtLink>
    <div class="login-btn">
      <button @click="auth">Войти</button>
    </div>
    <NuxtLink to="/register">
      <div class="login-remembered">Регистрация</div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: '',
      password: 'adminpassword',
      show: false
    }
  },
  methods: {
    validate: function() {

    },
    auth: async function () {
      if (this.login.trim() === '') {
        return this.$refs.login.focus();
      } else if (this.password.trim() === '') {
        return this.$refs.password.focus();
      }
      let auth  = this.$toast.show('Авторизация...');
      const res = await this.$store.dispatch('localStorage/auth', {
        login: this.login.trim(),
        password: this.password.trim()
      });
      auth.goAway(0);
      if (res) {
        await this.$router.replace({path: '/dashboard'});
      } else {
        this.$toast.error('Не правильный логин иили пароль').goAway(2000);
      }
    }
  }
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
