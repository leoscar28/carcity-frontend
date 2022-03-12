export default ($axios) => ({
  list() {
    return $axios.get('/api/exportReason/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
});
