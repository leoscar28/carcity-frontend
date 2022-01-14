export default ($axios) => ({
  getByCompanyId(payload) {
    return $axios.get('/api/facility/getByCompanyId/'+payload,)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
