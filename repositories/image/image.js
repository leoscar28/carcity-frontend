export default ($axios) => ({
  create(data) {
    return $axios.post('/api/image/create',data)
      .then(response => {
      return response.data.data;
    }).catch(error => {
      return error.response.data;
    });
  },
  getByUserId(payload) {
    return $axios.get('/api/image/getByUserId/'+payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
