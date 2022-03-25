export const state = () => ({
  user: false,
  sidebar: false,
  statuses: [],
  lang: {
    formatLocale: {
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      weekdaysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
      weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    }
  },
})

export const mutations = {
  setStatuses(state,value) {
    state.statuses  = value;
  },
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
  setUser(state,value) {
    state.user  = value;
  },
}

export const actions = {
  async getInvoicePages({commit},payload) {
    return await this.$repository.invoice.pages(payload);
  },
  async getInvoices({commit},payload) {
    return await this.$repository.invoice.all(payload);
  },

  async getApplicationPages({commit},payload) {
    return await this.$repository.application.pages(payload);
  },
  async getApplications({commit},payload) {
    return await this.$repository.application.all(payload);
  },

  async getCompletionPages({commit},payload) {
    return await this.$repository.completion.pages(payload);
  },
  async getCompletions({commit},payload) {
    return await this.$repository.completion.all(payload);
  },

  async getInvoiceStatuses({commit}) {
    let res = await this.$repository.invoiceStatus.list();
    commit('setStatuses',res);
  },
  async invoiceDateUpdate({commit},payload) {
    return await this.$repository.invoiceDate.update(payload);
  },
  async getInvoiceDatePages({commit},payload) {
    return await this.$repository.invoiceDate.pages(payload);
  },
  async getInvoiceDates({commit},payload) {
    return await this.$repository.invoiceDate.list(payload);
  },

  async getApplicationStatuses({commit}) {
    let res = await this.$repository.applicationStatus.list();
    commit('setStatuses',res);
  },
  async applicationDateUpdate({commit},payload) {
    return await this.$repository.applicationDate.update(payload);
  },
  async getApplicationDatePages({commit},payload) {
    return await this.$repository.applicationDate.pages(payload);
  },
  async getApplicationDates({commit},payload) {
    return await this.$repository.applicationDate.list(payload);
  },

  async getCompletionStatuses({commit}) {
    let res = await this.$repository.completionStatus.list();
    commit('setStatuses',res);
  },
  async completionDateUpdate({commit},payload) {
    return await this.$repository.completionDate.update(payload);
  },
  async getCompletionDatePages({commit},payload) {
    return await this.$repository.completionDate.pages(payload);
  },
  async getCompletionDates({commit},payload) {
    return await this.$repository.completionDate.list(payload);
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
