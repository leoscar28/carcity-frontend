<template>
    <div class="widget-review-with-banner">
      <WidgetSimplyBanner :item="item.user_banner" :customer="item.customer" :status="item.status"/>
      <WidgetReview :item="item" :date="makeDate(item.created_at)"/>
      <template v-if="item.status === 40">
        <div class="widget-review-with-banner__comment pt-3">
          <button @click="showComment = true" class="btn btn-outline-primary">Причина удаления</button>
        </div>
        <UserReviewComment  :comment="item.comment" :show="showComment" @close="showComment = false" />
      </template>
    </div>
</template>

<script>
    import WidgetReview from "./WidgetReview";
    import WidgetSimplyBanner from "./WidgetSimplyBanner";
    import UserReviewComment from "./modal/UserReviewComment";
    export default {
        name: "WidgetReviewWithBanner",
      components: {UserReviewComment, WidgetSimplyBanner, WidgetReview},
      data(){
          return {showComment:false}
      },
      props:{
          item:{
            type:Object,
            required: true
          }
      },
      computed:{
        monthsShort(){
          return this.$store.state.localStorage.lang.formatLocale.monthsShort
        },
        user(){
          return this.$store.state.localStorage.user;
        },
        isAdmin(){
          return [2].includes(this.user.id)
        }
      },
      methods:{
        makeDate(date){
          if (date) {
            date = new Date(date);
            let day = String(date.getDate()).padStart(2,'0');
            let month = this.monthsShort[date.getMonth()].toLowerCase();
            let year = String(date.getFullYear());
            let hour = String(date.getHours()).padStart(2,'0');
            let minutes = String(date.getMinutes()).padStart(2,'0');
            return [day +' ' + month + ' ' + year, [hour, minutes].join(':')].join(' ');
          }
          return '';
        },
      }
    }
</script>

<style lang="scss">
  .widget-review-with-banner {
    width:100%;
    display: flex;
    flex-direction: column;
    padding: 24px;
    background: #ffffff;
    border-radius: 16px;
    max-width: 100%;
    overflow: hidden;
    height: max-content;

    @media (max-width: 768px) {
      padding: 16px;
      font-size: 14px;
    }
  }
</style>
