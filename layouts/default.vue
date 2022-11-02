<template>
  <div id="wrapper" class="page-wrapper" :class = "{'modalOpened':$store.state.localStorage.userBannerModalOne || $store.state.localStorage.userBannerModalTwo}">
    <notification></notification>
    <Nuxt />
  </div>
</template>
<script>
import TheFooter from "/components/site/TheFooter";
import Notification from "@/components/modal/Notification";
export default {
  components: {
    Notification,
    TheFooter
  }
}
</script>
<style lang="scss">
  @import "assets/scss/main";
  @import "assets/Modal.scss";
  .modalOpened .ps{
    overflow: inherit !important;
  }
</style>
