<template>
  <div v-if="userBannerModalOne || userBannerModalTwo"  class="modal-global">
    <div v-if="userBannerModalOne" class="modal-content-global">
      <div class="modal-content-header-close" @click="clearForm()"></div>
      <div class="modal-content-header">Подача объявления</div>
      <div class="modal-content-form">
        <div @click="setTypeSpare" class="type-selector">Запчасти <IconArrow float="right"/></div>
        <div @click="setTypeService" class="type-selector">Ремонт и услуги <IconArrow float="right"/></div>
      </div>
    </div>
    <div v-if="userBannerModalTwo" class="modal-content-global modal-content-global-xl">
      <div class="modal-content-header-close" @click="clearForm()"></div>
      <div v-if="!editable" class="modal-content-header">Подача объявления</div>
      <div v-else class="modal-content-header">Отредактировать объявление</div>
      <div class="modal-content-form">
        <div class="text-end">
          <button v-if="tabIndex !== 0" @click="prevTab()" class="form-tab-button form-tab-button__back">Назад</button>
          <button v-if="tabIndex !== 2" @click="nextTab()" :disabled="empty"  class="form-tab-button" >Дальше</button>
          <template  v-if="tabIndex === 2">
            <button v-if="!editable" @click="saveAd()" :disabled="!formDataValid" class="form-tab-button">Добавить объявление</button>
            <button v-else @click="saveAd(true)" :disabled="!formDataValid" class="form-tab-button">Обновить объявление</button>
          </template>
        </div>
        <div class="form-tab-navs">
          <div class="form-tab-nav" :class="{'form-tab-nav-active': tabIndex === 0, 'form-tab-nav-complete': tabIndex > 0}">
            <span>
              Категории<span v-show="tabIndex > 0">: {{ form.category_id.length }}</span>
            </span>
            <span class="icon"></span>
          </div>
          <div v-if="isTypeSpare" class="form-tab-nav" :class="{'form-tab-nav-active': tabIndex === 1, 'form-tab-nav-complete': tabIndex > 1}">
            <span>
              Марки<span v-show="tabIndex > 1">: {{ form.brand_id.length }}</span>
            </span>
            <span class="icon"></span>
          </div>
          <div class="form-tab-nav" :class="{'form-tab-nav-active': tabIndex === 2}">
            <span>Описание</span>
            <span class="icon"></span>
          </div>
        </div>
        <div class="form-tab">
          <div class="form-tab-content" v-if="tabIndex === 0">
            <div>
              <div class="form-tab-title">Выберите категорию</div>
              <div v-if="form.category_id !== categoryIds" @click="form.category_id = categoryIds" class="from-tab-select-all">Выбрать все</div>
              <div v-else @click="form.category_id = []" class="from-tab-select-all">Сбросить все</div>
            </div>
            <div class="checkbox-groups" :style="categoriesHeight">
              <CheckboxGroup v-for="(group, letter) in categories" :key="letter" :title="letter">
                <label  v-for="(item, index) in group" :key="index">
                  {{ item.name }}
                  <input type="checkbox" v-model="form.category_id" :value="item.id">
                  <span class="checkmark"></span>
                </label >
              </CheckboxGroup>
            </div>
          </div>
          <div class="form-tab-content" v-if="tabIndex === 1 && isTypeSpare">
            <div>
              <div class="form-tab-title">Выберите марку</div>
              <div v-if="form.brand_id !== brandIds" @click="form.brand_id = brandIds" class="from-tab-select-all">Выбрать все</div>
              <div v-else @click="form.brand_id = []" class="from-tab-select-all">Сбросить все</div>
            </div>
            <div class="checkbox-groups" :style="brandsHeight">
              <CheckboxGroup v-for="(group, letter) in brands" :key="letter" :title="letter">
                <label  v-for="(item, index) in group" :key="index">
                  {{ item.name }}
                  <input type="checkbox" v-model="form.brand_id" :value="item.id">
                  <span class="checkmark"></span>
                </label >
              </CheckboxGroup>
            </div>
          </div>
          <div class="form-tab-content" v-show="tabIndex === 2">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label"><span class="text-danger">*</span> Бутик</label>
                  <select v-model="form.room_id" class="form-control form-control-sm" :class="{'is-invalid': !form.room_id, 'is-valid': form.room_id}">
                    <option v-if="!form.room_id" value="">Выберите бутик</option>
                    <option v-for="(room, index) in rooms" :value="room.id" :key="index">{{ room.roomType.title }} {{ room.title }}, {{ room.tier.title }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label"><span class="text-danger">*</span> Заголовок</label>
                  <input v-model="form.title" class="form-control form-control-sm" :class="{'is-invalid': !form.title, 'is-valid': form.title}" placeholder="Введите заголовок"/>
                </div>
                <div class="mb-3">
                  <label class="form-label"><span class="text-danger">*</span> Описание, не короче 80 символов</label>
                  <textarea v-model="form.description"  rows="6" class="form-control form-control-sm" :class="{'is-invalid': form.description.length < 80, 'is-valid': form.description.length >= 80}" placeholder="Добавьте описание и перечень ассортимента, для активного поиска ваших объявлений"></textarea>
                  <div v-if="form.description && form.description.length < 80" class="invalid-feedback">Описание короче 80 символов ({{form.description.length}})</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label"><span class="text-danger">*</span> Время работы</label>
                  <date-picker v-model="form.time" range type="time" value-type="format" :time-picker-options="{start: '07:00', step:'00:15' , end: '22:30', format: 'HH:mm' }" :range-separator="' - '" :lang="lang" readonly placeholder="Выберите время работы"></date-picker>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label"><span class="text-danger">*</span> Рабочие дни</label>
                  <WeekdaySelector :form-weekdays="form.weekdays" :class="{'is-invalid': !form.weekdays.length, 'is-valid': form.weekdays.length}" @select="setWeekdays"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label"><span class="text-danger">*</span> Телефон</label>
                  <input v-model="form.employee_phone" v-mask="'+7 (###) ###-####'" placeholder="Введите телефон" class="form-control form-control-sm" :class="{'is-invalid': form.employee_phone.length < 17, 'is-valid': form.employee_phone.length === 17}"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label"><span class="text-danger">*</span> Имя сотрудника</label>
                  <input v-model="form.employee_name" class="form-control form-control-sm" :class="{'is-invalid': !form.employee_name, 'is-valid': form.employee_name}" placeholder="Введите имя сотрудника"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Дополнительный телефон</label>
                  <input v-model="form.employee_phone_additional" v-mask="'+7 (###) ###-####'" class="form-control form-control-sm" placeholder="Введите дополнительный телефон"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Имя сотрудника</label>
                  <input v-model="form.employee_name_additional" class="form-control form-control-sm" placeholder="Введите имя сотрудника"/>
                </div>
              </div>
              <div class="col-md-12">
                <DropZone @files-dropped="addFiles" v-slot="slotProps" class="mb-3">
                  <label for="file-input" class="d-block">
                    <EmptyDropZone />
                    <input type="file" id="file-input" accept=".jpg,.png"  class="d-none" multiple @change="onInputChange" />
                  </label>
                  <ImageListUploaded :files="images" @remove-file="removeUploadedFile"/>
                  <ImageList :files="files" @remove-file="removeFile"/>

                </DropZone>
                <p class="mb-1"><IconCheck/> Добавляйте только фотографии</p>
                <p class="mb-1"><IconCheck/> Вы можете добавить до 5 фотографий</p>
                <p class="mb-1"><IconCheck/> Размер фото не должно превышать 5 мб</p>
                <p class="mb-1"><IconClose/> Не добавляйте скриншоты, картинки, фотоколлажи</p>
                <p class="mb-1"><IconClose/> Проследите, чтобы на фото не было логотипов, контактных данных и ссылок на сайты</p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-end">
          <button v-if="tabIndex !== 0" @click="prevTab()" class="form-tab-button form-tab-button__back">Назад</button>
          <button v-if="tabIndex !== 2" @click="nextTab()" :disabled="empty"  class="form-tab-button" >Дальше</button>
          <template  v-if="tabIndex === 2">
            <button v-if="!editable" @click="saveAd()" :disabled="!formDataValid" class="form-tab-button">Добавить объявление</button>
            <button v-else @click="saveAd(true)" :disabled="!formDataValid" class="form-tab-button">Обновить объявление</button>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import CheckboxGroup from "../uploader/CheckboxGroup";
    import DropZone from "../uploader/DropZone";
    import FilePreview from "../uploader/FilePreview";
    import ImageList from "../uploader/ImageList";
    import EmptyDropZone from "../uploader/EmptyDropZone";
    import IconCheck from "../icons/IconCheck";
    import IconClose from "../icons/IconClose";
    import {mask} from 'vue-the-mask'
    import WeekdaySelector from "../uploader/WeekdaySelector";
    import DatePicker from 'vue2-datepicker';
    DatePicker.locale('ru');
    import 'vue2-datepicker/index.css';
    import IconArrow from "../icons/IconArrow";
    import ImageListUploaded from "../uploader/ImageListUploaded";

    const AD_TYPE_SPARE_PART = 1;
    const AD_TYPE_SERVICE = 2;


    class UploadableFile {
      constructor(file) {
        this.file = file
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.url = URL.createObjectURL(file)
        this.status = null
      }
    }

    export default {
        name: "UserBannerModal",
      emits:['saved'],
      components: {
        ImageListUploaded,
        IconArrow,
        WeekdaySelector, IconClose, IconCheck, EmptyDropZone, ImageList, FilePreview, DropZone, CheckboxGroup, DatePicker},
      data(){
            return {
              images:[],
              files: [],
              tabIndex: 0,
              brandIds:[],
              brands: [],
              servicesIds:[],
              services: [],
              sparePartsIds:[],
              spareParts: [],
              rooms:[],
              sparePartsCount: 0,
              servicesCount:0,
              brandsCount: 0,
              form: {
                user_id: null,
                type: AD_TYPE_SPARE_PART,
                title: '',
                room_id: '',
                description: '',
                category_id: [],
                brand_id: [],
                time: ['09:00:00', '18:00:00'],
                weekdays: [],
                employee_phone: '',
                employee_name: '',
                employee_phone_additional: '',
                employee_name_additional: '',
              }
            }
        },
      async created(){
        let sps = await this.$store.dispatch('localStorage/listDictionarySpareParts');
        this.sparePartsIds = sps.map(a => a.id);
        this.sparePartsCount = sps.length;
        this.spareParts = this.group(sps)
        let srs = await this.$store.dispatch('localStorage/listDictionaryServices');
        this.servicesIds = srs.map(a => a.id);
        this.servicesCount = srs.length;
        this.services = this.group(srs)
        let brs = await this.$store.dispatch('localStorage/listDictionaryBrands');
        this.brandIds = brs.map(a => a.id);
        this.brandsCount = brs.length;
        this.brands = this.group(brs)
        this.rooms = await this.$store.dispatch('localStorage/roomGetByUserId', this.user.id)
      },
      directives: {mask},
      computed: {
        categoryIds(){
          return this.isTypeSpare ? this.sparePartsIds : this.servicesIds;
        },
        categories(){
            return this.isTypeSpare ? this.spareParts : this.services;
          },
        editable() {
          return this.$store.state.localStorage.editableBanner;
        },
        user() {
          return this.$store.state.localStorage.user;
        },
        isTypeSpare(){
          return this.form.type === AD_TYPE_SPARE_PART
        },
        isTypeService(){
          return this.form.type === AD_TYPE_SERVICE
        },
        lang() {
          return this.$store.state.localStorage.lang;
        },
        userBannerModalOne() {
          return this.$store.state.localStorage.userBannerModalOne;
        },
        userBannerModalTwo() {
          return this.$store.state.localStorage.userBannerModalTwo;
        },
        empty() {
          if (this.tabIndex === 0) {
            return !this.form.category_id.length
          }

          if (this.tabIndex === 1) {
            return !this.form.brand_id.length
          }
        },
        formDataValid() {
          let f = this.form;
          return f.title && f.room_id && f.description && f.description.length > 80 && f.time && f.weekdays && f.employee_name && f.employee_phone && f.employee_phone.length === 17;
        },
        categoriesHeight(){
          let count =  this.form.type === AD_TYPE_SPARE_PART ? this.sparePartsCount : this.servicesCount;
          return window.innerWidth > 1024 ? {maxHeight: (count/2 * 35) + 'px' } : {};
        },
        brandsHeight(){
          return  window.innerWidth > 1024 ? {maxHeight: (this.brandsCount/2 * 30) + 'px' } : {};
        }
      },
      methods: {
        group(list){
          let groups = list.reduce((groups, item) => ({ ...groups, [item.name[0]]: [...(groups[item.name[0]] || []), item] }), {})
          return Object.keys(groups).sort().reduce((obj, key) => { obj[key] = groups[key]; return obj; }, {});
        },
        clearForm(){
          this.$store.commit('localStorage/setUserBannerModalOne',false);
          this.$store.commit('localStorage/setUserBannerModalTwo',false);
          if (this.editable){
            this.$store.commit('localStorage/setEditableBanner',false);
          }
          this.tabIndex = 0;
          this.files = [];
          this.images = [];
          this.form = {
            user_id: this.user.id,
            type: AD_TYPE_SPARE_PART,
            title:'',
            room_id: null,
            description: '',
            category_id: [],
            brand_id: [],
            time: ['09:00:00', '18:00:00'],
            weekdays: [],
            employee_phone:'',
            employee_name:'',
            employee_phone_additional: '',
            employee_name_additional: '',
          }
        },
        onInputChange(e){
          this.addFiles(e.target.files)
          e.target.value = null;
        },
        addFiles(newFiles) {
          let newUploadableFiles = [...newFiles].map((file) => new UploadableFile(file)).filter((file) => !this.fileExists(file.id));
          let count = this.images.length + this.files.length + newUploadableFiles.length;
          if (count <= 5) {
            this.files = this.files.concat(newUploadableFiles);
          } else {
            alert("Вы можете загрузить не более 5 файлов");
          }
        },
        removeFile(file) {
          const index = this.files.indexOf(file);
          if (index > -1) this.files.splice(index, 1);
        },
        async removeUploadedFile(file) {
          await this.$store.dispatch('localStorage/removeUserBannerImage', file);
          const index = this.images.indexOf(file);
          if (index > -1) this.images.splice(index, 1);
        },
        fileExists(otherId) {
          return this.files.some(({ id }) => id === otherId)
        },
        setWeekdays(days) {
          this.form.weekdays = days;
        },
        async saveAd(isUpdate = false){
          let formData = new FormData();

          this.form.user_id = this.user.id;

          for ( let key in this.form ) {
            formData.append(key, this.form[key]);
          }
          if (this.files.length) {
            for (let key2 in this.files) {
              formData.append('images[]', this.files[key2].file);
            }
          }

          let auth  = this.$toast.show(isUpdate ? 'Обновляем ...' : 'Создание ...');

          if (!isUpdate) {
            const res = await this.$store.dispatch('localStorage/createUserBanner', formData);

            if (res.id) {
              this.$emit('saved');
              this.clearForm();
            }
          } else {
            formData.append('id', this.editable.id);
            const res = await this.$store.dispatch('localStorage/updateUserBanner', formData);

            if (res.id) {
              this.$emit('saved');
              this.clearForm();
            }
          }


          auth.goAway(0);

        },
        setTypeSpare(){
          this.form.type = AD_TYPE_SPARE_PART;
          this.$store.commit('localStorage/setUserBannerModalOne',false)
          this.$store.commit('localStorage/setUserBannerModalTwo',true)
        },
        setTypeService(){
          this.form.type = AD_TYPE_SERVICE;
          this.$store.commit('localStorage/setUserBannerModalOne',false)
          this.$store.commit('localStorage/setUserBannerModalTwo',true)
        },
        prevTab(){
          (this.isTypeService) ? this.tabIndex -= 2 : --this.tabIndex;
        },
        nextTab(){
          (this.isTypeService) ? this.tabIndex += 2 : ++this.tabIndex;
        }
      },
      watch:{
          editable(){
            this.files = [];
            this.images = [];
            if (this.editable){
                this.form.type = this.editable.type;
                this.form.title = this.editable.title;
                this.form.room_id = this.editable.room_id;
                this.form.description = this.editable.description;
                this.form.category_id = this.editable.category_id;
                this.form.brand_id = this.editable.brand_id;
                this.form.time = this.editable.time;
                this.form.weekdays = this.editable.weekdays;
                this.form.employee_phone = this.editable.employee_phone;
                this.form.employee_name = this.editable.employee_name;
                this.form.employee_phone_additional = this.editable.employee_phone_additional;
                this.form.employee_name_additional = this.editable.employee_name_additional;
                this.images = this.editable.images;
            } else {
              this.form = {
                user_id: this.user.id,
                type: AD_TYPE_SPARE_PART,
                title:'',
                room_id: null,
                description: '',
                category_id: [],
                brand_id: [],
                time: ['09:00:00', '18:00:00'],
                weekdays: [],
                employee_phone:'',
                employee_name:'',
                employee_phone_additional: '',
                employee_name_additional: '',
              }
            }
          }
      }
    }
</script>

<style lang="scss">

  .type-selector {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    padding: 11px 16px;
    border-radius: 4px;
    border: 1px solid #D9D9D9;
    cursor: pointer;
  }

  .form-tab-navs {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;


    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  .form-tab-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    border: 1px solid #BFBFBF;
    color: #BFBFBF;
    background: #FAFAFA;
    line-height: 20px;
    padding: 10px 6px;
    border-radius: .2rem;
    flex-grow: 1;
    gap: 6px;
    width: 100%;

    transition: .3s all ease-in-out;

    .icon {
      background:transparent;
      width: 18px;
      height: 18px;
    }

    &-active {
      border-color: #274985;
      color: #274985;
      background: #FFFFFF;
      .icon {
        display:block;
        background: url('/icon_loading_blue.svg') no-repeat center;
        animation-name: spin;
        animation-duration: 10000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        @keyframes spin {
          from {
            transform: rotate(0deg);
          } to {
              transform: rotate(360deg);
            }
        }
      }
    }
    &-complete {
      border-color: #389E0D;
      color: #389E0D;
      background: #FFFFFF;
      .icon {
        display:block;
        background: url('/icon_success.svg') no-repeat center;
      }
    }
  }

  .form-tab-content {
    display: flex;
    flex-direction: column;
    grid-gap: 14px;
    font-size:14px;
  }

  .form-tab-title {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: #1E1E1E;
  }

  .from-tab-select-all {
    color: #274985;
    cursor: pointer;
  }

  .checkbox-weekdays {
    display: flex;
    flex-direction: row;
    grid-gap: .25rem;
  }

  .checkbox-groups {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    grid-gap: 8px;
    font-size: 14px;

    @media (min-width:1024px) {
      min-height: calc(100vh - 350px);
    }
  }

  .form-tab-button{
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
</style>
