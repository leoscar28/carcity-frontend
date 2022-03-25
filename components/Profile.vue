<template>
  <div class="profile-section">
    <div class="profile-section-main">
      <LeftProfile></LeftProfile>
      <div class="profile-section-main-right">
        <div class="profile-section-main-right-title">Профиль</div>
        <div class="profile-section-main-right-fields">
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Фамилия</div>
            <input type="text" v-model="surname" ref="surname" maxlength="150">
          </div>
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Имя</div>
            <input type="text" v-model="name" ref="name" maxlength="150">
          </div>
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Отчество</div>
            <input type="text" v-model="last_name" maxlength="150">
          </div>
        </div>
        <template v-if="user.roles.id === 1">
          <div class="profile-section-main-right-fields">
            <div class="profile-section-main-right-field">
              <div class="profile-section-main-right-field-title">Телефон</div>
              <input type="text" v-model="user.phone" readonly>
            </div>
            <div class="profile-section-main-right-field">
              <div class="profile-section-main-right-field-title">Эл.почта</div>
              <input type="text" v-model="user.email" readonly>
            </div>
          </div>
          <div class="profile-section-main-right-fields">
            <div class="profile-section-main-right-field">
              <div class="profile-section-main-right-field-title">Наименование TOO/ИП</div>
              <input type="text" :value="company" readonly>
            </div>
            <div class="profile-section-main-right-field">
              <div class="profile-section-main-right-field-title">БИН/ИИН</div>
              <input type="text" :value="bin" readonly>
            </div>
          </div>
        </template>
        <div class="profile-section-main-right-fields" v-else>
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Должность</div>
            <input type="text" :value="user.positions.title" readonly>
          </div>
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Эл.почта</div>
            <input type="text" :value="user.email" readonly>
          </div>
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Телефон</div>
            <input type="text" :value="user.phone" readonly>
          </div>
        </div>
        <div class="profile-section-main-right-fields">
          <button class="profile-section-main-right-btn" @click="save">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
  },
  data() {
    return {
      name: '',
      surname: '',
      last_name: '',
      bin: '',
      company: '',
    }
  },
  created() {
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData: function() {
      this.name = this.user.name;
      this.surname  = this.user.surname;
      this.last_name  = this.user.last_name;
      this.bin  = this.user.bin;
      this.company  = this.user.company;
    },
    save: async function () {
      if (this.surname.trim() === '') {
        return this.$refs.surname.focus();
      } else if (this.name.trim() === '') {
        return this.$refs.name.focus();
      }
      let data = {
        id: this.user.id,
        data: {
          surname: this.surname.trim(),
          name: this.name.trim(),
          last_name: this.last_name,
          bin: this.bin,
          company: this.company
        }
      };
      let update  = this.$toast.show('Сохранение данных');
      const res = await this.$store.dispatch('localStorage/setUser', data);
      if (res.hasOwnProperty('errors')) {
        update.goAway(2000);
        for (const [key, value] of Object.entries(res.errors)) {
          this.$toast.error(`${value}`).goAway(2000);
        }
      } else {
        update.goAway(0);
        this.$toast.show('Сохранено').goAway(2000);
      }
    },
  }
}
</script>

<style lang="scss">
  @import "assets/Profile.scss";
</style>
