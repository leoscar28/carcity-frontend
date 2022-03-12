<template>
  <div class="modal" :class="{'modal-hidden':!show}" onselectstart="return false;">
    <div class="modal-content">
      <div class="modal-content-header-close" @click="$emit('showRequestChange',false)"></div>
      <div class="modal-content-header">Подача заявки</div>
      <div class="modal-content-graph">
        <div :class="status ? 'modal-content-graph-active' : 'modal-content-graph-item'">
          <div>1</div>
          <div class="modal-content-graph-title">Формирование</div>
        </div>
        <div class="modal-content-graph-line"></div>
        <div :class="!status ? 'modal-content-graph-active' : 'modal-content-graph-item'">
          <div>2</div>
          <div class="modal-content-graph-title">Детали</div>
        </div>
      </div>
      <template v-if="status">
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Наименование организации</div>
          <div class="modal-content-graph-field-input">
            <select v-model="request.tenant_company_id" @change="getRoomsByFacilityId" ref="tenant_company_id">
              <option disabled selected value="null">Выберите организацию</option>
              <option v-for="(tenantCompany,key) in tenantCompanies" :key="key" :value="tenantCompany.id">{{tenantCompany.title}}</option>
            </select>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">№ помещения</div>
          <div class="modal-content-graph-field-input">
            <select v-model="request.room_id" ref="room_id">
              <option disabled selected value="null">Выберите помещения</option>
              <option v-for="(room,key) in rooms" :key="key" :value="room.room.id">{{room.room.title}}</option>
            </select>
          </div>
        </div>
        <template v-if="parseInt(type) === 2">
          <div class="modal-content-graph-field">
            <div class="modal-content-graph-field-title">Причина вывоза</div>
            <div class="modal-content-graph-field-input">
              <select v-model="request.export_reason_id" ref="exportReason">
                <option disabled selected value="null">Выберите Причину</option>
                <option v-for="(exportReason,key) in exportReasons" :key="key" :value="exportReason.id">{{exportReason.title}}</option>
                <option value="0">Прочее</option>
              </select>
            </div>
            <div class="modal-content-graph-field-input" v-show="parseInt(request.export_reason_id) === 0">
              <textarea placeholder="Напишите причину" v-model="request.export_reason_comment" ref="exportReasonComment"></textarea>
            </div>
          </div>
        </template>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Мобильный телефон</div>
          <div class="modal-content-graph-field-input" ref="phone">
            <masked-input mask="\+\7 (111) 111-11-11" v-model="request.phone" type="tel"/>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Рабочий телефон</div>
          <div class="modal-content-graph-field-input" ref="work_phone">
            <masked-input mask="\+\7 (111) 111-11-11" v-model="request.work_phone" type="tel"/>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Период проведения</div>
          <div class="modal-content-graph-field-description">Заявка заполняется максимум на 5 дней</div>
          <div class="modal-content-graph-field-input">
            <date-picker v-model="request.period" range readonly format="YYYY.MM.DD" :lang="lang" :editable="false" :range-separator="' - '" :disabled-date="disabledRange" ></date-picker>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Ответственные лица</div>
          <div class="modal-content-graph-field-input-double" v-for="(people,key) in request.responsible" :key="people.id">
            <div>
              <div class="modal-content-graph-field-input-double-title">Фамилия</div>
              <input type="text" placeholder="Введите фамилию" :ref="'name'+key" v-model="people.name">
            </div>
            <div>
              <div class="modal-content-graph-field-input-double-title">Имя</div>
              <input type="text" placeholder="Введите имя" :ref="'surname'+key" v-model="people.surname">
            </div>
            <div class="modal-content-graph-field-input-double-remove" @click="request.responsible.splice(key,1)"></div>
          </div>
          <div class="modal-content-graph-field-add">
            <button @click="request.responsible.push({id:count++,name:'',surname:''})">
              <span>
                <div></div> Добавить
              </span>
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Ответственные лица</div>
          <div class="modal-content-graph-field-input">
            <div class="modal-content-graph-field-input-list">
              <div class="modal-content-graph-field-input-list-item" v-for="(user,key) in request.responsible" :key="key">
                <div class="modal-content-graph-field-input-list-item-icon">{{user.name[0]}}{{user.surname[0]}}</div>
                <div class="modal-content-graph-field-input-list-item-title">{{user.name}} {{user.surname}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Перечень ввозимого/вывозимого</div>
          <div class="modal-content-graph-field-input modal-content-graph-field-input-text">
            Формат импортируемого документа excel: .xlsx/ .xls. Перечень должен быть формата: Наименование - Единица измерения - Количество. Так же должны быть заголовки столбцов.
          </div>
          <input type="file" ref="file" class="modal-hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="upload">
          <div class="modal-content-graph-field-input-file" v-if="request.file">
            <div class="modal-content-graph-field-input-file-icon"></div>
            <div class="modal-content-graph-field-input-file-detail">
              <div class="modal-content-graph-field-input-file-detail-title">{{request.file.name}}</div>
              <div class="modal-content-graph-field-input-file-detail-size">{{bytesToSize(request.file.size)}}</div>
            </div>
            <div class="modal-content-graph-field-input-file-close" @click="$refs.file.value = '';request.file     = ''"></div>
          </div>
          <div class="modal-content-graph-field-input modal-content-graph-field-input-upload" @click="$refs.file.click()" v-else>
            <div class="modal-content-graph-field-input-upload-detail">
              <div class="modal-content-graph-field-input-upload-detail-icon"></div>
              <div class="modal-content-graph-field-input-upload-detail-title">Выберите excel-файл на компьютере</div>
            </div>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Список ТМЦ</div>
          <div class="modal-content-graph-field-input-double" v-for="(goods,key) in request.commodity" :key="goods.id">
            <div>
              <div class="modal-content-graph-field-input-double-title">Наименование</div>
              <input type="text" placeholder="Введите наимен. ТМЦ" :ref="'title'+key" v-model="goods.title">
            </div>
            <div class="modal-content-graph-field-input-double-block">
              <div>
                <div class="modal-content-graph-field-input-double-title">Кол-во</div>
                <input type="number" placeholder="0" :ref="'quantity'+key" v-model="goods.quantity">
              </div>
              <div>
                <div class="modal-content-graph-field-input-double-title">Ед. изм</div>
                <select v-model="goods.type">
                  <option v-for="(measureType,key) in measureTypes" :key="key" :value="measureType">{{measureType}}</option>
                </select>
              </div>
            </div>
            <div class="modal-content-graph-field-input-double-remove" @click="request.commodity.splice(key,1)"></div>
          </div>
          <div class="modal-content-graph-field-add">
            <button @click="request.commodity.push({id:count++,title:'',quantity:'',type:measureTypes[0]})">
              <span>
                <div></div> Добавить
              </span>
            </button>
          </div>
        </div>
      </template>
      <div class="modal-content-graph-footer">
        <div v-show="!status">
          <button @click="$emit('statusRequestChange',true)">Отмена</button>
        </div>
        <div>
          <button class="modal-content-graph-footer-btn" @click="next">Продолжить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
import DatePicker from 'vue2-datepicker';
DatePicker.locale('ru');
import 'vue2-datepicker/index.css';
export default {
  name: "Request",
  components: {MaskedInput,DatePicker},
  props: ['show','type','status'],
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
    exportReasons() {
      return this.$store.state.localStorage.exportReason;
    },
    measureTypes() {
      return this.$store.state.localStorage.measureTypes;
    }
  },
  data() {
    return {
      tenantCompanies: [],
      rooms: [],
      count: 1,
      request: {
        tenant_company_id: null,
        room_id: null,
        export_reason_id: null,
        export_reason_comment: '',
        phone: '',
        work_phone: '',
        period: '',
        responsible: [],
        commodity: [],
        file: '',
        start: '',
        end: '',
      },
      lang: {
        formatLocale: {
          months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
          weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          weekdaysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
          weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        }
      },
    }
  },
  watch: {
    show: function(value) {
      if (value) {
        this.request  = {
          tenant_company_id: null,
          room_id: null,
          export_reason_id: null,
          export_reason_comment: '',
          phone: '',
          work_phone: '',
          period: '',
          responsible: [],
          commodity: [],
          file: '',
          start: '',
          end: '',
        };
      }
    }
  },
  created() {
    this.$store.dispatch('localStorage/getExportReasons');
    this.getTenantCompanies();
  },
  methods: {
    bytesToSize(bytes) {
      let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    upload() {
      if (this.$refs.file.files.length !== 0 && this.$refs.file.files[0].size > 2621440000) {
        this.$refs.file.value = '';
        this.request.file     = '';
        return this.$toast.error('Размер файла не должен превышать 10 мегабайт').goAway(2000);
      } else {
        this.request.file = this.$refs.file.files[0];
      }
    },
    async next() {
      if (this.status) {
        if (!this.request.tenant_company_id) {
          this.$toast.error('Выберите организацию').goAway(2000);
          return this.$refs.tenant_company_id.focus();
        } else if (!this.request.room_id) {
          this.$toast.error('Выберите помещение').goAway(2000);
          return this.$refs.room_id.focus();
        } else if (parseInt(this.type) === 2 && !this.request.export_reason_id) {
          this.$toast.error('Выберите причину вывоза').goAway(2000);
          return this.$refs.exportReason.focus();
        } else if (parseInt(this.type) === 2 && parseInt(this.request.export_reason_id) === 0 && this.request.export_reason_comment.trim() === '') {
          this.$toast.error('Напишите причину вывоза').goAway(2000);
          return this.$refs.exportReasonComment.focus();
        } else if (this.request.phone.replace(/[^0-9]/g, '').length !== 11) {
          this.$toast.error('Укажите номер телефона').goAway(2000);
          return this.$refs.phone.firstChild.focus();
        } else if (this.request.period === '') {
          return this.$toast.error('Укажите период проведения').goAway(2000);
        } else if (this.daysBetween(this.request.period[0], this.request.period[1]) > 5) {
          return this.$toast.error('Заявка заполняется максимум на 5 дней').goAway(2000);
        } else if (this.request.responsible.length === 0) {
          return this.$toast.error('Укажите ответстенных лиц').goAway(2000);
        }
        for (let i = 0; i < this.request.responsible.length; i++) {
          if (this.request.responsible[i].name.trim() === '') {
            return this.$refs['name' + i][0].focus();
          } else if (this.request.responsible[i].surname.trim() === '') {
            return this.$refs['surname' + i][0].focus();
          }
        }
        this.request.start  = this.request.period[0].getFullYear()+'-'+this.request.period[0].getMonth()+'-'+this.request.period[0].getDate();
        this.request.end    = this.request.period[1].getFullYear()+'-'+this.request.period[1].getMonth()+'-'+this.request.period[1].getDate();
        this.$emit('statusRequestChange',false);
      } else {
        if (this.request.commodity.length === 0 && this.$refs.file.files.length === 0) {
          return this.$toast.error('Укажите список ТМЦ или загрузите файл перечня  ввозимого/вывозимого').goAway(2000);
        }

        for (let i = 0; i < this.request.commodity.length; i++) {
          if (this.request.commodity[i].title.trim() === '') {
            return this.$refs['title' + i][0].focus();
          } else if (this.request.commodity[i].quantity.trim() === '') {
            return this.$refs['quantity' + i][0].focus();
          }
        }
        let formData = new FormData();
        formData.append('user_id',this.user.id);
        formData.append('work',this.type);
        formData.append('facility_id',this.user.facility_id.id);
        for (const [key, value] of Object.entries(this.request)) {
          if (key === 'responsible' || key === 'commodity') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
        let res = await this.$store.dispatch('localStorage/createRequest', formData);
        console.log(res);
      }
    },
    disabledRange(date) {
      let today = new Date();
      return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    },
    async getTenantCompanies() {
      this.tenantCompanies = await this.$store.dispatch('localStorage/getTenantCompanies', this.user.id);
    },
    async getRoomsByFacilityId() {
      this.rooms = await this.$store.dispatch('localStorage/getRoomsByTenantCompanyId',this.request.tenant_company_id);
    },
    daysBetween(first, second) {
      let one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
      let two = new Date(second.getFullYear(), second.getMonth(), second.getDate());
      let millisecondsPerDay = 1000 * 60 * 60 * 24;
      let millisBetween = two.getTime() - one.getTime();
      let days = millisBetween / millisecondsPerDay;
      return Math.floor(days);
    }
  }
}
</script>

<style lang="scss">
  @import "assets/Modal.scss";
</style>
