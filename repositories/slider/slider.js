export default ($axios) => ({
  get(payload) {
    return $axios.get('/api/slider/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
