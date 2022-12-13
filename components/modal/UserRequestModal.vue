<template>
  <div v-if="show" :key="'ur'+show" class="modal-global ur-modal">
    <div class="modal-content-global">
      <div class="modal-content-header-close" @click="onCancel"></div>
      <div class="modal-content-header">{{language[current][0]}}</div>
      <template v-if="user">
        <template v-if="!formSent">
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label mb-1"><span class="text-danger">*</span> {{language[current][1]}}</label>
            <input v-model="form.phone" v-mask="'+7 (###) ###-####'" :placeholder="language[current][2]" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label mb-1"><span class="text-danger">*</span> {{language[current][3]}}</label>
            <select v-model="form.category_id" class="form-control">
              <option v-if="!form.category_id" value="">{{language[current][4]}}</option>
              <option v-for="category in categories" :value="category.id" :key="'c'+category.id">{{category.name}}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label mb-1"><span class="text-danger">*</span> {{language[current][5]}}</label>
            <select v-model="form.brand_id" class="form-control">
              <option v-if="!form.brand_id" value="">{{language[current][6]}}</option>
              <option v-for="brand in brands" :value="brand.id" :key="'b'+brand.id">{{brand.name}}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label mb-1"><span class="text-danger">*</span> {{language[current][7]}}</label>
            <textarea id="description" class="form-control" v-model="form.description" :placeholder="language[current][8]"></textarea>
          </div>
          <p class="mb-1"><IconCheck/> {{language[current][9]}}</p>
          <p class="mb-1"><IconClose/> {{language[current][10]}}</p>
        </div>
        <div class="modal-footer text-end">
          <button @click="onCancel" class="ur-modal__button ur-modal__button__back">{{language[current][11]}}</button>
          <button @click="onSuccess" :disabled="isNotValid"  class="ur-modal__button" >{{language[current][12]}}</button>
        </div>
        </template>
        <template v-else>
          <div class="modal-body text-center">
            <b>{{language[current][18]}}</b><br>
            {{language[current][17]}}
          </div>
          <div class="modal-footer text-end">
            <button @click="onCancel" class="ur-modal__button">ОК</button>
          </div>
        </template>
      </template>
      <template v-else>
        <div @click="onCancel" class="ur-modal__user text-center">
          <div><img src="/cone.png" width="130" height="130" alt=""/></div>
          <div class="">
            {{language[current][13]}}<br class="d-lg-block d-none"/> <NuxtLink to="/login">{{language[current][14]}}</NuxtLink><br class="d-lg-block d-none"/> {{language[current][15]}} <NuxtLink to="/registration">{{language[current][16]}}</NuxtLink>
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
        },
        formSent: false,
        language: [
          [
            'Заявка на запчасть',
            'Телефон',
            'Введите телефон',
            'Категория',
            'Выберите категорию',
            'Марки',
            'Выберите марку автомобиля ',
            'Описание',
            'Опишите подробно заказываемую запчасть',
            'Правильно: амортизатор передний правый',
            'Неправильно: амортизатор',
            'Отмена',
            'Отправить',
            'Чтобы разместить заявку',
            'войдите в систему',
            'или',
            'зарегистрируйтесь',
            'Ваша заявка размещена',
            'Спасибо!'
          ],
          [
            'Қосалқы бөлшекке өтінім',
            'Телефон',
            'Телефонды енгізіңіз',
            'Санат',
            'Санатты таңдаңыз',
            'Марклер',
            'Автомобилдың маркасын таңдаңыз',
            'Сипаттама',
            'Тапсырыс берілген бөлікті егжей тегжейлі сипаттаңыз',
            'Дұрыс: алдыңғы оң жақ амортизатор',
            'Дұрыс емес: амортизатор',
            'Бас тарту',
            'Жіберу',
            'Өтінім беру үшін',
            'Жүйеге кіріңіз ',
            'немесе',
            'тіркеліңіз',
            'Сіздің өтінішіңіз орналастырылды',
            'Рахмет!'
          ],
        ]
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
      },
      current() {
        return this.$store.state.localStorage.current;
      },
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
        this.formSent = false;
      },
      async onSuccess(){
        this.form.user_id = this.user.id;
        let auth  = this.$toast.show('Отпарвляем заявку ...');
        const res = await this.$store.dispatch('localStorage/createUserRequest', this.form);

        if (res.id) {
          this.formSent = true;
        }

        auth.goAway(0);
      },
      onCancel(){
        this.clearForm();
        this.$store.commit('localStorage/setUserRequestModal',false);
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
