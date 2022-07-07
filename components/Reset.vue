<template>
  <div class="bg">
    <div class="login-main">
      <div class="login-logo">
        <NuxtLink to="/"><img src="/logo.svg" width="100%" alt="logo"></NuxtLink>
      </div>
      <div class="login-title">Введите номер телефона который был привязан к аккаунту</div>
<!--      <div class="login-title">Введите e-mail или номер телефона который был привязан к аккаунту</div>
      <div class="login-btn">
        <button style="opacity: 0.2;">Сбросить по эл.почте</button>
      </div>-->
      <NuxtLink to="/forgot">
        <div class="login-btn">
          <button>Сбросить по номеру телефона</button>
        </div>
      </NuxtLink>
      <NuxtLink to="/login">
        <div class="login-remembered">Я вспомнил пароль</div>
      </NuxtLink>
    </div>
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
