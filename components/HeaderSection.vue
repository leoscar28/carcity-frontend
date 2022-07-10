<template>
  <header class="header-section">
    <div class="header-section-main">
      <div class="header-section-main-left" :class="{'header-section-main-left-close':$store.state.localStorage.sidebar}" @click="$store.commit('localStorage/toggleSidebar');">
        <div class="header-section-main-left-icon">
          <div></div>
        </div>
        <NuxtLink to="/">
          <div class="header-section-main-left-logo"></div>
        </NuxtLink>
      </div>
      <div class="header-section-main-right">
        <div class="header-section-main-right-input">
          <div class="header-section-main-right-input-icon"></div>
          <input type="text" placeholder="Поиск">
        </div>
        <div class="header-section-main-right-menu">
          <div class="header-section-main-right-menu-notification" @click.stop="notificationShow = !notificationShow" onselectstart="return false;">
            <div class="header-section-main-right-menu-notification-count" v-show="notificationViewCount> 0">{{notificationViewCountTitle}}</div>
            <div class="header-section-main-right-menu-dropdown-notification" :class="{'header-section-main-right-menu-dropdown-notification-show':notificationShow}" @click.stop>
              <div class="header-section-main-right-menu-dropdown-main-notification">
                <template v-if="notifications.length > 0">
                  <div class="header-section-main-right-menu-dropdown-main-title">Уведомления</div>
                  <div class="header-section-main-right-menu-dropdown-main-list">
                    <notification-item v-for="(notification,key) in notifications" :notification="notification" :key="key"></notification-item>
                  </div>
                  <div class="header-section-main-right-menu-dropdown-main-footer" @click="notificationShow = false;$store.commit('localStorage/setNotificationModal',true)">
                    Показать все
                  </div>
                </template>
                <div class="header-section-main-right-menu-dropdown-main-empty" v-else>
                  <div class="header-section-main-right-menu-dropdown-main-empty-icon"></div>
                  <div class="header-section-main-right-menu-dropdown-main-empty-title">Уведомлении нет</div>
                </div>
              </div>
            </div>
          </div>
          <div class="header-section-main-right-menu-user">
            <div class="header-section-main-right-menu-user-icon" v-if="user.image_id" :style="{'background-image':'url('+user.image_id.src+')'}"></div>
            <div class="header-section-main-right-menu-user-icon" v-else>
              <div>{{ user.name[0] }}</div>
            </div>
            <div class="header-section-main-right-menu-user-title">{{user.name}}</div>
            <div class="header-section-main-right-menu-dropdown">
              <div class="header-section-main-right-menu-dropdown-main">
                <NuxtLink to="/profile">
                  <div class="header-section-main-right-menu-dropdown-main-item">
                    <div class="header-section-main-right-menu-dropdown-main-item-icon header-section-main-right-menu-dropdown-main-item-icon-user"></div>
                    <div class="header-section-main-right-menu-dropdown-main-item-title">Профиль</div>
                  </div>
                </NuxtLink>
                <div class="header-section-main-right-menu-dropdown-main-item" @click="logout">
                  <div class="header-section-main-right-menu-dropdown-main-item-icon header-section-main-right-menu-dropdown-main-item-icon-logout"></div>
                  <div class="header-section-main-right-menu-dropdown-main-item-title">Выход</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio src="/sound/sound.mp3" preload="auto" ref="audio"></audio>
  </header>
</template>

<script>
import Notification from "@/components/modal/Notification";
export default {
  name: "HeaderSection",
  components: {Notification},
  data() {
    return {
      notificationShow: false
    }
  },
  watch: {
    notificationShow(val) {
      if (val) {
        this.updateView();
      }
    }
  },
  mounted() {
    if (this.user.role_id !== 1) {
      this.$echo.channel("notification."+this.user.id).on("notification", (res) => {
        this.newNotification(res);
      });
    } else {
      this.$echo.channel("notificationTenant."+this.user.id).on("notificationTenant", (res) => {
        this.newNotification(res);
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
    notificationViewCount() {
      if (this.user.role_id !== 1) {
        return this.$store.state.localStorage.notificationViewCount;
      }
      return this.$store.state.localStorage.notificationTenantViewCount;
    },
    notificationViewCountTitle() {
      let count = this.notificationViewCount;
      if (count > 9) {
        return '+9';
      }
      return count;
    },
    notificationCount() {
      if (this.user.role_id !== 1) {
        return this.$store.state.localStorage.notificationCount;
      }
      return this.$store.state.localStorage.notificationTenantCount;
    },
    notifications() {
      let notifications;
      if (this.user.role_id !== 1) {
        notifications = this.$store.state.localStorage.notifications;
      } else {
        notifications = this.$store.state.localStorage.notificationsTenant;
      }
      if (notifications.length > 3) {
        return [notifications[0],notifications[1],notifications[2]];
      }
      return notifications;
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideNotifications);
  },
  async created() {
    document.addEventListener('click', this.hideNotifications);
    this.$store.commit('localStorage/setNotificationModal',false);
    if (this.user.role_id !== 1) {
      await this.$store.dispatch('localStorage/getViewNotificationCount', this.user.id);
      await this.$store.dispatch('localStorage/getNotificationCount', this.user.id);
      let res = await this.$store.dispatch('localStorage/getNotifications', {
        user_id: this.user.id,
        skip: 0
      });
      this.$store.commit('localStorage/setNotifications', res);
    } else {
      await this.$store.dispatch('localStorage/getViewNotificationTenantCount', this.user.id);
      await this.$store.dispatch('localStorage/getNotificationTenantCount', this.user.id);
      let res = await this.$store.dispatch('localStorage/getNotificationsTenant', {
        user_id: this.user.id,
        skip: 0
      });
      this.$store.commit('localStorage/setNotificationsTenant', res);
    }
  },
  methods: {
    async newNotification(res) {
      if (res.hasOwnProperty('notification')) {
        if (this.user.role_id !== 1) {
          await this.$store.dispatch('localStorage/getViewNotificationCount', this.user.id);
          await this.$store.dispatch('localStorage/getNotificationCount', this.user.id);
          let res = await this.$store.dispatch('localStorage/getNotifications', {
            user_id: this.user.id,
            skip: 0
          });
          this.$store.commit('localStorage/setNotifications', res);
        } else {
          await this.$store.dispatch('localStorage/getViewNotificationTenantCount', this.user.id);
          await this.$store.dispatch('localStorage/getNotificationTenantCount', this.user.id);
          let res = await this.$store.dispatch('localStorage/getNotificationsTenant', {
            user_id: this.user.id,
            skip: 0
          });
          this.$store.commit('localStorage/setNotificationsTenant', res);
        }
        try {
          await this.$refs.audio.play();
        } catch (e) {
          console.log(e);
        }
      }
    },
    logout() {
      this.$store.commit('localStorage/setUser',false);
      this.$router.replace({path: '/login'});
    },
    hideNotifications() {
      this.notificationShow = false;
    },
    async updateView() {
      let view = [];
      this.notifications.forEach(item => {
        if (item.view === 0) {
          view.push(item.id);
        }
      });
      if (view.length > 0) {
        if (this.user.role_id !== 1) {
          await this.$store.dispatch('localStorage/setNotificationView', {
            user_id: this.user.id,
            ids: view
          });
        } else {
          await this.$store.dispatch('localStorage/setNotificationTenantView', {
            user_id: this.user.id,
            ids: view
          });
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "assets/HeaderSection.scss";
</style>
