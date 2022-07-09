export default ($axios) => ({
  get() {
    return $axios.get('/api/privacyPolicy/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
