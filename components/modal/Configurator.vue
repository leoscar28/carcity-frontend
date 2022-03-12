<template>
  <div class="modal" :class="{'modal-hidden':!show}" onselectstart="return false;">
    <div class="modal-content">
      <div class="modal-content-header-close" @click="$emit('showChange',false)"></div>
      <div class="modal-content-header">Конфигурация согласования заявок</div>
      <template v-if="status">
        <div class="modal-content-graph-header">
          <button @click="create">Создать</button>
        </div>
        <div class="modal-content-graph-list" v-if="requestApprovals && requestApprovals.length > 0">
          <div class="modal-content-graph-list-item" v-for="(requestApproval,key) in requestApprovals" :key="key">
            <div class="modal-content-graph-list-item-content">
              <div class="modal-content-graph-list-item-content-name">{{requestApproval.facility.title}}</div>
              <div class="modal-content-graph-list-item-content-detail"><span>Вид работ:</span> {{workTypes[requestApproval.work - 1]}}</div>
              <div class="modal-content-graph-list-item-content-detail"><span>Арендатор согласует заявки:</span> {{yesOrNo[requestApproval.tenant_agree - 1]}}</div>
            </div>
            <div class="modal-content-graph-list-item-buttons">
              <button class="modal-content-graph-list-item-delete" @click="deleteRequestApproval(requestApproval.id)"></button>
            </div>
          </div>
        </div>
        <div class="modal-content-graph-empty" v-else>У вас нет настроек на конфигурацию согласования заявок</div>
      </template>
      <template v-else>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Вид работ</div>
          <div class="modal-content-graph-field-radios">
            <div class="modal-content-graph-field-radios-item" v-for="(work,key) in workTypes">
              <input type="radio" name="work" :value="key+1" :id="'work'+key" v-model="configure.work">
              <label :for="'work'+key">{{work}}</label>
            </div>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Объект</div>
          <div class="modal-content-graph-field-input">
            <select v-model="configure.facility_id" ref="facility_id">
              <option disabled selected value="null">Выберите объект</option>
              <option v-for="(facility,key) in facilities" :key="key" :value="facility.id">{{facility.title}}</option>
            </select>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-field-title">Арендатор согласует заявки</div>
          <div class="modal-content-graph-field-radios">
            <div class="modal-content-graph-field-radios-item" v-for="(tenant_agree,key) in yesOrNo" :key="key">
              <input type="radio" name="tenant_agree" :value="key+1" :id="'tenant'+key" v-model="configure.tenant_agree" checked>
              <label :for="'tenant'+key">{{tenant_agree}}</label>
            </div>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-block">
            <div class="modal-content-graph-block-header">
              <div class="modal-content-graph-block-title">Вид согласования</div>
              <div class="modal-content-graph-block-radios modal-content-graph-field-radios">
                <div class="modal-content-graph-field-radios-item" v-for="(department_type,key) in typesOfApprove">
                  <input type="radio" name="department_type" v-model="configure.data.type" :value="key+1" :id="'department_type'+key" checked>
                  <label :for="'department_type'+key">{{department_type}}</label>
                </div>
              </div>
            </div>
            <div class="modal-content-graph-block-body">
              <draggable v-model="departments">
                <div class="modal-content-graph-block-body-item" v-for="(department,key) in departments" :key="key" :class="{'modal-content-graph-block-body-item-hide':(department.id === departmentShow)}">
                  <div class="modal-content-graph-block-body-item-num">{{key + 1}}</div>
                  <div class="modal-content-graph-block-body-item-item"></div>
                  <div class="modal-content-graph-block-body-item-title" @click="departmentShow = department.id">{{department.title}}</div>
                  <div class="modal-content-graph-block-body-item-add">
                    <input type="checkbox" checked v-model="department.check">
                  </div>
                </div>
              </draggable>
            </div>
          </div>
        </div>
        <div class="modal-content-graph-field">
          <div class="modal-content-graph-block">
            <div class="modal-content-graph-block-header">
              <div class="modal-content-graph-block-title">Вид согласования пользователей</div>
              <div class="modal-content-graph-block-radios modal-content-graph-field-radios">
                <div class="modal-content-graph-field-radios-item" v-for="(user_type,key) in typesOfUserApprove">
                  <input type="radio" name="user_type" v-model="configure.data.user_type" :value="key+1" :id="'user_type'+key" checked>
                  <label :for="'user_type'+key">{{user_type}}</label>
                </div>
              </div>
            </div>
            <div class="modal-content-graph-block-body">
              <draggable v-model="departmentUsers">
                <div class="modal-content-graph-block-body-item" v-for="(departmentUser,key) in departmentUsers" :key="key" :class="{'modal-content-graph-block-body-item-none':(departmentUser.department_id !== departmentShow)}">
                  <div class="modal-content-graph-block-body-item-num">{{departmentUser.id}}</div>
                  <div class="modal-content-graph-block-body-item-item"></div>
                  <div class="modal-content-graph-block-body-item-title">
                    <div class="modal-content-graph-block-body-item-title-role" v-if="departmentUser.position_id">{{departmentUser.position_id.title}}</div>
                    <div>{{departmentUser.name}} {{departmentUser.surname}}</div>
                  </div>
                  <div class="modal-content-graph-block-body-item-add">
                    <input type="checkbox" checked v-model="departmentUser.check">
                  </div>
                </div>
              </draggable>
            </div>
          </div>
        </div>
        <div class="modal-content-graph-footer">
          <div>
            <button @click="$emit('statusChange',true);reset();">Отмена</button>
          </div>
          <div>
            <button class="modal-content-graph-footer-btn" @click="save">Сохранить</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "Configurator",
  components: {draggable,},
  props: ['show','status'],
  data() {
    return {
      loading: false,
      edit: false,
      departmentShow: null,
      configure: {
        facility_id: null,
        tenant_agree: 1,
        work: 1,
        data: {
          type: 1,
          departments: [],
          user_type: 1,
          departmentUsers: [],
        }
      },
    }
  },
  computed: {
    typesOfUserApprove() {
      return this.$store.state.localStorage.typesOfUserApprove;
    },
    typesOfApprove() {
      return this.$store.state.localStorage.typesOfApprove;
    },
    yesOrNo() {
      return this.$store.state.localStorage.yesOrNo;
    },
    workTypes() {
      return this.$store.state.localStorage.workTypes;
    },
    requestApprovals() {
      return this.$store.state.localStorage.requestApproval;
    },
    facilities() {
      return this.$store.state.localStorage.facilityList;
    },
    departments() {
      return this.$store.state.localStorage.department;
    },
    departmentUsers() {
      return this.$store.state.localStorage.departmentUsers;
    }
  },
  created() {
    this.$store.dispatch('localStorage/getRequestApproval');
    this.$store.dispatch('localStorage/getFacilityList');
    this.$store.dispatch('localStorage/getDepartment');
  },
  methods: {
    deleteRequestApproval(id) {
      this.$store.dispatch('localStorage/deleteRequestApproval',id)
    },
    reset() {
      this.configure  = {
        facility_id: null,
        tenant_agree: 1,
        work: 1,
        data: {
          type: 1,
          departments: [],
          user_type: 1,
          departmentUsers: [],
        }
      };
      this.departmentShow  = null;
    },
    async save() {
      if (this.loading) {
        return;
      }
      if (!this.configure.facility_id) {
        this.$toast.error('Выберите объект').goAway(2000);
        return this.$refs.facility_id.focus();
      }

      this.configure.data.departments = [];
      this.departments.forEach(item => {
        if (item.check || item.check === undefined) {
          this.configure.data.departments.push(item.id);
        }
      });
      this.configure.data.departmentUsers = [];
      this.departmentUsers.forEach(item => {
        if (item.check || item.check === undefined) {
          this.configure.data.departmentUsers.push([item.id, item.department_id]);
        }
      });
      let update  = this.$toast.show('Сохранение данных');
      let res = await this.$store.dispatch('localStorage/createRequestApproval',this.configure);
      if (res.hasOwnProperty('errors')) {
        update.goAway(0);
        for (const [key, value] of Object.entries(res.errors)) {
          this.$toast.error(`${value}`).goAway(2000);
        }
      } else {
        update.goAway(0);
        this.$toast.show('Сохранено').goAway(2000);
        this.loading  = false;
        this.$emit('statusChange',true);
      }

    },
    create() {
      this.reset();
      this.$emit('statusChange',false);
    },
  }
}
</script>

<style lang="scss">
@import "assets/Modal.scss";
</style>
