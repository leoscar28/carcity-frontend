<template>
  <div class="login-main">
    <div class="login-logo">
      <img src="/logo.svg" width="100%" alt="logo">
    </div>
    <template v-if="$route.query.type && $route.query.type === 'email'">
      <div class="login-title">Введите e-mail который был привязан к аккунту</div>
      <div class="login-input">
        <input type="text" placeholder="E-mail">
      </div>
      <div class="login-btn">
        <button>Отправить запрос</button>
      </div>
    </template>
    <template v-else>
      <div class="login-title">Введите номер телефона который был привязан к аккунту</div>
      <div class="login-input">
        <input type="text" placeholder="Номер телефон">
      </div>
      <div class="login-btn">
        <button>Отправить запрос</button>
      </div>
    </template>
    <NuxtLink to="/">
      <div class="login-remembered">Я вспомнил пароль</div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "Forgot"
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
