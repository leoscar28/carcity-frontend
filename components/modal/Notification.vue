<template>
  <div class="modal-global" :class="{'modal-hidden':!$store.state.localStorage.notificationModal}">
    <div class="modal-content-global">
      <div class="modal-content-header-close" @click="$store.commit('localStorage/setNotificationModal',false)"></div>
      <div class="modal-content-header" style="border: none;">Уведомления</div>
      <div class="modal-content-notification">
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Подпишите договоры и приложения</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-orange"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Подпишите договоры и приложения</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ выгружены из 1C</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ выгружены из 1C</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ выгружены из 1C</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ выгружены из 1C</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ выгружены из 1C</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ выгружены из 1C</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ выгружены из 1C</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
        <div class="header-section-main-right-menu-dropdown-main-list-item"><div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail"><div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Акты выполненных работ выгружены из 1C</div> <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">от 15.02.2022</div></div> <div class="header-section-main-right-menu-dropdown-main-list-item-time">2 мин назад</div></div>
      </div>
      <div class="request-section-main-footer" onselectstart="return false;">
        <div class="request-section-main-footer-pagination">
          <div class="request-section-main-footer-pagination-item-left"></div>
          <div class="request-section-main-footer-pagination-item request-section-main-footer-pagination-item-sel">
            <div>1</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>2</div>
          </div>
          <div class="request-section-main-footer-pagination-item">
            <div>3</div>
          </div>
          <div class="request-section-main-footer-pagination-item-right"></div>
        </div>
        <div class="request-section-main-footer-count">
          <div>10 из 100 страниц</div>
          <div class="request-section-main-footer-count-selected">найдено записей 1000</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification"
}
</script>

<style scoped>

</style>
