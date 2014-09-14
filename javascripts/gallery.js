(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($) {
    return window.Gallery = (function() {
      function Gallery() {
        this.clickOnThumb = __bind(this.clickOnThumb, this);        this.prepare();
        this.observe();
        this.init();
      }

      Gallery.prototype.prepare = function() {
        this.body = site.body;
        this.albums = this.body.find('.album');
        this.thumbs = this.albums.find('img');
        this.setPositions();
        if (!$.contains(this.body, $('.gallery-overlay'))) {
          this.body.append('<div class="gallery-overlay">');
        }
        return this.overlay = this.body.find('.gallery-overlay');
      };

      Gallery.prototype.init = function() {
        return this.applyStyle();
      };

      Gallery.prototype.applyStyle = function() {
        return this.thumbs.each(function(i, t) {
          var target;

          target = $(t);
          target.parents('.album-item').css('left', target.data('left'));
          return target.attr('style', target.data('style'));
        });
      };

      Gallery.prototype.observe = function() {
        var _this = this;

        return this.thumbs.on({
          mouseover: function(event) {
            var cssText, target;

            target = $(event.currentTarget);
            cssText = "left: 0; -webkit-transform: scale(1);-moz-transform: scale(1);-ms-transform: scale(1);-o-transform: scale(1);transform: scale(1);";
            return target.attr('style', cssText);
          },
          mouseout: function(event) {
            var target;

            target = $(event.currentTarget);
            return target.attr('style', target.data('style'));
          },
          click: function(event) {
            return _this.clickOnThumb(event);
          }
        });
      };

      Gallery.prototype.clickOnThumb = function(e) {
        var album, albumIndex, imageIndex, t, title;

        t = $(e.currentTarget);
        albumIndex = $.inArray(t.parents('.album')[0], this.albums);
        album = this.albums.eq(albumIndex);
        imageIndex = $.inArray(t.parent()[0], album.find('.album-item'));
        title = album.find('.album-title');
        return this.openOverlay();
      };

      Gallery.prototype.openOverlay = function() {
        debugger;
      };

      Gallery.prototype.template = function() {
        var container;

        return container = "        <div id='gallery'>          <div class='gallery-title'><span>" + index + "</span> | <span>" + title + "</span></div>          <ul>            <li class='icon-prev'><a href='#'></a></li>            <li class='icon-next'><a href='#'></a></li>            <li class='indicator'>" + now + "/" + total + "</li>            <li class='icon-escape'><a href='#'></a></li>          </ul>          <div class='image-container'>" + img + "</div>        </div>      ";
      };

      Gallery.prototype.setPositions = function() {
        return this.albums.each(function(j, T) {
          var thumbs;

          thumbs = $(T).find('img');
          return thumbs.each(function(i, t) {
            var cssText, randomLeft, randomScale, target;

            target = $(t);
            randomScale = Math.floor((i + 1) / 2) % 2 === 1 ? .2 + Math.random() * .4 : .8 + Math.random() * .2;
            randomLeft = Math.round(-200 + Math.random() * 400);
            cssText = "-webkit-transform: scale(" + randomScale + ");-moz-transform: scale(" + randomScale + ");-ms-transform: scale(" + randomScale + ");-o-transform: scale(" + randomScale + ");transform: scale(" + randomScale + ");";
            return target.data({
              style: cssText,
              left: randomLeft
            });
          });
        });
      };

      return Gallery;

    })();
  })(jQuery);

}).call(this);
