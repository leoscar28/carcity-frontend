<template>
    <div class="empty-drop-zone">
      <img src="/icon_image.svg">
      <span class="empty-drop-zone__text">Перетащите сюда фотографии или выберите на компьютере</span>
      <span class="empty-drop-zone__text--default">Объявления с фотографиями получает в 5 раз больше откликов</span>
    </div>
</template>

<script>
    export default {
        name: "EmptyDropZone"
    }
</script>

<style lang="scss">
  .empty-drop-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 222/40;
    font-weight: 500;
    text-align: center;

    &:hover {
      background: #8c8c8c;
    }

    &__text {
      font-size: 14px;
      color: #274985;

      &--default {
        font-size: 13px;
        color: #595959;
      }
    }

  }
</style>
