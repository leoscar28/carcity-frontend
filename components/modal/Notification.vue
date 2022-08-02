<template>
  <div class="modal-global" :class="{'modal-hidden':!notificationModal}">
    <div class="modal-content-global">
      <div class="modal-content-header-close" @click="$store.commit('localStorage/setNotificationModal',false)"></div>
      <div class="modal-content-header" style="border: none;">Уведомления</div>
      <div class="modal-content-notification" v-if="notifications.length > 0">
        <notification-item v-for="(notification,key) in notifications" :notification="notification" :key="key"></notification-item>
      </div>
      <div class="header-section-main-right-menu-dropdown-main-empty" v-else>
        <div class="header-section-main-right-menu-dropdown-main-empty-icon"></div>
        <div class="header-section-main-right-menu-dropdown-main-empty-title">Уведомлении нет</div>
      </div>
      <div class="request-section-main-footer" onselectstart="return false;">
        <div class="modal-content-notification-more" v-if="notifications.length < notificationCount" @click="moreNotifications">
          <span v-if="status">Загрузить ещё</span>
          <span v-else>Загрузка...</span>
        </div>
        <div class="request-section-main-footer-count">
          <div class="request-section-main-footer-count-selected">найдено уведомлении {{notificationCount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  data() {
    return {
      skip: 0,
      notifications: [],
      status: true
    }
  },
  computed: {
    notificationModal() {
      return this.$store.state.localStorage.notificationModal;
    },
    user() {
      return this.$store.state.localStorage.user;
    },
    notificationCount() {
      if (this.user.role_id !== 1) {
        return this.$store.state.localStorage.notificationCount;
      }
      return this.$store.state.localStorage.notificationTenantCount;
    },
  },

  watch: {
    notifications: function () {
      this.updateView();
    },
    notificationModal: async function (val) {
      if (val) {
        this.status = true;
        this.skip = 0;
        let res;
        if (this.user.role_id !== 1) {
          await this.$store.dispatch('localStorage/getViewNotificationCount', this.user.id);
          await this.$store.dispatch('localStorage/getNotificationCount', this.user.id);
          res = await this.$store.dispatch('localStorage/getNotifications', {
            user_id: this.user.id,
            skip: this.skip
          });
        } else {
          await this.$store.dispatch('localStorage/getViewNotificationTenantCount', this.user.id);
          await this.$store.dispatch('localStorage/getNotificationTenantCount', this.user.id);
          res = await this.$store.dispatch('localStorage/getNotificationsTenant', {
            user_id: this.user.id,
            skip: this.skip
          });
        }
        this.skip = res.length;
        this.notifications = res;
      }
    }
  },
  methods: {
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
    },
    async moreNotifications() {
      if (this.status) {
        this.status = false;
        let res;
        if (this.user.role_id !== 1) {
          await this.$store.dispatch('localStorage/getViewNotificationCount', this.user.id);
          await this.$store.dispatch('localStorage/getNotificationCount', this.user.id);
          res = await this.$store.dispatch('localStorage/getNotifications', {
            user_id: this.user.id,
            skip: this.skip
          });
        } else {
          await this.$store.dispatch('localStorage/getViewNotificationTenantCount', this.user.id);
          await this.$store.dispatch('localStorage/getNotificationTenantCount', this.user.id);
          res = await this.$store.dispatch('localStorage/getNotificationsTenant', {
            user_id: this.user.id,
            skip: this.skip
          });
        }
        this.skip += res.length;
        res.forEach(item => {
          this.notifications.push(item);
        });
        this.status = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
