<template>
  <div class="top-main">
    <div class="top-main-left">
      <div class="top-main-left-logo">
        <NuxtLink to="/">
          <img src="~/assets/img/carcity-logo.png" alt="">
        </NuxtLink>
      </div>
      <div class="top-main-left-list" onselectstart="return false;">
<!--        <div class="top-main-left-list-item">Инфраструктура</div>-->
      </div>
    </div>
    <div class="top-main-right" v-show="!user">
      <div class="top-main-right-login">
        <NuxtLink to="/login">
          <button class="top-main-right-login-btn">Войти</button>
        </NuxtLink>
        <NuxtLink :to="{ name: 'reset' }" class="top-main-right-login-title">
          <div>Забыли пароль</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopMain",
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    }
  }
}
</script>

<style lang="scss">
.top-main {
  height: 80px;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 0 2px 1px rgb(0 0 0 / 5%);
  overflow: hidden;
  background: #fff;
  margin: 0 20px 20px 20px;
  display: flex;
  align-items: center;
  &-left {
    margin: 0 0 0 30px;
    display: flex;
    gap: 30px;
    &-list {
      display: flex;
      align-items: center;
      gap: 20px;
      &-item {
        font-size: 14px;
        cursor: pointer;
        border-bottom: 1px solid #f4f4f4;
        color: #8C8C8C;
        &:hover {
          color: #274985;
          border-color: #274985;
        }
      }
    }
  }
  &-right {
    flex: 1;
    margin-right: 30px;
    &-login {
      display: flex;
      flex-direction: column;
      margin-left: auto;
      width: max-content;
      gap: 5px;
      &-btn {
        background: #274985;
        color: #fff;
        border: none;
        border-radius: 5px;
        height: 35px;
        font-size: 12px;
        min-width: 120px;
      }
      &-title {
        font-size: 10px;
        color: #8C8C8C;
        margin:0 auto 0 auto;
        cursor: pointer;
        text-decoration: none;
        border-bottom: 1px solid transparent;
        &:hover {
          color: #274985;
          border-color: #274985;
        }
      }
    }
  }
}
</style>
