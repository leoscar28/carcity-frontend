<template>
  <div class="sidebar-section" :class="{'sidebar-section-show':$store.state.localStorage.sidebar}">
    <div class="sidebar-section-menu">
      <div class="sidebar-section-menu-item sidebar-section-menu-item-arrow" :class="{'sidebar-section-menu-item-arrow-active':dropdown}">
        <div @click="dropdown = !dropdown">
          <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-folder"></div>
          <div class="sidebar-section-menu-item-title">Документооборот</div>
        </div>
        <div class="sidebar-section-menu-list" v-show="dropdown">
          <NuxtLink to="/dashboard">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'dashboard')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Акт выполненных работ</div>
            </div>
          </NuxtLink>
          <NuxtLink to="/application">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'application')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Договора и приложения</div>
            </div>
          </NuxtLink>
          <NuxtLink to="/invoice">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'invoice')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Счет на оплату</div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <NuxtLink to="/ad">
        <div class="sidebar-section-menu-item" :class="{'sidebar-section-menu-item-active':($nuxt.$route.name === 'ad')}">
          <div>
            <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-briefcase"></div>
            <div class="sidebar-section-menu-item-title">Подача объявлений</div>
          </div>
        </div>
      </NuxtLink>
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
      dropdown: false
    }
  },
  created() {
    this.check();
  },
  methods: {
    check() {
      if (['dashboard','application','invoice'].includes(this.$nuxt.$route.name)) {
        this.dropdown = true;
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/SidebarSection.scss';
</style>
