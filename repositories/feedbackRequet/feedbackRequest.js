export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/feedbackRequest/pagination', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/feedbackRequest/all', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  create(payload) {
    return $axios.post('/api/feedbackRequest/create', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  addMessage(payload) {
    return $axios.post('/api/feedbackRequest/addMessage', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  close(id) {
    return $axios.post('/api/feedbackRequest/close/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  getById(payload) {
    return $axios.post(`/api/feedbackRequest/getById/${payload.id}`, payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  count(type) {
    return $axios.get('/api/feedbackRequest/count/'+type)
      .then(response => {
        return response.data;
      }).catch(error => {
        return error.response.data;
      });
  },
});
