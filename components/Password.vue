<template>
  <div class="profile-section">
    <div class="profile-section-main">
      <LeftProfile></LeftProfile>
      <div class="profile-section-main-right">
        <div class="profile-section-main-right-title">Сменить пароль</div>
        <div class="profile-section-main-right-fields">
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Старый пароль</div>
            <input type="password" v-model="old" maxlength="50" ref="old" :readonly="!status" placeholder="Введите старый пароль">
          </div>
        </div>
        <div class="profile-section-main-right-fields">
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Новый пароль</div>
            <input type="password" v-model="password" maxlength="50" ref="password" :readonly="!status" placeholder="Введите новый пароль">
          </div>
        </div>
        <div class="profile-section-main-right-fields">
          <button class="profile-section-main-right-btn" @click="save">
            <span v-if="status">Сохранить</span>
            <div v-else></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Password",
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
  },
  data() {
    return {
      old: '',
      password: '',
      confirm: '',
      status: true,
    }
  },
  methods: {
    async save() {
      if (this.status) {
        if (this.old === '') {
          return this.$refs.old.focus();
        } else if (this.password === '') {
          return this.$refs.password.focus();
        }
        let data = {
          id: this.user.id,
          data: {
            old: this.old,
            password: this.password
          }
        };
        this.status = false;
        let update  = this.$toast.show('Сохранение данных');
        const res = await this.$store.dispatch('localStorage/changePassword', data);
        if (res.hasOwnProperty('errors')) {
          update.goAway(2000);
          for (const [key, value] of Object.entries(res.errors)) {
            this.$toast.error(`${value}`).goAway(2000);
          }
        } else {
          update.goAway(0);
          this.$toast.show(res.message).goAway(2000);
        }
        this.status = true;
        this.old  = '';
        this.password = '';
      }

    }
  }
}
</script>

<style lang="scss">
@import "assets/Profile.scss";
</style>
