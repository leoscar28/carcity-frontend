export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/application/pagination',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/application/all',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  delete(payload) {
    return $axios.get('/api/application/delete/'+payload.rid+'/'+payload.id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  download(payload) {
    return $axios.post('/api/application/download/',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  downloadAll(rid) {
    return $axios.get('/api/application/downloadAll/'+rid)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  downloadByIds(ids) {
    return $axios.post('/api/application/downloadByIds/',ids)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  getByRid(rid) {
    return $axios.get('/api/application/getByRid/'+rid)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  }
});
