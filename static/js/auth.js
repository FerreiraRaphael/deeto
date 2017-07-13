var Auth = function() {}

Auth.salvarTokken = function(token) {
  localStorage.setItem("token", token);
}

Auth.verificarToken = function(onSuccess, onError) {
  new Api("/api/users/").get({
    success: function(res) {
      onSuccess && onSuccess(res);
    },
    error: function(e) {
      localStorage.token = "";
      onError && onError(e);
    }
  })
}
