export default ($axios) => ({
  get() {
    return $axios.get('/api/contact/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
