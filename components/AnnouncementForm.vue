<template>
  <div class="body-section-content">
    <div class="announcement-form">
      <div class="announcement-form__header">Новое уведомление</div>
      <div class="announcement-form__content">
        <div class="mb-3">
          <label class="form-label"><span class="text-danger">*</span> Тема</label>
          <input v-model="form.title" class="form-control form-control-sm" placeholder="Введите тему"/>
        </div>
        <div class="mb-3">
          <label class="form-label"><span class="text-danger">*</span> Описание</label>
          <ckeditor :editor="editor" :config="editorConfig" v-model="form.description" ></ckeditor>
        </div>
        <div class="mb-3">
          <label class="form-label">Ссылка для ознокомления</label>
          <input v-model="form.link" class="form-control form-control-sm" placeholder="Введите адрес ссылки если нужна"/>
        </div>
        <div class="mb-3">
          <input ref="file" v-on:change="handleFileUpload"  type="file" accept=".jpg,.jpeg,.png,.bmp,.pdf,.txt,.xls,.xlsx,.doc,.docx">
        </div>
        <div class="mb-3">
          <label class="form-label">Кому</label>
          <Select2 v-show="customers.length !== form.ids.length" v-model="form.ids" :options="customers" :settings="{allowClear:true,multiple:true,placeholder:'Выберите получателей или оставьте пустым для отправки всем..'}" />
        </div>
        <div class="mb-3">
          <div class="announcement-link" v-if="customers.length === form.ids.length" @click="form.ids=[]">Отменить выбор</div>
          <div class="announcement-link" v-else @click="form.ids = Array.from(customers, (item) => item.id )">Выбрать всех</div>
        </div>
        <div class="mb-3">
          <div class="row">
            <div v-for="customer in customers" class="col-lg-3 col-md-4">
              <label class="announcement-label"><input type="checkbox" v-model="form.ids" :value="customer.id"/> {{customer.text}}</label>
            </div>
          </div>
        </div>
        <div class="text-end">
          <button @click="createAnnouncement()" :disabled="!formDataValid || sending" class="announcement-form__button">Отправить</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use( CKEditor );

import Select2 from 'v-select2-component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: "AnnouncementForm",
  components: {Select2},
  data(){
    return {
      editor: ClassicEditor,
      editorConfig: {
        placeholder: 'Введите текст уведомления'
      },
      customers:[],
      sending: false,
      form: {
        title: '',
        description: '',
        link: '',
        ids:[],
        file: null
      }
    }
  },
  async created() {
    this.customers = await this.$store.dispatch('localStorage/getActiveCustomers');
  },
  computed:{
    user(){
      return this.$store.state.localStorage.user;
    },
    formDataValid() {
      let f = this.form;
      return f.title && f.description;
    },
  },
  methods: {
    async handleFileUpload(e){
      if (e.target && e.target.files) {
        this.form.file = e.target.files[0];
      } else {
        this.form.file = null;
      }
    },
    async createAnnouncement(){
      let toast  = this.$toast.show('Создаем уведомление ...');

      let formData = new FormData();

      for ( let key in this.form ) {
        formData.append(key, this.form[key]);
      }

      this.sending = true;
      let res = await this.$store.dispatch('localStorage/createAnnouncement', formData);
      console.log(res)
      await toast.goAway(5000);
      this.sending = false;
      await this.$router.push('/announcement');
    }
  }
}
</script>

<style lang="scss">
.ck-editor__editable_inline {
  min-height: 150px;
}

.announcement-link {
  color: #274985;
  cursor: pointer;
}
.announcement-label {
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  overflow: hidden;
  padding: 3px 0 3px 20px;
  position: relative;
  &:hover {
    background: #E4E4E4;
  }
  input {
    left: 4px;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
  }
}
.announcement-form {
  margin:20px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px rgb(0 0 0 / 5%);

  &__header {
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #f4f4f4;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  &__content {
    padding:15px;
  }

  &__button {
    border-radius: 5px;
    font-size: 12px;
    min-width: 75px;
    padding: 6px 16px;
    background: #274985;
    color: #FFFFFF;
    border: 1px solid  transparent;
    &:disabled {
      opacity: .6;
    }
  }
}

</style>
