export const state = () => ({
  user: false
})

export const mutations = {
  setUser(state,value) {
    state.user  = value;
  }
}

export const actions = {
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

    return res;
  }
};
