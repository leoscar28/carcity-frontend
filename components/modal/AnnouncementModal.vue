<template>
  <div v-if="announcementRecipient" :key="'am'+announcementRecipient.id" class="modal-global fr-modal">
    <div class="modal-content-global">
      <div class="modal-content-header">Уведомление</div>
          <div class="modal-body">
            <div class="text-center">
              <h4 class="fw-bold">{{announcementRecipient.announcement.title}}</h4>
            </div>
            <div class="mb-3" v-html="announcementRecipient.announcement.description"></div>
            <div v-if="announcementRecipient.file" class="mb-3">
              <a :href="announcementRecipient.file.path" download @click="clicked = true" target="_blank"><img src="/attachment.png" /> {{announcementRecipient.file.title}}</a>
            </div>
            <div v-if="announcementRecipient.announcement.link" class="mb-3">
              Ссылка для ознакомления:  <a :href="announcementRecipient.announcement.link" @click="clicked = true" target="_blank">{{announcementRecipient.announcement.link}}</a>
            </div>
            <label><input type="checkbox" v-model="form.confirm" :disabled="announcementRecipient.file && !clicked ||announcementRecipient.announcement.link && !clicked "/> Ознакомлен</label>
          </div>
          <div class="modal-footer">
            <button @click="onSuccess" :disabled="!form.confirm"  class="fr-modal__button" >Закрыть</button>
          </div>
    </div>
  </div>
</template>

<script>
  import IconCheck from "../icons/IconCheck";
  import IconClose from "../icons/IconClose";
  export default {
    name: "AnnouncementModal",
    components: {IconClose, IconCheck},
    data(){
      return {
        send: false,
        clicked: false,
        form :{
          confirm: false
        }
      }
    },
    computed:{
      user(){
        return this.$store.state.localStorage.user;
      },
      announcementRecipient() {
        return this.$store.state.localStorage.announcementRecipient;
      }
    },
    emits:['success', 'cancel'],
    methods:{
      clearForm(){
        this.form = {
          confirm: false
        };
        this.$store.commit('localStorage/setAnnouncementRecipient',false);
        this.$store.dispatch('localStorage/getNotViewedAnnouncement', {user_id:this.user.id});
      },
      async onSuccess(){
        let auth  = this.$toast.show('Отпарвляем ...');
        const res = await this.$store.dispatch('localStorage/viewAnnouncement', this.announcementRecipient.id);

        auth.goAway(0);

        if (res.id) {
          this.send = true;
          this.clearForm();
        }
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
