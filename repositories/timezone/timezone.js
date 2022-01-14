export default ($axios) => ({
  list() {
    return $axios.get('/api/timezone/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
