export default ($axios) => ({
  list() {
    return $axios.get('/api/dictionarySparePart/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
