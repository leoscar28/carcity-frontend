<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
      <HeaderSection></HeaderSection>
      <div class="body-section">
        <SidebarSection></SidebarSection>
        <div class="body-section-content">
          <RequestSection :type="type" @showChange="showChange" @statusChange="statusChange" @showRequestChange="showRequestChange" @statusRequestChange="statusRequestChange"></RequestSection>
        </div>
      </div>
    </vue-custom-scrollbar>
    <Configurator :show="show" :status="status" @showChange="showChange" @statusChange="statusChange"></Configurator>
    <Request :type="type" :show="showRequest" :status="statusRequest" @showRequestChange="showRequestChange" @statusRequestChange="statusRequestChange"></Request>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import Request from "@/components/modal/Request";
import Configurator from "@/components/modal/Configurator";
export default {
  name: "index",
  components: {Request,Configurator,vueCustomScrollbar},
  data() {
    return {
      type: 1,
      show: false,
      status: true,
      showRequest: false,
      statusRequest: true
    }
  },
  methods: {
    showChange(value) {
      this.show = value;
    },
    statusChange(value) {
      this.status = value;
    },
    showRequestChange(value) {
      this.showRequest  = value;
    },
    statusRequestChange(value) {
      this.statusRequest  = value;
    }
  }
}
</script>

<style lang="scss">
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100vh;
}
.ps__rail-y {
  background: transparent !important;
  width: 5px;
  z-index: 100;
}
.ps__rail-y:hover > .ps__thumb-y,
.ps__rail-y:focus > .ps__thumb-y,
.ps__rail-y.ps--clicking .ps__thumb-y {
  background-color: #999;
  width: 5px;
}
.ps__thumb-x, .ps__thumb-y {
  background-color: #1890FF;
}
</style>
