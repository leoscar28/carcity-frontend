<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{ suppressScrollX: false }">
      <HeaderSection/>
      <div class="body-section">
        <SidebarSection/>
        <Announcement :id="id" @title="setTitle" />
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import "vue-custom-scrollbar/dist/vueScrollbar.css"
  import SidebarSection from "../../components/SidebarSection";
  import HeaderSection from "../../components/HeaderSection";
  import Announcement from "../../components/Announcement";
  export default {
    middleware: ['announcement'],
    name: "view",
    components: {Announcement, HeaderSection, SidebarSection, vueCustomScrollbar},
    async asyncData({ params, redirect }) {
      return {id: params.id}
    },
    methods: {
      setTitle(title) {
        this.title = title;
      }
    },
    head() {
      return {
        title: this.title,
      }
    }
  }
</script>

<style lang="scss">

</style>
