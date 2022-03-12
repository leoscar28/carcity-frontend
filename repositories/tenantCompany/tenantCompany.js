export default ($axios) => ({
  getByUserId(id) {
    return $axios.get('/api/tenantCompany/getByUserId/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
