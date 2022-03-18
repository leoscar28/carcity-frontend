export default ($axios) => ({
  list() {
    return $axios.get('/api/uploadStatus/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
