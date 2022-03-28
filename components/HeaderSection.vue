<template>
  <header class="header-section">
    <div class="header-section-main">
      <div class="header-section-main-left">
        <div class="header-section-main-left-icon" @click="$store.commit('localStorage/toggleSidebar');">
          <div></div>
        </div>
        <NuxtLink to="/">
          <div class="header-section-main-left-logo"></div>
        </NuxtLink>
      </div>
      <div class="header-section-main-right">
        <div class="header-section-main-right-input">
          <div class="header-section-main-right-input-icon"></div>
          <input type="text" placeholder="Поиск">
        </div>
        <div class="header-section-main-right-menu">
          <div class="header-section-main-right-menu-notification"></div>
          <div class="header-section-main-right-menu-user">
            <div class="header-section-main-right-menu-user-icon" v-if="user.image_id" :style="{'background-image':'url('+user.image_id.src+')'}"></div>
            <div class="header-section-main-right-menu-user-icon" v-else>
              <div>{{ user.name[0] }}</div>
            </div>
            <div class="header-section-main-right-menu-user-title">{{user.name}}</div>
            <div class="header-section-main-right-menu-dropdown">
              <div class="header-section-main-right-menu-dropdown-main">
                <NuxtLink to="/profile">
                  <div class="header-section-main-right-menu-dropdown-main-item">
                    <div class="header-section-main-right-menu-dropdown-main-item-icon header-section-main-right-menu-dropdown-main-item-icon-user"></div>
                    <div class="header-section-main-right-menu-dropdown-main-item-title">Профиль</div>
                  </div>
                </NuxtLink>
                <div class="header-section-main-right-menu-dropdown-main-item" @click="logout">
                  <div class="header-section-main-right-menu-dropdown-main-item-icon header-section-main-right-menu-dropdown-main-item-icon-logout"></div>
                  <div class="header-section-main-right-menu-dropdown-main-item-title">Выход</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderSection",
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    }
  },
  methods: {
    logout() {
      this.$store.commit('localStorage/setUser',false);
      this.$router.replace({path: '/partner'});
    }
  }
}
</script>

<style lang="scss">
  @import "assets/HeaderSection.scss";
</style>
