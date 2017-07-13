$(function () {
  "use strict";
  $.cloudinary.config({ cloud_name: 'deeto', api_key: '926121488111955' })

  function salvarDados(data, callback) {
    new Api("/api/users/").put({
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      success: function (result) {
        Alert(".alert-success", "Salvo");
        callback && callback();
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
    salvarDados(data);
  }

  function sair() {
    localStorage.token = "";
    window.location.href = "/entrar";
  }

  function fillImages(imgs) {
    $(".user-img-container input").removeClass("btn-danger").val("Salvar Imagem");
    $(".user-img img").attr("src", "/static/img/user.jpg");
    imgs.forEach(function (img, index) {
      var ele = $($(".user-img").get(index));
      ele.get(0).dataset.img = img;
      ele.find("img").attr("src", $.cloudinary.url(img, {
        secure: true,
        width: 150, height: 200, crop: 'fill', gravity: "face"
      }));
      ele.parent().find("input").addClass("btn-danger").val("Deletar Imagem");
    });
  }

  function getImgIds() {
    return $(".user-img").toArray()
      .map(function (e) { return e.dataset.img })
      .filter(function (v) { return v })
  }

  function fillUserData(user) {
    $(".user-name span").text(user.name);
    $("input[name='name']").val(user.name);
    $("textarea[name='description']").val(user.description);
    fillImages(user.images);
  }

  function onImageUpload(res, ele) {
    var imgs = getImgIds();
    imgs.push(res[0].public_id);
    salvarDados({
      images: imgs
    }, function () {
      fillImages(imgs);
    });
  }

  function openWidget(event) {
    if($(event.target).hasClass("btn-danger")) {
      onDeleteImage(event);
      return
    }

    cloudinary.openUploadWidget({
      cloud_name: 'deeto', upload_preset: 'kwfkucqw',
      cropping: 'server', folder: 'user_photos'
    },
      function (error, result) {
        if (error) {
          console.log(error);
          return;
        }
        onImageUpload(result);
      });
  }

  function onDeleteImage(event) {
    var ele = $(event.target).parents(".user-img-container").find(".user-img");
    ele.get(0).dataset.img = "";
    ele.find("img").attr("href", "/static/img/user.jpg");
    var imgs = getImgIds();
    salvarDados({
      images: imgs
    }, function () {
      fillImages(imgs);
    });
  }

  function deleteUser() {
    new Api("/api/users").delete({
      success: function() {
        localStorage.token = "";
        window.location.href = "/entrar";
      }
    })
  }

  Auth.verificarToken(fillUserData, function () {
    window.location.href = "/entrar?aviso=Você precisa estar logado"
  })

  // $(".user-img-container").on("click", ".btn-danger", onDeleteImage);
  $(".delete-account").on("click", deleteUser);
  $(".upload-image").on("click", openWidget);
  $(".sair").on("click", sair);
  $('form').on("submit", handleFormSubmit);
});
