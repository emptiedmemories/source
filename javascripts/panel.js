(function() {
  (function($) {
    return window.Panel = (function() {
      function Panel() {
        this.prepare();
        this.observe();
        this.init();
      }

      Panel.prototype.prepare = function() {
        this.body = site.body;
        this.window = site.window;
        return this.items = this.body.find('.panels');
      };

      Panel.prototype.observe = function() {};

      Panel.prototype.init = function() {
        this.items.gallerize();
        return $('.fixed-x').fixedX();
      };

      Panel.prototype.leave = function() {};

      return Panel;

    })();
  })(jQuery);

}).call(this);
