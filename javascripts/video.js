(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Video = (function() {
    function Video($el) {
      this.close = __bind(this.close, this);      this.id = $el.data('youtube');
      this.body = $('body');
      this.prepare();
      this.observe();
    }

    Video.prototype.prepare = function() {
      this.video = $('<div id="video">').appendTo(this.body);
      this.overlay = $("<div id='overlay'>").appendTo(this.video);
      return this.iframe = $("<iframe width='560' height='315' src='//www.youtube.com/embed/" + this.id + "?rel=0' frameborder='0' allowfullscreen>").appendTo(this.video);
    };

    Video.prototype.observe = function() {
      return this.overlay.on('click', this.close);
    };

    Video.prototype.close = function() {
      return this.video.remove();
    };

    return Video;

  })();

}).call(this);
