(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($) {
    return window.Home = (function() {
      function Home() {
        this.leave = __bind(this.leave, this);
        this.slideGo = __bind(this.slideGo, this);
        this.introGo = __bind(this.introGo, this);        this.setting();
        this.prepare();
        this.init();
      }

      Home.prototype.setting = function() {
        this.cutTime = [0, 0, 1500, 500, 1800, 3500, 3000, 3000, 3000];
        this.cut = 0;
        return this.slideDuration = 5000;
      };

      Home.prototype.prepare = function() {
        this.html = site.html;
        this.body = site.body;
        this.slides = this.body.find('.slide');
        return this.length = this.slides.length;
      };

      Home.prototype.observe = function() {};

      Home.prototype.init = function() {
        if (site.introViewed) {
          return this.introPassed();
        }
        return this.introGo();
      };

      Home.prototype.introGo = function() {
        if (site.introViewed) {
          return this.introPassed();
        }
        this.html.addClass("cut" + this.cut + "-active");
        if (this.cut > 1) {
          this.html.changeClass("cut" + (this.cut - 1) + "-active", "cut" + (this.cut - 1) + "-actived");
        }
        if (this.cut === 5) {
          this.slideInit(0);
        }
        this.cut++;
        if (this.cut === this.cutTime.length) {
          site.introViewed = true;
          this.slideTrigger();
          return;
        }
        return setTimeout(this.introGo, this.cutTime[this.cut]);
      };

      Home.prototype.introPassed = function() {
        var add, i, remove, _i, _ref;

        for (i = _i = 0, _ref = this.cutTime.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          remove = "cut" + i + "-active";
          add = "cut" + i + "-actived";
          this.html.changeClass(remove, add);
        }
        this.html.addClass('intro-passed');
        this.slideInit(this.getRandomSlide());
        return this.slideTrigger();
      };

      Home.prototype.getRandomSlide = function() {
        return Math.floor(Random(0, this.length - 1, false));
      };

      Home.prototype.slideInit = function(assignedSlide) {
        this.slide = assignedSlide;
        return this.slides.eq(this.slide).addClass('active');
      };

      Home.prototype.slideGo = function() {
        if (!site.is_home) {
          clearTimeout(this.slideGoing);
        }
        this.slides.eq(this.slide).removeClass('active');
        if (this.slide < this.length - 1) {
          this.slide++;
        } else {
          this.slide = 0;
        }
        return this.slides.eq(this.slide).addClass('active');
      };

      Home.prototype.slideTrigger = function() {
        clearTimeout(this.slideGoing);
        return this.slideGoing = setInterval(this.slideGo, this.slideDuration);
      };

      Home.prototype.leave = function() {
        return site.introViewed = true;
      };

      return Home;

    })();
  })(jQuery);

}).call(this);
