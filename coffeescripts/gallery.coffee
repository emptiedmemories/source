(($) ->
  class window.Gallery
    constructor: ->
      @prepare()
      @observe()
      @init()

    prepare: ->
      @body   = site.body
      @albums = @body.find '.album'
      @thumbs = @albums.find 'img'
      @setPositions()
      @body.append('<div class="gallery-overlay">') if not $.contains( @body, $('.gallery-overlay') )
      @overlay = @body.find('.gallery-overlay')
      # @getGalleryData()
    init: ->
      @applyStyle()

    applyStyle: ->
      @thumbs.each ( i, t ) ->
        target = $ t
        target.parents('.album-item').css 'left', target.data('left')
        target.attr 'style', target.data('style')

    observe: ->
      @thumbs.on
        mouseover: ( event ) ->
          target = $ event.currentTarget
          cssText = "left: 0; -webkit-transform: scale(1);-moz-transform: scale(1);-ms-transform: scale(1);-o-transform: scale(1);transform: scale(1);"
          target.attr 'style', cssText
        mouseout: ( event ) ->
          target = $ event.currentTarget
          target.attr 'style', target.data('style')
        click: ( event ) =>
          @clickOnThumb event

    clickOnThumb: ( e ) =>
      t          = $ e.currentTarget
      albumIndex = $.inArray( t.parents('.album')[0], @albums )
      album      = @albums.eq(albumIndex)
      imageIndex = $.inArray( t.parent()[0], album.find('.album-item') )
      title      = album.find('.album-title')

      # data =
      #   albumIndex: albumIndex
      #   imageIndex: imageIndex
      #   title: title
      @openOverlay()
    openOverlay: ->
      debugger

    # open:
    # next
    # prev
    # goto



    template: ->
      container = "
        <div id='gallery'>
          <div class='gallery-title'><span>#{index}</span> | <span>#{title}</span></div>
          <ul>
            <li class='icon-prev'><a href='#'></a></li>
            <li class='icon-next'><a href='#'></a></li>
            <li class='indicator'>#{now}/#{total}</li>
            <li class='icon-escape'><a href='#'></a></li>
          </ul>
          <div class='image-container'>#{img}</div>
        </div>
      "

    setPositions: ->
      @albums.each ( j, T ) ->
        thumbs = $(T).find 'img'

        thumbs.each ( i, t ) ->
          target      = $ t
          randomScale = if Math.floor((i+1)/2)%2==1 then .2 + Math.random()*.4 else .8 + Math.random()*.2
          randomLeft  = Math.round( -200 + Math.random()*400 )
          cssText     = "-webkit-transform: scale(" + randomScale + ");-moz-transform: scale(" + randomScale + ");-ms-transform: scale(" + randomScale + ");-o-transform: scale(" + randomScale + ");transform: scale(" + randomScale + ");"

          target.data
            style: cssText
            left: randomLeft

    # getGalleryData: ->
    #   @albums      = @body.find '.album'
    #   @thumbs      = @albums.find 'img'
    #   @galleryData = []

    #   @albums.each ( i, a ) =>
    #     album = $ a
    #     title  = album.find '.album-title'
    #     en     = title.find('.en').text()
    #     ch     = title.find('.ch').text()
    #     thumbs = album.find 'img'
    #     images = []

    #     thumbs.each ( i, t ) ->
    #       thumb = $ t
    #       images.push thumb.data('url')

    #     @galleryData.push
    #       title:
    #         en: en
    #         ch: ch
    #       index: i
    #       length: thumbs.length
    #       images: images

)(jQuery)