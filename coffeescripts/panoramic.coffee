(($) ->
  class window.Panoramic
    constructor: ->
      @prepare()
      @observe()
      @init()
    prepare: ->
      @body  = site.body
      @items = @body.find '.pan-wrapper'
    observe: ->
    init: ->
      @items.gallerize("5000")
)(jQuery)