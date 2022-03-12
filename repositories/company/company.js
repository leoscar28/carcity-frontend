export default ($axios) => ({
  list() {
    return $axios.get('/api/company/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
