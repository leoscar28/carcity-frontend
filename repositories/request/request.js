export default ($axios) => ({
  getRequestByIdAndUserId(payload) {
    return $axios.get('/api/request/getRequestByIdAndUserId/'+payload.id+'/'+payload.userId,)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  create(payload) {
    return $axios.post('/api/request/create',payload,{ 'Content-Type': 'multipart/form-data' })
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
});
