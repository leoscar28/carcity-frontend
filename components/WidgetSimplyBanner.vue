<template>
  <div class="widget-simply-banner">
    <div class="widget-simply-banner__image">
      <img v-if="item.images.length" :src="item.images[0].path" alt="" />
      <img v-else src="/default.jpg" alt="" />
    </div>
    <div class="widget-simply-banner__content">
      <div class="widget-simply-banner__content__header">
        <div class="widget-simply-banner__content__header__title">{{ item.title }}</div>
        <div class="widget-simply-banner__content__header__status" :class="{'widget-simply-banner__content__header__status--un': isUnpublish}" :key="'is'+isUnpublish">
            <template v-if="isUnpublish">
              <span class="widget-simply-banner__content__header__status__description">Отзыв был удален</span> <Icon name="info_red"/>
            </template>
            <template v-else>
              <span class="widget-simply-banner__content__header__status__description">Опубликован</span> <Icon name="publish"/>
            </template>
        </div>
      </div>
      <div class="widget-simply-banner__content__body">
        {{ item.description }}
      </div>
      <div v-if="isAdmin" class="widget-simply-banner__content__footer">
        <div>{{ createdDate }} {{customer.company}}</div><div>ID: {{item.id}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from "./icons/Icon";
  export default {
    name: "WidgetSimplyBanner",
    components: {Icon},
    props: {
      item: {
        type: Object,
        required: true
      },
      customer:Object,
      date: String,
      status: Number
    },
    computed:{
      isUnpublish(){
        return this.status === 40;
      },
      user(){
        return this.$store.state.localStorage.user;
      },
      isAdmin(){
        return [2].includes(this.user.id)
      },
      createdDate(){
        let date = new Date(this.item.created_at);
        let day = String(date.getDate()).padStart(2,'0');
        let month = String(date.getMonth() + 1).padStart(2,'0');
        let year = String(date.getFullYear());
        return [day, month, year].join('.');
      }
    }
  }
</script>

<style lang="scss">
  .widget-simply-banner {
    display: flex;
    grid-gap: 8px;
    border-bottom:1px solid #F0F0F0;
    padding: 12px 0;

    &__image {
      img {
        height: 34px;
        width: 34px;
        border-radius: 100%;
        overflow: hidden;
      }
    }

    &__content {
      width:100%;
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &__title {
          font-size: 18px;
          font-weight: 700;
        }
        &__status {
          color: #52C41A;
          display: flex;
          align-items: center;
          grid-gap: 8px;

          @media (max-width:768px) {
            align-items: flex-start;
            &__description {
              display: none;
            }
          }
          &--un {
            color:#FF4D5A;
          }
        }
      }
      &__footer {
        font-size:14px;
        color: #8c8c8c;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
