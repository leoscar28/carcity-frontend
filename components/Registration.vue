<template>
  <div class="bg">
    <div class="login-main">
      <div class="login-logo">
        <img src="/logo.svg" width="100%" alt="logo">
      </div>

        <div class="login-title">Регистрация</div>
        <div class="login-input">
          <input type="text" placeholder="Введите email" v-model="email" ref="login" maxlength="50" @keyup.enter="auth" autocomplete="off" :class="{'is-error':email.length && !validEmail}">
        </div>
        <div class="login-input">
          <input type="text" placeholder="Введите телефон" v-model="phone" ref="phone" v-mask="'+7 (###) ###-####'"  maxlength="50" @keyup.enter="auth" autocomplete="off" :class="{'is-error':phone.length && !validPhone}">
        </div>
        <div class="login-input-password">
          <input :type="show ? 'text' : 'password'" placeholder="Введите пароль" v-model="password" ref="password" maxlength="50" @keyup.enter="auth" autocomplete="off">
          <div class="login-input-password-option" :class="{'login-input-password-hide':!show}" @click="show = !show"></div>
        </div>
        <div class="login-input-password">
          <input :type="show ? 'text' : 'password'" placeholder="Введите повтор пароля" v-model="passwordRepeat" ref="passwordRepeat" maxlength="50" @keyup.enter="auth" autocomplete="off">
          <div class="login-input-password-option" :class="{'login-input-password-hide':!show}" @click="show = !show"></div>
        </div>
        <div class="login-btn">
          <button @click="auth" :disabled="!dataIsValid" :style="{opacity:!dataIsValid ? 0.2 : 1}">Зарегистрироваться</button>
        </div>
    </div>
  </div>
</template>

<script>
  import {mask} from 'vue-the-mask'
export default {
  name: "Login",
  directives:{mask},
  data() {
    return {
      email: '',
      phone: '',
      password: '',
      passwordRepeat: '',
      show: false,
      enterCode: false
    }
  },
  computed: {
    dataIsValid() {
      return this.validEmail && this.validPhone && this.password && this.passwordRepeat && this.password === this.passwordRepeat;
    },
    validEmail() {
      return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email));
    },
    validPhone() {
      return this.phone.length === 17;
    },
  },
  methods: {

    auth: async function () {
      if (this.email.trim() === '') {
        return this.$refs.login.focus();
      } else if (this.phone.trim() === '') {
        return this.$refs.phone.focus();
      } else if (this.password.trim() === '') {
        return this.$refs.password.focus();
      } else if (this.passwordRepeat.trim() === '') {
        return this.$refs.passwordRepeat.focus();
      }

      let auth  = this.$toast.show('Регистрация...');
      const res = await this.$store.dispatch('localStorage/registration', {
        email: this.email.trim(),
        phone: this.phone.trim(),
        password: this.password.trim()
      });
      auth.goAway(0);
      if (!res.hasOwnProperty('message')) {
        await this.$router.push('/registration/verify');
      } else {
        this.$toast.error(res.message).goAway(2000);
      }
    }
  }
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
