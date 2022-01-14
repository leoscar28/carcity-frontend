<template>
  <div class="profile-section-main-left">
    <div class="profile-section-main-left-icon"></div>
    <div class="profile-section-main-left-buttons">
      <div class="profile-section-main-left-button">
        <div class="profile-section-main-left-button-icon profile-section-main-left-button-icon-upload"></div>
      </div>
      <div class="profile-section-main-left-button">
        <div class="profile-section-main-left-button-icon profile-section-main-left-button-icon-gallery"></div>
      </div>
    </div>
    <div class="profile-section-main-left-menu">
      <NuxtLink to="/profile">
        <div class="profile-section-main-left-menu-item" :class="{'profile-section-main-left-menu-item-sel':($nuxt.$route.name === 'profile')}">Профиль</div>
      </NuxtLink>
      <NuxtLink to="/password">
        <div class="profile-section-main-left-menu-item" :class="{'profile-section-main-left-menu-item-sel':($nuxt.$route.name === 'password')}">Сменить пароль</div>
      </NuxtLink>
    </div>
    <images></images>
  </div>
</template>

<script>
import Images from "@/components/modal/Images";
export default {
  name: "LeftProfile",
  components: {Images}
}
</script>

<style scoped>

</style>
