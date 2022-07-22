<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{ suppressScrollX: false }">
      <HeaderSection/>
      <div class="body-section">
        <SidebarSection/>
        <UserBanner :banner="id"/>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import "vue-custom-scrollbar/dist/vueScrollbar.css"
  import SidebarSection from "../../../components/SidebarSection";
  import HeaderSection from "../../../components/HeaderSection";
  import UserBanner from "../../../components/UserBanner";
  export default {
    head: {
      title: 'Согласование объявения',
      meta: [
        /*{
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }*/
      ],
    },
    middleware: ['guest', 'dashboard'],
    name: "confirm",
    components: {UserBanner, HeaderSection, SidebarSection, vueCustomScrollbar},
    async asyncData({ params, redirect }) {
      return {id: params.id}
    }
  }
</script>

<style lang="scss">

</style>
