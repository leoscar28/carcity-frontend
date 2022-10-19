<template>
  <NuxtLink :to="'/promotions/'+item.id" class="widget-ubf" @click.self.native="">
    <div class="widget-ubf__sub">
      <div class="widget-ubf__sub__image">
        <img v-if="item.images.length" :src="item.images[0].path" :alt="item.title" />
        <img v-else-if="item.type === 2" src="/default.jpg" alt=""/>
        <img v-else src="/default2.jpg" alt=""/>
      </div>
      <div class="widget-ubf__sub__room">
        <div class="widget-ubf__sub__room__id">{{ item.room.title}}</div>
        <div class="widget-ubf__sub__room__floor">{{ item.room.tier.title}}</div>
      </div>
    </div>
    <div class="widget-ubf__content">
      <div class="widget-ubf__content__views">
        <Icon name="views"/> {{ item.view_count }}
      </div>
      <div class="widget-ubf__content__header">
        <div class="widget-ubf__content__header__title">{{item.title}}</div>
        <div class="widget-ubf__content__header__like">
          <Favorite :id="item.id"/>
        </div>
      </div>
      <div v-if="item.reviews" class="widget-ubf__content__reviews">
        <star-rating :padding="4" :increment="0.1" :show-rating="false" :star-size="15" :rating="Number(item.reviews.rating)" :read-only="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" />
        <span v-if="item.reviews.count" class="widget-ubf__content__reviews__count">{{item.reviews.count}} отзывов</span>
      </div>
      <div class="widget-ubf__content__description">{{item.description}}</div>
    </div>
  </NuxtLink>
</template>

<script>
    import Icon from "./icons/Icon";
    import StarRating from 'vue-star-rating'
    import Favorite from "./Favorite";
    export default {
        name: "WidgetUserBannerFront",
      components: {Favorite, Icon, StarRating},
      props:['item'],
      computed: {
        user(){
          return this.$store.state.localStorage.user
        }
      }
    }
</script>

<style lang="scss">
  .widget-ubf {

    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    overflow: hidden;
    font-size: 14px;
    border-radius: 16px;
    width: calc(20% - 16px);
    height: max-content;

    @media (max-width: 1278px) {
      width: calc(25% - 15px);
    }

    @media (max-width: 1024px) {
      width: calc(33% - 13px);
    }

    @media (max-width: 768px) {
      width:100%;
      flex-direction: row;
    }

    &__sub {
      padding: 16px;
      position: relative;
      width: 100%;

      @media (max-width: 768px) {
        width: 50%;
      }

      &__image {
        display: flex;
        width: 100%;
        padding-top: 75%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
        }
      }

      &__room {
        position: absolute;
        left: auto;
        right: -1px;
        top: -1px;
        border-radius: 0 0 0 4px;
        overflow: hidden;

        &__id {
          padding: 2px 8px;
          color: #274985;
          background: radial-gradient(36.1% 175.31% at 50% 50.6%, #FFDE00 0%, #FBB03F 100%);
          font-weight: 700;
        }

        &__floor {
          padding: 2px 8px;
          color: #FFFFFF;
          background: #274985;
          font-weight: 500;
        }
      }

    }

    &__content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      grid-gap: 4px;

      @media (max-width: 768px) {
        width: 50%;
      }

      &__views {
        color: #8c8c8c;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }

      &__header {
        display: flex;
        flex-direction: row;
        grid-gap: 8px;
        justify-content: space-between;

        &__like {
          display: flex;
          align-items: baseline;

          .icon {
            cursor: pointer;
          }
        }

        &__title {
          font-size: 16px;
          line-height: 22px;
          font-weight: 700;
          color: #1E1E1E;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -moz-box;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          box-orient: vertical;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          min-height: 44px;

          @media (max-width:768px) {
            -webkit-line-clamp: 3;
            line-clamp: 3;
          }
        }
      }

      &__reviews {
        display: flex;
        grid-gap: 4px;
        align-items: center;
        &__count {
          font-size: 12px;
          padding-top: 3px;
        }

      }

      &__description {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -moz-box;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        color: #1E1E1E;
      }
    }

  }
</style>
