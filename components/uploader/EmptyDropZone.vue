<template>
    <div class="empty-drop-zone">
      <img src="/icon_image.svg">
      <span class="empty-drop-zone__text">{{ language[current][0] }}</span>
      <span class="empty-drop-zone__text--default">{{ language[current][1] }}</span>
    </div>
</template>

<script>
    export default {
        name: "EmptyDropZone",
        data(){
          return {
            language: [
              [
                'Перетащите сюда фотографии или выберите на компьютере',
                'Объявления с фотографиями получает в 5 раз больше откликов'
              ],
              [
                'Фотосуреттерді, файлдарды осы жерге сүйреңіз немесе компьютерден таңдаңыз',
                'Фотосуреттері бар жарнамалар 5 есе көбірек қызығушылық тудырады',
              ],
            ]
          }
        },
        computed:{
          current() {
            return this.$store.state.localStorage.current;
          },
        },
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
