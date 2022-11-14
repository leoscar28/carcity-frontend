<template>
  <div class="user-menu">
    <div class="user-menu__photo">
      <img v-if="user.image" :src="user.image.path" alt="" />
      <img v-else src="/defaultUser.png" alt="" />
    </div>
    <div class="user-menu__email">{{user.email}}</div>
    <div class="user-menu__dropdown">
      <div class="user-menu__dropdown__main">
        <template v-if="isSimplyUser">
          <NuxtLink to="/profile/requests" class="user-menu__dropdown__main__item"><Icon name="keys"/>{{ language[current][0] }}</NuxtLink>
          <NuxtLink to="/profile/favorites" class="user-menu__dropdown__main__item"><Icon name="star"/> {{ language[current][1] }}</NuxtLink>
          <NuxtLink to="/profile/reviews" class="user-menu__dropdown__main__item"><Icon name="chat"/> {{ language[current][2] }}</NuxtLink>
        </template>
        <NuxtLink v-else to="/invoice" class="user-menu__dropdown__main__item"><Icon name="keys"/> {{ language[current][3] }} </NuxtLink>
        <NuxtLink to="/profile" class="user-menu__dropdown__main__item"><Icon name="gear"/> {{ language[current][4] }}</NuxtLink>
        <NuxtLink v-if="isSimplyUser" to="/profile/feedback" class="user-menu__dropdown__main__item"><Icon name="question"/> {{ language[current][5] }}</NuxtLink>
        <div @click="logout" class="user-menu__dropdown__main__item"><Icon name="login"/>  {{ language[current][6] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from "./icons/Icon";
  export default {
    name: "UserMenu",
    components: {Icon},
    data() {
      return {
        language: [
          [
            'Мои заявки',
            'Избранное',
            'Мои отзывы',
            'Личный кабинет',
            'Настройки',
            'Служба поддержки',
            'Выход'
          ],
          [
            'Менің өтініштерім',
            'Таңдаулылар',
            'Менің пікірлерім',
            'Жеке кабинет',
            'Баптаулар',
            'Қолдау қызметі',
            'Шығу'
          ]
        ]
      }
    },
    computed:{
      user(){
        return this.$store.state.localStorage.user;
      },
      isSimplyUser(){
        return this.user.role_id === 5;
      },
      isCustomer(){
        return this.user.role_id === 1;
      },
      current() {
        return this.$store.state.localStorage.current;
      },
    },
    methods:{
      logout() {
        this.$store.commit('localStorage/setUser',false);
        this.$router.replace({path: '/'});
      },
    }
  }
</script>

<style lang="scss">
  .user-menu {
    display: flex;
    grid-gap: 8px;
    position: relative;
    align-items: center;
    cursor: pointer;
    height: 100%;

    &__photo img{
      width: 34px;
      height: 34px;
      border-radius: 34px;
    }

    &__email {
      font-size: 16px;
    }

    &:hover > .user-menu__dropdown {
      display: block;
    }

    &__dropdown {
      display: none;
      position: absolute;
      width: 190px;
      background: #fff;
      right: 0;
      top: 60px;
      box-shadow: 0 0 5px 1px rgba(0,0,0,.1);
      border-radius: 5px;
      z-index: 5;
      &:before {
        content: '';
        position: absolute;
        background: #fff;
        width: 12px;
        height: 12px;
        transform: rotate(
            45deg);
        top: -6px;
        right: 15px;
        box-shadow: 0 0 5px 1px rgba(0,0,0,.1);
      }
      &__main {
        width: 100%;
        position: relative;
        z-index: 2;
        min-height: 50px;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        overflow: hidden;

        &__item {
          height: 34px;
          width: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: 500;
          padding: 0 10px 0 10px;
          gap: 10px;
          border-radius: 5px;
          font-size: 12px;
          color: #1E1E1E;
          &:hover {
            background: #F0F0F0;
          }
        }
      }
    }
  }

</style>
