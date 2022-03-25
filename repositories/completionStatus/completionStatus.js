export default ($axios) => ({
  list() {
    return $axios.get('/api/completionStatus/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
