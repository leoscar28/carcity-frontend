export default ($axios) => ({
  reject(payload) {
    return $axios.post('/api/requestQueue/reject/'+payload.id,payload.data)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data
      });
  },
  approve(payload) {
    return $axios.get('/api/requestQueue/approve/'+payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  get(payload) {
    return $axios.get('/api/requestQueue/list/'+payload.type+'/'+payload.userId+'/'+payload.paginate+'/'+payload.take)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
