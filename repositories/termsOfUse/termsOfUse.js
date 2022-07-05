export default ($axios) => ({
  get() {
    return $axios.get('/api/termsOfUse/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
