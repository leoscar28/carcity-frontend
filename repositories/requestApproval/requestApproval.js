export default ($axios) => ({
  delete(id) {
    return $axios.get('/api/requestApproval/delete/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  getById(id) {
    return $axios.get('/api/requestApproval/getById/'+id).then(response => {
      return response.data;
    }).catch(error => {
      return error.response.data;
    });
  },
  createRequestApproval(payload) {
    return $axios.post('/api/requestApproval/create',payload)
      .then(response => {
        return response.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  list() {
    return $axios.get('/api/requestApproval/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
});
