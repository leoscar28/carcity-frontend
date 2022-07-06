<template>
    <div class="favorite" v-if="user" @click.prevent.stop="justDoIt">
      <Icon :name="name" :key="name"/>
    </div>
</template>

<script>
    import Icon from "./icons/Icon";
    export default {
        name: "Favorite",
      components: {Icon},
      props:['id'],
      computed:{
        isFavorite(){
          return this.user ? this.user.favorites.includes(this.id) : false;
        },
        user(){
          return this.$store.state.localStorage.user;
        },
        name(){
          return this.isFavorite ? 'heart_red' : 'heart';
        }
      },
      methods:{
          justDoIt(){
            if (this.isFavorite) {
              this.$store.dispatch('localStorage/removeUserFavorite', this.id)
            } else {
              this.$store.dispatch('localStorage/addUserFavorite', this.id)
            }
          }
      }
    }
</script>

<style lang="scss">
  .favorite {
    .icon {
      margin:0!important;
      display: block;
    }
  }
</style>
