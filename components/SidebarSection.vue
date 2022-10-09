<template>
  <div class="sidebar-section" :class="{'sidebar-section-show':$store.state.localStorage.sidebar}" @click="$store.commit('localStorage/closeSidebar');">
    <div class="sidebar-section-menu">
      <NuxtLink to="/" class="d-md-none d-block text-center px-5 py-2 ">
        <img src="/logo.svg" height="40" alt="logo" >
      </NuxtLink>
      <div class="sidebar-section-menu-item sidebar-section-menu-item-arrow" :class="{'sidebar-section-menu-item-arrow-active':dropdown === 'docs'}">
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
        <div @click.stop="dropdown = 'ads'">
          <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-folder"></div>
          <div class="sidebar-section-menu-item-title">Объявления</div>
        </div>
        <div class="sidebar-section-menu-list" v-show="dropdown === 'ads'">
          <NuxtLink v-if="user.role_id === 2" to="/ads">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'ads')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Отчет</div>
            </div>
          </NuxtLink>
          <NuxtLink v-if="user.role_id !== 1" to="/ads/new">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'ads-new')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Новые<div v-if="count" class="sidebar-section-badge">{{count}}</div></div>
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
          <NuxtLink to="/ads/requests" v-if="[2].includes(user.role_id) || user.role_id === 1 && user.can_create_banner === 1">
            <div class="sidebar-section-menu-list-item" :class="{'sidebar-section-menu-list-item-active':($nuxt.$route.name === 'ads-requests')}">
              <div class="sidebar-section-menu-list-item-icon"></div>
              <div class="sidebar-section-menu-list-item-title">Заявки покупателей<div v-if="requestCount" class="sidebar-section-badge">{{requestCount}}</div></div>
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
      <NuxtLink to="/filing-rules">
        <div class="sidebar-section-menu-item" :class="{'sidebar-section-menu-item-active':($nuxt.$route.name === 'filing-rules')}">
          <div>
            <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-help"></div>
            <div class="sidebar-section-menu-item-title">Правила подачи объявлений</div>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink v-if="[1,2].includes(user.role_id)" to="/announcement">
        <div class="sidebar-section-menu-item" :class="{'sidebar-section-menu-item-active':($nuxt.$route.name === 'announcement')}">
          <div>
            <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-bell"></div>
            <div class="sidebar-section-menu-item-title">Уведомления</div>
          </div>
        </div>
      </NuxtLink>
      <!--NuxtLink v-if="[2,3].includes(user.role_id)" to="/mailing">
        <div class="sidebar-section-menu-item" :class="{'sidebar-section-menu-item-active':($nuxt.$route.name === 'mailing')}">
          <div>
            <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-folder"></div>
            <div class="sidebar-section-menu-item-title">Рассылка</div>
          </div>
        </div>
      </NuxtLink-->
      <NuxtLink v-if="user.role_id === 2" to="/feedback">
        <div class="sidebar-section-menu-item" :class="{'sidebar-section-menu-item-active':($nuxt.$route.name === 'feedback')}">
          <div>
            <div class="sidebar-section-menu-item-icon sidebar-section-menu-item-icon-help"></div>
            <div class="sidebar-section-menu-item-title">Служба поддержки<div v-if="feedbackCount" class="sidebar-section-badge">{{feedbackCount}}</div></div>
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
  async created() {
    this.check();
    this.$store.commit('localStorage/setUserBannerCount', await this.$store.dispatch('localStorage/getUserBannerCount', 'new'));
    this.$store.commit('localStorage/setUserRequestCount', await this.$store.dispatch('localStorage/getUserRequestCount', '7d'));
    this.$store.commit('localStorage/setUserFeedbackCount', await this.$store.dispatch('localStorage/getUserFeedbackCount', 'new'));
  },
  async mounted() {
    this.$store.commit('localStorage/setAnnouncementRecipient',await this.$store.dispatch('localStorage/getNotViewedAnnouncement', {user_id:this.user.id}));
  },
  computed:{
    user() {
      return this.$store.state.localStorage.user;
    },
   count(){
      return this.$store.state.localStorage.userBannerCount;
    },
    requestCount(){
      return this.$store.state.localStorage.userRequestCount;
    },
    feedbackCount(){
      return this.$store.state.localStorage.userFeedbackCount;
    },
  },
  methods: {
    check() {
      if (['dashboard','application','invoice'].includes(this.$nuxt.$route.name)) {
        this.dropdown = 'docs';
      }
      if (this.$nuxt.$route.name.includes('ads-') || this.$nuxt.$route.name === 'ads') {
        this.dropdown = 'ads';
      }
    },
    showAds() {
      this.dropdown = 'ads';

    }
  }
}
</script>

<style lang="scss">
  @import 'assets/SidebarSection.scss';
</style>
