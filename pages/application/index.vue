<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
        minScrollbarLength: 50
      }">
      <HeaderSection></HeaderSection>
      <div class="body-section">
        <SidebarSection></SidebarSection>
        <div class="body-section-content">
          <RequestSection :type="type" :requestChange="request" @requestCommentShowChange="requestCommentShowChange" @requestChange="requestChange"></RequestSection>
        </div>
      </div>
    </vue-custom-scrollbar>
    <request-comment :requestCommentShow="requestCommentShow" :type="type" :request="request" @requestCommentShowChange="requestCommentShowChange" @requestChange="requestChange"></request-comment>
    <signature-loading></signature-loading>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import RequestComment from "~/components/modal/RequestComment"
import SignatureLoading from "~/components/modal/SignatureLoading";
export default {
  head: {
    title: 'Договора и приложения',
    meta: [
      /*{
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }*/
    ],
  },
  middleware: ['guest'],
  name: "index",
  components: {SignatureLoading, vueCustomScrollbar,RequestComment},
  data() {
    return {
      type: 2,
      requestCommentShow: false,
      request: false,
    }
  },
  methods: {
    requestCommentShowChange(value) {
      this.requestCommentShow  = value;
    },
    requestChange(value) {
      this.request  = value;
    },
  }
}
</script>

<style lang="scss">

</style>
