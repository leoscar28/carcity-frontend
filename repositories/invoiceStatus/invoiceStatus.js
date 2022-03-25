export default ($axios) => ({
  list() {
    return $axios.get('/api/invoiceStatus/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
