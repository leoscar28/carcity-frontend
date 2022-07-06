<template>
    <div>
        <vue-custom-scrollbar class="scroll-area" :settings="{ suppressScrollX: false }">
            <HeaderSection/>
            <div class="body-section">
                <SidebarSection/>
                <div class="body-section-content">
                  <RequestSection :type="type" :requestChange="request" @requestCommentShowChange="requestCommentShowChange" @requestChange="requestChange"/>
                </div>
            </div>
        </vue-custom-scrollbar>

      <request-comment :requestCommentShow="requestCommentShow" :type="type" :request="request" @requestCommentShowChange="requestCommentShowChange" @requestChange="requestChange"/>
    </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import UserBannerModal from "../../../components/modal/UserBannerModal";
import WidgetUserBanner from "../../../components/WidgetUserBanner";
import RequestSection from "../../../components/RequestSection";
import SidebarSection from "../../../components/SidebarSection";
import HeaderSection from "../../../components/HeaderSection";
import RequestComment from "../../../components/modal/RequestComment";
import RequestSectionFooter from "../../../components/RequestSectionFooter";
export default {
  data() {
    return {
      type: 'review',
      requestCommentShow: false,
      request: false,
    }
  },
  head(){
    return {
      title: 'Отзывы',
      meta: [
        /*{
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }*/
      ],
    }
  } ,
  middleware: ['guest', 'dashboard'],
  name: "index",
  components: {
    RequestSectionFooter,
    RequestComment,
    HeaderSection, SidebarSection, RequestSection, WidgetUserBanner, UserBannerModal, vueCustomScrollbar},

  methods: {
    requestCommentShowChange(value) {
      this.requestCommentShow = value;
    },
    requestChange(value) {
      this.request = value;
    },
  }
}
</script>

<style lang="scss">
  @import 'assets/RequestSection.scss';
</style>
