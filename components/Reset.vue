<template>
  <div class="bg">
    <div class="login-main">
      <div class="login-logo">
        <NuxtLink to="/"><img src="/logo.svg" width="100%" alt="logo"></NuxtLink>
      </div>
      <div class="login-title">{{ language[current][0] }}</div>
<!--      <div class="login-title">Введите e-mail или номер телефона который был привязан к аккаунту</div>
      <div class="login-btn">
        <button style="opacity: 0.2;">Сбросить по эл.почте</button>
      </div>-->
      <NuxtLink to="/forgot">
        <div class="login-btn">
          <button>{{ language[current][1] }}</button>
        </div>
      </NuxtLink>
      <NuxtLink to="/login">
        <div class="login-remembered">{{ language[current][2] }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reset",
  data() {
    return {
      language: [
        [
          'Введите номер телефона который был привязан к аккаунту',
          'Сбросить по номеру телефона',
          'Я вспомнил пароль'
        ],
        [
          'Тіркелгіге байланысты телефон нөмірін енгізіңіз',
          'Телефон нөмірі бойынша қалпына келтіру',
          'Мен құпия сөзді есіме түсірдім'
        ],
      ],
    }
  },
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    }
  }
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
