export default ($axios) => ({
  multipleStart(payload) {
    return $axios.get('/api/completionSignature/multipleStart/'+payload.rid+'/'+payload.user_id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  start(payload) {
    return $axios.get('/api/completionSignature/start/'+payload.id+'/'+payload.user_id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  multipleCreate(payload) {
    return $axios.post('/api/completionSignature/multipleCreate',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  create(payload) {
    return $axios.post('/api/completionSignature/create',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  }
});
