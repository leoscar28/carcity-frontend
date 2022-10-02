<template>
  <span class="widget-announcement-status" :class="colorClass">{{text}}</span>
</template>

<script>
export default {
  name: "WidgetAnnouncementStatus",
  props:{
    status:Number
  },
  computed:{
    user(){
      return this.$store.state.localStorage.user;
    },
    text(){
      let statuses = {0: 'Не прочитано', 1: 'Прочитано'};
      return statuses[this.status];
    },
    colorClass(){
      switch (this.status) {
        case 0:
          return 'widget-announcement-status--yellow';
        case 1:
          return 'widget-announcement-status--green';
      }
    }
  },
}
</script>

<style lang="scss">
.widget-announcement-status {
  padding: 1px 8px;
  border-radius: 2px;
  color: #8C8C8C;
  background: #F5F5F5;
  border: 1px solid #D9D9D9;

  &--green {
    color: #52C41A;
    background: #F6FFED;
    border-color: #B7EB8F;
  }

  &--yellow {
    color: #FAAD14;
    background: #FFFBE6;
    border-color: #FFE58F;
  }
}
</style>
