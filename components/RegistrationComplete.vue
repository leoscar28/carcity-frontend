<template>
  <div class="bg">
    <div class="login-main">
      <div class="login-logo">
        <NuxtLink to="/"><img src="/logo.svg" width="100%" alt="logo"></NuxtLink>
      </div>

        <div class="login-title">{{ language[current][0] }}</div>

        <div class="login-btn">
          <button @click="home" >На главную</button>
        </div>
    </div>
  </div>
</template>

<script>
  import {mask} from 'vue-the-mask'
export default {
  name: "Login",
  middleware: ['auth','verified'],
  directives:{mask},
  data() {
    return {
      show: false,
      enterCode: false,
      language: [
        [
          'Регистрация завершена',
          'Спасибо большое',
          'На главную'
        ],
        [
          'Регистрация завершена',
          'Спасибо большое',
          'На главную'
        ],
      ]
    }
  },
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    },
  },
  methods: {

    home: async function () {
      await this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
