<template>
  <div class="bg">
    <div class="login-main">
      <div class="login-logo">
        <img src="/logo.svg" width="100%" alt="logo">
      </div>
      <div class="login-title">Войдите в систему</div>
      <div class="login-input">
        <input type="text" placeholder="Введите логин" v-model="login" ref="login" maxlength="50" @keyup.enter="auth" autocomplete="off">
      </div>
      <div class="login-input-password">
        <input :type="show ? 'text' : 'password'" placeholder="Введите пароль" v-model="password" ref="password" maxlength="50" @keyup.enter="auth" autocomplete="off">
        <div class="login-input-password-option" :class="{'login-input-password-hide':!show}" @click="show = !show"></div>
      </div>
      <NuxtLink to="/reset">
        <div class="login-forgot">Не помню пароль</div>
      </NuxtLink>
      <div class="login-input-checkbox" @click="$store.commit('localStorage/toggleTerms');" onselectstart="return false;">
        <div class="login-input-checkbox-icon" :class="{'login-input-checkbox-icon-checked':terms}"></div>
        <div class="login-input-checkbox-title">Я принимаю условия <NuxtLink :to="{ name: 'terms-of-use' }" style="display: contents; font-weight: bold;" @click.stop target="_blank">пользовательского соглашения</NuxtLink> и даю согласие на обработку моих персональных данных</div>
      </div>
      <div class="login-input-checkbox" @click="$store.commit('localStorage/toggleRules');" onselectstart="return false;">
        <div class="login-input-checkbox-icon" :class="{'login-input-checkbox-icon-checked':rules}"></div>
        <div class="login-input-checkbox-title">Я ознакомлен с общими <NuxtLink :to="{ name: 'rules' }" style="display: contents; font-weight: bold;" @click.stop target="_blank">правилами торгового центра</NuxtLink></div>
      </div>
      <div class="login-btn">
        <button @click="auth" v-if="terms && rules">Войти</button>
        <button v-else style="opacity: .2">Войти</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: '',
      password: '',
      show: false,
    }
  },
  computed: {
    terms() {
      return this.$store.state.localStorage.terms;
    },
    rules() {
      return this.$store.state.localStorage.rules;
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
      if (this.terms && this.rules) {
        let auth  = this.$toast.show('Авторизация...');
        const res = await this.$store.dispatch('localStorage/auth', {
          login: this.login.trim(),
          password: this.password.trim()
        });
        auth.goAway(0);
        if (res) {
          await this.$router.push('invoice');
        } else {
          this.$toast.error('Не правильный логин или пароль').goAway(2000);
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
