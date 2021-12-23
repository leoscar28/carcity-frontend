<template>
  <div class="login-main">
    <div class="login-logo">
      <img src="/logo.svg" width="100%" alt="logo">
    </div>
    <div class="login-title">Введите e-mail или номер телефона который был привязан к аккунту</div>
    <NuxtLink to="/forgot?type=email">
      <div class="login-btn">
        <button>Сбросить по эл.почте</button>
      </div>
    </NuxtLink>
    <NuxtLink to="/forgot">
      <div class="login-btn">
        <button>Сбросить по номеру телефона</button>
      </div>
    </NuxtLink>
    <NuxtLink to="/">
      <div class="login-remembered">Я вспомнил пароль</div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "Reset"
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
