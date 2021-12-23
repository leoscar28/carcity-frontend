export default ($axios) => ({
  auth(data) {
    return $axios.post('/api/user/auth',data)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return false;
      });
  },
  next(data) {
    return $axios.post('/api/user/next',data)
      .then(response => {
        return response.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  finish(data) {
    return $axios.post('/api/user/finish',data)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  },
  codeCheck(data) {
    return $axios.post('/api/user/codeCheck',data)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  }
});
