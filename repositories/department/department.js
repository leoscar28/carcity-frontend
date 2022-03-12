export default ($axios) => ({
  getByCompanyId(companyId) {
    return $axios.get('/api/department/getByCompanyId/'+companyId)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  list() {
    return $axios.get('/api/department/list')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
