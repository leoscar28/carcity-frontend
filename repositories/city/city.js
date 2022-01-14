export default ($axios) => ({
  list() {
    return $axios.get('/api/city/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
