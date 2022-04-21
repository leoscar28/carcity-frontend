export default ($axios) => ({
  viewCount(payload) {
    return $axios.get('/api/notification/viewCount/'+payload)
        .then(response => {
          return response.data.data;
        }).catch(error => {
          return [];
        });
  },
  view(payload) {
    return $axios.post('/api/notification/view/',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  count(payload) {
    return $axios.post('/api/notification/count/'+payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  get(payload) {
    return $axios.post('/api/notification/get/',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
