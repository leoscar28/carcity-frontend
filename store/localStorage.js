export const state = () => ({
  user: false,
  city: [],
  timezone: [],
  facility: [],
})

export const mutations = {
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
  }
}

export const actions = {
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
  async getFacilities({commit,state}) {
    const res = await this.$repository.facility.getByCompanyId(state.user.company_id);
    commit('setFacility',res);
  }
};
