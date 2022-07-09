export default ($axios) => ({
  get() {
    return $axios.get('/api/rulesAd/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
