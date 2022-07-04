export default ($axios) => ({
  get() {
    return $axios.get('/api/vehicleMaintenance/get')
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
