<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
        minScrollbarLength: 50
      }">
      <HeaderSection/>
      <div class="body-section">
        <SidebarSection/>
        <MailingForm/>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
  head: {
    title: 'Рассылка'
  },
  middleware: ['guest', 'dashboard', 'mailing'],
  name: "index",
  components: { vueCustomScrollbar}
}
</script>

<style lang="scss">

</style>
