<template>
  <div>
    <template v-if="isSimplyUser">
      <TheHeader>
        <template #actions>
          <NuxtLink to="/renters" class="btn btn-outline-primary">
            <span class="d-none d-sm-inline">{{language[current][0]}}</span>
            <svg
              class="d-sm-none"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="currentColor"
            >
              <g><rect fill="none" height="24" width="24" /></g>
              <g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" /></g>
            </svg>
          </NuxtLink>
        </template>
      </TheHeader>
      <main>
        <section class="py-4">
          <div class="container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><NuxtLink to="/" class="text-gray-600 text-decoration-none">{{language[current][1]}}</NuxtLink></li>
                <li class="breadcrumb-item active" aria-current="page">{{language[current][0]}}</li>
              </ol>
            </nav>
          </div>
          <div class="container pb-lg-5">
            <h4 class="fw-bold mb-3 pb-1">{{language[current][0]}}</h4>
            <Profile class="m-0 mb-lg-5 pb-lg-5 mb-3"/>
          </div>
        </section>
      </main>
      <TheFooter :dark="$route.name !== 'index'" />
      <style>
        body {
          overflow: auto !important;
        }
      </style>
    </template>
    <template v-else>
      <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
        <HeaderSection/>
        <div class="body-section">
          <SidebarSection/>
          <div class="body-section-content">
            <Profile/>
          </div>
        </div>
      </vue-custom-scrollbar>
    </template>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import TheHeader from "../../components/site/TheHeader";
import TheFooter from "../../components/site/TheFooter";
import Profile from "../../components/Profile";
import HeaderSection from "../../components/HeaderSection";
import SidebarSection from "../../components/SidebarSection";
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
  components: {SidebarSection, HeaderSection, Profile, TheFooter, TheHeader, vueCustomScrollbar},
  data(){
    return {
      language: [
        [
          'Настройки',
          'Главная'
        ],
        [
          'Баптау',
          'Басты',
        ],
      ]
    }
  },
  middleware: ['guest'],
  computed:{
    user(){
      return this.$store.state.localStorage.user;
    },
    isSimplyUser(){
      return this.user.role_id === 5;
    },
    current() {
      return this.$store.state.localStorage.current;
    },
  }
}
</script>

<style lang="scss">

</style>
