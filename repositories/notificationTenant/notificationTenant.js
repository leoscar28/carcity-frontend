export default ($axios) => ({
  setView(payload) {
    return $axios.post('/api/notificationTenant/setView',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  viewCount(payload) {
    return $axios.get('/api/notificationTenant/viewCount/'+payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  count(payload) {
    return $axios.get('/api/notificationTenant/count/'+payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  get(payload) {
    return $axios.post('/api/notificationTenant/get',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
});
