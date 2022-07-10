export default ($axios) => ({
  setView(payload) {
    return $axios.post('/api/notification/setView',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  viewCount(payload) {
    return $axios.get('/api/notification/viewCount/'+payload)
        .then(response => {
          return response.data.data;
        }).catch(error => {
          return 0;
        });
  },
  count(payload) {
    return $axios.get('/api/notification/count/'+payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  get(payload) {
    return $axios.post('/api/notification/get',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
