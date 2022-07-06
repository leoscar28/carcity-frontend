export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/userReview/pagination', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/userReview/all', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  create(payload) {
    return $axios.post('/api/userReview/create', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  delete(payload) {
    return $axios.post('/api/userReview/delete/'+payload.id, payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  }
});
