<template>
  <div class="sidebar-section" :class="{'sidebar-section-show':$store.state.localStorage.sidebar}">
    <div class="sidebar-section-menu">
      <NuxtLink to="/dashboard">
        <div class="sidebar-section-menu-item" :class="{'sidebar-section-menu-item-active':($nuxt.$route.name === 'dashboard')}">
          <div>
            <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-home"></div>
            <div class="sidebar-section-menu-item-title">Главная</div>
          </div>
        </div>
      </NuxtLink>
      <div class="sidebar-section-menu-item sidebar-section-menu-item-arrow" :class="{'sidebar-section-menu-item-arrow-active':dropdown}">
        <div @click="dropdown = !dropdown">
          <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-email"></div>
          <div class="sidebar-section-menu-item-title">Заявки</div>
        </div>
        <div class="sidebar-section-menu-list" v-show="dropdown">
          <NuxtLink to="/requests">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'requests')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Ввоз</div>
            </div>
          </NuxtLink>
          <NuxtLink to="/exrequests">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'exrequests')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Вывоз</div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <NuxtLink to="/analytics">
        <div class="sidebar-section-menu-item" :class="{'sidebar-section-menu-item-active':($nuxt.$route.name === 'analytics')}">
          <div>
            <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-analytics"></div>
            <div class="sidebar-section-menu-item-title">Аналитика</div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarSection",
  data() {
    return {
      dropdown: false
    }
  },
  created() {
    this.check();
  },
  methods: {
    check() {
      if (['requests','exrequests','request'].includes(this.$nuxt.$route.name)) {
        this.dropdown = true;
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/SidebarSection.scss';
</style>
