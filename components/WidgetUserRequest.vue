<template>
  <div class="widget-request">
    <div class="widget-request__header mb-3">
      <div class="widget-request__header__title">
        Заявка <template v-if="user.role_id === 5">№{{index}}</template>
      </div>
      <div class="widget-request__header__status" :class="{'widget-request__header__status--success':isSuccess}">
        <template v-if="isSuccess">
          <span class="widget-request__header__status__description">Запчасть найдена</span> <IconCheck class="d-block m-0"/>
        </template>
        <template v-else>
          <span class="widget-request__header__status__description">Заявка актуальна</span> <Icon name="loading_yellow" class="d-block m-0"/>
        </template>
      </div>
    </div>
    <div class="widget-request__content row">
      <div class="col-md-3 mb-3">
        <div class="text-gray-600">Указанный телефон</div>
        <div>{{item.phone}}</div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="text-gray-600">Категория</div>
        <div v-if="item.category">{{item.category.name}}</div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="text-gray-600">Марка</div>
        <div v-if="item.brand">{{item.brand.name}}</div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="text-gray-600">Дата</div>
        <div v-if="item.created_at">{{makeDate(item.created_at)}}</div>
      </div>
      <div class="col-md-12">
        <div class="text-gray-600">Описание</div>
        <div>{{item.description}}</div>
      </div>
    </div>
    <div v-if="!isSuccess && (item.user_id === user.id)" class="widget-request__footer mt-3 pt-3">
      <button @click="setFound" class="btn btn-outline-primary" :disabled="loading">Я нашел что искал</button>
    </div>

  </div>
</template>

<script>

    import IconCheck from "./icons/IconCheck";
    import Icon from "./icons/Icon";
    export default {
      name: "WidgetUserRequest",
      components: {Icon, IconCheck},
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
        },
        isSuccess(){
          return this.item.status === 40;
        }
      },
      data(){
        return {loading:false};
      },
      methods:{
        async setFound(){
          if (!this.loading) {
            this.loading = true;
            await this.$store.dispatch('localStorage/unpublishUserRequest', this.item.id);
            this.item.status = 40;
            this.loading = false;
          }
        },
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
  .widget-request {
    padding:24px;
    border-radius: 16px;
    background: #ffffff;
    min-width: 100%;

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

      &__status {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        grid-gap: 8px;
        color: #FAAD14;
        font-size: 14px;

        @media (max-width:768px) {
          align-items: flex-start;
          &__description {
            display: none;
          }
        }

        &--success {
          color: #52C41A;
        }
      }
    }

    &__footer {
      border-top:1px solid #F0F0F0;
    }
  }
</style>
