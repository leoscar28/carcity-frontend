<template>
  <div class="sidebar-section" :class="{'sidebar-section-show':$store.state.localStorage.sidebar}" @click="$store.commit('localStorage/closeSidebar');">
    <div class="sidebar-section-menu">
      <div class="sidebar-section-menu-item sidebar-section-menu-item-arrow" :class="{'sidebar-section-menu-item-arrow-active':dropdown}">
        <div @click.stop="dropdown = 'docs'">
          <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-folder"></div>
          <div class="sidebar-section-menu-item-title">Документооборот</div>
        </div>
        <div class="sidebar-section-menu-list" v-show="dropdown === 'docs'">
          <NuxtLink to="/invoice">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'invoice')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Счета на оплату</div>
            </div>
          </NuxtLink>
          <NuxtLink to="/application">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'application')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Договора и приложения</div>
            </div>
          </NuxtLink>
          <NuxtLink to="/dashboard">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'dashboard')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Акт выполненных работ</div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="sidebar-section-menu-item sidebar-section-menu-item-arrow" :class="{'sidebar-section-menu-item-arrow-active':dropdown === 'ads'}">
        <div @click="dropdown = 'ads'">
          <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-folder"></div>
          <div class="sidebar-section-menu-item-title">Объявления</div>
        </div>
        <div class="sidebar-section-menu-list" v-show="dropdown === 'ads'">
          <NuxtLink v-if="user.role_id !== 1" to="/ads/new">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'ads-new')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Новые</div>
            </div>
          </NuxtLink>
          <NuxtLink to="/ads/active">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'ads-active')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Активные</div>
            </div>
          </NuxtLink>
          <NuxtLink to="/ads/inactive">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'ads-inactive')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Неактивные</div>
            </div>
          </NuxtLink>
          <NuxtLink to="/ads/requests">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'ads-requests')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Заявки покупателей</div>
            </div>
          </NuxtLink>
          <NuxtLink v-if="user.role_id !== 1" to="/ads/reviews">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'ads-reviews')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Отзывы</div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <NuxtLink to="/rule">
        <div class="sidebar-section-menu-item" :class="{'sidebar-section-menu-item-active':($nuxt.$route.name === 'rule')}">
          <div>
            <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-help"></div>
            <div class="sidebar-section-menu-item-title">Общие правила ТЦ</div>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/instruction">
        <div class="sidebar-section-menu-item" :class="{'sidebar-section-menu-item-active':($nuxt.$route.name === 'instruction')}">
          <div>
            <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-help"></div>
            <div class="sidebar-section-menu-item-title">Инструкции</div>
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
      dropdown: ''
    }
  },
  created() {
    this.check();
  },
  computed:{
    user() {
      return this.$store.state.localStorage.user;
    },
  },
  methods: {
    check() {
      if (['dashboard','application','invoice'].includes(this.$nuxt.$route.name)) {
        this.dropdown = 'docs';
      }
      if (this.$nuxt.$route.name.includes('ads-')) {
        this.dropdown = 'ads';
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/SidebarSection.scss';
</style>
