<template>
  <div class="modal" :class="{'modal-hidden':!requestRejectShow}">
    <div class="modal-content">
      <div class="modal-content-header-close" @click="$emit('requestRejectShowChange',false)"></div>
      <div class="modal-content-header">Отмена заявки на ввоз</div>
      <div class="modal-content-graph-field">
        <div class="modal-content-graph-field-title">Опишите причину отказа</div>
        <div class="modal-content-graph-field-input">
          <textarea placeholder="Причина отказа" v-model="comment" ref="comment"></textarea>
        </div>
      </div>
      <div class="modal-content-graph-footer">
        <div>
          <button @click="$emit('requestRejectShowChange',false)">Отмена</button>
        </div>
        <div>
          <button class="modal-content-graph-footer-btn" @click="reject">Продолжить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RequestReject",
  props: ['request','requestRejectShow','approveId'],
  data() {
    return {
      status: true,
      comment: '',
    }
  },
  methods: {
    async reject() {
      if (!this.status) {
        return;
      }
      if (this.comment.trim() === '') {
        return this.$refs.comment.focus();
      }
      this.status = false;
      let request = await this.$store.dispatch('localStorage/rejectRequest', {
        id: this.approveId,
        data: {
          comment: this.comment.trim()
        }
      });
      this.comment  = '';
      this.$emit('commodityRequestChange',request);
      this.$emit('requestRejectShowChange',false);
    }
  }
}
</script>

<style lang="scss">

</style>
