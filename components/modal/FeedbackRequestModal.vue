<template>
  <div v-if="show" :key="'frm'+show" class="modal-global fr-modal">
    <div class="modal-content-global">
      <div class="modal-content-header-close" @click="onCancel"></div>
      <div class="modal-content-header">Служба поддержки</div>
      <template v-if="user">
        <template v-if="send">
          <div class="modal-body">
            <div class="text-center">
              <img src="/papertray.png" width="170" height="170" alt=""/>
              <p class="fw-bold">Спасибо за Ваше обращение!</p>
              <p>Мы ответим Вам в скором времени.</p>
            </div>
            <div class="modal-footer justify-content-center">
              <button @click="toMain" class="fr-modal__button fr-modal__button__back">На главную</button>
              <button @click="toFeedback" class="fr-modal__button" >К списку запросов</button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="modal-body">
            <div class="text-center">
              <img src="/chat.png" width="140" height="100" alt=""/>
              <p class="fw-bold">Вас приветствует команда CarCity.kz.</p>
              <p>Чтобы помочь Вам максимально оперативно, нам важны все детали.<br>Опишите подробно суть запроса и прикрепите файл. Будем благодарны за предложения по улучшению функционала нашего сайта.</p>          </div>
            <div class="mb-3">
              <label for="fr-title"  class="form-label mb-1"><span class="text-danger">*</span> Тема</label>
              <input id="fr-title" class="form-control" v-model="form.title" placeholder="Напишите тему"/>
            </div>
            <div class="mb-3">
              <label for="fr-description" class="form-label mb-1"><span class="text-danger">*</span> Описание</label>
              <textarea id="fr-description" rows="4" class="form-control" v-model="form.description" placeholder="Опишите проблему"></textarea>
            </div>
            <div class="mb-3">
              <input ref="file" v-on:change="handleFileUpload"  type="file" accept=".jpg,.jpeg,.png,.bmp,.pdf,.txt,.xls,.xlsx,.doc,.docx">
            </div>
          </div>
          <div class="modal-footer">
            <button @click="onCancel" class="fr-modal__button fr-modal__button__back">Отмена</button>
            <button @click="onSuccess" :disabled="isNotValid"  class="fr-modal__button" >Отправить</button>
          </div>
        </template>
      </template>
      <template v-else>
        <div @click="onCancel" class="fr-modal__user text-center">
          <div><img src="/cone.png" width="130" height="130" alt=""/></div>
          <div class="">
            Чтобы отправить запрос<br class="d-lg-block d-none"/> <NuxtLink to="/login">войдите в систему</NuxtLink><br class="d-lg-block d-none"/> или <NuxtLink to="/registration">зарегистрируйтесь</NuxtLink>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import IconCheck from "../icons/IconCheck";
  import IconClose from "../icons/IconClose";
  export default {
    name: "FeedbackRequestModal",
    components: {IconClose, IconCheck},
    data(){
      return {
        send: false,
        sending: false,
        form :{
          user_id: null,
          role_id: null,
          title: null,
          description: null,
          feedback_request_theme_id: null,
          file: null
        }
      }
    },
    computed:{
      user(){
        return this.$store.state.localStorage.user;
      },
      show() {
        return this.$store.state.localStorage.feedbackRequestModal;
      },
      isNotValid(){
        return !this.form.description ||!this.form.title || this.sending;
      }
    },
    emits:['success', 'cancel'],
    methods:{
      async handleFileUpload(e){
        if (e.target && e.target.files) {
          this.form.file = e.target.files[0];
        } else {
          this.form.file = null;
        }
      },
      clearForm(){
        this.form = {
          user_id: null,
          role_id: null,
          description: null,
          title: null,
          feedback_request_theme_id: null,
          file: null
        };
        this.$store.commit('localStorage/setFeedbackRequestModal',false);
      },
      async toMain(){
        this.onCancel();
        await this.$router.push('/');
      },
      async toFeedback(){
        this.onCancel();
        await this.$router.push('/profile/feedback');
      },
      async onSuccess(){

        this.sending = true;
        this.form.user_id = this.user.id;
        this.form.role_id = this.user.role_id;

        let formData = new FormData();

        for ( let key in this.form ) {
          formData.append(key, this.form[key]);
        }
        let auth  = this.$toast.show('Отпарвляем запрос ...');

        const res = await this.$store.dispatch('localStorage/createFeedbackRequest', formData);

        if (res.id) {
          this.send = true;
        }
        this.sending = false;

        auth.goAway(0);
      },
      onCancel(){
        this.send = false;
        this.clearForm();
      }
    }
  }
</script>

<style lang="scss">
  .fr-modal {
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
