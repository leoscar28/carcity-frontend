export default ($axios) => ({
  list() {
    return $axios.get('/api/dictionaryBrand/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
