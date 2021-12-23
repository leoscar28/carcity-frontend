<template>
  <div class="login-main">
    <div class="login-logo">
      <img src="/logo.svg" width="100%" alt="logo">
    </div>
    <div class="login-title">Восстановление пароля</div>
    <div class="login-input-password">
      <input type="password" placeholder="Введите новый пароль">
      <div class="login-input-password-option login-input-password-hide"></div>
    </div>
    <div class="login-input-password">
      <input type="password" placeholder="Повторите пароль">
      <div class="login-input-password-option login-input-password-hide"></div>
    </div>
    <div class="login-btn">
      <button>Восстановить пароль</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Restore"
}
</script>

<style lang="scss">
  @import "assets/Login.scss";
</style>
