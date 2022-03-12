<template>
  <div class="login-main">
    <div class="login-logo">
      <img src="/logo.svg" width="100%" alt="logo">
    </div>
    <div class="login-title" v-if="$store.state.localStorage.user.phone && $store.state.localStorage.user.phoneCode && !$store.state.localStorage.user.phone_verified_at">На ваш телефон номер был отправлен смс код для подтверждения регистрации</div>
    <div class="login-title" v-else>На вашу эл.почту был отправлен код для подтверждения регистрации</div>
    <div class="login-title login-error" v-show="false">Вы ввели не правильный код</div>
    <div class="login-input-cells">
      <div class="login-input-cell" ref="code_1">
        <masked-input v-model="code[0]" mask="1"/>
      </div>
      <div class="login-input-cell" ref="code_2">
        <masked-input v-model="code[1]" mask="1" />
      </div>
      <div class="login-input-cell" ref="code_3">
        <masked-input v-model="code[2]" mask="1" />
      </div>
      <div class="login-input-cell" ref="code_4">
        <masked-input v-model="code[3]" mask="1"/>
      </div>
    </div>
    <div class="login-btn">
      <button @click="checkCode">
        <span v-if="true">Подтвердить код</span>
        <div v-else></div>
      </button>
    </div>
    <div class="login-remembered" @click="cancel">Отменить</div>
  </div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
export default {
  name: "Verify",
  components: {MaskedInput},
  data() {
    return {
      code: ['','','',''],
    }
  },
  watch: {
    code: function() {
      if (this.code[0].trim() === '') {
        return this.$refs.code_1.firstChild.focus();
      } else if (this.code[1].trim() === '') {
        return this.$refs.code_2.firstChild.focus();
      } else if (this.code[2].trim() === '') {
        return this.$refs.code_3.firstChild.focus();
      } else if (this.code[3].trim() === '') {
        return this.$refs.code_4.firstChild.focus();
      }
    }
  },
  methods: {
    cancel() {
      this.$store.commit('localStorage/setUser',false);
      this.$router.replace({path: '/'});
    },
    async checkCode() {
      if (this.code[0].trim() === '') {
        return this.$refs.code_1.firstChild.focus();
      } else if (this.code[1].trim() === '') {
        return this.$refs.code_2.firstChild.focus();
      } else if (this.code[2].trim() === '') {
        return this.$refs.code_3.firstChild.focus();
      } else if (this.code[3].trim() === '') {
        return this.$refs.code_4.firstChild.focus();
      }
      let user  = this.$store.state.localStorage.user;
      let data  = {
        id:user.id
      };
      if (user.phone && user.phoneCode && !user.phone_verified_at) {
        data.phone_check  = parseInt(this.code.join(''));
      } else if (user.email && user.emailCode && !user.email_verified_at) {
        data.email_check  = parseInt(this.code.join(''));
      }
      const res = await this.$store.dispatch('localStorage/codeCheck', data);
      if (!res.hasOwnProperty('message')) {
        await this.$router.replace({path: '/dashboard'});
      } else {
        for (const [key, value] of Object.entries(res)) {
          this.$toast.error(`${value}`).goAway(2000);
        }
        this.code = ['','','',''];
        this.$refs.code_1.firstChild.focus();
      }
    }
  }
}
</script>

<style scoped>

</style>
