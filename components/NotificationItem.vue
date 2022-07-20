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
    <template v-else-if="notification.user_banner_id">
      <template v-if="notification.type === 10">
        <template v-if="user.role_id !== 1">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Новое объявление на модерации</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_banner_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
        <template v-else>
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Объявление отправлено на модерацию</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_banner_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
      </template>
      <template v-if="notification.type === 15">
        <template v-if="user.role_id !== 1">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Измененное объявление на модерации</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_banner_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
        <template v-else>
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Объявление отправлено на повторную модерацию</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_banner_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
      </template>
      <template v-if="notification.type === 20">
        <template v-if="user.role_id !== 1">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Объявление отправлено на доработку</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_banner_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
        <template v-else>
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Объявление требует доработки</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_banner_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
      </template>
      <template v-if="notification.type === 30">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Объявление снято с публикации</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_banner_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
      </template>
      <template v-if="notification.type === 31">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Объявление опубликовано</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_banner_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
      </template>
      <template v-if="notification.type === 40">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title" >Объявление деактивировано</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_banner_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
      </template>
    </template>
    <template v-else-if="notification.user_request_id">
      <template v-if="notification.type === 1">
        <template v-if="[1,2,3,4,5].includes(user.role_id)">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Новая заявка на запчасть</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_request_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
      </template>
      <template v-if="notification.type === 2">
        <template v-if="[1,2,3,4,5].includes(user.role_id)">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Пользователь нашел запчасть</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_request_id.id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
      </template>
    </template>
    <template v-else-if="notification.user_review_id">
      <template v-if="notification.type === 1">
        <template v-if="user.role_id !== 1">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Новый отзыв на арендатора</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_review_id.user_banner_id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
        <template v-else>
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Новый отзыв</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_review_id.user_banner_id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
      </template>
      <template v-if="notification.type === 2">
        <template v-if="user.role_id !== 1">
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Отзыв на арендатора удален</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_review_id.user_banner_id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
        <template v-else>
          <div class="header-section-main-right-menu-dropdown-main-list-item-icon header-section-main-right-menu-dropdown-main-list-item-icon-green"></div>
          <div class="header-section-main-right-menu-dropdown-main-list-item-detail">
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-title">Администратор удалил отзыв</div>
            <div class="header-section-main-right-menu-dropdown-main-list-item-detail-date">{{notification.user_review_id.user_banner_id}} • <span class="header-section-main-right-menu-dropdown-main-list-item-time">{{ notification.created_at }}</span></div>
          </div>
        </template>
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
