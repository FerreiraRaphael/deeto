$(function () {
  "use strict";

  function login(data) {
    new Api("/api/users/auth").post({
      data: data,
      success: function (result) {
        if(!result.token) {
          Alert(".alert-warning", "Usuário invalido");
          return;
        }
        Auth.salvarTokken(result.token);
        window.location.href = "/perfil";
      },
      error: function (e) {
        console.log(e);
      }
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    var data = $('form').serializeArray().reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
    login(data);
  }

  $('form').on("submit", handleFormSubmit);
  Auth.verificarToken(function() {
    window.location.href = "/perfil";
  });
  if (Utils.getParameterByName("sucesso")) {
    Alert(".alert-success", "Cadastrado com sucesso");
  }
  if (Utils.getParameterByName("aviso")) {
    Alert(".alert-warning", Utils.getParameterByName("aviso"));
  }
});