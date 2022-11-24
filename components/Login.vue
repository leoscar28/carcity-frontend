<template>
  <div class="bg">
    <div class="login-main">
      <div class="login-logo">
        <NuxtLink to="/"><img src="/logo.svg" width="100%" alt="logo"></NuxtLink>
      </div>
      <div class="login-title">{{ language[current][0] }}</div>
      <div class="login-input">
        <input type="text" :placeholder="language[current][1]" v-model="login" ref="login" maxlength="50" @keyup.enter="auth" autocomplete="off">
      </div>
      <div class="login-input-password">
        <input :type="show ? 'text' : 'password'" :placeholder="language[current][2]" v-model="password" ref="password" maxlength="50" @keyup.enter="auth" autocomplete="off">
        <div class="login-input-password-option" :class="{'login-input-password-hide':!show}" @click="show = !show"></div>
      </div>
      <NuxtLink to="/reset">
        <div class="login-forgot">{{ language[current][3] }}</div>
      </NuxtLink>
      <div class="login-input-checkbox" @click="$store.commit('localStorage/toggleTerms')" onselectstart="return false;">
        <div class="login-input-checkbox-icon" :class="{'login-input-checkbox-icon-checked':terms}"></div>
        <div class="login-input-checkbox-title">{{ language[current][4] }} <NuxtLink :to="{ name: 'terms-of-use' }" style="display: contents; font-weight: bold;" @click.stop target="_blank">{{ language[current][7] }}</NuxtLink> {{ language[current][12] }} {{ language[current][8] }}</div>
      </div>
      <div class="login-input-checkbox" @click="$store.commit('localStorage/toggleRules')" onselectstart="return false;">
        <div class="login-input-checkbox-icon" :class="{'login-input-checkbox-icon-checked':rules}"></div>
        <div class="login-input-checkbox-title">{{ language[current][5] }} <NuxtLink :to="{ name: 'rules' }" style="display: contents; font-weight: bold;" @click.stop target="_blank">{{ language[current][9] }} </NuxtLink>{{ language[current][13] }}</div>
      </div>
      <div class="login-input-checkbox" @click="$store.commit('localStorage/toggleRulesAd')" onselectstart="return false;">
        <div class="login-input-checkbox-icon" :class="{'login-input-checkbox-icon-checked':rulesAd}"></div>
        <div class="login-input-checkbox-title">{{ language[current][6] }} <NuxtLink :to="{ name: 'rules-ad' }" style="display: contents; font-weight: bold;" @click.stop target="_blank">{{ language[current][10] }} </NuxtLink>{{ language[current][13] }}</div>
      </div>
      <div class="login-btn">
        <button @click="auth" v-if="terms && rules">{{ language[current][11] }}</button>
        <button v-else style="opacity: .2">{{ language[current][11] }}</button>
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
      language: [
        [
          'Войдите в систему',
          'Введите логин',
          'Введите пароль',
          'Не помню пароль',
          'Я принимаю условия',
          'Я ознакомлен с общими',
          'Я ознакомлен с',
          'пользовательского соглашения',
          'и даю согласие на обработку моих персональных данных',
          'правилами торгового центра',
          'правилами размещения объявлений',
          'Войти',
          '',
          ''
        ],
        [
          'Жүйеге кіріңіз',
          'Логин енгізіңіз',
          'Құпиясөз енгізіңіз',
          'Құпиясөз есімде жоқ',
          'Мен',
          'Мен',
          'Мен',
          'пайдаланушы келісімі',
          'және мен жеке деректерімді өңдеуге келісім беремін',
          'сауда орталығының ережелерімен',
          'хабарландыруларды орналастыру ережелерімен',
          'Кіру',
          'шарттарын қабылдаймын',
          'таныспын',
        ],
      ]
    }
  },
  computed: {
    terms() {
      return this.$store.state.localStorage.terms;
    },
    rules() {
      return this.$store.state.localStorage.rules;
    },
    rulesAd() {
      return this.$store.state.localStorage.rulesAd;
    },
    user() {
      return this.$store.state.localStorage.user
    },
    current() {
      return this.$store.state.localStorage.current;
    },
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
          if (this.user.role_id === 5) {
            await this.$router.push('/');
          } else {
            await this.$router.push('/invoice');
          }
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
