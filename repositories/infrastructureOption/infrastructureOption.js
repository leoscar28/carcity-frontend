export default ($axios) => ({
  get() {
    return $axios.get('/api/infrastructureOption/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
