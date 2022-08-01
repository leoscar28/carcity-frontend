<template>
  <div class="modal-global" :class="{'modal-hidden':!show}">
    <div class="modal-content-global">
      <div class="modal-content-header-close" @click="$emit('close')"></div>
      <div class="modal-content-header">Причина отказа</div>
      <div class="user-banner-comment text-center pt-3 pb-4">
        <div><img src="/alert.svg" /></div>
        <div class="user-banner-comment-title">Уважаемый арендатор торгового центра!</div>
        <div>Обращаем ваше внимание на то, что у вас...</div>
        <div>{{comment}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UserBannerComment",
      props:['comment', 'show'],
      emits:['close']

    }
</script>

<style lang="scss">
  .user-banner-comment {
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-gap: 12px;
    &-title {
      font-size: 16px;
      font-weight: 600;
    }
  }
</style>
