<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
      <HeaderSection></HeaderSection>
      <div class="body-section">
        <SidebarSection></SidebarSection>
        <div class="body-section-content">
          <RequestSection></RequestSection>
        </div>
      </div>
    </vue-custom-scrollbar>
    <!--    <Request></Request>-->
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import Request from "@/components/modal/Request";
export default {
  name: "index",
  components: {Request,vueCustomScrollbar},
}
</script>

<style lang="scss">

</style>
