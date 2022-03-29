export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/invoice/pagination',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/invoice/all',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  delete(payload) {
    return $axios.get('/api/invoice/delete/'+payload.rid+'/'+payload.id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  download(payload) {
    return $axios.post('/api/invoice/download/',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  downloadAll(rid) {
    return $axios.get('/api/invoice/downloadAll/'+rid)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  }
});
