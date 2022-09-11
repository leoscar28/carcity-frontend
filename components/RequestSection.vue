<template>
  <div class="request-section">
    <div class="request-section-main">
      <div class="request-section-main-header">
        <div class="request-section-main-header-title">{{ title }}</div>
        <div class="request-section-main-header-sub-buttons">
          <button v-if="user.role_id !== 1 || (user.role_id === 1 && type === 'request')" class="request-section-main-header-sub-buttons-filter" @click="$store.commit('localStorage/toggleFilter')"><i class="request-section-main-header-sub-buttons-filter-icon"></i>Фильтр</button>
        </div>
      </div>
      <div class="request-section-main-filter" v-show="filter && (user.role_id !== 1 || user.role_id === 1 && [1,2,3,'request'].includes(type))">
        <div class="request-section-main-filter-item-input" v-if="user.role_id === 1 && [1,3].includes(type)">
          <div class="request-section-main-filter-item-input-icon matrix"></div>
          <input type="text" placeholder="Сумма" v-model="sum">
        </div>
        <template v-if="[4,5,6].includes(type) && user.role_id !== 1">
          <div class="request-section-main-filter-item-input">
            <div class="request-section-main-filter-item-input-icon matrix"></div>
            <input type="text" placeholder="ID" v-model="id">
          </div>
          <div class="request-section-main-filter-item-input">
            <div class="request-section-main-filter-item-input-icon matrix"></div>
            <input type="text" placeholder="По названию компани" v-model="company_term">
          </div>
        </template>
        <div v-if="![4,5,6,'review', 'request'].includes(type)" class="request-section-main-filter-item-input">
          <select class="request-section-main-filter-item-input-select" v-model="upload_status_id">
            <option :value="null">Все статусы</option>
            <template v-if="(type === 3 && user.role_id !== 4 && user.role_id !== 1) || user.role_id === 3 || user.role_id === 2">
              <option v-for="(status,key) in statuses" :key="key" :value="status.id">{{status.title}}</option>
            </template>
            <template v-else-if="user.role_id === 4">
              <option v-for="(status,key) in statuses" :key="key" :value="status.id">
                <template v-if="status.id === 1">Ожидает подписание вами</template>
                <template v-else>{{status.title}}</template>
              </option>
            </template>
            <template v-else-if="user.role_id === 1">
              <option v-for="(status,key) in statuses" :key="key" :value="status.id" v-if="status.id !== 1">
                <template v-if="status.id === 2">Ожидает подписание вами</template>
                <template v-else>Подписано</template>
              </option>
            </template>
          </select>
        </div>
        <div v-if="type === 'review'" class="request-section-main-filter-item-input">
          <select class="request-section-main-filter-item-input-select" v-model="review_status">
            <option :value="null">Все статусы</option>
            <option :value="10">Опубликованные</option>
            <option :value="40">Удаленные</option>
          </select>
        </div>
        <template v-if="type === 'request'">
          <div v-if="user.role_id !== 1"  class="request-section-main-filter-item-input">
            <select class="request-section-main-filter-item-input-select" v-model="request_status">
              <option :value="null">Все статусы</option>
              <option :value="10">Активные запросы</option>
              <option :value="40">Не активные</option>
            </select>
          </div>
          <div class="request-section-main-filter-item-input">
            <select class="request-section-main-filter-item-input-select" v-model="category_id">
              <option :value="null">Все категории</option>
              <option v-for="item in categories" :value="item.id">{{item.name}}</option>
            </select>
          </div>
          <div class="request-section-main-filter-item-input">
            <select class="request-section-main-filter-item-input-select" v-model="brand_id">
              <option :value="null">Все марки</option>
              <option v-for="item in brands" :value="item.id">{{item.name}}</option>
            </select>
          </div>
        </template>
<!--        <div class="request-section-main-filter-item-input">
          <div class="request-section-main-filter-item-input-icon building"></div>
          <input type="text" placeholder="Компания" v-model="company">
        </div>
        <div class="request-section-main-filter-item-input">
          <div class="request-section-main-filter-item-input-icon building"></div>
          <input type="text" placeholder="Номер документа" v-model="number">
        </div>-->
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
      <template v-if="[4,5,6].includes(this.type)">
        <template v-if="requests.length">
          <WidgetUserBanner v-for="(item, index) in requests" :key="item.id" :item="item" @refresh="getDataRequests"/>
        </template>
        <div v-else class="request-section-main-table-empty">
          <img src="/empty_box.png" />
          <p>Пока здесь нет объявлений</p>
        </div>
      </template>
      <template v-else-if="this.type === 'review'">
        <template v-if="requests.length">
          <WidgetReviewWithBanner v-for="(item, index) in requests" :key="item.id" :item="item"/>
        </template>
        <div v-else class="request-section-main-table-empty">
          <img src="/empty_box.png" />
          <p>Пока здесь нет отзывов</p>
        </div>
      </template>
      <template v-else-if="this.type === 'request'">
        <template v-if="requests.length">
          <WidgetUserRequest v-for="(item, index) in requests" :key="item.id" :item="item"/>
        </template>
        <div v-else class="request-section-main-table-empty">
          <img src="/empty_box.png" />
          <p>Пока здесь нет заявок</p>
        </div>
      </template>
      <template v-else>
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
                <div class="request-section-table-header" :class="{'request-section-table-header-border':!request.status}" @click.stop="requestStatus(key)">
                  <div class="request-section-table-header-icon">
                    <div :class="{'request-section-table-header-icon-minus':!request.status,'request-section-table-header-icon-plus':request.status}"></div>
                  </div>
                  <div class="request-section-table-header-id request-section-table-header-date-main">{{request.id}}</div>
                  <div class="request-section-table-header-status">
                    <template v-if="type === 3">
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
                  <div v-if="!request.rids" class="request-section-table-body-loading lds-ring"><div></div><div></div><div></div><div></div></div>
                  <template v-else>
                    <div class="request-section-table-body-header">
                      <div class="request-section-table-body-header-title" v-if="type === 1">Успешно выгружено документов {{request.rids.length}}, подписано вами {{signedSupervisor(key)}}, Подписано клиентом {{signedTenant(key)}}</div>
                      <div class="request-section-table-body-header-title" v-if="type === 2">Успешно выгружено документов {{request.rids.length}}, подписано вами {{signedSupervisor(key)}}, Подписано клиентом {{signedTenant(key)}}</div>
                      <div class="request-section-table-body-header-title" v-if="type === 3">Успешно выгружено документов {{request.rids.length}}, скачано {{downloadLength(key,2)}}</div>
                      <div class="request-section-table-body-header-buttons">
<!--                        <button class="request-section-table-body-header-button">
                          <div class="request-section-table-body-header-button-icon"></div>
                          Отчет в CSV
                        </button>
                        request.number,request.sum,request.customer,request.statusSelected,rid
                        -->
                        <excel :statuses="statuses" :type="type" :rid="request.rid" :number="request.number" :sum="request.sum" :customer="request.customer" :statusSelected="request.statusSelected"></excel>
                        <button class="request-section-table-body-header-button" @click="downloadAll(request,request.number,request.sum,request.customer,request.statusSelected)">
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
                        <th>
                          <input type="text" placeholder="Номер документа" class="request-section-table-body-list-item-input" v-model="request.number">
                        </th>
                        <th>Организация</th>
                        <th>Дата</th>
                        <th>
                          <input type="text" placeholder="Сумма" class="request-section-table-body-list-item-input" v-model="request.sum">
                        </th>
                        <th>Название</th>
                        <th>
                          <input type="text" placeholder="Компания" class="request-section-table-body-list-item-input" v-model="request.customer">
                        </th>
                        <th>
                          <select class="request-section-table-body-list-item-select" v-model="request.statusSelected">
                            <option :value="undefined" selected>Статусы</option>
                            <option v-for="(status,key) in statusConverted" :key="key" :value="status.id">{{ status.title }}</option>
                          </select>
                        </th>
                        <th>
                          <div class="request-section-table-body-list-item-buttons" v-if="(request.document_all - request.document_available) > 0">
                            <div class="request-section-table-body-list-item-empty" style="margin-left: auto;" @click="request.ridStatus = !request.ridStatus"></div>
                          </div>
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr class="request-section-table-body-list-item" v-for="(rid,ridKey) in request.rids" :key="ridKey" v-if="(!request.ridStatus || !rid.users) && filterCheck(request.number,request.sum,request.customer,request.statusSelected,rid)">
                          <td>{{rid.number}}</td>
                          <td class="request-section-table-body-list-item-organization">{{rid.organization}}</td>
                          <td>{{rid.created_at}}</td>
                          <td>{{rid.sum}}₸</td>
                          <td class="request-section-table-body-list-item-name">{{rid.name}}</td>
                          <td class="request-section-table-body-list-item-customer">{{rid.customer}}</td>
                          <td>
                            <template v-if="type === 1">
                              <button class="request-section-table-body-list-item-btn request-section-table-body-header-button-reject" v-if="rid.upload_status_id === 1 && user.role_id === 4" @click="signFile(rid.id)">Подписать</button>
                              <button class="request-section-table-body-list-item-btn request-section-table-body-header-button-reject" v-else-if="rid.upload_status_id === 1 && user.role_id !== 4">{{statuses[rid.upload_status_id - 1].title}}</button>
                              <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-download" v-else-if="rid.upload_status_id === 2">{{statuses[rid.upload_status_id - 1].title}}</button>
                              <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-signed" v-else-if="rid.upload_status_id === 3">{{statuses[rid.upload_status_id - 1].title}}</button>
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
                    <div class="request-section-table-body-footer" v-if="(type === 2 || type === 1) && user.role_id === 4 && signedSupervisor(key) !== request.rids.length">
                      <button class="request-section-table-body-header-button" @click="signFiles(request.rid)">
                        <div class="request-section-table-body-header-button-icon request-section-table-body-footer-draw"></div>
                        Подписать документы
                      </button>
                    </div>
                  </template>
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
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-subscribe" v-if="request.upload_status_id === 1">Ожидает подписания</button>
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-signed" v-else-if="request.upload_status_id === 2"  @click="signFile(request.id)">Подписать</button>
                <button class="request-section-table-body-list-item-btn request-section-table-body-list-item-btn-download" v-else-if="request.upload_status_id === 3">Подписано</button>
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
      </template>
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
import WidgetUserBanner from "./WidgetUserBanner";
import UserBannerModal from "./modal/UserBannerModal";
import RequestSectionFooter from "./RequestSectionFooter";
import UserBannerComment from "./modal/UserBannerComment";
import WidgetReviewWithBanner from "./WidgetReviewWithBanner";
import WidgetUserRequest from "./WidgetUserRequest";
export default {
  name: "RequestSection",
  props: ['type','requestChange'],
  components: {
    WidgetUserRequest,
    WidgetReviewWithBanner,
    UserBannerComment, RequestSectionFooter, UserBannerModal, WidgetUserBanner, DatePicker},
  computed: {
    title(){
      switch (this.type) {
        case 1:
          return 'Акт выполненных работ';
        case 2:
          return 'Договора и приложения';
        case 3:
          return 'Счета на оплату';
        case 4:
          return 'Новые объявления';
        case 5:
          return 'Объявления';
        case 6:
          return 'Неактивные объявления';
        case 'review':
          return 'Отзывы';
        case 'request':
          return 'Заявки';
        default:
          return 'Без заголовка'
      }
    },
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
    },
    statusConverted() {
      let arr = [];
      let statuses  = this.$store.state.localStorage.statuses;
      if ((this.type === 3 && this.user.role_id !== 4 && this.user.role_id !== 1) || this.user.role_id === 3 || this.user.role_id === 2) {
        return statuses
      } else if (this.user.role_id === 4) {
        statuses.forEach(item => {
          if (item.id === 1) {
            arr.push({
              id: item.id,
              title: 'Ожидает подписание вами'
            });
          } else {
            arr.push(item);
          }
        });
      } else if (this.user.role_id === 1) {
        statuses.forEach(item => {
          if (item.id === 2) {
            arr.push({
              id: item.id,
              title: 'Ожидает подписание вами'
            });
          } else if (item.id === 3) {
            arr.push({
              id: item.id,
              title: 'Подписано'
            });
          }
        });
      }
      return arr;
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
      downloadStatus: true,
      take: 30,
      paginate: 1,
      range: 1,
      pages: 0,
      upload_status_id: null,
      date: null,
      sum: '',
      company: '',
      number: '',
      requests: [],
      editable: false,
      review_status: null,
      request_status: null,
      category_id: null,
      brand_id: null,
      brands:[],
      categories:[],
      id: null,
      company_term: ''
    }
  },
  mounted() {
    if (this.user.role_id !== 1) {
      this.$echo.channel("applicationDate").on("applicationDate", (res) => {
        if (this.type === 2 && res.hasOwnProperty('applicationDate')) {
          this.newRequest(res.applicationDate);
        }
      });
      this.$echo.channel("completionDate").on("completionDate", (res) => {
        if (this.type === 1 && res.hasOwnProperty('completionDate')) {
          this.newRequest(res.completionDate);
        }
      });
      this.$echo.channel("invoiceDate").on("invoiceDate", (res) => {
        if (this.type === 3 && res.hasOwnProperty('invoiceDate')) {
          this.newRequest(res.invoiceDate);
        }
      });
      this.$echo.channel("userBannerDate").on("userBannerDate", async (res) => {
        if ([4,5,6].includes(this.type) && res.hasOwnProperty('userBanner')) {
          await this.getDataRequests();
        }
      });
    } else {
      this.$echo.channel("application."+this.user.bin).on("application", (res) => {
        if (this.type === 2 && res.hasOwnProperty('application')) {
          this.newRequest(res.application);
        }
      });
      this.$echo.channel("completion."+this.user.bin).on("completion", (res) => {
        if (this.type === 1 && res.hasOwnProperty('completion')) {
          this.newRequest(res.completion);
        }
      });
      this.$echo.channel("invoice."+this.user.bin).on("invoice", (res) => {
        if (this.type === 3 && res.hasOwnProperty('invoice')) {
          this.newRequest(res.invoice);
        }
      });
    }
  },
  async created() {
    this.$store.commit('localStorage/setSignatureLoading',false);
    if (this.load) {
      this.load = false;
      this.setPage();
      await this.getStatuses();
      await this.getDataRequests();
      this.categories = await this.$store.dispatch('localStorage/listDictionarySpareParts');
      this.brands = await this.$store.dispatch('localStorage/listDictionaryBrands');
    }
  },
  methods: {
    contains(number, digit) {
      if (number < 0) { // make sure negatives are dealt with properly, alternatively replace this if statement with number = Math.abs(number)
        number *= -1;
      }
      if (number === digit) { // this is to deal with the number=0, digit=0 edge case
        return true;
      }
      while (number !== 0) { // stop once all digits are cut off
        if (number % 10 === digit) { // check if the last digit matches
          return true;
        }
        number = Math.floor(number / 10); // cut off the last digit
      }
      return false;
    },
    filterCheck(number, sum, customer, statusSelected, rid) {
      let status  = true;
      if (number && number.trim() !== '' && !rid.number.trim().toLowerCase().includes(number.trim().toLowerCase())) {
        status  = false;
      }
      if (sum && sum.trim().replace(/\s/g, '') !== '' && !rid.sum.toString().replace(/\s/g, '').includes(sum)) {
        status  = false;
      }
      if (customer && customer.trim() !== '' && !rid.customer.trim().toLowerCase().includes(customer.trim().toLowerCase())) {
        status  = false;
      }
      if (statusSelected && (rid.upload_status_id !== statusSelected)) {
        status  = false;
      }
      return status;
    },
    newRequest(request) {
      let status = -1, i = 0;
      this.requests.forEach(item => {
        if (item.id === request.id) {
          status =  i;
        }
        i++;
      });
      if (status < 0 && request.status === 1) {
        this.requests = [request,...this.requests];
      } else if (request.status === 1) {
        this.splice(i,1,request);
      } else {
        this.splice(i,1);
      }
    },
    requestStatus(key) {
      if (!this.requests[key].rids && !this.requests[key].loading) {
        this.getRids(key);
      }
      this.requests[key].status = !this.requests[key].status;
    },
    async getRids(key) {
      this.requests[key].loading = true;
      if (this.type === 1) {
        this.requests[key].rids = await this.$store.dispatch('localStorage/completionGetByRid',this.requests[key].rid);
      } else if (this.type === 2) {
        this.requests[key].rids = await this.$store.dispatch('localStorage/applicationGetByRid',this.requests[key].rid);
      } else if (this.type === 3) {
        this.requests[key].rids = await this.$store.dispatch('localStorage/invoiceGetByRid',this.requests[key].rid);
      }
    },
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
        if (this.type === 1) {
          data.res = await this.$store.dispatch('localStorage/completionMultipleSignatureStart', data);
        } else {
          data.res = await this.$store.dispatch('localStorage/applicationMultipleSignatureStart', data);
        }
        if (data.res.hasOwnProperty('message')) {
          this.$store.commit('localStorage/setSignatureLoading',false);
          return this.$toast.error(data.res.message).goAway(3000);
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
          this.$store.commit('localStorage/setSignatureLoading',false);
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
        let res;
        if (this.type === 1) {
          res = await this.$store.dispatch('localStorage/completionSignatureStart',data);
        } else {
          res = await this.$store.dispatch('localStorage/applicationSignatureStart',data);
        }
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
      let res;
      if (this.type === 1) {
        res = await this.$store.dispatch('localStorage/completionSignaturesCreate',data);
      } else {
        res = await this.$store.dispatch('localStorage/applicationSignaturesCreate',data);
      }
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
      let res;
      if (this.type === 1) {
        res = await this.$store.dispatch('localStorage/completionSignatureCreate',data);
      } else {
        res = await this.$store.dispatch('localStorage/applicationSignatureCreate',data);
      }
      this.$store.commit('localStorage/setSignatureLoading',false);
      if (res.hasOwnProperty('message')) {
        return this.$toast.error(res.message).goAway(2000);
      }
      let i = 0, index, key;
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
        role_id: this.user.role_id
      };
      if (this.sum.trim() !== '') {
        data.sum  =   this.sum;
      }

      if (this.company.trim() !== '') {
        data.company  =   this.company;
      }

      if (this.number.trim() !== '') {
        data.number  =   this.number;
      }

      if (this.upload_status_id) {
        data.upload_status_id = this.upload_status_id;
      }

      if (this.date && this.date[0] && this.date[1]) {
        let start = this.date[0];
        let end   = this.date[1];
        data.created_at = start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate()+'_'+end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate();
      }

      if (this.type === 'request') {
        if (this.brand_id) {
          data['brand_id'] = [this.brand_id];
        }
        if (this.category_id) {
          data['category_id'] = [this.category_id];
        }
      }

      if (this.user.role_id === 1) {
        data.bin  = this.user.bin;
        if (['request', 'review'].includes(this.type)) {
          data.customer_id = this.user.id
          if (this.type === 'request') {
            data.status = [10];
          }

        } else {
          data.user_id = this.user.id
        }
      } else {
        if (this.type === 'review' && this.review_status) {
          data.status = [this.review_status]
        }
        if (this.type === 'request' && this.request_status) {
          data.status = [this.request_status]
        }
      }
      if ([4,5,6].includes(this.type)) {
        if (this.type === 4) {
          data.type = 'new';
        } else if (this.type === 6) {
          data.type = 'inactive';
        } else if (this.type === 5 && this.user.role_id !== 1) {
          data.type = 'active';
        }

        if (this.id) {
          data.id = Number(this.id);
        }

        if (this.company_term) {
          data.company = this.company_term;
        }
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
        } else if ([4,5,6].includes(this.type)) {
          this.pages  = await this.$store.dispatch('localStorage/getUserBannerPages', data);
          this.requests = await this.$store.dispatch('localStorage/getUserBanners', data);
        } else if (this.type === 'request') {
          this.pages  = await this.$store.dispatch('localStorage/getUserRequestPages', data);
          this.requests = await this.$store.dispatch('localStorage/getUserRequests', data);
          console.log(this.pages, this.requests)
        } else if (this.type === 'review') {
          this.pages  = await this.$store.dispatch('localStorage/getUserReviewPages', data);
          this.requests = await this.$store.dispatch('localStorage/getUserReviews', data);
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
        } else if ([4,5,6].includes(this.type)) {
          this.pages  = await this.$store.dispatch('localStorage/getUserBannerPages', data);
          this.requests = await this.$store.dispatch('localStorage/getUserBanners', data);
        } else if (this.type === 'request') {
          if (this.user.can_create_banner) {
            this.pages  = await this.$store.dispatch('localStorage/getUserRequestPages', data);
            this.requests = await this.$store.dispatch('localStorage/getUserRequests', data);
          } else {
            this.pages = 0;
            this.requests = [];
          }

        } else if (this.type === 'review') {
          this.pages  = await this.$store.dispatch('localStorage/getUserReviewPages', data);
          this.requests = await this.$store.dispatch('localStorage/getUserReviews', data);
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
      this.number = '';
      this.company  = '';
      this.brand_id = null;
      this.category_id = null;
      this.id = null;
      this.company_term  = '';
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
      } else if ([4,5,6].includes(this.type)) {
        if (this.user.role_id === 1) {
          await this.$store.dispatch('localStorage/getUserBannerStatuses');
        } else {
          await this.$store.dispatch('localStorage/getManagerBannerStatuses');
        }
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
    async downloadAll(request,number,sum,customer,statusSelected) {
      if (this.downloadStatus) {
        this.downloadStatus = false;
        let res;
        let ids   = [];
        request.rids.forEach(item => {
          let stat  = true;
          if (number && number.trim() !== '' && !item.number.trim().toLowerCase().includes(number.trim().toLowerCase())) {
            stat  = false;
          }
          if (sum && sum.trim().replace(/\s/g, '') !== '' && !item.sum.toString().replace(/\s/g, '').includes(sum)) {
            stat  = false;
          }
          if (customer && customer.trim() !== '' && !item.customer.trim().toLowerCase().includes(customer.trim().toLowerCase())) {
            stat  = false;
          }
          if (statusSelected && (item.upload_status_id  !==  statusSelected)) {
            stat = false;
          }
          if (stat) {
            ids.push(item.id);
          }
        });
        if (this.type === 1) {
          //res = await this.$store.dispatch('localStorage/completionDownloadAll',request.rid);
          res = await this.$store.dispatch('localStorage/completionDownloadByIds',{
            ids: ids
          });
        } else if (this.type === 2) {
          //res = await this.$store.dispatch('localStorage/applicationDownloadAll',request.rid);
          res = await this.$store.dispatch('localStorage/applicationDownloadByIds',{
            ids: ids
          });
        } else if (this.type === 3) {
          //res = await this.$store.dispatch('localStorage/invoiceDownloadAll',request.rid);
          res = await this.$store.dispatch('localStorage/invoiceDownloadByIds',{
            ids: ids
          });
        }
        this.downloadStatus = true;
        if (res.hasOwnProperty('message')) {
          return this.$toast.error(res.message).goAway(2000);
        }
        res.forEach(item => {
          window.open(item,'_blank');
        });
      }
    },
    async download(id,rid,status) {
      if (this.downloadStatus) {
        this.downloadStatus = false;
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
        this.downloadStatus = true;
        if (res.hasOwnProperty('message')) {
          this.$toast.error(res.message).goAway(2000);
        } else if (res.hasOwnProperty('link')) {
          this.downloadFile(res.link);
        }
        if (res.status) {
          await this.getDataRequests();
        }
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
  @import 'assets/RequestSection.scss';
</style>
