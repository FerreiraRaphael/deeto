$(function () {
  "use strict";
  $('.slider').slick({
      prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left fa-3x"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right fa-3x"></i></button>'
  });

  function gostei() {
    Alert('.alert-success', 'Marcado como gostei');
    redireciona();
  }
  function naoGostei() {
    Alert('.alert-danger', 'Marcado como não gostei');
    redireciona()
  }

  function redireciona() {
      const id = Utils.getParameterByName('id');
      setTimeout(function() {
        window.location.href = window.location.href + (parseInt(id) + 1);
      }, 1000);
  }

  $('.gostei').on('click', gostei);
  $('.nao-gostei').on('click', naoGostei);

});