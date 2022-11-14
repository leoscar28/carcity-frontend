<template>
  <span class="widget-feedback-status" :class="colorClass">{{text}}</span>
</template>

<script>
export default {
  name: "WidgetFeedbackRequestStatus",
  props:{
    status:Number
  },
  computed:{
    user(){
      return this.$store.state.localStorage.user;
    },
    text(){
      let userStatuses = {10: 'Запрос обрабатывается', 20: 'На ваш запрос ответили', 30: 'Запрос обрабатывается', 40: 'Закрыт'};
      let adminStatuses = {10: 'Новый', 20: 'Отвечен', 30: 'Ожидает ответа', 40: 'Закрыт'};
      return this.user.role_id === 5 ? userStatuses[this.status] : adminStatuses[this.status]
    },
    colorClass(){
      switch (this.status) {
        case 10:
          return 'widget-feedback-status--blue';
        case 20:
          return 'widget-feedback-status--yellow';
        case 30:
          return 'widget-feedback-status--orange';
        case 40:
          return 'widget-feedback-status--green';
      }
    }
  },
}
</script>

<style lang="scss">
.widget-feedback-status {
  padding: 1px 8px;
  border-radius: 2px;
  color: #8C8C8C;
  background: #F5F5F5;
  border: 1px solid #D9D9D9;

  &--blue {
    color: #1890FF;
    background: #E6F7FF;
    border-color: #91D5FF;
  }

  &--green {
    color: #52C41A;
    background: #F6FFED;
    border-color: #B7EB8F;
  }

  &--orange {
    color: #ffa500;
    background: #F5F5F5;
    border-color:  #FAAD14;
  }

  &--yellow {
    color: #FAAD14;
    background: #FFFBE6;
    border-color: #FFE58F;
  }

  &--gray {
    color: #8C8C8C;
    background: #F5F5F5;
    border-color:  #D9D9D9;
  }

}
</style>
