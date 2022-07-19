export default ($axios) => ({
  get() {
    return $axios.get('/api/awards/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
