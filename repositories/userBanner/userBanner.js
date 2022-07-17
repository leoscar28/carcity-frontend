export default ($axios) => ({
  pages(payload) {
    return $axios.post('/api/userBanner/pagination', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return 0;
      });
  },
  all(payload) {
    return $axios.post('/api/userBanner/all', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  },
  rooms(payload) {
    return $axios.post('/api/userBanner/rooms', payload)
      .then(response => {
        return response.data;
      }).catch(error => {
        return [];
      });
  },
  create(payload) {
    return $axios.post('/api/userBanner/create', payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  update(payload) {
    return $axios.post('/api/userBanner/update/' + payload.get('id'), payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  archive(id) {
    return $axios.post('/api/userBanner/archive/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  delete(id) {
    return $axios.post('/api/userBanner/delete/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  needEdits(payload) {
    return $axios.post('/api/userBanner/needEdits/'+payload.id, payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  activate(id) {
    return $axios.post('/api/userBanner/activate/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  up(id) {
    return $axios.post('/api/userBanner/up/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  showPhone(id) {
    return $axios.post('/api/userBanner/showPhone/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  publish(id) {
    return $axios.post('/api/userBanner/publish/'+id)
      .then(response => {
        return response.data;
      }).catch(error => {
        return error.response;
      });
  },
  unpublish(id) {
    return $axios.post('/api/userBanner/unpublish/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response;
      });
  },
  getById(id) {
    return $axios.get('/api/userBanner/getById/'+id)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return error.response.data;
      });
  }
});
