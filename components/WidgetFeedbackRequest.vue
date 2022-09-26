<template>
  <NuxtLink :to="`/profile/feedback/${item.id}`" class="widget-request-feedback">
    <div class="widget-request-feedback__header mb-3">
      <div class="widget-request-feedback__header__title">
        Запрос №{{item.id}}
      </div>
    </div>
    <div class="widget-request-feedback__content row">
      <div class="col-md-3 mb-md-3 mb-1">
        <div class="text-gray-600">Дата создания</div>
      </div>
      <div class="col-md-9 mb-md-3 mb-2">
        {{makeDate(item.created_at)}}
      </div>
    </div>
    <div class="widget-request-feedback__content row">
      <div class="col-md-3 mb-md-3 mb-1">
        <div class="text-gray-600">Тема</div>
      </div>
      <div class="col-md-9 mb-md-3 mb-2">
        {{item.title}}
      </div>
    </div>
    <div class="widget-request-feedback__content row">
      <div class="col-md-3 mb-md-3 mb-1">
        <div class="text-gray-600">Статус</div>
      </div>
      <div class="col-md-9 mb-md-3 mb-2">
        <WidgetFeedbackRequestStatus :status="item.status"/>
      </div>
    </div>
    <div class="widget-request-feedback__content row">
      <div class="col-md-3 mb-md-3 mb-1">
        <div class="text-gray-600">Описание</div>
      </div>
      <div class="col-md-9">
        {{item.first_message.description}}
      </div>
    </div>
  </NuxtLink>
</template>

<script>

    import IconCheck from "./icons/IconCheck";
    import Icon from "./icons/Icon";
    import WidgetFeedbackRequestStatus from "./WidgetFeedbackRequestStatus"
    export default {
      name: "WidgetFeedbackRequest",
      components: {WidgetFeedbackRequestStatus, Icon, IconCheck},
      props:{
          item:{
            type:Object,
            required: true
          },
          index: Number
      },
      computed:{
        user(){
          return this.$store.state.localStorage.user;
        }
      },
      methods:{
        makeDate(date){
          if (date) {
            date = new Date(date);
            let day = String(date.getDate()).padStart(2,'0');
            let month = String(date.getMonth() + 1).padStart(2,'0');
            let year = String(date.getFullYear());
            let hour = String(date.getHours()).padStart(2,'0');
            let minutes = String(date.getMinutes()).padStart(2,'0');
            return [[day, month, year].join('.'), [hour, minutes].join(':')].join(' ');
          }
          return '';
        },
      }
    }
</script>

<style lang="scss">
  .widget-request-feedback {
    padding:24px;
    border-radius: 16px;
    background: #ffffff;
    min-width: 100%;
    color: #1E1E1E;

    @media (max-width: 768px) {
      padding: 16px;
      font-size: 14px;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      grid-gap: 8px;

      &__title  {
        font-size: 18px;
      }
    }

    &__footer {
      border-top:1px solid #F0F0F0;
    }
  }
</style>
