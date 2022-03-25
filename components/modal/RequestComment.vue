<template>
  <div class="modal" :class="{'modal-hidden':!requestCommentShow}">
    <div class="modal-content">
      <div class="modal-content-header-close" @click="$emit('requestCommentShowChange',false)"></div>
      <div class="modal-content-header">Комментарий</div>
      <div class="modal-content-graph-field">
        <div class="modal-content-graph-field-title">Введите комментарий</div>
        <div class="modal-content-graph-field-input">
          <textarea v-model="comment" ref="comment"></textarea>
        </div>
      </div>
      <div class="modal-content-graph-footer">
        <div>
          <button @click="$emit('requestCommentShowChange',false)">Отмена</button>
        </div>
        <div>
          <button class="modal-content-graph-footer-btn" @click="ready">Продолжить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RequestComment",
  props: ['type','request','requestCommentShow'],
  data() {
    return {
      status: true,
      comment: '',
    }
  },
  watch: {
    request(value) {
      if (value.comment) {
        this.comment  = value.comment;
      } else {
        this.comment  = '';
      }
    }
  },
  methods: {
    async ready() {
      if (!this.status) {
        return;
      }
      if (this.comment.trim() === '') {
        return this.$refs.comment.focus();
      }
      this.status = false;
      let data  = {
        id: this.request.id,
        data: {
          comment: this.comment.trim().replace(/(\r\n|\r|\n){2,}/g, '$1\n')
        }
      };
      let request;
      if (this.type === 1) {
        request = await this.$store.dispatch('localStorage/completionDateUpdate', data)
      } else if (this.type === 2) {
        request = await this.$store.dispatch('localStorage/applicationDateUpdate', data)
      } else if (this.type === 3) {
        request = await this.$store.dispatch('localStorage/invoiceDateUpdate', data)
      }
      this.status   = true;
      this.comment  = '';
      if (typeof request === 'object') {
        this.$emit('requestChange',request);
      } else {
        this.$emit('requestChange',this.request.id);
      }
      this.$emit('requestCommentShowChange',false);
    }
  }
}
</script>

<style lang="scss">
  @import "assets/Modal.scss";
</style>
