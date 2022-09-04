<template>
    <div class="widget-ub">
      <div class="widget-ub__sub">
        <div class="widget-ub__sub__image">
          <img v-if="item.images.length" :src="item.images[0].path" alt=""/>
          <img v-else-if="item.type === 2" src="/default.jpg" alt=""/>
          <img v-else src="/default2.jpg" alt=""/>
        </div>
        <div class="widget-ub__sub__room">
          <div class="widget-ub__sub__room__id">{{ item.room.title}}</div>
          <div class="widget-ub__sub__room__floor">{{ item.room.tier.title}}</div>
        </div>
      </div>
      <div class="widget-ub__content">
        <div class="widget-ub__content__header">
          <div class="widget-ub__content__header__title">{{ item.title }}</div>
          <div class="widget-ub__content__header__status" :style="color">
            <span class="widget-ub__content__header__status__description">{{ statuses[item.status] }}</span>
            <Icon v-if="[10,15].includes(item.status)" :key="item.id+'y'" name="loading_yellow"/>
            <Icon v-else-if="item.status === 20" :key="item.id+'r'" name="rework_red"/>
            <Icon v-else-if="item.status === 30" :key="item.id+'u'" name="unpublish"/>
            <Icon v-else-if="item.status === 31" :key="item.id+'p'" name="publish"/>
            <Icon v-else-if="item.status === 40" :key="item.id+'u'" name="unpublish"/>
          </div>
        </div>
        <div v-if="item.reviews" class="widget-ub__content__rating">
          <star-rating :padding="4" :increment="0.1" :show-rating="false" :star-size="15" :rating="Number(item.reviews.rating)" :read-only="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" />
          {{ item.reviews.count }} отзывов
        </div>
        <div class="widget-ub__content__description">
          {{ item.description }}
        </div>
        <div class="widget-ub__content__buttons">
          <template v-if="user.role_id === 1">
            <template v-if="item.status === 20">
              <span @click="$store.commit('localStorage/setEditableBanner', item)" class="widget-ub__content__button"><Icon name="rework_blue" key="rework"/> Доработать</span>
              <span @click="showComment = true" class="widget-ub__content__button"><Icon name="info" key="info"/> Причина отказа</span>
              <span @click="del()" class="widget-ub__content__button red"><Icon name="delete" key="delete"/> Удалить</span>
            </template>
            <template v-else-if="[30, 31].includes(item.status)">
              <template v-if="item.up !== 1 && item.status === 31">
                <span @click="up()" class="widget-ub__content__button"><Icon name="top" key="view"/> Поднять</span>
              </template>
              <template v-if="item.status !== 31">
                <span @click="publish()" class="widget-ub__content__button"><Icon name="publish" key="publish"/> Опубликовать</span>
              </template>
              <span @click="$store.commit('localStorage/setEditableBanner', item)" class="widget-ub__content__button"><Icon name="edit" key="edit"/> Редактировать</span>
              <NuxtLink :to="['/ads',item.id, 'view'].join('/')" class="widget-ub__content__button"><Icon name="view" key="view"/> Перейти в объявление</NuxtLink>
              <span @click="archive()" class="widget-ub__content__button red"><Icon name="close"/> Деактивировать</span>
            </template>
            <template v-else-if="item.status === 40">
              <span @click="activate()" class="widget-ub__content__button"><Icon name="rework_blue" key="activate"/> Активировать</span>
            </template>
          </template>
          <template v-else-if="user.role_id === 2">
              <NuxtLink  v-if="[10, 15].includes(item.status)" :to="['/ads',item.id, 'confirm'].join('/')" class="widget-ub__content__button"><Icon name="confirm" key="confirm"/> Согласовать</NuxtLink>
              <NuxtLink v-else :to="['/ads',item.id, 'view'].join('/')" class="widget-ub__content__button"><Icon name="view" key="view"/> Перейти в объявление</NuxtLink>
          </template>
          <NuxtLink v-else :to="['/ads',item.id, 'view'].join('/')" class="widget-ub__content__button"><Icon name="view" key="view"/> Перейти в объявление</NuxtLink>

        </div>
        <div class="widget-ub__content__footer">
          <div class="widget-ub__content__footer__infos">
            <span v-if="item.status === 31" class="widget-ub__content__footer__info"><Icon name="calendar"/> от {{startDate}} до {{endDate}}</span>
            <span v-if="item.view_count" class="widget-ub__content__footer__info d-md-flex d-none"><Icon name="views"/> {{ item.view_count }}</span>
            <span v-if="item.phone_view_count" class="widget-ub__content__footer__info d-md-flex d-none"><Icon name="calls"/> {{ item.phone_view_count }}</span>
            <span v-if="item.reviews" class="widget-ub__content__footer__info d-md-flex d-none"><Icon name="reviews"/> {{ item.reviews.count }}</span>
            <span v-if="user.role_id !== 1 && item.user.company" class="widget-ub__content__footer__info"><Icon name="shop"/> {{ item.user.company}}</span>
          </div>
          <div class="widget-ub__content__footer__id">ID: {{ item.id }}</div>
          <template v-if="user.role_id === 1 && item.status === 40">
              <span @click="activate()" class="widget-ub__content__button"><Icon name="rework_blue" key="activate"/> Активировать</span>
          </template>
          <div v-else @click="showButtons = true" class="widget-ub__content__footer__more d-md-none d-block">Подробнее ...</div>
        </div>
      </div>
      <UserBannerComment v-if="item.status === 20" :comment="item.comment" :show="showComment" @close="showComment = false" />
      <div v-if="showButtons" :key="'wur'+item.id" class="modal-global">
        <div class="modal-content-global">
          <div class="modal-content-header-close" @click=" showButtons= false"></div>
          <div class="modal-content-header">{{item.title}}</div>
            <div class="modal-body d-flex flex-column gap-1">
              <div>
                <div class="widget-ub__content__header__status" :style="color">
                  <span class="widget-ub__content__header__status__description--modal">{{ statuses[item.status] }}</span>
                  <Icon v-if="[10,15].includes(item.status)" :key="item.id+'y'" name="loading_yellow"/>
                  <Icon v-else-if="item.status === 20" :key="item.id+'r'" name="rework_red"/>
                  <Icon v-else-if="item.status === 30" :key="item.id+'u'" name="unpublish"/>
                  <Icon v-else-if="item.status === 31" :key="item.id+'p'" name="publish"/>
                  <Icon v-else-if="item.status === 40" :key="item.id+'u'" name="unpublish"/>
                </div>
              </div>
              <div v-if="item.reviews" class="widget-ub__content__rating d-flex flex-row gap-2 align-items-center">
                <star-rating :padding="4" :increment="0.1" :show-rating="false" :star-size="14" :rating="Number(item.reviews.rating)" :read-only="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" />
                {{ item.reviews.count }} отзывов
              </div>
              <div  v-if="item.view_count || item.phone_view_count || item.reviews" class="d-flex flex-wrap flex-row gap-2">
                <span v-if="item.view_count" class="widget-ub__content__footer__info"><Icon name="views"/> {{ item.view_count }}</span>
                <span v-if="item.phone_view_count" class="widget-ub__content__footer__info"><Icon name="calls"/> {{ item.phone_view_count }}</span>
                <span v-if="item.reviews" class="widget-ub__content__footer__info"><Icon name="reviews"/> {{ item.reviews.count }}</span>
              </div>
              <div v-if="user.role_id !== 1 && item.user.company" class="d-flex flex-wrap flex-row gap-2">
                <span class="widget-ub__content__footer__info"><Icon name="shop"/> {{ item.user.company}}</span>
              </div>
            </div>
          <div  v-if="(user.role_id === 1  && [20,30,31,40].includes(item.status)) || (user.role_id === 2 && [10, 15, 20,30,31,40].includes(item.status))" class="modal-footer justify-content-start">
            <div class="widget-ub__content__buttons widget-ub__content__buttons--modal">
              <template v-if="user.role_id === 1">
                <template v-if="item.status === 20">
                  <span @click="$store.commit('localStorage/setEditableBanner', item)" class="widget-ub__content__button"><Icon name="rework_blue" key="rework"/> Доработать</span>
                  <span @click="showComment = true" class="widget-ub__content__button"><Icon name="info" key="info"/> Причина отказа</span>
                  <span @click="del()" class="widget-ub__content__button red"><Icon name="delete" key="delete"/> Удалить</span>
                </template>
                <template v-else-if="[30, 31].includes(item.status)">
                  <template v-if="item.up !== 1 && item.status === 31">
                    <span @click="up()" class="widget-ub__content__button"><Icon name="top" key="view"/> Поднять</span>
                  </template>
                  <template v-if="item.status !== 31">
                    <span @click="publish()" class="widget-ub__content__button"><Icon name="publish" key="publish"/> Опубликовать</span>
                  </template>
                  <span @click="$store.commit('localStorage/setEditableBanner', item)" class="widget-ub__content__button"><Icon name="edit" key="edit"/> Редактировать</span>
                  <NuxtLink :to="['/ads',item.id, 'view'].join('/')" class="widget-ub__content__button"><Icon name="view" key="view"/> Перейти в объявление</NuxtLink>
                  <span @click="archive()" class="widget-ub__content__button red"><Icon name="close"/> Деактивировать</span>
                </template>
              </template>
              <template v-else>
                  <NuxtLink v-if="[10, 15].includes(item.status)" :to="['/ads',item.id, 'confirm'].join('/')" class="widget-ub__content__button"><Icon name="confirm" key="confirm"/> Согласовать</NuxtLink>
                  <NuxtLink v-else :to="['/ads',item.id, 'view'].join('/')" class="widget-ub__content__button"><Icon name="view" key="view"/> Перейти в объявление</NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import Icon from "./icons/Icon";
    import UserBannerComment from "./modal/UserBannerComment";
    import StarRating from 'vue-star-rating'

    export default {
      name: "WidgetUserBanner",
      components: {UserBannerComment, Icon, StarRating},
      props: ['item'],
      emits: ['refresh'],
      computed: {
        startDate(){
          let date = new Date(this.item.published_at);
          let day = String(date.getDate()).padStart(2,'0');
          let month = String(date.getMonth() + 1).padStart(2,'0');
          let year = String(date.getFullYear());
          return [day, month].join('.');
        },
        endDate(){
          let date = new Date(this.item.published_at);
          date.setDate(date.getDate() + 90)
          let day = String(date.getDate()).padStart(2,'0');
          let month = String(date.getMonth() + 1).padStart(2,'0');
          let year = String(date.getFullYear());
          return [day, month].join('.');
        },
        color() {
          let c = null;

          switch (this.item.status) {
            case 10:
              c = '#FAAD14';
              break;
            case 15:
              c = '#FAAD14';
              break;
            case 20:
              c = '#FF4D5A';
              break;
            case 31:
              c = '#52C41A';
              break;
            default:
              c = '#8C8C8C';
              break;
          }
          return {color: c};
        },
        statuses() {
          return this.$store.state.localStorage.statuses;
        },
        user() {
          return this.$store.state.localStorage.user;
        },
      },
      data(){
        return {
          loading:false,
          showComment: false,
          showButtons: false
        }
      },
      methods:{
        async publish(){
          if (!this.loading) {
            this.loading = true;
            let activation  = this.$toast.show('Публикуем ...');
            let result = await this.$store.dispatch('localStorage/publishUserBanner', this.item.id);
            await activation.goAway(1500);
            this.loading = false;
            if (result == 1) {
              this.$emit('refresh');
            } else {
              let alert = this.$toast.show('Достигнут лимит опубликованных объявлений');
              alert.goAway(3000);
            }
          }
        },
        async unpublish(){
          if (!this.loading) {
            this.loading = true;
            let activation  = this.$toast.show('Снимаем с публикации ...');
            await this.$store.dispatch('localStorage/unpublishUserBanner', this.item.id);
            activation.goAway(1500);
            this.loading = false;
            this.$emit('refresh');
          }
        },
        async archive(){
          if (!this.loading) {
            this.loading = true;
            let activation  = this.$toast.show('Отправляем в архив ...');
            await this.$store.dispatch('localStorage/archiveUserBanner', this.item.id);
            activation.goAway(1500);
            this.loading = false;
            this.$emit('refresh');
          }
        },
        async del(){
          if (!this.loading) {
            if (confirm("Вы дейстивтельно хотите удалить данное объявление безвозвратно?") === true) {
              this.loading = true;
              let activation  = this.$toast.show('Удаляем ...');
              await this.$store.dispatch('localStorage/deleteUserBanner', this.item.id);
              activation.goAway(1500);
              this.loading = false;
              this.$emit('refresh');
            }
          }
        },
        async activate(){
          if (!this.loading) {
            this.loading = true;
            let activation = this.$toast.show('Активация ...');
            let result = await this.$store.dispatch('localStorage/activateUserBanner', this.item.id);
            activation.goAway(1500);
            this.loading = false;
            this.$emit('refresh');
          }
        },
        async up(){
          if (!this.loading) {
            this.loading = true;
            let activation = this.$toast.show('Поднимаем ...');
            await this.$store.dispatch('localStorage/upUserBanner', this.item.id);
            this.item.up = 1;
            activation.goAway(1500);
            this.loading = false;
            this.$emit('refresh');
          }
        },
      }
    }
</script>

<style lang="scss">
  .widget-ub {

    display: flex;
    flex-direction: row;
    background: #FFFFFF;
    overflow: hidden;
    font-size: 14px;

    & + & {
      border-top: 1px solid #F0F0F0;

      @media (max-width:768px) {
        border-top: 16px solid #F0F0F0;
      }
    }

    &__sub {
      padding:16px;
      position: relative;
      width: 170px;

      @media (max-width:768px) {
        width:50%;
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
        left:-1px;
        top:-1px;
        border-radius: 0 0 4px 0;
        overflow: hidden;

        @media (max-width: 768px) {
          left:auto;
          right:-1px;
          top:-1px;
          border-radius: 0 0 0 4px;
        }
        &__id {
          padding:2px 8px ;
          color: #274985;
          background: radial-gradient(36.1% 175.31% at 50% 50.6%, #FFDE00 0%, #FBB03F 100%);
          font-weight: 700;
        }

        &__floor {
          padding:2px 8px;
          color:#FFFFFF;
          background: #274985;
          font-weight: 500;
        }
      }

    }

    &__content {
      width:calc(100% - 170px);
      padding:16px;
      display: flex;
      flex-direction: column;
      grid-gap: 8px;

      @media (max-width:768px) {
        width:50%;
        grid-gap: 4px;
        justify-content: space-between;
      }

      &__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &__status {
          display: flex;
          align-items: center;
          grid-gap: 8px;

          @media (max-width:768px) {
            align-items: flex-start;
            &__description {
              display: none;
              &--modal {
                display: block;
              }
            }
          }
        }

        &__title {
          font-size: 16px;
          line-height: 22px;
          font-weight: 700;
          color: #274985;
          @media (max-width:768px) {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -moz-box;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-clamp: 2;
            box-orient: vertical;
          }
        }
      }

      &__rating {
        color: #274985;
        font-size:13px;
      }

      &__description {
        line-height: 20px;
        color: #1E1E1E;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -moz-box;
        -moz-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        box-orient: vertical;

        @media (max-width:768px) {
          display:none;
        }
      }

      &__buttons {
        font-weight: 500;
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        grid-gap: 12px;
        color: #274985;
        @media (max-width:768px) {
          display:none;
          &--modal {
            display: flex;
            grid-gap: 8px;
            flex-direction: column;
          }
        }
      }

      &__button {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: .2s all ease-in-out;

        &.red {
          color: #FF4D5A;
        }
        &:hover {
          opacity: 0.9;
        }
      }

      &__footer {
        font-weight: 500;
        color:#8C8C8C;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        @media (max-width:768px) {
          flex-direction: column;
        }

        &__more {
          color: #274985;
          font-weight: 600;
        }

        &__infos {
          display: flex;
          flex-direction: row;
          grid-gap: 12px;

          @media (max-width:768px) {
            grid-gap: 2px;
            flex-direction: column;
          }
        }

        &__info {
          color: #8C8C8C!important;
          display: flex;
          align-items: center;
          line-height: 20px;
          @media (max-width:768px) {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -moz-box;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            line-clamp: 1;
            box-orient: vertical;

            .icon {
              display: block;
              float: left;
            }
          }
        }
      }
    }
  }
</style>
