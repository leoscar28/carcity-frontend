<template>
  <div class="header-section-main-right-menu-dropdown-main-list-item">
    <template v-if="notification.completion_id">
      <template v-if="notification.type === 1">
        <template v-if="user.role_id !== 1">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-upload"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ выгружены из 1C</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от {{notification.completion_id.created_at}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
        <template v-else>
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Новый Акт выполненных работ</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от {{notification.created_at}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.completion_id.number }}</span></div>
          </div>
        </template>
      </template>
      <template v-if="notification.type === 2">
        <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-check"></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ подписаны клиентами</div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от {{notification.completion_id.created_at}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
        </div>
      </template>
    </template>
    <template v-else-if="notification.application_id">
      <template v-if="notification.type === 1">
        <template v-if="user.role_id !== 1">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-orange header-section-main-right-menu-dropdown-main-list-item-icon-upload"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Договора и приложения выгружены из 1C</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от {{notification.application_id.created_at}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
        <template v-else>
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-orange"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Новый Договора и приложения</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.application_id.number }} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
      </template>
      <template v-else-if="notification.type === 2">
        <template v-if="user.role_id !== 1">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-orange header-section-main-right-menu-dropdown-main-list-item-icon-check"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Договоры и приложения подписаны клиентами</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от {{notification.application_id.created_at}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
        <template v-else>
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-orange header-section-main-right-menu-dropdown-main-list-item-icon-check"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Подпишите Договоры и приложения</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.application_id.number}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
      </template>
    </template>
    <template v-else-if="notification.invoice_id">
      <template v-if="notification.type === 1">
        <template v-if="user.role_id !== 1">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green header-section-main-right-menu-dropdown-main-list-item-icon-upload"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Счета на оплату выгружены из 1C</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от {{notification.invoice_id.created_at}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
        <template v-else>
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Новый Счета на оплату</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.invoice_id.number}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
      </template>
      <template v-else-if="notification.type === 2">
        <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green header-section-main-right-menu-dropdown-main-list-item-icon-check"></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Счета на оплату скачаны</div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от {{notification.invoice_id.created_at}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "NotificationItem",
  props: ['notification'],
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    }
  }
}
</script>

<style scoped>

</style>
