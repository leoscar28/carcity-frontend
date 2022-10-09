<template>
  <div v-if="show" :key="'ul'+show" class="modal-global ur-modal">
    <div class="modal-content-global">
      <div class="modal-content-header-close" @click="$store.commit('localStorage/setFavoriteModal', false)"></div>
      <div class="modal-content-header">Добавить в избранное</div>
      <div @click="$store.commit('localStorage/setFavoriteModal', false)" class="ur-modal__user text-center">
        <div><img src="/cone.png" width="130" height="130" alt=""/></div>
        <div class="">
          Чтобы добавить в избранное<br class="d-lg-block d-none"/> <NuxtLink to="/login" @click="$store.commit('localStorage/setFavoriteModal', false)">войдите в систему</NuxtLink><br class="d-lg-block d-none"/> или <NuxtLink to="/registration" @click="$store.commit('localStorage/setFavoriteModal', false)">зарегистрируйтесь</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoriteModal",
  computed: {
    show() {
      return this.$store.state.localStorage.favoriteModal;
    },
  }
}
</script>
