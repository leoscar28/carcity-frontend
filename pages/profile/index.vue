<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
      <HeaderSection></HeaderSection>
      <div class="body-section">
        <SidebarSection></SidebarSection>
        <div class="body-section-content">
          <Profile></Profile>
        </div>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
  head: {
    title: 'Профиль',
    meta: [
      /*{
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }*/
    ],
  },
  name: "index",
  components: {vueCustomScrollbar},
}
</script>

<style lang="scss">

</style>
