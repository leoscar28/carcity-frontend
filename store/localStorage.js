export const state = () => ({
  email: false,
  user: false,
  sidebar: false,
  statuses: [],
  signatureLoading: false,
  current: 0,
  languages: ['RU','KZ'],
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
  setEmail(state,value) {
    state.email = value;
  },
  setCurrent(state,value) {
    state.current = value;
  },
  setStatuses(state,value) {
    state.statuses  = value;
  },
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
  setUser(state,value) {
    state.user  = value;
  },
  setSignatureLoading(state,value) {
    state.signatureLoading  = value;
  }
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

  async invoiceDownloadAll({commit},payload) {
    return await this.$repository.invoice.downloadAll(payload);
  },
  async invoiceDownload({commit},payload) {
    return await this.$repository.invoice.download(payload);
  },
  async invoiceDelete({commit},payload) {
    return await this.$repository.invoice.delete(payload);
  },
  async getInvoiceStatuses({commit}) {
    let res = await this.$repository.invoiceStatus.list();
    commit('setStatuses',res);
  },
  async invoiceDateDelete({commit},rid) {
    return await this.$repository.invoiceDate.delete(rid);
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

  async applicationSignaturesCreate({commit},payload) {
    return await this.$repository.applicationSignature.multipleCreate(payload);
  },
  async applicationSignatureCreate({commit},payload) {
    return await this.$repository.applicationSignature.create(payload);
  },
  async applicationMultipleSignatureStart({commit},payload) {
    return await this.$repository.applicationSignature.multipleStart(payload);
  },
  async applicationSignatureStart({commit},payload) {
    return await this.$repository.applicationSignature.start(payload);
  },
  async applicationDownloadAll({commit},payload) {
    return await this.$repository.application.downloadAll(payload);
  },
  async applicationDownload({commit},payload) {
    return await this.$repository.application.download(payload);
  },
  async applicationDelete({commit},payload) {
    return await this.$repository.application.delete(payload);
  },
  async getApplicationStatuses({commit}) {
    let res = await this.$repository.applicationStatus.list();
    commit('setStatuses',res);
  },
  async applicationDateDelete({commit},rid) {
    return await this.$repository.applicationDate.delete(rid);
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

  async completionDownloadAll({commit},payload) {
    return await this.$repository.completion.downloadAll(payload);
  },
  async completionDownload({commit},payload) {
    return await this.$repository.completion.download(payload);
  },
  async completionDelete({commit},payload) {
    return await this.$repository.completion.delete(payload);
  },
  async getCompletionStatuses({commit}) {
    let res = await this.$repository.completionStatus.list();
    commit('setStatuses',res);
  },
  async completionDateDelete({commit},rid) {
    return await this.$repository.completionDate.delete(rid);
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
