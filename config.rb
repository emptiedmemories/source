# Require any additional compass plugins here.
require 'slim'
Slim::Engine.set_default_options :pretty => true, :disable_escape => true, :format => :html5

css_dir            = "stylesheets"
sass_dir           = "sass"
images_dir         = "images"

# relative_assets = true

preferred_syntax = :scss

fireapp_build_path = "release"
css_dir = "stylesheets" # by Fire.app 
sass_dir = "sass" # by Fire.app 
images_dir = "images" # by Fire.app 
javascripts_dir = "javascripts" # by Fire.app 
fireapp_coffeescripts_dir = "coffeescripts" # by Fire.app 
fireapp_livescripts_dir = "livescripts" # by Fire.app 
fireapp_minifyjs_on_build = false # by Fire.app 
fireapp_always_report_on_build = true # by Fire.app 
output_style = :expanded # by Fire.app 
relative_assets = false # by Fire.app 
line_comments = true # by Fire.app 
sass_options = {:debug_info=>true} # by Fire.app 
fireapp_coffeescript_options = {:bare=>false} # by Fire.app 
fireapp_livescript_options = {:bare=>false} # by Fire.app 