<template>
    <div class="widget-text-in-bubble">{{text}}</div>
</template>

<script>
    export default {
        name: "WidgetTextInBubble",
      props:['text']
    }
</script>

<style lang="scss">
  .widget-text-in-bubble {
    height: 32px;
    background: #F5F5F5;
    border: 1px solid #F0F0F0;
    border-radius: 100px;
    padding: 6px 16px;
    color: #274985;
    font-size: 14px;
  }
</style>
