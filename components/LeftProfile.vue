<template>
  <div class="profile-section-main-left">
    <div class="profile-section-main-left-icon" v-if="user.image_id" :style="{'background-image':'url('+user.image_id.src+')'}"></div>
    <div class="profile-section-main-left-icon" v-else>
      <div>{{user.name[0]}}</div>
    </div>
    <div class="profile-section-main-left-buttons">
      <div class="profile-section-main-left-button" @click="show  = true; status = false">
        <div class="profile-section-main-left-button-icon profile-section-main-left-button-icon-upload"></div>
      </div>
      <div class="profile-section-main-left-button" @click="show  = true; status = true">
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
    <images :show="show" :status="status" @showChange="showChange" @statusChange="statusChange"></images>
  </div>
</template>

<script>
import Images from "@/components/modal/Images";
export default {
  name: "LeftProfile",
  components: {Images},
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  data() {
    return {
      show: false,
      status: true,
    }
  },
  methods: {
    showChange(value) {
      this.show = value;
    },
    statusChange(value) {
      this.status = value;
    }
  }
}
</script>

<style scoped>

</style>
