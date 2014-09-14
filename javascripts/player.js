(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Player = (function() {
    function Player($el) {
      this.close = __bind(this.close, this);      this.id = $el.data('youtube');
      this.body = $('body');
      this.prepare();
      this.observe();
    }

    Player.prototype.prepare = function() {
      this.player = $('<div id="player">').appendTo(this.body);
      this.overlay = $("<div id='overlay'>").appendTo(this.player);
      return this.iframe = $("<iframe width='560' height='315' src='http://www.youtube.com/embed/" + this.id + "?rel=0&autoplay=1' frameborder='0' allowfullscreen>").appendTo(this.player);
    };

    Player.prototype.observe = function() {
      return this.overlay.on('click', this.close);
    };

    Player.prototype.close = function() {
      return this.player.remove();
    };

    return Player;

  })();

}).call(this);
