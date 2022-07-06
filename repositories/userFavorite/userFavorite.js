export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/userFavorite/pagination', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/userFavorite/all', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  add(payload) {
    return $axios.post('/api/userFavorite/add', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  remove(payload) {
    return $axios.post('/api/userFavorite/remove', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  }
});
