var Api = function (url) {
  this.url = url;
  this.beforeSend = function (request) {
    var token = localStorage.getItem("token");
    if (token)
      request.setRequestHeader("Authorization", "Bearer " + token);
  }
}

Api.prototype.get = function (options) {
  var url = this.url;
  var setup = Object.assign({}, {
    url: url,
    beforeSend: this.beforeSend
  }, options);
  $.ajax(setup);
}

Api.prototype.post = function (options) {
  var url = this.url;
  var setup = Object.assign({}, {
    url: url,
    beforeSend: this.beforeSend,
    method: "POST"
  }, options);
  $.ajax(setup);
}

Api.prototype.put = function (options) {
  var url = this.url;
  var setup = Object.assign({}, {
    url: url,
    beforeSend: this.beforeSend,
    method: "put"
  }, options);
  $.ajax(setup);
}

Api.prototype.delete = function (options) {
  var url = this.url;
  var setup = Object.assign({}, {
    url: url,
    beforeSend: this.beforeSend,
    method: "delete"
  }, options);
  $.ajax(setup);
}
