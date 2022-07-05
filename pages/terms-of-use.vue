<template>
  <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
    <TheHeader>
      <template #actions>
        <NuxtLink to="/renters" class="btn btn-outline-primary">
          <span class="d-none d-sm-inline">Арендаторам</span>
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
      <template #navbar>
        <LinkScrollTo target-id="about" class="header__nav-link">
          О Car Сity
        </LinkScrollTo>
        <LinkScrollTo target-id="infrastructure" class="header__nav-link">
          Инфраструктура
        </LinkScrollTo>
        <!--        <LinkScrollTo target-id="plan" class="header__nav-link">-->
        <!--          План помещений-->
        <!--        </LinkScrollTo>-->
      </template>
    </TheHeader>
    <article class="document-section" v-if="current === 0">
      <div class="container" style="white-space: pre-wrap; text-align: justify"  v-for="(item,key) in body" :key="key" v-html="item.body"></div>
    </article>
    <article class="document-section" v-else-if="current === 1">
      <div class="container" style="white-space: pre-wrap; text-align: justify"  v-for="(item,key) in body" :key="key" v-html="item.body_kz"></div>
    </article>
    <TheFooter :dark="$route.name !== 'index'" />
  </vue-custom-scrollbar>
</template>

<script>
import TheHeader from "/components/site/TheHeader";
import TheFooter from "/components/site/TheFooter";
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
  computed: {
    current() {
      return this.$store.state.localStorage.current;
    }
  },
  data() {
    return {
      lang: ['Пользовательское соглашение','Пайдаланушылық келісім'],
      body: ''
    }
  },
  async created() {
    this.body = await this.$store.dispatch('localStorage/termsOfUseGet');
  },
  head() {
    return {
      title: this.lang[this.current],
    }
  },
  components: {
    TheHeader,TheFooter,vueCustomScrollbar
  },
}
</script>
