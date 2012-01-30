/*
	PROGRESSIVE-ENHANCEMENT.JS
	Responsible JavaScript enhancements.

	The aim of this file is to provide functionality niceties in the event that JavaScript is enabled on the client.
	In no case should JavaScript be required for the website to work. In no case should any JavaScript be in-line
	or embeded in HTML.
	
	--------------------------------------------------------------------------------------------------------------------------
	FILE INFO
	Last updated:     2012/01/19
	Last updated by:  Matt Wilcox

	--------------------------------------------------------------------------------------------------------------------------
	STYLEGUIDE
	Indentation uses tabs [why: http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/]

	This file is divided into the following sections:

	  =global_setting    |  Values used throughout the file 
	  =helper_functions  |  Functions used throughout the file
	  =behaviours        |  Implement certain functionality based on the page being viewed or a user interaction
	----------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function(){

/*
	=global settings ---------------------------------------------------------------------------------------------------------
	NOTE: Values used throughout the file
	----------------------------------------------------------------------------------------------------------------------- */

	var animation_speed = 500;
	var type_baseline   = parseFloat($("html").css("line-height").replace("px",""));

/*
	=helper functions --------------------------------------------------------------------------------------------------------
	NOTE: Functions used throughout the file
	----------------------------------------------------------------------------------------------------------------------- */

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

/* Highlight a given element using an animated graphic overlay */
	function targetHighlight(target) {

		// don't apply the highlight to this list of targets
		if(target == '#content_main' ||
		   target == '#content') { return }
		
		// IE 8 and under can't animate opacity worth a damn
		if($.browser.msie && $.browser.version < 9) { return }

		// where is the target?
		var target_offset = $(target).offset();
		
		// add the image into the DOM
		$('body').append("<img src=\"/assets/images/attention.png\" alt=\"\" id=\"attention\" />");

		// put the image in the right place
		$('#attention').css("position","absolute")
		               .css("top",target_offset.top)
		               .css("left",target_offset.left)
		               .css("opacity","0")
		               .css("z-index","1000")
		               .delay(animation_speed);

		// animate it, then destroy it
		$('#attention').animate({opacity: 1}, animation_speed*2)
		               .animate({opacity: 0}, animation_speed*4, function() {
			               $('#attention').remove();
			              });
	} // function targetHighlight(target)

/*
	=behaviours --------------------------------------------------------------------------------------------------------------
	NOTE: Implement certain functionality based on the page being viewed or a user interaction
	----------------------------------------------------------------------------------------------------------------------- */

/*
	=scroll internal anchors */
	$("a[href^=#]").click(function(){
		var target = $(this).attr('href');
		$("html").animate({
			scrollTop: $(target).offset().top-type_baseline
		}, animation_speed, "swing", targetHighlight(target));
		return false;
	});
	
/*
	=keyboard focus on labels */
	$("input,select,textarea").focus(function(){
		$(this).parent().addClass('focus');
	}).blur(function(){
		$(this).parent().removeClass('focus');
	});

/*
	=keyboard accessible drop-nav */
	$("li > a").focus(function(){
		$(this).parents('ul').addClass('focus');
	}).blur(function(){
		$(this).parents('ul').removeClass('focus');
	});

/*
	=colorbox */
	if($(".popup > a").length > 0) {
		$(".popup > a").colorbox({
			transition: 'elastic',
			speed: 350,
			opacity: .85,
			maxWidth:"80%",
			maxHeight:"90%"
		}); 
	}

/* run the fixBaseline function after window resizes end */
  $(window).resize(function(){
    waitForFinalEvent(function(){
      $("img").baselineAlign({container:'.popup'});
    }, 200, "windowresize");
  });

/*
	=events to run after the entire page has finished loading */
	$(window).bind('load', function() {
		$("body").addClass("load-complete");

		/* run baselineAlign on page load too */
    $("img").baselineAlign({container:'.popup'});
	});
	
}); // $(document).ready