export default ($axios) => ({
  list() {
    return $axios.get('/api/applicationStatus/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
