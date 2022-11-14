<template>
  <div class="profile-section-main-left">
    <div class="profile-section-main-left-icon">
      <div>{{user.name[0]}}</div>
    </div>
    <div class="profile-section-main-left-menu">
      <NuxtLink to="/profile">
        <div class="profile-section-main-left-menu-item" :class="{'profile-section-main-left-menu-item-sel':($nuxt.$route.name === 'profile')}">Профиль</div>
      </NuxtLink>
      <NuxtLink to="/profile/password">
        <div class="profile-section-main-left-menu-item" :class="{'profile-section-main-left-menu-item-sel':($nuxt.$route.name === 'password')}">{{ language[current][0] }}</div>
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
    },
    current() {
      return this.$store.state.localStorage.current;
    },
  },
  data(){
    return {
      language: [
        [
          'Сменить пароль',
        ],
        [
          'Құпия сөзді өзгерту',
        ],
      ]
    }
  },
}
</script>

<style scoped>

</style>
