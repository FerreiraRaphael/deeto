var Alert = function(seletor, message) {
  var alert = $(seletor);
  alert.show();
  alert.text(message);
  setTimeout(function() {
    alert.hide();
  }, 5000);
}

