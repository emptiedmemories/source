DEBUG = true
xx = (t) -> DEBUG && console.log t

# http://thinkpixellab.com/pxloader/slowImage.php?delay=1

###
------------------------------------------------------------------------------

jQuery extend

------------------------------------------------------------------------------
####

$.fn.extend
  changeClass: ( a, b ) ->
    target = $ @
    target.removeClass( a ).addClass( b )

  fixedX: ->
    target = $ @
    left   = parseInt target.css('left');
    $(window).scroll ->
      target.css
        'left': $(@).scrollLeft() + left

  gallerize: (d) ->
    window.leave = false
    @.each (i, t) ->
      target   = $ t
      children = target.children('img')
      length   = children.length
      current  = 0
      duration = d || 1000
      children.eq( current ).addClass('active')

      go = ->
        return if window.leave
        children.removeClass('active')
        current = if current < length-1 then current+1 else 0
        children.eq( current ).addClass('active')
        setTimeout go, duration

      setTimeout go, duration

###
------------------------------------------------------------------------------

Site

------------------------------------------------------------------------------
####

class window.Site
  constuctor:->
  setup: ->
    @checkCountry()
    @prepare()
    @observe()

    if !(window.history && history.pushState) then @init() else @firstPop()

  prepare: ->
    @window        = $ window
    @document      = $ document
    @html          = $ 'html'
    @body          = $ 'body'
    @main          = @body.find 'main'
    @menu          = @body.find '#main-menu'
    @lang          = @body.find '#toggle-lang'
    @header        = @body.find 'header'

    @loadedItem    = @body.find '#loaded-item'
    @totalItem     = @body.find '#total-item'

    @popped        = 'state' of window.history && window.history.state?
    @initialURL    = location.href

    @introViewed = false

  checkCountry: =>
    $.getJSON 'http://api.wipmania.com/jsonp?callback=?', (data) =>
      @is_china = data.address.country == 'China'

  observe: ->
    @lang.on 'click', 'a', @changeLang
    @window.on
      'resize': @resize
      'scroll': @disableHover
    if !!(window.history && history.pushState)
      window.onpopstate = @popState
      @body.on "click", "a:not('.download, .link, .video-link')", @leave
    @body.on 'mouseover', '[rel="external"]', @linkTo
    @body.on 'click', '.video-link', @playVideo

  disableHover: =>
    @body.toggleClass('scrolled', @window.scrollTop() > 50)
    if @timer?
      clearTimeout @timer
      @timer = null
    @body.addClass 'disable-hover'
    @timer = setTimeout =>
      @body.removeClass 'disable-hover'
    , 500

  linkTo: (e) ->
    $(e.currentTarget).attr('target', '_blank')
  playVideo: (e) =>
    $link = $(e.currentTarget)
    return if @is_china
    e.preventDefault()
    new Player($link)

  changeLang: ( event ) =>
    target = $ event.currentTarget
    lang   = target.data 'lang'
    @lang.removeClass('unselected')

    @lang.find('a').removeClass('current')
    target.addClass('current')

    switch lang
      when "en" then @html.removeClass('lang-ch')
      when "ch" then @html.addClass('lang-ch')
    return false

  init: ->
    @new "home"      if @is_home
    @new "panoramic" if @is_panoramic
    @new "panel"     if @is_panel
    @new "gallery"   if @is_gallery

  save_dimension: ->
    @width  = @window.width()
    @height = @window.height()

  resize: =>
    @save_dimension()


  ###
  ------------------------------------------------------------------------------

    AJAX

  ------------------------------------------------------------------------------
  ###
  firstPop: =>
    @initialPop = !@popped && location.href == @initialURL
    return if !@initialPop
    @html.addClass('loading')
    @checkPage()
    @startLoadingImage()

  popState: ()=>
    @initialPop = !@popped && location.href == @initialURL
    @popped     = true
    return if @initialPop
    @loadContent location.pathname

  loadContent: ( href ) =>
    @loadedItem.add(@totalItem).text ''
    # @html.removeClass('loaded').addClass('loading')
    $.ajax(
      url: href
    ).fail( () ->
      xx 'fail'
    ).done( ( data )=>
      data = $ data

      main = data.find 'main'
      @main.replaceWith main
      @main = main

      menu = data.find '#main-menu'
      @menu.replaceWith menu
      @menu = menu

      @body.attr 'class', 'page-'+@main.attr('data-slug')

      @checkPage()
      if @is_video
        article = @main.find('article')
        wh = $(window).height()
        ah = article.height()
        article.css 'top', (wh-ah)/2 if wh > ah
        @scrollToMiddle()
      @startLoadingImage()
    )

  checkPage: ->
    @is_home       = @main.hasClass 'home'

    @is_aboutEM    = @main.hasClass 'about-emptied-memories'
    @is_panel      = @main.hasClass 'about-panel'
    @is_panoramic  = @main.hasClass 'about-panoramic'

    @is_artist     = @main.hasClass 'artist'

    @is_gallery    = @main.hasClass 'work-gallery'
    @is_video      = @main.hasClass 'work-video'

    @is_echo       = @main.hasClass 'echo'
    @is_contact    = @main.hasClass 'contact'
    @is_book       = @main.hasClass 'book'

  startLoadingImage: =>
    @init()
    @html.removeClass('loading').addClass('loaded')
    return;

    # img    = @body.find 'img'
    # loaded = 0

    # if img.length == 0
    #   @init()
    #   @html.removeClass('loading').addClass('loaded')

    # @loadedItem.text loaded
    # @totalItem.text img.length
    # img.each (i, t)=>
    #   T = $ t
    #   src = T.attr('data-retina')||T.attr('src')
    #   T.load( =>
    #     loaded++
    #     @loadedItem.text loaded

    #     if loaded == img.length
    #       @init()
    #       @html.removeClass('loading').addClass('loaded')
    #   ).attr('src', src )

  leave: ( event )=>
    t            = $ event.currentTarget
    href         = t.attr 'href'
    window.leave = true
    if @is_home
      @home.leave()

    @scrollToOrigin =>
      @loadContent href
      history.pushState '', 'New URL: '+href, href

    event.preventDefault()

  scrollToOrigin: ( callback ) ->
    distance = dist @body.scrollTop(), @body.scrollLeft(), 0, 0
    duration = 100000/distance
    duration = 1000 if duration > 1000
    duration = 0 if distance == 0

    @body.animate
      scrollTop: 0
      scrollLeft: 0
    , duration, callback
  scrollToMiddle: ->
    @body.animate
      scrollTop: (@body.height() - @window.height())/2
      scrollLeft: 0
    , 500
  new: ( slug ) ->
    ns      = slug.charAt(0).toUpperCase() + slug.slice(1)
    @[slug] = new window[ns]()

window.site = new Site()
site.setup()
