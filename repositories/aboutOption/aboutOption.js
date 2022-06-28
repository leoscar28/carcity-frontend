export default ($axios) => ({
  get() {
    return $axios.get('/api/aboutOption/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
