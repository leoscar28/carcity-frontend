export default ($axios) => ({
  auth(data) {
    return $axios.post('/api/user/auth',data)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return false;
      });
  },
  changePassword(data) {
    return $axios.post('/api/user/password/'+data.id,data.data).then(response => {
      return response.data;
    }).catch(error => {
      return error.response.data;
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
  },
  setUser(data) {
    return $axios.post('/api/user/update/'+data.id,data.data)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  }
});
