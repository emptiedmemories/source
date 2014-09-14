(function() {
  (function($) {
    return window.Panoramic = (function() {
      function Panoramic() {
        this.prepare();
        this.observe();
        this.init();
      }

      Panoramic.prototype.prepare = function() {
        this.body = site.body;
        return this.items = this.body.find('.pan-wrapper');
      };

      Panoramic.prototype.observe = function() {};

      Panoramic.prototype.init = function() {
        return this.items.gallerize("5000");
      };

      return Panoramic;

    })();
  })(jQuery);

}).call(this);
