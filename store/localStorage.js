export const state = () => ({
  workTypes: ['Ввоз','Вывоз'],
  yesOrNo: ['Да','Нет'],
  typesOfApprove: ['Последовательно','Параллельно'],
  typesOfUserApprove: ['Последовательно','Параллельно','Первый клик'],
  measureTypes: ['Штук','Пакет','Мешок','Ящик','Коробка','Контейнер'],
  user: false,
  city: [],
  timezone: [],
  facility: [],
  facilityList: [],
  image: [],
  sidebar: false,
  requestApproval: [],
  department: [],
  departmentUsers: [],
  company: [],
  exportReason: []
})

export const mutations = {
  setExportReason(state,value) {
    state.exportReason  = value;
  },
  setCompany(state,value) {
    state.company = value;
  },
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
  setUser(state,value) {
    state.user  = value;
  },
  setCity(state,value) {
    state.city  = value;
  },
  setTimezone(state,value) {
    state.timezone  = value;
  },
  setFacility(state,value) {
    state.facility  = value;
  },
  setFacilityList(state,value) {
    state.facilityList  = value;
  },
  setImage(state,value) {
    state.image = value;
  },
  addImage(state,value) {
    state.image.unshift(value);
  },
  addRequestApproval(state,value) {
    state.requestApproval.unshift(value);
  },
  setRequestApproval(state,value) {
    state.requestApproval = value;
  },
  setDepartment(state,value) {
    state.department = value;
  },
  setDepartmentUsers(state,value) {
    state.departmentUsers = value;
  }
}

export const actions = {
  async rejectRequest({commit},payload) {
    return await this.$repository.requestQueue.reject(payload);
  },
  async approveRequest({commit},payload) {
    return await this.$repository.requestQueue.approve(payload);
  },
  async getRequests({commit},payload) {
    const res = await this.$repository.requestQueue.get(payload);
    return res;
  },
  async getRequestByIdAndUserId({commit},payload) {
    return await this.$repository.request.getRequestByIdAndUserId(payload);
  },
  async createRequest({commit},payload) {
    const res = await this.$repository.request.create(payload);
    return res;
  },
  async getExportReasons({commit}) {
    const res = await this.$repository.exportReason.list();
    commit('setExportReason',res);
  },
  async getRoomsByTenantCompanyId({commit},id) {
    return await this.$repository.room.getByTenantCompanyId(id);
  },
  async getTenantCompanies({commit},id) {
    return await this.$repository.tenantCompany.getByUserId(id);
  },
  async getRequestApprovalById({commit},id) {
    return await this.$repository.requestApproval.getById(id);
  },
  async getRequestApproval({commit}) {
    const res = await this.$repository.requestApproval.list();
    commit('setRequestApproval',res);
  },
  async deleteRequestApproval({commit},id) {
    const res = await this.$repository.requestApproval.delete(id);
    commit('setRequestApproval',res);
  },
  async createRequestApproval({commit},payload) {
    const res = await this.$repository.requestApproval.createRequestApproval(payload);
    if (!res.hasOwnProperty('errors')) {
      commit('addRequestApproval',res);
    }
    return res;
  },
  async getFacilityList({commit}) {
    const res = await this.$repository.facility.list();
    commit('setFacilityList',res);
  },
  async getFacilities({commit,state}) {
    const res = await this.$repository.facility.getByCompanyId(state.user.company_id);
    commit('setFacility',res);
  },
  async getFacilityByCompanyId({commit},company_id) {
    return await this.$repository.facility.getByCompanyId(company_id);
  },
  async getCompanies({commit}) {
    const res = await this.$repository.company.list();
    commit('setCompany',res);
  },
  async getUserByDepartmentId({commit},departmentId) {
    return await this.$repository.user.getUserByDepartmentId(departmentId);
  },
  async getDepartmentByCompanyId({commit},companyId) {
    return await this.$repository.department.getByCompanyId(companyId);
  },
  async getDepartment({commit}) {
    let res = await this.$repository.department.list();
    commit('setDepartment',res);
    let departmentIds = [];
    res.forEach(item => {
      departmentIds.push(item.id);
    });
    res = await this.$repository.user.getUserByDepartmentsId({
      ids: departmentIds
    });
    commit('setDepartmentUsers',res);
  },
  async getUserByFacilityId({commit},payload) {
    return await this.$repository.user.getUserByFacilityId(payload);
  },
  async imageCreate({commit},payload) {
    const res = await this.$repository.image.create(payload);
    if (!res.hasOwnProperty('message')) {
      commit('addImage',res);
    }
    return res;
  },
  async changePassword({commit},payload) {
    return await this.$repository.user.changePassword(payload);
  },
  async setUser({commit},payload) {
    const res = await this.$repository.user.setUser(payload);
    if (!res.hasOwnProperty('errors')) {
      commit('setUser',res);
    }
    return res;
  },
  async auth({commit},payload) {
    const res = await this.$repository.user.auth(payload);
    commit('setUser',res);
    return res;
  },
  async next({commit},payload) {
    return await this.$repository.user.next(payload);
  },
  async finish({commit},payload) {
    const res = await this.$repository.user.finish(payload);
    if (!res.hasOwnProperty('errors')) {
      commit('setUser',res);
    }
    return res;
  },
  async codeCheck({commit},payload) {
    const res = await this.$repository.user.codeCheck(payload);
    if (!res.hasOwnProperty('message')) {
      commit('setUser',res);
    }
    return res;
  },
  async getCities({commit}) {
    const res = await this.$repository.city.list();
    commit('setCity',res);
  },
  async getTimezones({commit}) {
    const res = await this.$repository.timezone.list();
    commit('setTimezone',res);
  },
  async getImages({commit,state}) {
    const res = await this.$repository.image.getByUserId(state.user.id);
    commit('setImage',res);
  }
};
