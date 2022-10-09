<template>
    <div class="widget-review">
      <div v-if="!isAdmin" class="widget-review__image">
        <img v-if="item.user.image" :src="item.user.image.path" alt="" />
        <img v-else src="/defaultUser.png" alt="" />
      </div>
      <div class="widget-review__content">
        <div class="widget-review__content__header">
          <div class="widget-review__content__header__title">{{ item.user.surname }} {{ item.user.name }}</div>
          <star-rating :padding="5" :show-rating="false" :star-size="18" :increment="0.1" :rating="Number(item.rating)" :read-only="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" />
      </div>
        <div class="widget-review__content__body">
          {{ item.description }}
        </div>
        <div class="widget-review__content__footer">
          {{ date }} <span v-if="isAdmin && item.status === 10" @click="showUnpublishModal = true" class="btn__remove text-danger"><Icon name="close" class="d-block"/>Удалить</span>
          <UserReviewUnpublishModal :show="showUnpublishModal" @cancel="showUnpublishModal = false" @success="disableComment" />
        </div>
      </div>
    </div>
</template>

<script>

    import StarRating from 'vue-star-rating'
    import IconClose from "./icons/IconClose";
    import UserReviewUnpublishModal from "./modal/UserReviewUnpublishModal";
    import Icon from "./icons/Icon";
    export default {
      name: "WidgetReview",
      components: {Icon, UserReviewUnpublishModal, IconClose, StarRating},
        props: {
          item: {
            type: Object,
            required: true
          },
          date: String
        },
      data(){
        return {
          showUnpublishModal:false
        }
      },
      computed:{
        user(){
          return this.$store.state.localStorage.user;
        },
        isAdmin(){
          return [2].includes(this.user.id)
        }
      },
      methods:{
        async disableComment(data){
          this.loading = true;
          let activation  = this.$toast.show('Удаляем ...');
          await this.$store.dispatch('localStorage/deleteUserReview', {id: this.item.id, comment: data.comment});
          activation.goAway(1);
          this.item.status = 40;
          this.item.comment  = data.comment;
          this.loading = false;
          this.showUnpublishModal = false;
        },
      }
    }
</script>

<style lang="scss">

  .btn__remove {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
 .widget-review {
   display: flex;
   grid-gap: 8px;
   padding: 12px 0;
   max-width: 100%;
   overflow: hidden;

   & + & , & + .widget-review-with-banner__comment {
     border-top: 1px solid #F0F0F0;
   }

   &__image {
     img {
       height: 34px;
       width: 34px;
       border-radius: 100%;
       overflow: hidden;
     }
   }

   &__content {
     width: 100%;
     &__header {
       display: flex;
       align-items: center;
       justify-content: space-between;
       &__title {
         font-weight: 600;
       }
     }
     &__footer {
       font-size:14px;
       color: #8c8c8c;
     }
   }
 }
</style>
