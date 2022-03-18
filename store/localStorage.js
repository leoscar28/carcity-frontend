export const state = () => ({
  user: false,
  sidebar: false,
  uploadStatuses: [],
})

export const mutations = {
  setUploadStatuses(state,value) {
    state.uploadStatuses  = value;
  },
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
  setUser(state,value) {
    state.user  = value;
  },
}

export const actions = {
  async getUploadStatuses({commit}) {
    const res = await this.$repository.uploadStatus.list();
    commit('setUploadStatuses',res);
  },
  async auth({commit},payload) {
    const res = await this.$repository.user.auth(payload);
    commit('setUser',res);
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
};
