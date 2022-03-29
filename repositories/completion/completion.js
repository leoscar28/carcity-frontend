export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/completion/pagination',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/completion/all',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  delete(payload) {
    return $axios.get('/api/completion/delete/'+payload.rid+'/'+payload.id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  download(payload) {
    return $axios.post('/api/completion/download/',payload)
      .then(response => {
        return response.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  downloadAll(rid) {
    return $axios.get('/api/completion/downloadAll/'+rid)
      .then(response => {
        return response.data;
      }).catch(error => {
        return error.response.data;
      });
  }
});
