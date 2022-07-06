<template>
  <div class="banner-section-block-with-icon">
    <Icon :name="icon" size="24"/>
    <div>
      <div class="text-gray-600">{{title}}</div>
      <div v-html="subtitle"></div>
    </div>
  </div>
</template>

<script>
    import Icon from "./icons/Icon";
    export default {
        name: "WidgetBannerSectionWithIcon",
      components: {Icon},
      props:['icon', 'title', 'subtitle']
    }
</script>

<style lang="scss">
  .banner-section-block-with-icon {
    display: flex;
    flex-direction: row;
    font-size:16px;
  }
</style>
