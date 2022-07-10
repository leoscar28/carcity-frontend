<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
        minScrollbarLength: 50
      }">
      <HeaderSection/>
      <div class="body-section">
        <SidebarSection/>
        <RulesAds/>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import RulesAds from "../../components/RulesAds";
export default {
  head: {
    title: 'Правила подачи объявлений'
  },
  middleware: ['guest', 'dashboard'],
  name: "index",
  components: {vueCustomScrollbar},
}
</script>
