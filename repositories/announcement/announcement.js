export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/announcement/pagination', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/announcement/all', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  create(payload) {
    return $axios.post('/api/announcement/create', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  setView(id) {
    return $axios.post('/api/announcement/setView/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  getById(payload) {
    return $axios.post(`/api/announcement/getById/${payload.id}`, payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  getNotViewed(payload) {
    return $axios.post(`/api/announcement/getNotViewed`, payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  getActiveCustomers() {
    return $axios.get(`/api/announcement/activeCustomers`)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
});
