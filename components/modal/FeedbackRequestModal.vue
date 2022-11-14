<template>
  <div v-if="show" :key="'frm'+show" class="modal-global fr-modal">
    <div class="modal-content-global">
      <div class="modal-content-header-close" @click="onCancel"></div>
      <div class="modal-content-header">{{ language[current][0] }}</div>
      <template v-if="user">
        <template v-if="send">
          <div class="modal-body">
            <div class="text-center">
              <img src="/papertray.png" width="170" height="170" alt=""/>
              <p class="fw-bold">{{ language[current][1] }}</p>
              <p>{{ language[current][2] }}</p>
            </div>
            <div class="modal-footer justify-content-center">
              <button @click="toMain" class="fr-modal__button fr-modal__button__back">{{ language[current][3] }}</button>
              <button @click="toFeedback" class="fr-modal__button" >{{ language[current][4] }}</button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="modal-body">
            <div class="text-center">
              <img src="/chat.png" width="140" height="100" alt=""/>
              <p class="fw-bold">{{ language[current][5] }}</p>
              <p>{{ language[current][6] }}</p>
            </div>
            <div class="mb-3">
              <label for="fr-title"  class="form-label mb-1"><span class="text-danger">*</span> {{ language[current][7] }}</label>
              <input id="fr-title" class="form-control" v-model="form.title" :placeholder="language[current][8]"/>
            </div>
            <div class="mb-3">
              <label for="fr-description" class="form-label mb-1"><span class="text-danger">*</span> {{ language[current][9] }}</label>
              <textarea id="fr-description" rows="4" class="form-control" v-model="form.description" :placeholder="language[current][10]"></textarea>
            </div>
            <div class="mb-3">
              <input ref="file" v-on:change="handleFileUpload" type="file" accept=".jpg,.jpeg,.png,.bmp,.pdf,.txt,.xls,.xlsx,.doc,.docx" id="feedbackInput" style="display: none;">
              <label class="fr-modal__button" for="feedbackInput">{{language[current][11]}}</label>
              <span v-if="this.form.file" style="font-size: 12px;">{{this.form.file.name}}</span>
              <span v-else style="font-size: 12px;">{{language[current][12]}}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="onCancel" class="fr-modal__button fr-modal__button__back">{{language[current][13]}}</button>
            <button @click="onSuccess" :disabled="isNotValid"  class="fr-modal__button" >{{language[current][14]}}</button>
          </div>
        </template>
      </template>
      <template v-else>
        <div @click="onCancel" class="fr-modal__user text-center">
          <div><img src="/cone.png" width="130" height="130" alt=""/></div>
          <div class="">
            {{language[current][15]}}<br class="d-lg-block d-none"/> <NuxtLink to="/login">{{language[current][16]}}</NuxtLink><br class="d-lg-block d-none"/> {{language[current][17]}} <NuxtLink to="/registration">{{language[current][18]}}</NuxtLink>
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
        },
        language: [
          [
            'Служба поддержки',
            'Спасибо за Ваше обращение!',
            'Мы ответим Вам в скором времени.',
            'На главную',
            'К списку запросов',
            'Вас приветствует команда CarCity.kz.',
            'Чтобы помочь Вам максимально оперативно, нам важны все детали.\n Опишите подробно суть запроса и прикрепите файл. Будем благодарны за предложения по улучшению функционала нашего сайта.',
            'Тема',
            'Напишите тему',
            'Описание',
            'Опишите проблему',
            'Выберите файл',
            'Файл не выбран',
            'Отмена',
            'Отправить',
            'Чтобы отправить запрос',
            'войдите в систему',
            'или',
            'зарегистрируйтесь'
          ],
          [
            'Қолдау қызметі',
            'Xабарласқаныңызға  рахмет!',
            'Біз сізге жақын арада жауап береміз',
            'Басты бетке',
            'Сұраныстар тізіміне' ,
            'Сізді  carcity.kz командасы қарсы алады.',
            'Сізге мүмкіндігінше тезірек көмектесу үшін, біз үшін әрбір мәліметтер маңызды.\n Сұраныстың мәнін егжей-тегжейлі сипаттаңыз және файлды тіркеңіз. Сайтымыздың функционалдық жұмысын жақсарту бойынша ұсыныстарыңызға алғыс білдіреміз.',
            'Тақырып',
            'Тақырып жазыңыз',
            'Сипаттама',
            'Мәселені сипаттаңыз',
            'Файлды таңдаңыз',
            'Файл таңдалмаған',
            'Бас тарту',
            'Жіберу',
            'Өтінім беру үшін',
            'Жүйеге кіріңіз',
            'немесе',
            'тіркеліңіз'
          ]
        ]
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
      },
      current() {
        return this.$store.state.localStorage.current;
      },
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
