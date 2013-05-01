// Begin Lazy Loading.
// 
// Lazy Loading allows us to load JS & CSS files only when the page requires them, saving bandwidth and decreasing load times.
// We get the option to inspect the mark-up and see if it's appropriate to include a particular plug-in or not automatically at runtime.
// For more detail on this technique, it's pros and cons, see: http://ajaxpatterns.org/On-Demand_Javascript#In_A_Blink
//
// NOTES:
// This file relies upon jQuery & the jquery.ondemand plugin. jQuery and the ondemand plugin MUST be included before this file.

// Media Queries Polyfill http://www.modernizr.com/docs/#load
Modernizr.load({
  test : Modernizr.mq('(min-width)'),
  nope : ['/assets/javascript/polyfills/respond.min.js']
});

$(document).ready(function(){
  // TEST: if we want a colourbox images on our site
  if($("a.colorbox").length > 0) {
    $.requireJs('/assets/javascript/colorbox/colorbox/jquery.colorbox-min.js');
      $.requireCss('/assets/javascript/colorbox/example1/colorbox.css');
  }
  
  // we always want to load progressive enhancements at the end of the load queue
  $.requireJs('/assets/javascript/progressive-enhancement.js');
});