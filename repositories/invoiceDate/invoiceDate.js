export default ($axios) => ({
  update(payload) {
    return $axios.post('/api/invoiceDate/update/'+payload.id,payload.data)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  pages(payload) {
    return $axios.post('/api/invoiceDate/pagination',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  get(payload) {
    return $axios.post('/api/invoiceDate/get',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  list(payload) {
    return $axios.post('/api/invoiceDate/list',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  delete(rid) {
    return $axios.get('/api/invoiceDate/delete/'+rid)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
