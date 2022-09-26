<template>
  <div class="body-section-content" v-cloak>
    <div class="feedback-section" :class="{'feedback-section--is-front':isFront}">
      <div class="feedback-section-header">
        <div class="feedback-section-title"><NuxtLink :to="backUrl" class="feedback-section-title-link"><IconArrow rotate /></NuxtLink> Просмотр запроса №{{feedbackRequest.id}}</div>
        <div class="feedback-section-block">
        <div class="feedback-section-header__content row">
          <div class="col-md-3 mb-md-3 mb-1">
            <div class="text-gray-600">Дата создания</div>
          </div>
          <div class="col-md-9 mb-md-3 mb-2">
            {{makeDate(feedbackRequest.created_at)}}
          </div>
        </div>
        <div class="feedback-section-header__content row">
          <div class="col-md-3 mb-md-3 mb-1">
            <div class="text-gray-600">Тема</div>
          </div>
          <div class="col-md-9 mb-md-3 mb-2">
            {{feedbackRequest.title}}
          </div>
        </div>
        <div class="feedback-section-header__content row">
          <div class="col-md-3 mb-md-0 mb-1">
            <div class="text-gray-600">Статус</div>
          </div>
          <div class="col-md-9">
            <WidgetFeedbackRequestStatus :status="feedbackRequest.status"/>
          </div>
        </div>
        </div>
      </div>

      <div class="feedback-section-main">
        <template v-for="item in feedbackRequest.messages">
          <div class="feedback-section-block" :class="{'feedback-section-block--blue':item.type === 'response'}">
            <div class="feedback-section-block-data-content">
              <div v-if="item.type === 'request'" class="feedback-section-block-data-content-header">{{item.user.name}} {{item.user.surname}}</div>
              <div v-else class="feedback-section-block-data-content-header">Car City</div>
              <div class="feedback-section-block-data-content-description">
                {{item.description}}
              </div>
              <div class="text-gray-600">{{makeDate(item.created_at)}}</div>
            </div>
          </div>
        </template>


        <div v-if="user.role_id === 5 && feedbackRequest.status !== 40" class="feedback-section-block">
          <div class="feedback-section-block-data-content">
            <div class="feedback-section-block-data-content-header">Завершить запрос?</div>
            <div class="feedback-section-block-data-content-description">
              <p>
                Если данный ответ Вас устроил, вы можете завершить запрос
                <br>
                Если Вы не завершите или не ответите на запрос, то он будет закрыт автоматически через 24 часа
              </p>
            </div>
            <button @click="close" class="btn btn-outline-primary">Завершить</button>
          </div>
        </div>

        <div v-if="feedbackRequest.status !== 40" class="feedback-section-block">
          <div class="feedback-section-block-data-content">
            <div class="feedback-section-block-data-content-header">Ответить</div>
            <div class="feedback-section-block-data-content-description">
              <textarea v-model="form.description"  rows="5" class="form-control form-control-sm" placeholder="Напишите ваш ответ"></textarea>
            </div>
            <button @click="addMessage" :disabled="!form.description.length" class="btn btn-primary">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconArrow from "@/components/icons/IconArrow";
  export default {
    name: "FeedbackRequest",
    props:['feedback', 'isFront'],
    emits:['title'],
    components:{IconArrow},
    data(){
      return {
        feedbackRequest: {},
        loading: false,
        form: {
          user_id: null,
          feedback_request_id: null,
          type: 'request',
          description: ''
        }
      }
    },
    fetchOnServer: true,
    async fetch() {
      this.feedbackRequest = await this.$store.dispatch('localStorage/getFeedbackRequest', {id: this.feedback, role_id: this.user.role_id});
      this.$emit('title', 'Просмотр запроса №' + this.feedbackRequest.id);
    },
    computed: {
      user() {
        return this.$store.state.localStorage.user
      },
      monthsShort() {
        return this.$store.state.localStorage.lang.formatLocale.monthsShort
      },
      backUrl() {
        return this.isUser ? '/profile/feedback' : '/feedback';
      },
      isUser() {
        return this.user.role_id === 5;
      },
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
      async close(){
        this.loading = true;
        let closing  = this.$toast.show('Закрываем ...');
        let result = await this.$store.dispatch('localStorage/closeFeedbackRequest', this.feedbackRequest.id);
        closing.goAway(1);
        await this.$router.push(this.backUrl);
        this.loading = false;
      },
      async addMessage(){
        this.loading = true;
        this.form.user_id = this.user.id;
        this.form.role_id = this.user.role_id;
        this.form.feedback_request_id = this.feedbackRequest.id;

        if (this.user.role_id !== 5) {
          this.form.type = 'response';
        }

        let sending  = this.$toast.show('Отправляем ...');
        let resp = await this.$store.dispatch('localStorage/createFeedbackRequestMessage', this.form);
        sending.goAway(1);
        this.loading = false;
        this.$fetch();
      },
    }
  }
</script>

<style lang="scss">

  .feedback-section {
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
      border-radius: 16px;
      width:100%;
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
      &--blue {
        background: #E6F7FF;
      }

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
          &-description {
            margin-bottom: 8px;
          }
        }
      }
    }
  }
</style>
