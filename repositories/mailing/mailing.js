export default ($axios) => ({
  send(payload) {
    return $axios.post('/api/mailing/sendMail',payload)
      .then(response => {
        return response.data.data;
      }).catch(error => {
        return [];
      });
  }
});
