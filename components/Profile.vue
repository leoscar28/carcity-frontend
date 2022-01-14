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
        <div class="profile-section-main-right-fields">
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Email</div>
            <input type="text" v-model="email">
          </div>
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Город</div>
            <select v-model="city_id">
              <option :value="undefined">Не выбрано</option>
              <option v-for="(city,index) in cities" :key="index" :selected="(city_id === city.id)" :value="city.id">{{city.title}}</option>
            </select>
          </div>
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Объект</div>
            <!--<select v-model="city_id">
              <option :selected="city_id === ''">Не выбрано</option>
              <option v-for="(facility,index) in facilities" :key="index" :selected="(city_id === city.id)" :value="object.id">{{object.title}}</option>
            </select>-->
          </div>
        </div>
        <div class="profile-section-main-right-fields">
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Дата рождения</div>
            <div class="profile-section-main-right-field-selects">
              <select class="profile-section-main-right-field-select profile-section-main-right-field-select-day" v-model="day">
                <option v-for="(n,index) in 31" :key="index" :value="n" :selected="(n === day)">{{n}}</option>
              </select>
              <select class="profile-section-main-right-field-select profile-section-main-right-field-select-month" v-model="month">
                <option v-for="(n,index) in month_list" :key="index" :value="index + 1" :selected="((index + 1) === month)">{{n}}</option>
              </select>
              <select class="profile-section-main-right-field-select profile-section-main-right-field-select-year" v-model="year">
                <option v-for="(n,index) in years.slice().reverse()" :key="index" :selected="(n === year)">{{n}}</option>
              </select>
            </div>
          </div>
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Часовой пояс</div>
            <select v-model="timezone">
              <option :value="undefined">Не выбрано</option>
              <option v-for="(n,index) in timezones" :key="index" :value="n.id">{{n.title}}</option>
            </select>
          </div>
        </div>
        <div class="profile-section-main-right-fields">
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Мобильный телефон</div>
            <input type="text" :value="phone" readonly>
          </div>
          <div class="profile-section-main-right-field">
            <div class="profile-section-main-right-field-title">Рабочий телефон</div>
            <input type="text" v-model="work_phone">
          </div>
        </div>
        <div class="profile-section-main-right-fields">
          <div class="profile-section-main-right-checkbox" @click="hideBirthdate">
            <div class="profile-section-main-right-checkbox-icon" :class="{'profile-section-main-right-checkbox-icon-checked':(hide_birthdate===1)}"></div>
            Скрывать год
          </div>
          <div class="profile-section-main-right-checkbox" @click="hideRecord">
            <div class="profile-section-main-right-checkbox-icon" :class="{'profile-section-main-right-checkbox-icon-checked':(hide_record===1)}"></div>
            Скрыть чужие записи
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
    cities() {
      return this.$store.state.localStorage.city;
    },
    timezones() {
      return this.$store.state.localStorage.timezone;
    },
    facilities() {
      return this.$store.state.localStorage.facility;
    },
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1950}, (value, index) => 1951 + index)
    }
  },
  data() {
    return {
      name: '',
      surname: '',
      last_name: '',
      email: '',
      phone: '',
      work_phone: '',
      city_id: '',
      month_list: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      day: 1,
      month: 1,
      year: 2000,
      hide_birthdate: 1,
      hide_record: 1,
      timezone: '',
    }
  },
  created() {
    this.$store.dispatch('localStorage/getCities');
    this.$store.dispatch('localStorage/getTimezones');
    this.$store.dispatch('localStorage/getFacilities');
  },
  mounted() {
    this.setData();
    console.log(this.user);
  },
  methods: {
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
          birthdate: this.year + '-' + this.month + '-' + this.day,
          timezone_id: this.timezone,
          hide_birthdate: this.hide_birthdate,
          hide_record: this.hide_record,
          city_id: this.city_id,
          work_phone: this.work_phone
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
    hideRecord: function() {
      if (this.hide_record === 0) {
        this.hide_record = 1;
      } else {
        this.hide_record = 0;
      }
    },
    hideBirthdate: function() {
      if (this.hide_birthdate === 0) {
        this.hide_birthdate = 1;
      } else {
        this.hide_birthdate = 0;
      }
    },
    setCity: function() {
      alert(this.city_id);
    },
    setData: function() {
      this.name = this.user.name;
      this.surname  = this.user.surname;
      this.last_name  = this.user.last_name;
      if (this.user.email_verified_at) {
        this.email  = this.user.email;
      }
      if (this.user.phone_verified_at) {
        this.phone  = this.user.phone;
      }
      this.timezone = this.user.timezone_id;
      this.work_phone = this.user.work_phone;
      this.city_id  = this.user.city_id;
      let birthDate = this.user.birthdate.split('-');
      this.day  = parseInt(birthDate[2]);
      this.month  = parseInt(birthDate[1]);
      this.year = parseInt(birthDate[0]);
      this.hide_birthdate = this.user.hide_birthdate;
      this.hide_record    = this.user.hide_record;

    }
  }
}
</script>

<style lang="scss">
  @import "assets/Profile.scss";
</style>
