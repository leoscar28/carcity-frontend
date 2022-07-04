export default ($axios) => ({
  get() {
    return $axios.get('/api/infrastructure/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
