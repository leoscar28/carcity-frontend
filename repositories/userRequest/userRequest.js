export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/userRequest/pagination', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/userRequest/all', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  create(payload) {
    return $axios.post('/api/userRequest/create', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  unpublish(id) {
    return $axios.post('/api/userRequest/unpublish/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  }
});
