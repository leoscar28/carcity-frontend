export default ($axios) => ({
  get() {
    return $axios.get('/api/tier/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
