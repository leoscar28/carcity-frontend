<template>
  <div class="request-section">
    <request-card-preloader v-if="status"></request-card-preloader>
    <request-card404 v-else-if="notFound"></request-card404>
    <request-card403 v-else-if="restricted"></request-card403>
    <div class="request-section-main" v-else>
      <div class="request-section-main-card-main">
        <div class="request-section-main-header-card">
          <div class="request-section-main-header-card-description"><span>Заявки /</span> №{{request.id}}</div>
          <NuxtLink to="requests" v-if="request.work === 1">
            <div class="request-section-main-header-card-arrow">
              <div class="request-section-main-header-card-arrow-icon"></div>
              <div class="request-section-main-header-card-arrow-title">№{{request.id}}</div>
            </div>
          </NuxtLink>
          <NuxtLink to="exrequests" v-else>
            <div class="request-section-main-header-card-arrow">
              <div class="request-section-main-header-card-arrow-icon"></div>
              <div class="request-section-main-header-card-arrow-title">№{{request.id}}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="request-section-main-card-body">
        <div class="request-section-main-card-body-items">
          <div class="request-section-main-card-body-item">
            <div class="request-section-main-card-body-item-title">Общая информация</div>
            <div class="request-section-main-card-body-item-cell">
              <div class="request-section-main-card-body-item-cell-title">Название компании</div>
              <div class="request-section-main-card-body-item-cell-value">{{request.tenantCompany.title}}</div>
            </div>
            <div class="request-section-main-card-body-item-cell">
              <div class="request-section-main-card-body-item-cell-title">Номер помещения</div>
              <div class="request-section-main-card-body-item-cell-value">{{request.room.title}}</div>
            </div>
            <div class="request-section-main-card-body-item-cell">
              <div class="request-section-main-card-body-item-cell-title">Дата создания заявки</div>
              <div class="request-section-main-card-body-item-cell-value">{{request.created_at_readable}}</div>
            </div>
            <div class="request-section-main-card-body-item-cell">
              <div class="request-section-main-card-body-item-cell-title">Вид работ</div>
              <div class="request-section-main-card-body-item-cell-value">{{workTypes[request.work-1]}}</div>
            </div>
          </div>
          <div class="request-section-main-card-body-item">
            <div class="request-section-main-card-body-item-title request-section-main-card-body-item-title-invisible">Общая информация</div>
            <div class="request-section-main-card-body-item-cell">
              <div class="request-section-main-card-body-item-cell-title">Подающий заявку</div>
              <div class="request-section-main-card-body-item-cell-value">{{request.user.name}} {{request.user.surname}}</div>
            </div>
            <div class="request-section-main-card-body-item-cell">
              <div class="request-section-main-card-body-item-cell-title">Мобильный телефон</div>
              <div class="request-section-main-card-body-item-cell-value">{{request.phone}}</div>
            </div>
            <div class="request-section-main-card-body-item-cell" v-if="request.work_phone">
              <div class="request-section-main-card-body-item-cell-title">Рабочий телефон</div>
              <div class="request-section-main-card-body-item-cell-value">{{request.work_phone}}</div>
            </div>
            <div class="request-section-main-card-body-item-cell">
              <div class="request-section-main-card-body-item-cell-title">Статус</div>
              <div class="request-section-main-card-body-item-cell-value">
                <div class="request-section-main-table-row-status-agreed" v-if="request.ready === 1">На согласовании</div>
                <div class="request-section-main-table-row-status-approved" v-else-if="request.ready === 2">Согласовано</div>
                <div class="request-section-main-table-row-status-ready" v-else-if="request.ready === 3">Выполнено</div>
                <div class="request-section-main-table-row-status-rejected" v-else-if="request.ready === 0">Отклонено</div>
              </div>
            </div>
          </div>
          <div class="request-section-main-card-body-item">
            <div class="request-section-main-card-body-item-title">Ответственные лица</div>
            <div class="request-section-main-card-body-item-persons">
              <div class="request-section-main-card-body-item-person" v-for="(responsiblePeople,key) in request.requestResponsible" :key="key">
                <div class="request-section-main-card-body-item-person-icon">{{responsiblePeople.name[0]}}{{responsiblePeople.surname[1]}}</div>
                <div class="request-section-main-card-body-item-person-title">{{responsiblePeople.name}} {{responsiblePeople.surname}}</div>
              </div>
            </div>
            <div class="request-section-main-card-body-item-cell">
              <div class="request-section-main-card-body-item-cell-title">Период проведения</div>
              <div class="request-section-main-card-body-item-cell-value">{{request.start.replace(/-/g, ".")}} <div class="request-section-main-card-body-item-cell-arrow"></div> {{request.end.replace(/-/g, ".")}}</div>
            </div>
            <div class="request-section-main-card-body-item-cell">
              <div class="request-section-main-card-body-item-cell-title">Список ТМЦ</div>
            </div>
            <div class="request-section-main-card-body-item-cell">
              <button class="request-section-main-card-body-item-button" @click="$emit('commodityShowChange',true)">Открыть список</button>
            </div>
          </div>
        </div>
      </div>
      <div class="request-section-main-card-footer">
        <div class="request-section-main-card-body-items">
          <div class="request-section-main-card-body-item">
            <div class="request-section-main-card-body-item-title">Процесс согласования</div>
            <div class="request-section-main-card-body-item-cell" v-for="(item,key) in queue" :key="key">
              <div class="request-section-main-card-body-item-cell-value">{{item.title}}</div>
            </div>
          </div>
          <div class="request-section-main-card-body-item">
            <div class="request-section-main-card-body-item-title request-section-main-card-body-item-title-invisible">Процесс согласования</div>
            <div class="request-section-main-card-body-item-cell" v-for="(item,key) in queue" :key="key">
              <div class="request-section-main-card-body-item-cell-value">
                <div class="request-section-main-card-body-item-cell-indicator request-section-main-card-body-item-cell-indicator-rejected" v-if="item.type === 0">
                  <div class="request-section-main-card-body-item-cell-indicator-icon"></div>
                  <div class="request-section-main-card-body-item-cell-indicator-title">
                    <div>{{item.list[0].user.name}} {{item.list[0].user.surname}}</div>
                    <div>{{item.list[0].updated_at_readable}}</div>
                  </div>
                </div>
                <div class="request-section-main-card-body-item-cell-indicator request-section-main-card-body-item-cell-indicator-approved" v-else-if="item.type === 1">
                  <div class="request-section-main-card-body-item-cell-indicator-icon"></div>
                  <div class="request-section-main-card-body-item-cell-indicator-title" v-if="item.list.length > 1">
                    <div class="request-section-main-card-body-item-cell-indicator-title-list">
                      <div class="request-section-main-card-body-item-cell-indicator-title-list-show">
                        <div class="request-section-main-card-body-item-cell-indicator-title-list-show-item" v-for="(user,index) in item.list" :key="index" v-if="user.user" :class="{'request-section-main-card-body-item-cell-indicator-title-list-show-item-approved':(user.approve === 1),'request-section-main-card-body-item-cell-indicator-title-list-show-item-agreed':(user.approve === 2),'request-section-main-card-body-item-cell-indicator-title-list-show-item-rejected':(user.approve === 0)}">
                          <div class="request-section-main-card-body-item-cell-indicator-title-list-show-item-icon"></div>
                          <div class="request-section-main-card-body-item-cell-indicator-title-list-show-item-title" v-if="user.approve === 1">
                            <div>{{user.user.name}} {{user.user.surname}}</div>
                            <div>{{user.updated_at_readable}}</div>
                          </div>
                          <div class="request-section-main-card-body-item-cell-indicator-title-list-show-item-title" v-else-if="user.approve === 2">
                            <div>{{user.user.name}} {{user.user.surname}}</div>
                            <div>На согласовании</div>
                          </div>
                          <div class="request-section-main-card-body-item-cell-indicator-title-list-show-item-title" v-else-if="user.approve === 3">
                            <div>{{user.user.name}} {{user.user.surname}}</div>
                            <div>Ожидает согласования</div>
                          </div>
                          <div class="request-section-main-card-body-item-cell-indicator-title-list-show-item-title" v-else-if="user.approve === 4">
                            <div>{{user.user.name}} {{user.user.surname}}</div>
                            <div>Отклонено</div>
                          </div>
                        </div>
                        <div class="request-section-main-card-body-item-cell-indicator-title-list-show-angle"></div>
                      </div>
                      {{item.list.length}} пользователя
                    </div>
                    <div>{{item.list[0].updated_at_readable}} {{item.list.length}} {{key}}</div>
                  </div>
                  <div class="request-section-main-card-body-item-cell-indicator-title" v-else>
                    <div>{{item.list[0].user.name}} {{item.list[0].user.surname}}</div>
                    <div>{{item.list[0].updated_at_readable}}</div>
                  </div>
                </div>
                <div class="request-section-main-card-body-item-cell-indicator request-section-main-card-body-item-cell-indicator-agreed" v-else-if="item.type === 2">
                  <div class="request-section-main-card-body-item-cell-indicator-icon"></div>
                  <div class="request-section-main-card-body-item-cell-indicator-title">
                    <div>На согласовании</div>
                  </div>
                </div>
                <div class="request-section-main-card-body-item-cell-indicator" v-else-if="item.type === 3">
                  <div class="request-section-main-card-body-item-cell-indicator-icon"></div>
                  <div class="request-section-main-card-body-item-cell-indicator-title">
                    <div>Ожидает согласования</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="request-section-main-card-body-item">
            <template v-if="approve === 2">
              <div class="request-section-main-card-body-item-title">Согласуйте заявку</div>
              <div class="request-section-main-card-body-item-buttons">
                <button class="request-section-main-card-body-item-button-approve" @click="approveRequest">Принять</button>
                <button class="request-section-main-card-body-item-button-cancel" @click="$emit('requestRejectShowChange',true)">Отклонить</button>
              </div>
            </template>
            <template v-if="approve === 1">
              <div class="request-section-main-card-body-item-title">Вы можете отклонить заявку</div>
              <div class="request-section-main-card-body-item-buttons">
                <button class="request-section-main-card-body-item-button-cancel" @click="$emit('requestRejectShowChange',true)">Отклонить</button>
              </div>
            </template>
            <template v-if="approve === 0">
              <div class="request-section-main-card-body-item-title">Причина отказа</div>
              <textarea class="request-section-main-card-body-item-description" readonly>{{comment}}</textarea>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RequestCard",
  props: ['processShow','approveId','newRequest'],
  data() {
    return {
      status: true,
      notFound: false,
      restricted: false,
      request: false,
      queue: [],
      approve: 2,
      comment: '',
      approveStatus: true,
    }
  },
  watch: {
    newRequest: function(value) {
      this.request  = value;
      this.setRequestData();
    }
  },
  computed: {
    user() {
      return this.$store.state.localStorage.user;
    },
    workTypes() {
      return this.$store.state.localStorage.workTypes;
    },
    typesOfUserApprove() {
      return this.$store.state.localStorage.typesOfUserApprove;
    }
  },
  async created() {
    if (!this.$route.query.id) {
      this.status = false;
      this.notFound = true;
    } else {
      this.request  = await this.$store.dispatch('localStorage/getRequestByIdAndUserId', {
        userId: this.user.id,
        id: this.$route.query.id
      });
      this.setRequestData();
    }
  },
  methods: {
    setRequestData() {
      this.status = false;
      if (this.request === 403) {
        this.restricted = true;
      } else if (this.request === 404) {
        this.notFound = true;
      } else {
        this.setQueue();
        this.setApprove();
        this.$emit('commodityRequestChange',this.request);
      }
    },
    async approveRequest() {
      if (this.approveStatus) {
        this.approveStatus = false;
        this.request  = await this.$store.dispatch('localStorage/approveRequest',this.approveId);
        this.setRequestData();
        this.approveStatus  = true;
      }
    },
    setApprove() {
      if (this.request.ready === 0) {
        this.approve  = 0;
        this.request.requestQueue.forEach(item => {
          if (item.approve === 0) {
            this.comment = item.comment;
          }
        });
      } else {
        this.request.requestQueue.forEach(item => {
          if (item.user.id === this.user.id) {
            this.$emit('approveIdChange',item.id);
            this.approve  = item.approve;
          }
        });
      }
    },
    setQueue() {
      let arr = [];
      this.request.requestQueue.forEach(item => {
        if (!item.department) {
          if (arr[0] === undefined) {
            arr[0] = {
              title: 'Арендатор',
              type: 3,
              method: item.type,
              list: [],
              time: item.updated_at_readable
            };
            if (item.type === 1 || item.type === 2) {
              arr[0].type = 0;
            }
          }
          if (item.type === 1 || item.type === 2) {
            if (arr[0].type < item.approve) {
              arr[0].type = item.approve;
              arr[0].time = item.updated_at_readable;
            }
          } else {
            if (arr[0].type > item.approve) {
              arr[0].type = item.approve;
              arr[0].time = item.updated_at_readable;
            }
          }
          arr[0].list.push(item);
        } else {
          if (arr[item.department.id] === undefined) {
            arr[item.department.id] = {
              title: item.department.title,
              type: 3,
              method: item.type,
              list: [],
              time: item.updated_at_readable
            };
            if (item.type === 1 || item.type === 2) {
              arr[item.department.id].type = 0;
            }
          }
          if (item.type === 1 || item.type === 2) {
            if (arr[item.department.id].type < item.approve) {
              arr[item.department.id].type = item.approve;
              arr[item.department.id].time = item.updated_at_readable;
            }
          } else {
            if (arr[item.department.id].type > item.approve) {
              arr[item.department.id].type = item.approve;
              arr[item.department.id].time = item.updated_at_readable;
            }
          }
          arr[item.department.id].list.push(item);
        }
      });
      this.queue = arr.filter(el => {
        return el != null && el !== '';
      });
    }
  }
}
</script>

<style lang="scss">

</style>
