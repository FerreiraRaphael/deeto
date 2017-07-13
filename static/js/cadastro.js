$(function () {
  "use strict";

  function register(data) {
    new Api("/api/users").post({
      data: data,
      success: function(result){
        if (result._id)
          window.location.href = "/entrar?sucesso=true";
      },
      error: function(e){
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
    register(data);
  }
  Auth.verificarToken(function() {
    window.location.href = "/perfil";
  });

  $('form').on("submit", handleFormSubmit);
});