export default ($axios) => ({
  getByUserId(payload) {
    return $axios.get('/api/room/getByUserId/'+payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  get() {
    return $axios.get('/api/room/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
