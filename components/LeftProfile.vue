<template>
  <div class="profile-section-main-left">
    <div class="profile-section-main-left-icon">
      <div>{{user.name[0]}}</div>
    </div>
    <div class="profile-section-main-left-menu">
      <NuxtLink to="/profile">
        <div class="profile-section-main-left-menu-item" :class="{'profile-section-main-left-menu-item-sel':($nuxt.$route.name === 'profile')}">Профиль</div>
      </NuxtLink>
      <NuxtLink to="/password">
        <div class="profile-section-main-left-menu-item" :class="{'profile-section-main-left-menu-item-sel':($nuxt.$route.name === 'password')}">Сменить пароль</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftProfile",
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    }
  },
}
</script>

<style scoped>

</style>
