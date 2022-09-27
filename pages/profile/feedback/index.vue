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
              <li class="breadcrumb-item"><NuxtLink to="/" class="text-gray-600 text-decoration-none">Главная</NuxtLink></li>
              <li class="breadcrumb-item active" aria-current="page">Служба поддержки</li>
            </ol>
          </nav>
        </div>
        <div class="container">
          <h4 class="fw-bold mb-3 pb-1">Мои запросы</h4>
          <div v-if="items.length" class="request-items">
            <WidgetFeedbackRequest v-for="(item, key) in items" :item="item" :index="items.length - key" :key="'fr'+key"/>
          </div>
          <div v-else class="empty-requests">
            <div><img src="/papertray.png" height="120" width="120" alt=""></div>
            <div class="fw-bold mb-3">Пока здесь нет Ваших запросов</div>
            <button @click="$store.commit('localStorage/setFeedbackRequestModal', true)" class="btn btn-primary">Отправить запрос</button>
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
    import TheFooter from "../../../components/site/TheFooter";
    import TheHeader from "../../../components/site/TheHeader";
    import Icon from "../../../components/icons/Icon";
    import WidgetFeedbackRequest from "../../../components/WidgetFeedbackRequest";
    export default {
      name: "requests",
      components: {WidgetFeedbackRequest, Icon, TheHeader, TheFooter},
      head:{
        title: 'Служба поддержки'
      },
      middleware: ['guest', 'profile'],
      async asyncData({store}) {
        const dataForRequest  = {
          take: 30,
          pagination: 1,
          user_id: store.state.localStorage.user.id
        }
        const items = await store.dispatch('localStorage/getFeedbackRequests', dataForRequest);

        return {items}
      }
    }
</script>

<style lang="scss">
  .empty-requests {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 16px;
    min-height: calc(100vh - 477px);
    text-align: center;
  }

  .request-items {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
    min-height: calc(100vh - 477px);

    @media (max-width:768px) {
      grid-gap: 16px;
    }
  }
</style>
