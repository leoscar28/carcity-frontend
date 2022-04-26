<template>
  <div class="bg" style="padding-top: 0;">
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
      <div class="rule-main">
        <top-main></top-main>
        <rules-main></rules-main>
        <bottom-main></bottom-main>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
  name: "rules",
  components: {vueCustomScrollbar},
}
</script>

<style lang="scss">
  .rule-main {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  @import '/assets/Rule.scss';
</style>
