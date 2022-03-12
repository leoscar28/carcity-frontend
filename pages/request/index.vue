<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
      <HeaderSection></HeaderSection>
      <div class="body-section">
        <SidebarSection></SidebarSection>
        <div class="body-section-content">
          <request-card :newRequest="request" :approveId="approveId" @commodityShowChange="commodityShowChange" @commodityRequestChange="commodityRequestChange" @requestRejectShowChange="requestRejectShowChange" @approveIdChange="approveIdChange"></request-card>
        </div>
      </div>
    </vue-custom-scrollbar>
    <commodities :commodity-show="commodityShow" :request="request" @commodityShowChange="commodityShowChange"></commodities>
    <request-reject :request-reject-show="requestRejectShow" :request="request" :approveId="approveId" @requestRejectShowChange="requestRejectShowChange" @commodityRequestChange="commodityRequestChange"></request-reject>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import Commodities from "@/components/modal/Commodities";
import RequestReject from "@/components/modal/RequestReject";
export default {
  name: "index",
  components: {RequestReject, Commodities, vueCustomScrollbar},
  data() {
    return {
      requestRejectShow: false,
      commodityShow: false,
      request: false,
      approveId: 0,
    }
  },
  methods: {
    approveIdChange(value) {
      this.approveId = value;
    },
    commodityShowChange(value) {
      this.commodityShow  = value;
    },
    commodityRequestChange(value) {
      this.request  = value;
    },
    requestRejectShowChange(value) {
      this.requestRejectShow  = value;
    }
  }
}
</script>

<style lang="scss">

</style>
