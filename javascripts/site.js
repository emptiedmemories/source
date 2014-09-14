(function() {
  var DEBUG, xx,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DEBUG = true;

  xx = function(t) {
    return DEBUG && console.log(t);
  };

  /*
  ------------------------------------------------------------------------------
  
  jQuery extend
  
  ------------------------------------------------------------------------------
  */


  $.fn.extend({
    changeClass: function(a, b) {
      var target;

      target = $(this);
      return target.removeClass(a).addClass(b);
    },
    fixedX: function() {
      var left, target;

      target = $(this);
      left = parseInt(target.css('left'));
      return $(window).scroll(function() {
        return target.css({
          'left': $(this).scrollLeft() + left
        });
      });
    },
    gallerize: function(d) {
      window.leave = false;
      return this.each(function(i, t) {
        var children, current, duration, go, length, target;

        target = $(t);
        children = target.children('img');
        if (!children.length) {
          children = target.children('li');
        }
        length = children.length;
        current = 0;
        duration = d || 1000;
        children.eq(current).addClass('active');
        go = function() {
          if (window.leave) {
            return;
          }
          children.removeClass('active');
          current = current < length - 1 ? current + 1 : 0;
          children.eq(current).addClass('active');
          return setTimeout(go, duration);
        };
        return setTimeout(go, duration);
      });
    }
  });

  /*
  ------------------------------------------------------------------------------
  
  Site
  
  ------------------------------------------------------------------------------
  */


  window.Site = (function() {
    function Site() {
      this.leave = __bind(this.leave, this);
      this.startLoadingImage = __bind(this.startLoadingImage, this);
      this.loadContent = __bind(this.loadContent, this);
      this.popState = __bind(this.popState, this);
      this.firstPop = __bind(this.firstPop, this);
      this.resize = __bind(this.resize, this);
      this.changeLang = __bind(this.changeLang, this);
      this.playVideo = __bind(this.playVideo, this);
      this.disableHover = __bind(this.disableHover, this);
      this.checkCountry = __bind(this.checkCountry, this);
    }

    Site.prototype.constuctor = function() {};

    Site.prototype.setup = function() {
      this.checkCountry();
      this.prepare();
      this.observe();
      if (!(window.history && history.pushState)) {
        return this.init();
      } else {
        return this.firstPop();
      }
    };

    Site.prototype.prepare = function() {
      this.window = $(window);
      this.document = $(document);
      this.html = $('html');
      this.body = $('body');
      this.main = this.body.find('main');
      this.menu = this.body.find('#main-menu');
      this.lang = this.body.find('#toggle-lang');
      this.header = this.body.find('header');
      this.loadedItem = this.body.find('#loaded-item');
      this.totalItem = this.body.find('#total-item');
      this.popped = 'state' in window.history && (window.history.state != null);
      this.initialURL = location.href;
      return this.introViewed = false;
    };

    Site.prototype.checkCountry = function() {
      var _this = this;

      return $.getJSON('http://api.wipmania.com/jsonp?callback=?', function(data) {
        return _this.is_china = data.address.country === 'China';
      });
    };

    Site.prototype.observe = function() {
      this.lang.on('click', 'a', this.changeLang);
      this.window.on({
        'resize': this.resize,
        'scroll': this.disableHover
      });
      if (!!(window.history && history.pushState)) {
        window.onpopstate = this.popState;
        this.body.on("click", "a:not('.download, .link, .video-link')", this.leave);
      }
      this.body.on('mouseover', '[rel="external"]', this.linkTo);
      return this.body.on('click', '.video-link', this.playVideo);
    };

    Site.prototype.disableHover = function() {
      var _this = this;

      this.body.toggleClass('scrolled', this.window.scrollTop() > 50);
      if (this.timer != null) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.body.addClass('disable-hover');
      return this.timer = setTimeout(function() {
        return _this.body.removeClass('disable-hover');
      }, 500);
    };

    Site.prototype.linkTo = function(e) {
      return $(e.currentTarget).attr('target', '_blank');
    };

    Site.prototype.playVideo = function(e) {
      var $link;

      $link = $(e.currentTarget);
      if (this.is_china) {
        return;
      }
      e.preventDefault();
      return new Player($link);
    };

    Site.prototype.changeLang = function(event) {
      var lang, target;

      target = $(event.currentTarget);
      lang = target.data('lang');
      this.lang.removeClass('unselected');
      this.lang.find('a').removeClass('current');
      target.addClass('current');
      switch (lang) {
        case "en":
          this.html.removeClass('lang-ch');
          break;
        case "ch":
          this.html.addClass('lang-ch');
      }
      return false;
    };

    Site.prototype.init = function() {
      if (this.is_home) {
        this["new"]("home");
      }
      if (this.is_panoramic) {
        this["new"]("panoramic");
      }
      if (this.is_panel) {
        this["new"]("panel");
      }
      if (this.is_gallery) {
        return this["new"]("gallery");
      }
    };

    Site.prototype.save_dimension = function() {
      this.width = this.window.width();
      return this.height = this.window.height();
    };

    Site.prototype.resize = function() {
      return this.save_dimension();
    };

    /*
    ------------------------------------------------------------------------------
    
      AJAX
    
    ------------------------------------------------------------------------------
    */


    Site.prototype.firstPop = function() {
      this.initialPop = !this.popped && location.href === this.initialURL;
      if (!this.initialPop) {
        return;
      }
      this.html.addClass('loading');
      this.checkPage();
      return this.startLoadingImage();
    };

    Site.prototype.popState = function() {
      this.initialPop = !this.popped && location.href === this.initialURL;
      this.popped = true;
      if (this.initialPop) {
        return;
      }
      return this.loadContent(location.pathname);
    };

    Site.prototype.loadContent = function(href) {
      var _this = this;

      this.loadedItem.add(this.totalItem).text('');
      return $.ajax({
        url: href
      }).fail(function() {
        return xx('fail');
      }).done(function(data) {
        var ah, article, main, menu, wh;

        data = $(data);
        main = data.find('main');
        _this.main.replaceWith(main);
        _this.main = main;
        menu = data.find('#main-menu');
        _this.menu.replaceWith(menu);
        _this.menu = menu;
        _this.body.attr('class', 'page-' + _this.main.attr('data-slug'));
        _this.checkPage();
        if (_this.is_video) {
          article = _this.main.find('article');
          wh = $(window).height();
          ah = article.height();
          if (wh > ah) {
            article.css('top', (wh - ah) / 2);
          }
          _this.scrollToMiddle();
        }
        return _this.startLoadingImage();
      });
    };

    Site.prototype.checkPage = function() {
      this.is_home = this.main.hasClass('home');
      this.is_aboutEM = this.main.hasClass('about-emptied-memories');
      this.is_panel = this.main.hasClass('about-panel');
      this.is_panoramic = this.main.hasClass('about-panoramic');
      this.is_artist = this.main.hasClass('artist');
      this.is_gallery = this.main.hasClass('work-gallery');
      this.is_video = this.main.hasClass('work-video');
      this.is_echo = this.main.hasClass('echo');
      this.is_contact = this.main.hasClass('contact');
      return this.is_book = this.main.hasClass('book');
    };

    Site.prototype.startLoadingImage = function() {
      this.init();
      this.html.removeClass('loading').addClass('loaded');
    };

    Site.prototype.leave = function(event) {
      var href, t,
        _this = this;

      t = $(event.currentTarget);
      href = t.attr('href');
      window.leave = true;
      if (this.is_home) {
        this.home.leave();
      }
      this.scrollToOrigin(function() {
        _this.loadContent(href);
        return history.pushState('', 'New URL: ' + href, href);
      });
      return event.preventDefault();
    };

    Site.prototype.scrollToOrigin = function(callback) {
      var distance, duration;

      distance = dist(this.body.scrollTop(), this.body.scrollLeft(), 0, 0);
      duration = 100000 / distance;
      if (duration > 1000) {
        duration = 1000;
      }
      if (distance === 0) {
        duration = 0;
      }
      return this.body.animate({
        scrollTop: 0,
        scrollLeft: 0
      }, duration, callback);
    };

    Site.prototype.scrollToMiddle = function() {
      return this.body.animate({
        scrollTop: (this.body.height() - this.window.height()) / 2,
        scrollLeft: 0
      }, 500);
    };

    Site.prototype["new"] = function(slug) {
      var ns;

      ns = slug.charAt(0).toUpperCase() + slug.slice(1);
      return this[slug] = new window[ns]();
    };

    return Site;

  })();

  window.site = new Site();

  site.setup();

}).call(this);
