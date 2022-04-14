export default ($axios) => ({
  update(payload) {
    return $axios.post('/api/applicationDate/update/'+payload.id,payload.data)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  pages(payload) {
    return $axios.post('/api/applicationDate/pagination',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  get(payload) {
    return $axios.post('/api/applicationDate/get',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  list(payload) {
    return $axios.post('/api/applicationDate/list',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  delete(rid) {
    return $axios.get('/api/applicationDate/delete/'+rid)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
