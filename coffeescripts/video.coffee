class window.Video
  constructor: ($el) ->
    @id = $el.data('youtube')
    @body = $('body')
    @prepare()
    @observe()
  prepare: ->
    @video = $('<div id="video">').appendTo(@body)
    @overlay = $("<div id='overlay'>").appendTo(@video)
    @iframe = $("<iframe width='560' height='315' src='//www.youtube.com/embed/#{@id}?rel=0' frameborder='0' allowfullscreen>").appendTo(@video)
  observe: ->
    @overlay.on 'click', @close
  close: =>
    @video.remove()
