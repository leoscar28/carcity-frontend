<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{ suppressScrollX: false }">
      <HeaderSection/>
      <div class="body-section">
        <SidebarSection/>
        <FeedbackRequest :feedback="id"/>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import "vue-custom-scrollbar/dist/vueScrollbar.css"
  import SidebarSection from "../../components/SidebarSection";
  import HeaderSection from "../../components/HeaderSection";
  import FeedbackRequest from "../../components/FeedbackRequest";
  export default {
    head: {
      title: 'Просмотр запроса',
      meta: [
        /*{
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }*/
      ],
    },
    middleware: ['feedback'],
    name: "view",
    components: {FeedbackRequest, HeaderSection, SidebarSection, vueCustomScrollbar},
    async asyncData({ params, redirect }) {
      return {id: params.id}
    }
  }
</script>

<style lang="scss">

</style>
