<template>
  <div class="profile-section">
    <div class="profile-section-main">
      <LeftProfile/>
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
        <template v-if="[1,5].includes(user.role_id)">
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
          <div v-if="user.role_id === 1" class="profile-section-main-right-fields">
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
        <div v-else class="profile-section-main-right-fields" >
          <div class="profile-section-main-right-field" v-if="user.positions">
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
        <template v-if="user.role_id === 1">
          <div class="profile-section-main-right-title">Главные категории товаров и услуг</div>
          <div class="profile-section-main-right-fields">
              <div class="profile-section-main-right-field">
                <div class="profile-section-main-right-field-title">Категория</div>
                <select v-model="spare_part_id">
                  <option value="">Выберите категорию запчастей</option>
                  <option v-for="sparePart in spareParts" :value="sparePart.id" :selected="sparePart.id === user.spare_part_id">{{sparePart.name}}</option>
                </select>
              </div>
            <div class="profile-section-main-right-field">
                <div class="profile-section-main-right-field-title">Марка</div>
                <select v-model="brand_id">
                  <option value="">Выберите марку запчастей</option>
                  <option v-for="brand in brands" :value="brand.id" :selected="brand.id === user.brand_id">{{brand.name}}</option>
                </select>
              </div>
            <div class="profile-section-main-right-field">
                <div class="profile-section-main-right-field-title">Услуга</div>
                <select v-model="service_id">
                  <option value="">Выберите категорию услуг</option>
                  <option v-for="service in services" :value="service.id" :selected="service.id === user.service_id">{{service.name}}</option>
                </select>
              </div>
          </div>

          <div class="profile-section-main-right-title" v-show="rooms.length > 0">Арендованные помещения</div>
          <div class="profile-section-rooms" v-show="rooms.length > 0">
            <div class="profile-section-rooms-item" v-for="(room,key) in rooms" :key="key">
              <div class="profile-section-rooms-item-field">
                <div class="profile-section-rooms-item-field-title">Ярус</div>
                <div class="profile-section-rooms-item-field-value">{{room.tier.title}}</div>
              </div>
              <div class="profile-section-rooms-item-field">
                <div class="profile-section-rooms-item-field-title">Тип помощения</div>
                <div class="profile-section-rooms-item-field-value">{{room.roomType.title}}</div>
              </div>
              <div class="profile-section-rooms-item-field">
                <div class="profile-section-rooms-item-field-title">Название</div>
                <div class="profile-section-rooms-item-field-value">{{room.title}}</div>
              </div>
            </div>
          </div>
        </template>

      </div>

    </div>
  </div>
</template>

<script>
/*
{ "id": 979, "title": "319", "tier": { "id": 4, "title": "4 Ярус" }, "roomType": { "id": 1, "title": "Бутик" }, "status": 2 }
 */
import LeftProfile from "./LeftProfile";
export default {
  name: "Profile",
  components: {LeftProfile},
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
      spare_part_id: '',
      service_id: '',
      brand_id: '',
      rooms: [],
      spareParts:[],
      brands:[],
      services:[]
    }
  },
  async created() {
    if (this.user.role_id === 1) {
      this.rooms  = await this.$store.dispatch('localStorage/roomGetByUserId',this.user.id);
      this.spareParts = await this.$store.dispatch('localStorage/listDictionarySpareParts');
      this.brands = await this.$store.dispatch('localStorage/listDictionaryBrands');
      this.services = await this.$store.dispatch('localStorage/listDictionaryServices');
      this.spare_part_id = this.user.spare_part_id;
      this.service_id = this.user.service_id;
      this.brand_id = this.user.brand_id;
    } else {
      this.rooms  = [];
    }
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
          company: this.company,
          spare_part_id: this.spare_part_id,
          brand_id: this.brand_id,
          service_id: this.service_id
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
