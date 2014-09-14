(($) ->
  class window.Panel
    constructor: ->
      @prepare()
      @observe()
      @init()
      
    prepare: ->
      @body   = site.body
      @window = site.window
      @items  = @body.find '.panels'

    observe: ->
      
    init: ->
      @items.gallerize()
      $('.fixed-x').fixedX()
    
    leave: ->
      
)(jQuery)