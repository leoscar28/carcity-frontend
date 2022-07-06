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
              <li class="breadcrumb-item active" aria-current="page">Поиск услуг и запчастей</li>
            </ol>
          </nav>
        </div>
        <div class="container">
          <UserBannerSection is-page/>
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
    export default {
      name: "promotions",
      components: {UserBannerSection, Icon, TheHeader, TheFooter},
      head:{
        title: 'Поиск услуг и запчастей'
      }
    }
</script>
>
