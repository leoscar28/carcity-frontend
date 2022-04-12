<template>
  <div class="request-section">
    <div class="request-section-main">
      <div class="request-section-main-header">
        <div class="request-section-main-header-title" v-if="type === 1">Акт выполненных работ</div>
        <div class="request-section-main-header-title" v-else-if="type === 2">Договора и приложения</div>
        <div class="request-section-main-header-title" v-else-if="type === 3">Счет на оплату</div>
        <button class="request-section-main-header-filter" @click="$store.commit('localStorage/toggleFilter')">
          <i class="request-section-main-header-filter-icon"></i>
          Фильтр
        </button>
      </div>
      <div class="request-section-main-filter" v-show="filter">
        <div class="request-section-main-filter-item-input" v-if="user.role_id === 1 && type !== 2">
          <div class="request-section-main-filter-item-input-icon matrix"></div>
          <input type="text" placeholder="Сумма" v-model="sum">
        </div>
        <div class="request-section-main-filter-item-input">
          <select class="request-section-main-filter-item-input-select" v-model="upload_status_id">
            <option :value="null">Все статусы</option>
            <template v-if="(type !== 2 && user.role_id !== 4 && user.role_id !== 1) || user.role_id === 3 || user.role_id === 2">
              <option v-for="(status,key) in statuses" :key="key" :value="status.id">{{status.title}}</option>
            </template>
            <template v-else-if="user.role_id === 4">
              <option v-for="(status,key) in statuses" :key="key" :value="status.id">
                <template v-if="status.id === 1">Ожидает подписание вами</template>
                <template v-else>{{status.title}}</template>
              </option>
            </template>
            <template v-else-if="user.role_id === 1">
              <option v-for="(status,key) in statuses" :key="key" :value="status.id">
                <template v-if="status.id === 2">Ожидает подписание вами</template>
                <template v-else-if="status.id === 3">Подписано</template>
                <template v-else-if="status.id === 1">Ожидает подписание руководителем</template>
              </option>
            </template>
          </select>
        </div>
        <div class="request-section-main-filter-item-input">
          <div class="request-section-main-filter-item-input-icon calendar"></div>
          <date-picker v-model="date" range readonly format="YYYY.MM.DD" :lang="lang" :range-separator="' - '" :editable="false" ></date-picker>
        </div>
        <div class="request-section-main-filter-item">
          <button class="request-section-main-filter-item-find" @click="search">Найти</button>
          <button class="request-section-main-filter-item-reset" @click="reset">Сбросить</button>
        </div>
      </div>
      <request-section-footer :paginate="paginate" :pages="pages" :take="take" :range="range" @up="up" @down="down" @setRange="setRange" @setPaginate="setPaginate" @setTake="setTake"></request-section-footer>
      <table class="request-section-main-table" v-if="user.role_id !== 1 && requests.length > 0">
        <thead>
          <tr>
            <th>
              <div class="request-section-table-header request-section-table-header-bold">
                <div class="request-section-table-header-icon"></div>
                <div class="request-section-table-header-id">ID</div>
                <div class="request-section-table-header-status">Статус выгрузки</div>
                <div class="request-section-table-header-date">Дата</div>
                <div class="request-section-table-header-count">Всего</div>
                <div class="request-section-table-header-count">Доступные</div>
                <div class="request-section-table-header-count">Не выгружены</div>
                <div class="request-section-table-header-comment">Комментарий</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(request,key) in requests">
            <tr class="request-section-main-table-row" :key="key" onselectstart="return false;">
              <td>
                <div class="request-section-table-header" :class="{'request-section-table-header-border':!request.status}" @click.stop="request.status = !request.status">
                  <div class="request-section-table-header-icon">
                    <div :class="{'request-section-table-header-icon-minus':!request.status,'request-section-table-header-icon-plus':request.status}"></div>
                  </div>
                  <div class="request-section-table-header-id request-section-table-header-date-main">{{request.id}}</div>
                  <div class="request-section-table-header-status">
                    <template v-if="type === 1 || type === 3">
                      <div class="request-section-table-header-status-new" v-if="request.upload_status_id === 1">{{statuses[request.upload_status_id - 1].title}}</div>
                      <div class="request-section-table-header-status-download" v-else-if="request.upload_status_id === 2">{{statuses[request.upload_status_id - 1].title}}</div>
                    </template>
                    <template v-else>
                      <div class="request-section-table-header-status-new" v-if="request.upload_status_id === 1">
                        <template v-if="user.role_id === 3">
                          {{statuses[request.upload_status_id - 1].title}}
                        </template>
                        <template v-else>
                          Ожидает подписание вами
                        </template>
                      </div>
                      <div class="request-section-table-header-status-download" v-if="request.upload_status_id === 2">{{statuses[request.upload_status_id - 1].title}}</div>
                      <div class="request-section-table-header-status-success" v-if="request.upload_status_id === 3">{{statuses[request.upload_status_id - 1].title}}</div>
                    </template>
                  </div>
                  <div class="request-section-table-header-date request-section-table-header-date-main">{{request.created_at}}</div>
                  <div class="request-section-table-header-count request-section-table-header-count-success">{{request.document_all}}</div>
                  <div class="request-section-table-header-count">{{request.document_available}}</div>
                  <div class="request-section-table-header-count request-section-table-header-count-danger">{{request.document_all - request.document_available}}</div>
                  <template v-if="user.role_id === 3">
                    <div class="request-section-table-header-comment" @click.stop="$emit('requestCommentShowChange',true);$emit('requestChange',request)">
                      <div class="request-section-table-header-comment-icon"></div>
                      <div class="request-section-table-header-comment-text" v-if="request.comment && request.comment.trim() !== ''">{{request.comment}}</div>
                      <div class="request-section-table-header-comment-text-empty" v-else>Нет комментарий</div>
                    </div>
                  </template>
                  <template v-else-if="request.comment && request.comment.trim() !== ''">
                    <div class="request-section-table-header-comment" @click.stop="$emit('requestCommentShowChange',true);$emit('requestChange',request)">
                      <div class="request-section-table-header-comment-icon"></div>
                      <div class="request-section-table-header-comment-text">{{request.comment}}</div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="request-section-table-header-comment">
                      <div class="request-section-table-header-comment-icon"></div>
                      <div class="request-section-table-header-comment-text-empty">Нет комментарий</div>
                    </div>
                  </template>
                </div>
                <div class="request-section-table-body" v-show="!request.status">
                  <div class="request-section-table-body-header">
                    <div class="request-section-table-body-header-title" v-if="type === 1">Успешно выгружено документов {{request.rids.length}}, скачано {{downloadLength(key,2)}}</div>
                    <div class="request-section-table-body-header-title" v-if="type === 2">Успешно выгружено документов {{request.rids.length}}, подписано вами {{signedSupervisor(key)}}, Подписано клиентом {{signedTenant(key)}}</div>
                    <div class="request-section-table-body-header-title" v-if="type === 3">Успешно выгружено документов {{request.rids.length}}, скачано {{downloadLength(key,2)}}</div>
                    <div class="request-section-table-body-header-buttons">
                      <button class="request-section-table-body-header-button">
                        <div class="request-section-table-body-header-button-icon"></div>
                        Отчет в CSV
                      </button>
                      <button class="request-section-table-body-header-button">
                        <div class="request-section-table-body-header-button-icon"></div>
                        Отчет в XLS
                      </button>
                      <button class="request-section-table-body-header-button" @click="downloadAll(request.rid)">
                        <div class="request-section-table-body-header-button-icon" style="background: url('/cloud-download.png') no-repeat center;border-radius: 0;background-size: auto;width: 20px;"></div>
                        Скачать все
                      </button>
                      <button class="request-section-table-body-header-button request-section-table-body-header-button-reject" v-if="user.role_id === 3" @click.stop="cancelFlight(request.rid)">
                        <div class="request-section-table-body-header-button-icon request-section-table-body-header-button-reject-icon"></div>
                        Отменить рейс
                      </button>
                    </div>
                  </div>
                  <table class="request-section-table-body-list" v-show="request.rids">
                    <thead>
                      <tr class="request-section-table-body-list-item">
                        <th>Номер документа</th>
                        <th>Организация</th>
                        <th>Дата</th>
                        <th>Сумма</th>
                        <th>Название</th>
                        <th>Компания</th>
                        <th>Статус</th>
                        <th>
                          <div class="request-section-table-body-list-item-buttons" v-if="(request.document_all - request.document_available) > 0">
                            <div class="request-section-table-body-list-item-empty" style="margin-left: auto;" @click="request.ridStatus = !request.ridStatus"></div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="request-section-table-body-list-item" v-for="(rid,ridKey) in request.rids" :key="ridKey" v-if="!request.ridStatus || !rid.users">
                        <td>{{rid.number}}</td>
                        <td class="request-section-table-body-list-item-organization">{{rid.organization}}</td>
                        <td>{{rid.created_at}}</td>
                        <td>{{rid.sum}}₸</td>
                        <td class="request-section-table-body-list-item-name">{{rid.name}}</td>
                        <td class="request-section-table-body-list-item-customer">{{rid.customer}}</td>
                        <td>
                          <template v-if="type === 1">
                            <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-new" v-if="rid.upload_status_id === 1">Новый</button>
                            <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-download" v-if="rid.upload_status_id === 2">Скачано</button>
                          </template>
                          <template v-else-if="type === 2">
                            <button class="request-section-table-body-list-item-btn request-section-table-body-header-button-reject" v-if="rid.upload_status_id === 1 && user.role_id === 4" @click="signFile(rid.id)">Подписать</button>
                            <button class="request-section-table-body-list-item-btn request-section-table-body-header-button-reject" v-else-if="rid.upload_status_id === 1 && user.role_id !== 4">{{statuses[rid.upload_status_id - 1].title}}</button>
                            <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-download" v-else-if="rid.upload_status_id === 2">{{statuses[rid.upload_status_id - 1].title}}</button>
                            <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-signed" v-else-if="rid.upload_status_id === 3">{{statuses[rid.upload_status_id - 1].title}}</button>
                          </template>
                          <template v-else-if="type === 3">
                            <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-new" v-if="rid.upload_status_id === 1">Новый</button>
                            <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-download" v-if="rid.upload_status_id === 2">Скачано</button>
                          </template>
                        </td>
                        <td>
                          <div class="request-section-table-body-list-item-buttons">
                            <div class="request-section-table-body-list-item-trash" v-if="user.role_id === 3" @click="deleteRequest(key,ridKey,rid.id, request.rid)"></div>
                            <div class="request-section-table-body-list-item-download" @click="download(rid.id,rid.rid,false)"></div>
                            <div class="request-section-table-body-list-item-empty" v-if="!rid.users">
                              <div class="request-section-table-body-list-item-empty-data">
                                <div class="request-section-table-body-list-item-empty-data-main">
                                  <div class="request-section-table-body-list-item-empty-data-main-title">БИН/ИИН</div>
                                  <div class="request-section-table-body-list-item-empty-data-main-value">{{rid.customer_id}}</div>
                                  <div class="request-section-table-body-list-item-empty-data-copy" @click="copy(rid.customer_id)"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="request-section-table-body-footer" v-if="type === 2 && user.role_id === 4 && signedSupervisor(key) !== request.rids.length">
                    <button class="request-section-table-body-header-button" @click="signFiles(request.rid)">
                      <div class="request-section-table-body-header-button-icon request-section-table-body-footer-draw"></div>
                      Подписать документы
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <table class="request-section-main-table" v-else-if="user.role_id === 1 && requests.length > 0">
        <thead class="request-section-main-table-head">
          <tr class="request-section-main-table-tr">
            <th>Номер документа</th>
            <th>Организация</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Название</th>
            <th>Компания</th>
            <th>Статус</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="request-section-main-table-tr" v-for="(request,key) in requests" :key="key">
            <td class="request-section-table-header-date-main">{{request.number}}</td>
            <td class="request-section-table-header-date-main">{{request.organization}}</td>
            <td>{{request.created_at}}</td>
            <td class="request-section-table-header-count-success">{{request.sum}}₸</td>
            <td>{{request.name}}</td>
            <td>{{request.customer}}</td>
            <td>
              <template v-if="type === 1">
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-new" v-if="request.upload_status_id === 1">Новый</button>
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-download" v-if="request.upload_status_id === 2">Скачано</button>
              </template>
              <template v-else-if="type === 2">
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-subscribe" v-if="request.upload_status_id === 1">Ожидает подписания</button>
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-signed" v-else-if="request.upload_status_id === 2"  @click="signFile(request.id)">Подписать</button>
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-download" v-else-if="request.upload_status_id === 3">Подписано</button>
              </template>
              <template v-else-if="type === 3">
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-new" v-if="request.upload_status_id === 1">Новый</button>
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-download" v-if="request.upload_status_id === 2">Скачано</button>
              </template>
            </td>
            <td>
              <div class="request-section-table-body-list-item-buttons">
                <div class="request-section-table-body-list-item-download" @click="download(request.id,request.rid,true);"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="request-section-main-table-empty" v-else>Записей не найдено</div>
      <request-section-footer :paginate="paginate" :pages="pages" :take="take" :range="range" @up="up" @down="down" @setRange="setRange" @setPaginate="setPaginate" @setTake="setTake"></request-section-footer>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
DatePicker.locale('ru');
import 'vue2-datepicker/index.css';
import {Signa} from "~/utils/signa";
export default {
  name: "RequestSection",
  props: ['type','requestChange'],
  components: { DatePicker},
  computed: {
    filter() {
      return this.$store.state.localStorage.filter;
    },
    user() {
      return this.$store.state.localStorage.user;
    },
    statuses() {
      return this.$store.state.localStorage.statuses;
    },
    lang() {
      return this.$store.state.localStorage.lang;
    },
    signatureLoading() {
      return this.$store.state.localStorage.signatureLoading;
    }
  },
  watch: {
    upload_status_id() {
      this.paginate = 1;
      this.range  = 1;
    },
    requestChange(value) {
      let key, index = 0;
      if (typeof value === 'object') {
        this.requests.forEach(item => {
          if (value.id === item.id) {
            key = index;
          }
          index++;
        });
        this.requests.splice(key,1,value);
      } else {
        this.requests.forEach(item => {
          if (value === item.id) {
            key = index;
          }
          index++;
        });
        this.requests.splice(key,1);
      }
    },
    async paginate() {
      await this.getDataRequests();
    }
  },
  data() {
    this.signa = new Signa();
    return {
      load: true,
      take: 30,
      paginate: 1,
      range: 1,
      pages: 0,
      upload_status_id: null,
      date: null,
      sum: '',
      requests: [],
    }
  },
  async created() {
    this.$store.commit('localStorage/setSignatureLoading',false);
    if (this.load) {
      this.load = false;
      this.setPage();
      await this.getStatuses();
      await this.getDataRequests();
    }
  },
  methods: {
    copy(bin) {
      let self  = this;
      navigator.clipboard.writeText(bin).then(function() {
        self.$toast.show('Скопировано').goAway(2000);
      }, function(err) {
        self.$toast.error('Async: Could not copy text: '+ err).goAway(2000);
      });
    },
    async signFiles(rid) {
      if (!this.signatureLoading) {
        this.$store.commit('localStorage/setSignatureLoading', true);
        let data = {
          rid: rid,
          user_id: this.user.id,
        };
        data.res = await this.$store.dispatch('localStorage/applicationMultipleSignatureStart', data);
        if (data.res.hasOwnProperty('message')) {
          this.$store.commit('localStorage/setSignatureLoading',false);
          return this.$toast.error(data.res.message).goAway(2000);
        }
        let xml = [];
        data.res.forEach(item => {
          xml.push(`<?xml version="1.0" encoding="utf-8"?><root><name>${item.data}</name></root>`);
        });
        this.signatureFiles(xml,data);
      }
    },
    signatureFiles(arr,data) {
      this.signa.signXmls(arr, (signedBase64) => {
        if (data.hasOwnProperty('rid') && signedBase64) {
          data.signature  = signedBase64;
          this.signXmlFiles(data);
        } else if (signedBase64) {
          data.signature  = signedBase64[0];
          this.signXmlFile(data);
        } else {
          this.$toast.error('Произошла ошибка').goAway(2000);
        }
      });
    },
    async signFile(id) {
      if (!this.signatureLoading) {
        this.$store.commit('localStorage/setSignatureLoading',true);
        let data  = {
          id: id,
          user_id: this.user.id,
          role_id: this.user.role_id
        };
        let res = await this.$store.dispatch('localStorage/applicationSignatureStart',data);
        return console.log(res);
        if (res.hasOwnProperty('message')) {
          this.$store.commit('localStorage/setSignatureLoading',false);
          return this.$toast.error(res.message).goAway(2000);
        }
        this.signatureFiles([`<?xml version="1.0" encoding="utf-8"?><root><name>${res}</name></root>`],data);
      }
    },
    async signXmlFiles(data) {
      if (data.res.length !== data.signature.length) {
        return this.$toast.error('Произошла ошибка, количество подписанных документов не соответствует количеству записей!').goAway(5000);
      }
      let res = await this.$store.dispatch('localStorage/applicationSignaturesCreate',data);
      let key = 0, index;
      this.requests.forEach(item => {
        if (res.rid === item.rid) {
          index = key;
        }
        key++;
      });
      if (index !== undefined) {
        res.status  = false;
        this.requests.splice(index,1,res);
      }
      this.$store.commit('localStorage/setSignatureLoading',false);
      this.$toast.show('Подписано '+data.signature.length+' документ(а)').goAway(2000);
    },
    async signXmlFile(data) {
      let res = await this.$store.dispatch('localStorage/applicationSignatureCreate',data);
      if (res.hasOwnProperty('message')) {
        return this.$toast.error(res.message).goAway(2000);
      }
      let i = 0, index, key;
      this.$store.commit('localStorage/setSignatureLoading',false);
      if (data.role_id === 4) {
        this.requests.forEach(item => {
          if (item.rid === res.rid) {
            index = i;
          }
          i++;
        });
        i = 0;
        this.requests[index].rids.forEach(item => {
          if (item.id === res.id) {
            key = i;
          }
          i++;
        });
        this.requests[index].rids.splice(key,1,res);
      } else if (data.role_id === 1) {
        key = 0;
        let position = undefined;
        this.requests.forEach(item => {
          if (item.id === res.id) {
            position  = key;
          }
          key++;
        });
        if (position) {
          this.requests.splice(position,1,res);
        } else {
          await this.find();
        }
      }
    },
    async deleteRequest(key,ridKey,id, rid) {
      this.requests[key].rids.splice(ridKey,1);
      if (this.type === 1) {
        await this.$store.dispatch('localStorage/completionDelete',{
          id: id,
          rid: rid
        });
        if (this.requests[key].rids.length === 0) {
          await this.$store.dispatch('localStorage/completionDateDelete',rid);
          await this.getDataRequests();
        }
      } else if (this.type === 2) {
        await this.$store.dispatch('localStorage/applicationDelete',{
          id: id,
          rid: rid
        });
        if (this.requests[key].rids.length === 0) {
          await this.$store.dispatch('localStorage/applicationDateDelete',rid);
          await this.getDataRequests();
        }
      } else if (this.type === 3) {
        await this.$store.dispatch('localStorage/invoiceDelete',{
          id: id,
          rid: rid
        });
        if (this.requests[key].rids.length === 0) {
          await this.$store.dispatch('localStorage/invoiceDateDelete',rid);
          await this.getDataRequests();
        }
      }
    },
    async cancelFlight(rid) {
      if (this.type === 1) {
        await this.$store.dispatch('localStorage/completionDateDelete',rid);
      } else if (this.type === 2) {
        await this.$store.dispatch('localStorage/applicationDateDelete',rid);
      } else if (this.type === 3) {
        await this.$store.dispatch('localStorage/invoiceDateDelete',rid);
      }
      await this.getDataRequests();
    },
    async setTake(value) {
      this.take = value;
      this.paginate = 1;
      this.range = 1;
      await this.find();
    },
    setPaginate(value) {
      this.paginate = value;
    },
    setRange(value) {
      this.range  = value;
    },
    down() {
      this.range--;
    },
    up() {
      this.range++;
    },
    signedTenant(key) {
      let index = 0;
      this.requests[key].rids.forEach(item => {
        if (item.upload_status_id === 3) {
          index++;
        }
      });
      return index;
    },
    signedSupervisor(key) {
      let index = 0;
      this.requests[key].rids.forEach(item => {
        if (item.upload_status_id !== 1) {
          index++;
        }
      });
      return index;
    },
    downloadLength(key,status) {
      let index = 0;
      this.requests[key].rids.forEach(item => {
        if (item.upload_status_id === status) {
          index++;
        }
      });
      return index;
    },
    async getDataRequests() {
      let data = {
        pagination: this.paginate,
        take: this.take,
      };
      if (this.sum.trim() !== '') {
        data.sum= this.sum;
      }
      if (this.upload_status_id) {
        data.upload_status_id = this.upload_status_id;
      }
      if (this.date && this.date[0] && this.date[1]) {
        let start = this.date[0];
        let end   = this.date[1];
        data.created_at = start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate()+'_'+end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate();
      }
      if (this.user.role_id === 1) {
        data.bin  = this.user.bin;
      }
      if (this.user.role_id !== 1) {
        if (this.type === 1) {
          this.pages  = await this.$store.dispatch('localStorage/getCompletionDatePages', data);
          this.requests = await this.$store.dispatch('localStorage/getCompletionDates', data);
        } else if (this.type === 2) {
          this.pages  = await this.$store.dispatch('localStorage/getApplicationDatePages', data);
          this.requests = await this.$store.dispatch('localStorage/getApplicationDates', data);
        } else if (this.type === 3) {
          this.pages  = await this.$store.dispatch('localStorage/getInvoiceDatePages', data);
          this.requests = await this.$store.dispatch('localStorage/getInvoiceDates', data);
        }
      } else {
        if (this.type === 1) {
          this.pages  = await this.$store.dispatch('localStorage/getCompletionPages', data);
          this.requests = await this.$store.dispatch('localStorage/getCompletions', data);
        } else if (this.type === 2) {
          this.pages  = await this.$store.dispatch('localStorage/getApplicationPages', data);
          this.requests = await this.$store.dispatch('localStorage/getApplications', data);
        } else if (this.type === 3) {
          this.pages  = await this.$store.dispatch('localStorage/getInvoicePages', data);
          this.requests = await this.$store.dispatch('localStorage/getInvoices', data);
        }
      }
      this.load = true;
    },
    async search() {
      this.paginate = 1;
      this.range  = 1;
      await this.find();
    },
    async find() {
      await this.getDataRequests();
    },
    async reset() {
      this.sum  = '';
      this.upload_status_id = null;
      this.date = '';
      this.paginate = 1;
      this.range  = 1;
      await this.find();
    },
    setPage() {
      let page  = parseInt(this.$route.query.page);
      if (isNaN(page) || page === 0) {
        this.paginate = 1;
      } else {
        this.paginate = page;
      }
    },
    async getStatuses() {
      if (this.type === 1) {
        await this.$store.dispatch('localStorage/getCompletionStatuses');
      } else if (this.type === 2) {
        await this.$store.dispatch('localStorage/getApplicationStatuses');
      } else if (this.type === 3) {
        await this.$store.dispatch('localStorage/getInvoiceStatuses');
      }
    },
    async deleteTenant(id,rid) {
      let data  = {
        id: id,
        rid: rid
      }
      if (this.type === 1) {
        await this.$store.dispatch('localStorage/completionDelete',data);
      } else if (this.type === 2) {
        await this.$store.dispatch('localStorage/applicationDelete',data);
      } else if (this.type === 3) {
        await this.$store.dispatch('localStorage/invoiceDelete',data);
      }
      await this.getDataRequests();
    },
    async downloadAll(rid) {
      let res;
      if (this.type === 1) {
        res = await this.$store.dispatch('localStorage/completionDownloadAll',rid);
      } else if (this.type === 2) {
        res = await this.$store.dispatch('localStorage/applicationDownloadAll',rid);
      } else if (this.type === 3) {
        res = await this.$store.dispatch('localStorage/invoiceDownloadAll',rid);
      }
      if (res.hasOwnProperty('message')) {
        return this.$toast.error(res.message).goAway(2000);
      }
      res.forEach(item => {
        window.open(item,'_blank');
      });
    },
    async download(id,rid,status) {
      let data  = {
        id: id,
        rid: rid,
        status: status
      };
      let res;
      if (this.type === 1) {
        res = await this.$store.dispatch('localStorage/completionDownload',data);
      } else if (this.type === 2) {
        res = await this.$store.dispatch('localStorage/applicationDownload',data);
      } else if (this.type === 3) {
        res = await this.$store.dispatch('localStorage/invoiceDownload',data);
      }
      if (res.hasOwnProperty('message')) {
        this.$toast.error(res.message).goAway(2000);
      } else if (res.hasOwnProperty('link')) {
        this.downloadFile(res.link);
      }
      if (res.status) {
        await this.getDataRequests();
      }
    },
    downloadFile(link) {
      window.open(link,'_blank');
      // const anchor = document.createElement('a');
      // anchor.href = link;
      // anchor.style.display  = 'none';
      // anchor.download = link;
      // document.body.appendChild(anchor);
      // anchor.click();
      // document.body.removeChild(anchor);
    }
  }
}
</script>

<style lang="scss">
  @import '/assets/RequestSection.scss';
</style>
