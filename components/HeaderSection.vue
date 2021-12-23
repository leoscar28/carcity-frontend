<template>
  <header class="header-section">
    <div class="header-section-main">
      <div class="header-section-main-left">
        <div class="header-section-main-left-icon">
          <div></div>
        </div>
        <div class="header-section-main-left-logo"></div>
      </div>
      <div class="header-section-main-right">
        <div class="header-section-main-right-input">
          <div class="header-section-main-right-input-icon"></div>
          <input type="text" placeholder="Поиск">
        </div>
        <div class="header-section-main-right-menu">
          <div class="header-section-main-right-menu-notification"></div>
          <div class="header-section-main-right-menu-user">
            <div class="header-section-main-right-menu-user-icon"></div>
            <div class="header-section-main-right-menu-user-title">{{$store.state.localStorage.user.name}}</div>
            <div class="header-section-main-right-menu-dropdown">
              <div class="header-section-main-right-menu-dropdown-main">
                <div class="header-section-main-right-menu-dropdown-main-item">
                  <div class="header-section-main-right-menu-dropdown-main-item-icon header-section-main-right-menu-dropdown-main-item-icon-user"></div>
                  <div class="header-section-main-right-menu-dropdown-main-item-title">Профиль</div>
                </div>
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
  methods: {
    logout() {
      this.$store.commit('localStorage/setUser',false);
      this.$router.replace({path: '/'});
    }
  }
}
</script>

<style lang="scss">
  @import "assets/HeaderSection.scss";
</style>
