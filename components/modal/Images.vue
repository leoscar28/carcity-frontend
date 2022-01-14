<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-content-header">Галерея</div>
      <div class="modal-content-list">
        <div>
          <div class="modal-content-list-item modal-content-list-item-add"></div>
          <div class="modal-content-list-item" v-for="(avatar,index) in avatars" :key="index" :style="{'background-image':'url('+avatar+')'}"></div>
        </div>
      </div>
      <div class="modal-content-graph-footer">
        <div>
          <button>Отмена</button>
        </div>
        <div>
          <button class="modal-content-graph-footer-btn">Выбрать фото</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Images",
  data() {
    return {
      avatars: ['/avatars/1.jpg','/avatars/2.jpg','/avatars/3.jpg','/avatars/4.jpg']
    }
  }
}
</script>

<style lang="scss">
@import "assets/Modal.scss";
</style>
