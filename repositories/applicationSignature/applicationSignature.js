export default ($axios) => ({
  multipleStart(payload) {
    return $axios.get('/api/applicationSignature/multipleStart/'+payload.rid+'/'+payload.user_id, {timeout: 600000})
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  start(payload) {
    return $axios.get('/api/applicationSignature/start/'+payload.id+'/'+payload.user_id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  multipleCreate(payload) {
    return $axios.post('/api/applicationSignature/multipleCreate',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  create(payload) {
    return $axios.post('/api/applicationSignature/create',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  }
});
