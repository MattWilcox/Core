// progressive-enhancement.js
//
// Responsible JavaScript enhancements.
// The aim of this file is to provide functionality niceties in the event that JavaScript is enabled on the client.
// In no case should JavaScript be required for the website to work. In no case should any JavaScript be in-line or embeded in HTML.

$(document).ready(function(){

  /* timer function to throttle the window resize event */
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  /* fix baseline grid for images of unknown height */
  function fixBaseline(){
    $("img").each(function(run) {
      if($(this).parent("a").length > 0){ /* in anchor, has margin been applied to the anchor? */
        var parent_margin = parseFloat($(this).parent("a").css("margin-bottom").replace("px",""));
      }
      if($(this).parent("div.image_main").length > 0){ /* in image_main div, has margin been applied to it? */
        var parent_margin = parseFloat($(this).parent("div.image_main").css("margin-bottom").replace("px",""));
      }
      else{
        var anchor_margin = 0;
      }
      var baseline          = parseFloat($("html").css("line-height").replace("px",""));
      var img_height        = parseFloat($(this).height());
      var img_margin_top    = parseFloat($(this).css("margin-top").replace("px",""));
      var img_margin_bottom = parseFloat($(this).css("margin-bottom").replace("px",""));
      var img_border_top    = parseFloat($(this).css("border-top-width").replace("px",""));
      var img_border_bottom = parseFloat($(this).css("border-bottom-width").replace("px",""));
      var img_footprint     = parseFloat(img_margin_top+img_border_top+img_height+img_border_bottom+img_margin_bottom+parent_margin);
      var remainder         = parseFloat(img_footprint%baseline);
      var offset            = parseFloat(baseline-remainder);

      if($(this).parent("a").length > 0){ /* in anchor, apply margin to anchor not image */
        $(this).parent("a").css("margin-bottom",offset+"px");
      }
      else if($(this).parent("div.image_main").length > 0){ /* in anchor, apply margin to anchor not image */
        $(this).parent("div.image_main").css("margin-bottom",offset+"px");
      }
      else{ /* not in an anchor, apply margin to image */
        $(this).css("margin-bottom",offset+"px");
      }
    });
  }

  /* run the fixBaseline function after window resizes end
  $(window).resize(function(){
    waitForFinalEvent(function(){
      fixBaseline();
    }, 1000, "windowresize");
  }); */

  $(window).bind('load', function() { // events to run after the entire page has finished loading
    $("body").addClass("load-complete");

    /* run fixBaseline on page load too */
    fixBaseline();
  });
});