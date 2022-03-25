export default ($axios) => ({
  list(payload) {
    return $axios.post('/api/invoiceDate/list',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
