<template>
  <div class="body-section-content">
    <div class="mailing-form">
      <div class="mailing-form__header">Рассылка</div>
      <div class="mailing-form__content">
        <div class="mb-3">
          <label class="form-label"><span class="text-danger">*</span> Кому</label>
          <select v-model="form.to" class="form-control form-control-sm">
            <option :value="1">Арендаторам</option>
            <option :value="5">Пользователям</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label"><span class="text-danger">*</span> Заголовок</label>
          <input v-model="form.title" class="form-control form-control-sm" placeholder="Введите заголовок"/>
        </div>
        <div class="mb-3">
          <label class="form-label"><span class="text-danger">*</span> Текст письма</label>
          <textarea v-model="form.text"  rows="10" class="form-control form-control-sm" placeholder="Введите текст рассылки"></textarea>
        </div>
        <div class="text-end">
          <button @click="sendMail()" :disabled="!formDataValid || sending" class="mailing-form__button">Отправить письмо</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "MailingForm",
      data(){
          return {
            sending: false,
            form: {
              to: 1,
              title: '',
              text: ''
            }
          }
      },
      computed:{
          user(){
            return this.$store.state.localStorage.user;
          },
        formDataValid() {
          let f = this.form;
          return f.title && f.text;
        },
      },
      methods: {
          async sendMail(){

            let toast  = this.$toast.show('Создаем рассылку ...');
            this.sending = true;
            let res = await this.$store.dispatch('localStorage/mailing', this.form);
            console.log(res)
            await toast.goAway(5000);
            this.sending = false;
            this.form = {
                to: 1,
                title: '',
                text: ''
            };
          }
      }
    }
</script>

<style lang="scss">
  .mailing-form {
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
