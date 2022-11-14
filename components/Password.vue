<template>
  <div class="profile-section">
    <div class="profile-section-main">
      <LeftProfile></LeftProfile>
      <div class="profile-section-main-right">
        <div class="profile-section-main-right-title">{{ language[current][0] }}</div>
        <div class="profile-section-main-right-fields">
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">{{ language[current][1] }}</div>
            <input type="password" v-model="old" maxlength="50" ref="old" :readonly="!status" :placeholder="language[current][2] ">
          </div>
        </div>
        <div class="profile-section-main-right-fields">
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">{{ language[current][3] }}</div>
            <input type="password" v-model="password" maxlength="50" ref="password" :readonly="!status" :placeholder="language[current][4] ">
          </div>
        </div>
        <div class="profile-section-main-right-fields">
          <button class="profile-section-main-right-btn" @click="save">
            <span v-if="status">{{ language[current][5] }}</span>
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
    current() {
      return this.$store.state.localStorage.current;
    },
  },
  data() {
    return {
      old: '',
      password: '',
      confirm: '',
      status: true,
      language: [
        [
          'Сменить пароль',
          'Старый пароль',
          'Введите старый пароль',
          'Новый пароль',
          'Введите новый пароль',
          'Сохранить'
        ],
        [
          'Құпия сөзді өзгерту',
          'Ескі құпия сөз',
          'Ескі құпия сөзді енгізіңіз',
          'Жаңа құпия сөз',
          'Жаңа құпия сөзді енгізіңіз',
          'Сақтау',
        ]
      ]
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
