<template>
  <div>
    <vue-custom-scrollbar class="scroll-area" :settings="{
        suppressScrollX: false,
      }">
      <HeaderSection></HeaderSection>
      <div class="body-section">
        <SidebarSection></SidebarSection>
        <div class="body-section-content">
          <div class="rule">
            <div class="rule-content">
              <div class="rule-content-header">
                <div class="rule-content-header-title">Инструкции</div>
              </div>
              <div class="rule-content-video">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/ZVSAh1tm5h0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
  middleware: ['guest'],
  name: "index",
  components: {vueCustomScrollbar},
}
</script>

<style lang="scss">
  @import '/assets/Rule.scss';
</style>
