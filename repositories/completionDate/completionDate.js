export default ($axios) => ({
  update(payload) {
    return $axios.post('/api/completionDate/update/'+payload.id,payload.data)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  pages(payload) {
    return $axios.post('/api/completionDate/pagination',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  list(payload) {
    return $axios.post('/api/completionDate/list',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  delete(rid) {
    return $axios.get('/api/completionDate/delete/'+rid)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
