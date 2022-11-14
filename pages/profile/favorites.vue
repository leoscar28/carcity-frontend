<template>
  <div>
    <TheHeader>
      <template #actions>
        <NuxtLink to="/renters" class="btn btn-outline-primary">
          <span class="d-none d-sm-inline">{{language[current][0]}}</span>
          <svg
            class="d-sm-none"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="currentColor"
          >
            <g><rect fill="none" height="24" width="24" /></g>
            <g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" /></g>
          </svg>
        </NuxtLink>
      </template>
    </TheHeader>
    <main>
      <section class="py-4">
        <div class="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><NuxtLink to="/" class="text-gray-600 text-decoration-none">{{language[current][1]}}</NuxtLink></li>
              <li class="breadcrumb-item active" aria-current="page">{{language[current][0]}}</li>
            </ol>
          </nav>
        </div>
        <div class="container">
          <h4 class="fw-bold mb-3 pb-1">{{language[current][0]}}</h4>
          <div v-if="items.length" class="favorites-items">
            <WidgetUserBannerFront v-for="item in items" :item="item" :key="item.id"/>
          </div>
          <div v-else class="empty-favorites">
            <div><Icon name="heart_red" size="120" class="d-block m-0"/></div>
            <div class="fw-bold">{{language[current][2]}}</div>
            <div class="text-gray-600">{{language[current][3]}}</div>
          </div>
        </div>
      </section>
    </main>
    <TheFooter :dark="$route.name !== 'index'" />
    <style>
      body {
        overflow: auto !important;
      }
    </style>
  </div>
</template>

<script>
  import TheFooter from "../../components/site/TheFooter";
  import TheHeader from "../../components/site/TheHeader";
  import Icon from "../../components/icons/Icon";
  import UserBannerSection from "../../components/UserBannerSection";
  import WidgetUserBannerFront from "../../components/WidgetUserBannerFront";

  export default {
      name: "favorites",
      components: {WidgetUserBannerFront, UserBannerSection, Icon, TheHeader, TheFooter},
    data(){
      return {
        language: [
          [
            'Избранное',
            'Главная',
            'Пока здесь нет избранных',
            'Здесь будут появляться избранные объявления'
          ],
          [
            'Таңдаулылар',
            'Басты',
            'Әзірге таңдаулылар жоқ',
            'Таңдаулы жарнамалар осы жерде пайда болады'
          ],
        ]
      }
    },
      head:{
        title: 'Избранное'
      },
      middleware: ['guest', 'profile'],
      async asyncData({store}) {
        const dataForRequest = {
          type: 'published',
          take: 30,
          pagination: 1,
          user_id: store.state.localStorage.user.id
        }
        const items = await store.dispatch('localStorage/getUserFavorites', dataForRequest)
        return {items}
      },
    computed: {
      current() {
        return this.$store.state.localStorage.current;
      },
    }
  }
</script>

<style lang="scss">
  .empty-favorites {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 16px;
    min-height: calc(100vh - 477px);
    text-align: center;
  }

  .favorites-items {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
    min-height: calc(100vh - 477px);

    @media (max-width:768px) {
      grid-gap: 16px;
    }
  }
</style>
