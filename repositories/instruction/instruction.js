export default ($axios) => ({
  get() {
    return $axios.get('/api/instruction/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
