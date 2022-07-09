export default ($axios) => ({
  get() {
    return $axios.get('/api/rule/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
