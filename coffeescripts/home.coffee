(($) ->
  class window.Home
    constructor: ->
      @setting()
      @prepare()
      # @observe()
      @init()

    setting: ->
      @cutDuration   = [0, 0, 1500, 500, 1800, 3500, 3000, 3000, 3000, 3000]
      @cut           = 0
      @slideDuration = 5000

    prepare: ->
      @html   = site.html
      @body   = site.body
      @slides = @body.find '.slide'
      @length = @slides.length

    observe: ->

    init: ->
      return @introPassed() if site.introViewed
      @introGo()

    introGo: =>
      return @introPassed() if site.introViewed

      @html.addClass "cut#{@cut}-active"
      if @cut > 1
        @html.changeClass "cut#{@cut-1}-active", "cut#{@cut-1}-actived"
      if @cut == 5
        @slideInit 0
      @cut++

      if @cut == @cutDuration.length
        site.introViewed = true
        @slideTrigger()
        return
      setTimeout @introGo, @cutDuration[@cut]

    introPassed: ->
      for i in [0...@cutDuration.length]
        remove = "cut#{i}-active"
        add    = "cut#{i}-actived"
        @html.changeClass remove, add
      @html.addClass 'intro-passed'
      @slideInit @getRandomSlide()
      @slideTrigger()

    getRandomSlide: ->
      return Math.floor Random(0, @length - 1, false)

    slideInit: ( assignedSlide )->
      @slide = assignedSlide
      @slides.eq(@slide).addClass 'active'

    slideGo: =>
      clearTimeout @slideGoing if ! site.is_home
      @slides.eq(@slide).removeClass 'active'
      if @slide < @length-1
        @slide++
      else
        @slide = 0
      @slides.eq(@slide).addClass 'active'

    slideTrigger: ->
      clearTimeout @slideGoing
      @slideGoing = setInterval @slideGo, @slideDuration

    leave: =>
      site.introViewed = true

)(jQuery)
