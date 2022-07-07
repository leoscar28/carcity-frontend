<template>
  <div class="bg">
    <div class="login-main">
      <div class="login-logo">
        <NuxtLink to="/"><img src="/logo.svg" width="100%" alt="logo"></NuxtLink>
      </div>
      <template v-if="!password">
        <div class="login-title" v-if="type === 1">На ваш телефон номер был отправлен смс код для подтверждения регистрации</div>
        <div class="login-title" v-else>На вашу эл.почту был отправлен код для подтверждения регистрации</div>
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
      </template>
      <template v-else>
        <div class="login-title">Восстановление пароля</div>
        <div class="login-input-password">
          <input placeholder="Введите новый пароль" maxlength="50" autocomplete="off" v-model="new_password" :type="show ? 'text' : 'password'">
          <div class="login-input-password-option" :class="{'login-input-password-hide':!show}" @click="show = !show"></div>
        </div>
        <div class="login-input-password">
          <input placeholder="Повторите новый пароль" maxlength="50" autocomplete="off" v-model="verify_password" :type="showVerify ? 'text' : 'password'">
          <div class="login-input-password-option" :class="{'login-input-password-hide':!showVerify}" @click="showVerify = !showVerify"></div>
        </div>
        <div class="login-btn">
          <button @click="changePassword">Изменить пароль</button>
        </div>
      </template>
      <div class="login-remembered" @click="cancel">Отменить</div>
    </div>
  </div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
export default {
  name: "Verify",
  components: {MaskedInput},
  data() {
    return {
      type: 1,
      password: false,
      code: ['','','',''],
      status: true,
      show: false,
      showVerify: false,
      new_password: '',
      verify_password: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
    restoreUser() {
      return this.$store.state.localStorage.restoreUser;
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
    changePassword() {
      if (this.new_password !== this.verify_password) {
        return this.$toast.error('Пароли не совпадают').goAway(2000);
      } else if (this.new_password.trim().length < 8) {
        return this.$toast.error('Минимальное количество символов 8').goAway(2000);
      }
      let res = this.$store.dispatch('localStorage/setUser',{
        id: this.restoreUser.id,
        data: {
          name: this.restoreUser.name,
          surname: this.restoreUser.surname,
          password: this.new_password.trim()
        }
      });
      if (res.hasOwnProperty('errors')) {
        for (const [key, value] of Object.entries(res.errors)) {
          this.$toast.error(`${value}`).goAway(2000);
        }
      } else {
        this.cancel();
      }
    },
    async cancel() {
      this.$store.commit('localStorage/cancelRestoreUser');
      await this.$router.push('/login');
    },
    async checkCode() {
      if (this.status) {
        if (this.code[0].trim() === '') {
          return this.$refs.code_1.firstChild.focus();
        } else if (this.code[1].trim() === '') {
          return this.$refs.code_2.firstChild.focus();
        } else if (this.code[2].trim() === '') {
          return this.$refs.code_3.firstChild.focus();
        } else if (this.code[3].trim() === '') {
          return this.$refs.code_4.firstChild.focus();
        }
        this.status = false;
        let user  = this.restoreUser;
        let data  = {
          id: user.id,
          restore: true
        };
        if (this.type === 1) {
          data.phone_check  = parseInt(this.code.join(''));
        } else {
          data.email_check  = parseInt(this.code.join(''));
        }
        const res = await this.$store.dispatch('localStorage/codeCheck', data);
        this.status = true;
        if (!res.hasOwnProperty('message')) {
          this.password = true;
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
}
</script>

<style scoped>

</style>
