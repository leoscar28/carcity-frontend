export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/application/pagination',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/application/all',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
