<template>
  <div v-if="show" :key="'ur'+show" class="modal-global ur-modal">
    <div class="modal-content-global">
      <div class="modal-content-header-close" @click="onCancel"></div>
      <div class="modal-content-header">Заявка на запчасть</div>
      <template v-if="user">
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label mb-1"><span class="text-danger">*</span> Телефон</label>
            <input v-model="form.phone" v-mask="'+7 (###) ###-####'" placeholder="Введите телефон" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label mb-1"><span class="text-danger">*</span> Категория</label>
            <select v-model="form.category_id" class="form-control">
              <option v-if="!form.category_id" value="">Выберите категорию</option>
              <option v-for="category in categories" :value="category.id" :key="'c'+category.id">{{category.name}}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label mb-1"><span class="text-danger">*</span> Марка</label>
            <select v-model="form.brand_id" class="form-control">
              <option v-if="!form.brand_id" value="">Выберите марку</option>
              <option v-for="brand in brands" :value="brand.id" :key="'b'+brand.id">{{brand.name}}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label mb-1"><span class="text-danger">*</span> Описание</label>
            <textarea id="description" class="form-control" v-model="form.description" placeholder="Опишите подробно заказываемые запчасти"></textarea>
          </div>
          <p class="mb-1"><IconCheck/> Правильно: амортизатор передний правый</p>
          <p class="mb-1"><IconClose/> Неправильно: амортизатор</p>
        </div>
        <div class="modal-footer text-end">
          <button @click="onCancel" class="ur-modal__button ur-modal__button__back">Отмена</button>
          <button @click="onSuccess" :disabled="isNotValid"  class="ur-modal__button" >Отправить</button>
        </div>
      </template>
      <template v-else>
        <div @click="onCancel" class="ur-modal__user text-center">
          <div><img src="/cone.png" width="130" height="130" alt=""/></div>
          <div class="">
            Чтобы разместить заявку<br class="d-lg-block d-none"/> <NuxtLink to="/login">войдите в систему</NuxtLink><br class="d-lg-block d-none"/> или <NuxtLink to="/registration">зарегистрируйтесь</NuxtLink>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import {mask} from 'vue-the-mask'
  import IconCheck from "../icons/IconCheck";
  import IconClose from "../icons/IconClose";
  export default {
    name: "UserRequestModal",
    components: {IconClose, IconCheck},
    data(){
      return {
        brands: [],
        categories: [],
        sending: false,
        form :{
          user_id: null,
          phone: null,
          description: null,
          category_id: '',
          brand_id: ''
        }
      }
    },
    async created(){
      this.categories = await this.$store.dispatch('localStorage/listDictionarySpareParts');
      this.brands = await this.$store.dispatch('localStorage/listDictionaryBrands');
    },
    directives:{mask},
    computed:{
      user(){
        return this.$store.state.localStorage.user;
      },
      show() {
        return this.$store.state.localStorage.userRequestModal;
      },
      isNotValid(){
        return !this.form.phone || !this.form.category_id || !this.form.brand_id || !this.form.description;
      }
    },
    emits:['success', 'cancel'],
    methods:{
      clearForm(){
        this.form = {
          user_id: null,
          phone: null,
          description: null,
          category_id: '',
          brand_id: ''
        };
        this.$store.commit('localStorage/setUserRequestModal',false);
      },
      async onSuccess(){
        this.form.user_id = this.user.id;
        let auth  = this.$toast.show('Отпарвляем заявку ...');
        const res = await this.$store.dispatch('localStorage/createUserRequest', this.form);

        if (res.id) {
          this.clearForm();
        }

        auth.goAway(0);
      },
      onCancel(){
        this.clearForm();
      }
    }
  }
</script>

<style lang="scss">
  .ur-modal {

    &__user {
      font-size: 20px;
      font-weight: 700;
      line-height: 26px;
      padding: 24px;

      a {
        color: #274985;
      }
    }
    &__button{
      border-radius: 100px;
      min-width: 75px;
      padding: 10px 16px;
      background: #274985;
      color: #FFFFFF;
      border: 1px solid  transparent;
      &:disabled {
        opacity: .8;
      }
      &__back {
        color: #1E1E1E;
        background: #FAFAFA;
        border: 1px solid #F4F4F4;
      }
    }
  }

</style>
