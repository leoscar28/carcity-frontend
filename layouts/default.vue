<template>
  <div id="wrapper" class="page-wrapper">
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
</style>
