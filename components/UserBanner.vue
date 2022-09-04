<template>
  <div class="body-section-content">
    <div class="banner-section" :class="{'banner-section--is-front':isFront}">
      <div v-if="!isFront" class="banner-section-header">
        <div class="banner-section-title"><NuxtLink :to="backUrl" class="banner-section-title-link"><IconArrow rotate /></NuxtLink> Объявления</div>
      </div>

      <div class="banner-section-main">
        <div v-if="bannerItem.images && bannerItem.images.length && imageView" class="banner-section-block banner-section-block-images">
          <div class="image-view" :style="{backgroundImage: 'url('+ imageView+')'}"></div>
          <div class="image-previews">
            <div v-for="image in bannerItem.images" :key="image.title" @click="imageView = image.path" class="image-preview">
              <img :src="image.path" />
            </div>
          </div>
        </div>

        <div class="banner-section-sidebar">
          <div v-if="isModeration" class="banner-section-block">
            <div class="banner-section-block-title">Модерация</div>
            <p class="banner-section-block-text">Внимательно ознакомьтесь с объявлением арендатора</p>
            <div class="banner-section-block-buttons">
              <button @click="showReworkModal = true" class="btn banner-section-block-button-cancel" :disabled="loading">Отклонить</button>
              <button @click="activate()" class="btn banner-section-block-button-confirm" :disabled="loading">Принять</button>
            </div>
            <UserBannerReworkModal :show="showReworkModal" @cancel="showReworkModal = false" @success="needEdits" />
          </div>
          <div class="banner-section-block">
            <div v-if="bannerItem.room" class="banner-section-block-title text-gray-900">{{ bannerItem.room['room_type'].title }} {{ bannerItem.room.title }}, {{ bannerItem.room['tier'].title }}</div>
            <hr/>
            <template v-if="isFront && !phoneVisible">
              <button @click="showPhone" class="btn btn-outline-primary w-100">Показать номер</button>
            </template>
            <template v-if="!isFront || phoneVisible">
              <WidgetBannerSectionWithIcon icon="phone_blue" :title="bannerItem.employee_name" :subtitle="bannerItem.employee_phone" />
              <WidgetBannerSectionWithIcon v-if="bannerItem.employee_name_additional && bannerItem.employee_phone_additional" icon="phone_blue" :title="bannerItem.employee_name_additional" :subtitle="bannerItem.employee_phone_additional" />
            </template>
          </div>
          <div v-if="bannerItem.reviews" class="banner-section-block banner-section-block__reviews">
            <div class="text-gray-600">Рейтинг продавца</div>
            <div> <star-rating :padding="8" :increment="0.1" :star-size="18" :show-rating="!!bannerItem.reviews.rating" :rating="Number(bannerItem.reviews.rating)" :read-only="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" /></div>
            <div class="banner-section-block__reviews__count"> {{ bannerItem.reviews.count}} отзывов</div>
          </div>
          <div class="banner-section-block">
            <WidgetBannerSectionWithIcon icon="clock_blue" title="Время работы магазина" :subtitle="workTime" />
          </div>
          <div class="banner-section-block">
            <WidgetBannerSectionWithIcon icon="calendar_blue" title="График" :subtitle="workDays" />
          </div>
        </div>

        <div class="banner-section-block  banner-section-block-data">
          <div class="banner-section-block-data-subheader">
            <div v-if="bannerItem.published_at" class="text-gray-600">
              Опубликовано {{ makeDate(bannerItem.published_at) }}
            </div>
            <div v-else class="text-gray-600">
              Создано {{ makeDate(bannerItem.created_at) }}
            </div>
            <div v-if="!isFront" :style="color">
              {{ statuses[bannerItem.status] }}
            </div>
            <div v-else-if="user" class="widget-ubf__content__header__like">
              <Favorite :id="bannerItem.id"/>
            </div>
          </div>
          <div class="banner-section-block-data-main_header">
            {{ bannerItem.title }}
          </div>
          <div v-if="hasCategories" class="banner-section-block-data-content">
            <div class="banner-section-block-data-content-header">Категории <div @click="showCategories = !showCategories" v-text="showCategories ? 'скрыть' : 'показать'" class="show-toggle"></div></div>
            <div v-if="showCategories" class="text-in-bubbles">
              <WidgetTextInBubble v-for="(i, index) in availCats" :text="i.name" :key="index"/>
            </div>
          </div>
          <div v-if="hasBrands"  class="banner-section-block-data-content">
            <div class="banner-section-block-data-content-header">Марки <div @click="showBrands = !showBrands" v-text="showBrands ? 'скрыть' : 'показать'" class="show-toggle"></div></div>
            <div v-if="showBrands" class="text-in-bubbles">
              <WidgetTextInBubble v-for="(i, index) in availBrands" :text="i.name" :key="index"/>
            </div>
          </div>
          <div class="banner-section-block-data-content">
            <div class="banner-section-block-data-content-header">Описание</div>
            <div class="banner-section-block-data-content-description">{{ bannerItem.description }}</div>
          </div>
          <div class="text-gray-600">ID: {{ bannerItem.id }}</div>
        </div>

        <div v-if="!user.id" class="banner-section-block  banner-section-block-data text-center">
          <div><img src="/cone.png" width="130" height="130" alt=""/></div>
          <div class="banner-section-block-data-header">
            Чтобы написать отзыв <NuxtLink to="/login">войдите в систему</NuxtLink><br class="d-lg-block d-none"/> или <NuxtLink to="/registration">зарегистрируйтесь</NuxtLink>
          </div>
        </div>
        <div v-else-if="userCanWriteReview" class="banner-section-block  banner-section-block-data">
          <div class="banner-section-block-data-header">
            Поделитесь своим мнением о данном магазине
          </div>
          <div class="banner-section-block-data-rating">
            Поставьте оценку <star-rating :padding="8" :show-rating="false" :star-size="18" v-model="form.rating" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" />
          </div>
          <textarea v-model="form.description" class="form-control banner-section-block-data-textarea" placeholder="Напишите отзыв"></textarea>
          <div class="banner-section-block-buttons">
            <button @click="sendReview" class="btn btn-outline-primary" :disabled="loading||!form.rating || !form.description.length">Отправить</button>
          </div>
        </div>

        <div v-if="bannerItem.review_items && bannerItem.review_items.length && reviewCount" class="banner-section-block  banner-section-block-data">
          <div class="banner-section-block-data-header">
            Отзывы
          </div>
          <WidgetReview v-for="i in reviewCount" :item="bannerItem.review_items[i-1]" :date="makeDate(bannerItem.review_items[i-1].created_at)" :key="'r' + bannerItem.review_items[i-1].id" />
          <div v-if="reviewCount < bannerItem.review_items.length" class="text-center mt-3">
            <button @click="showMore" class="btn btn-outline-primary">Показать еще</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserBannerReworkModal from "./modal/UserBannerReworkModal";
  export default {
    name: "UserBanner",
    components: {UserBannerReworkModal},
    props:['banner', 'isFront'],
    emits:['title'],
    data(){
      return {
        showCategories: false,
        showBrands: false,
        weekdaysArr:[
          {name:'Пн', id:1},
          {name:'Вт', id:2},
          {name:'Ср', id:3},
          {name:'Чт', id:4},
          {name:'Пт', id:5},
          {name:'Сб', id:6},
          {name:'Вс', id:0},
        ],
        showReworkModal:false,
        rating: 0,
        reviewSend:false,
        bannerItem: {},
        item: false,
        categories: [],
        brands:[],
        loading: false,
        imageView: false,
        phoneVisible: false,
        reviewCount: 0,
        form: {
          rating: 0,
          description: '',
          user_id: null,
          customer_id: null,
          user_banner_id: null
        }
      }
    },
    fetchOnServer: true,
    async fetch() {
      this.bannerItem = await this.$store.dispatch('localStorage/getPromotion', {id: this.banner, role_id: this.user.role_id});
      if (this.bannerItem.type === 1) {
        this.categories = await this.$store.dispatch('localStorage/listDictionarySpareParts');
        this.brands = await this.$store.dispatch('localStorage/listDictionaryBrands');
      } else {
        this.categories = await this.$store.dispatch('localStorage/listDictionaryServices');
      }

      if (this.bannerItem.images && this.bannerItem.images.length) {
        this.imageView = this.bannerItem.images[0].path;
      }
      if (this.bannerItem.review_items && this.bannerItem.review_items.length){
        this.reviewCount = this.bannerItem.review_items.length < 5 ? this.bannerItem.review_items.length : 5;
      }
      await this.getStatuses();
      this.$emit('title',this.bannerItem.title);

    },
    computed:{
      statuses() {
        return this.$store.state.localStorage.statuses;
      },
      color() {
        let c = null;

        switch (this.bannerItem.status) {
          case 10||15:
            c = this.user.role_id !== 1 ? '#1890FF' : '#FAAD14';
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
      user(){
        return this.$store.state.localStorage.user
      },
      monthsShort(){
        return this.$store.state.localStorage.lang.formatLocale.monthsShort
      },
      backUrl(){
        return this.isModeration ? '/ads/new' : '/ads/active';
      },
      isModeration(){
        return [10, 15].includes(this.bannerItem.status) && this.user.role_id !== 1;
      },
      workTime(){
        if (this.bannerItem.time) {
          let t = this.bannerItem.time;
          return [t[0].slice(0,5),t[1].slice(0,5)].join(' по ');
        }
      },
      workDays(){
        if (this.bannerItem.weekdays) {
          let w = this.bannerItem.weekdays;
          let out = '';

          this.weekdaysArr.forEach((value, index) => {
            out += w.includes(value.id) ? `<span>${value.name}</span>` : `<span class="not-work-day">${value.name}</span>`;
          })

          return `<div class="work-days">${out}</div>`
        }
      },
      hasCategories(){
        return this.bannerItem && this.bannerItem.category_id && this.categories && this.categories.length;
      },
      hasBrands(){
        return this.bannerItem && this.bannerItem.brand_id && this.brands && this.brands.length;
      },
      availCats(){
        return  this.categories.filter((i) => {
          return this.bannerItem.category_id.includes(i.id)
        });
      },
      availBrands(){
        return this.brands.filter((i) => {
          return this.bannerItem.brand_id.includes(i.id)
        });
      },
      userCanWriteReview(){
        if (this.user.role_id === 5 && !this.reviewSend) {
          if (this.bannerItem.review_items && this.bannerItem.review_items.length) {
            let rev = this.bannerItem.review_items.filter((i) => {
              return i.user_id === this.user.id
            });
            return !rev.length;
          }
          return true;
        }
        return false;
      }
    },
    methods:{
      async showPhone(){
        await this.$store.dispatch('localStorage/showUserBannerPhone', this.bannerItem.id);
        this.phoneVisible = true;
      },
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
      async getStatuses() {
        if (this.user.role_id === 1) {
          await this.$store.dispatch('localStorage/getUserBannerStatuses');
        } else {
          await this.$store.dispatch('localStorage/getManagerBannerStatuses');
        }
      },
      async activate(){
        this.loading = true;
        let activation  = this.$toast.show('Активация ...');
        let result = await this.$store.dispatch('localStorage/activateUserBanner', this.bannerItem.id);
        activation.goAway(1);
        await this.$router.push('/ads/new');
        this.loading = false;
      },
      async needEdits(data){
        this.loading = true;
        let activation  = this.$toast.show('Отпарвляем на модерацию ...');
        await this.$store.dispatch('localStorage/needEditsUserBanner', {id: this.bannerItem.id, comment: data.comment});
        activation.goAway(1);
        await this.$router.push('/ads/new');
        this.loading = false;
      },
      async sendReview(){
        this.loading = true;
        this.form.user_id = this.user.id;
        this.form.customer_id = this.bannerItem.user_id;
        this.form.user_banner_id = this.bannerItem.id;

        let sending  = this.$toast.show('Отправляем отзыв ...');
        let resp = await this.$store.dispatch('localStorage/createUserReview', this.form);
        sending.goAway(1);
        this.reviewSend = true;
        this.loading = false;
        this.$fetch();
      },
      showMore(){
        let rc =  this.reviewCount + 5;
        this.reviewCount = rc > this.bannerItem.review_items.length ? this.bannerItem.review_items.length : rc;
      }
    }
  }
</script>

<style lang="scss">
  .work-days {
    display: flex;
    flex-direction: row;
    justify-content: left;
    grid-gap: 4px;
    gap: 4px;
    color:#389e0d;
    font-size: 16px;

    .not-work-day {
      color:#f5222d;
    }
  }

  .text-in-bubbles {
    display: flex;
    flex-direction: row;
    grid-gap: 8px;
    gap: 8px;
    flex-wrap: wrap;
  }

  .banner-section {
    margin: 20px;
    grid-gap: 16px;
    gap:16px;
    display: flex;
    flex-direction: column;
    font-size: 16px;

    &--is-front {
      margin:0;
    }

    @media (max-width: 960px) {
      margin: 0 0 16px
    }

    &-block, &-header {
      box-shadow: 0 0 2px 1px rgb(0 0 0 / 5%);
      overflow: hidden;
      background: #fff;
      border-radius: 5px;
      width:100%;

      @media (max-width: 960px) {
        border-radius: 0;
      }


    }

    &-main {
      display: flex;
      flex-wrap: wrap;
      grid-gap: 16px;
      gap: 16px;
    }

    &-title {
      height: 54px;
      display: flex;
      align-items: center;
      gap: 8px;
      grid-gap: 8px;
      padding: 0 10px;
      font-weight: 700;

      &-link {
        display: flex;
        align-items: center;
      }
    }

    &-sidebar {
      width: calc(30% - 16px);
      display: flex;
      flex-direction: column;
      gap: 16px;
      grid-gap: 16px;
      flex-grow: 1;
    }

    &-block {
      padding: 24px;

      @media (max-width: 960px) {
        padding: 16px;
      }

      &__reviews {
        &__count {
          color: #274985;
          font-size:14px;
        }
        .vue-star-rating-rating-text {
          padding-top: 3px;
          font-weight: 500;
        }
      }

      &-button {
        &-cancel, &-confirm {
          width: 50%;
          flex-grow: 1;
          padding: 6px 16px;
          height: 32px;
          border: 1px solid #274985;
          border-radius: 24px;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          transition: .3s opacity ease-in-out;
          &:hover {
            opacity: 0.9;
          }
        }

        &-confirm {
          color:#ffffff;
          background: #274985;
          &:hover {
            color:#ffffff;
          }
        }
        &-cancel {
          border: 1px solid #BFBFBF;
        }
      }

      &-buttons {
        display:flex;
        grid-gap: 4px;
        gap: 4px;
      }

      &-title {
        font-weight: 700;
      }

      &-text {
        margin-bottom: 8px;
      }

      &-images, &-data {
        width: 70%;

        @media (max-width:960px) {
          width: 100%;
        }
      }

      &-images {
        grid-gap: 16px;
        gap: 16px;
        display: flex;
        flex-direction: column;

        .image-view {
          width: 100%;
          border-radius: 16px;
          padding-top:75%;
          background-color: #C4C4C4;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        .image-previews {
          display: flex;
          gap: 16px;
          grid-gap: 16px;

          @media (max-width:960px) {
            gap: 8px;
            grid-gap: 8px;
          }

          .image-preview {
            background-color: #C4C4C4;
            height: 80px;
            width: 80px;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor:pointer;

            @media (max-width:960px) {
              height:60px;
              width:60px;
            }

            &:hover {
              img {
                width:150%;
                height:150%;
              }
            }

            img {
              transition: .2s all ease-in-out;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }

      &-data {
        grid-gap: 12px;
        gap: 12px;
        display: flex;
        flex-direction: column;

        &-textarea {
          padding: 10px 12px;
          border-radius: 8px;
          border-color: #D9D9D9;
        }

        &-rating {
          display: flex;
          gap: 16px;
          grid-gap: 16px;
          flex-wrap: wrap;
        }

        &-subheader {
          display: flex;
          justify-content: space-between;
        }

        &-header {
          font-size: 20px;
          font-weight: 700;
          line-height: 26px;

          a {
            color: #274985;
          }
        }

        &-main_header {
          font-size: 24px;
          font-weight: 700;
          line-height: 30px;
        }

        &-content {
          &-header {
            font-weight: 700;
            margin-bottom: 8px;
            .show-toggle {
              display: inline-block;
              color: #a5a5a5;
              font-weight: 100;
              font-size: 12px;
              cursor: pointer;
              padding: 0 4px;
              &:hover {
                background: #ebebeb
              }
            }
          }
        }
      }
    }
  }
</style>
