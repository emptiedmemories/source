class window.Player
  constructor: ($el) ->
    @id = $el.data('youtube')
    @body = $('body')
    @prepare()
    @observe()
  prepare: ->
    @player = $('<div id="player">').appendTo(@body)
    @overlay = $("<div id='overlay'>").appendTo(@player)
    @iframe = $("<iframe width='560' height='315' src='http://www.youtube.com/embed/#{@id}?rel=0&autoplay=1' frameborder='0' allowfullscreen>").appendTo(@player)
  observe: ->
    @overlay.on 'click', @close
  close: =>
    @player.remove()
