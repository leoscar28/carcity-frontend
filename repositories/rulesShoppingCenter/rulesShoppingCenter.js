export default ($axios) => ({
  get() {
    return $axios.get('/api/rulesShoppingCenter/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
