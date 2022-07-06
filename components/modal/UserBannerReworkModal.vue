<template>
  <div v-if="show" class="modal-global ub-rework-modal">
    <div class="modal-content-global">
      <div class="modal-content-header-close" @click="onCancel"></div>
      <div class="modal-content-header">Модерация</div>
      <div class="modal-body">
        <div class="form-group">
          <label for="comment" class="form-label">Причина отказа</label>
          <textarea id="comment" class="form-control" v-model="comment"></textarea>
        </div>
      </div>
      <div class="modal-footer text-end">
        <button @click="onCancel" class="ub-rework-modal__button ub-rework-modal__button__back">Отмена</button>
        <button @click="onSuccess" :disabled="!comment"  class="ub-rework-modal__button" >Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UserBannerReworkModal",
      data(){
        return {comment: ''}
      },
      props:['show'],
      emits:['success', 'cancel'],
      methods:{
        onSuccess(){
          this.$emit('success', {comment: this.comment});
          this.comment = '';
        },
        onCancel(){
          this.comment = '';
          this.$emit('cancel');
        }
      }
    }
</script>

<style lang="scss">
  .ub-rework-modal {
    &__button{
      border-radius: 5px;
      font-size: 12px;
      min-width: 75px;
      padding: 6px 16px;
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
