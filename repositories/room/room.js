export default ($axios) => ({
  getByTenantCompanyId(id) {
    return $axios.get('/api/tenantCompanyRoom/getByTenantCompanyId/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
