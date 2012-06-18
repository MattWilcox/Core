/*
	PROGRESSIVE-ENHANCEMENT.JS
	Responsible JavaScript enhancements.

	The aim of this file is to provide functionality niceties in the event that JavaScript is enabled on the client.
	In no case should JavaScript be required for the website to work. In no case should any JavaScript be in-line
	or embeded in HTML.
	
	-----------------------------------------------------------------------------------------------------------------------
	FILE INFO
	Last updated:     2012/01/19
	Last updated by:  Matt Wilcox

	-----------------------------------------------------------------------------------------------------------------------
	STYLEGUIDE
	Indentation uses tabs [why: http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/]

	This file is divided into the following sections:

	  =global_setting    |  Values used throughout the file
	  =helper_functions  |  Functions used throughout the file
	  =behaviours        |  Implement certain functionality based on the page being viewed or a user interaction
	----------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function(){

/* =global settings -----------------------------------------------------------------------------------------------------
	NOTE: Values used throughout the file
	----------------------------------------------------------------------------------------------------------------------- */

	var animation_speed   = 500;
	var type_baseline     = parseFloat($("html").css("line-height").replace("px",""));
	var currentBreakpoint; // default's to blank so it's always analysed on first load
	var didResize         = true; // default's to true so it's always analysed on first load

/* =helper functions ----------------------------------------------------------------------------------------------------
	NOTE: Functions used throughout the file
	----------------------------------------------------------------------------------------------------------------------- */

/* Highlight a given element using an animated graphic overlay */
	function targetHighlight(target) {

		// don't apply the highlight to this list of targets
		if(target === '#content_main' ||
		   target === '#content') { return; }
		
		// IE 8 and under can't animate opacity worth a damn
		if($.browser.msie && $.browser.version < 9) { return; }

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

/* =behaviours ----------------------------------------------------------------------------------------------------------
	NOTE: Implement certain functionality based on the page being viewed or a user interaction
	----------------------------------------------------------------------------------------------------------------------- */

/* =scroll internal anchors */
	$("a[href^=#]").click(function(){
		var target = $(this).attr('href');
		$("html,body").animate({
			scrollTop: $(target).offset().top-type_baseline
		}, animation_speed, "swing", targetHighlight(target));
		return false;
	});

/* =keyboard focus on labels */
	$("input,select,textarea").focus(function(){
		$(this).parent().addClass('focus');
	}).blur(function(){
		$(this).parent().removeClass('focus');
	});

/* =keyboard accessible drop-nav */
	$("li > a").focus(function(){
		$(this).parents('ul').addClass('focus');
	}).blur(function(){
		$(this).parents('ul').removeClass('focus');
	});

/* =colorbox */
	if($(".popup > a").length > 0) {
		$(".popup > a").colorbox({
			transition: 'elastic',
			speed: 350,
			opacity: 0.85,
			maxWidth:"80%",
			maxHeight:"90%"
		});
	}

/* =events to run after the entire page has finished loading */
	$(window).bind('load', function() {
		$("body").addClass("load-complete");

		$("img").baselineAlign({container:'.popup'});
	});

/* =content_adaption ----------------------------------------------------------------------------------------------------
	NOTE: Alter behaviour of the page based on the design breakpoint that's currently active
	----------------------------------------------------------------------------------------------------------------------- */

	if($("body").hasClass('home')){
		/* Conditional Content based on browser size. See http://adactio.com/journal/5429/ for the basic principle */

		// Grab un-manipulated versions of stuff we're gonna play with on this page
		// var raw_section = $(".section").html();

		// Function to reset the page when breakpoints change
		var clean_html = function(){
			// revert the page back to the "raw" HTML & destroy any JS fancy-pants from other breakpoints
			//$(".section").remove();
			//$(".section_parent").append("<div class='section'></div>");
			//$(".section").html(raw_section);
		};

		// Watch for resizes
		$(window).resize(function() {
			didResize = true;
		});

		/* every 1/4 second, check if the browser was resized */
		setInterval(function() {
			if (didResize) {
				didResize         = false;
				var newBreakpoint = null;
				try { // modern browsers
					newBreakpoint = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
				}
				catch(err) { // for browsers that don't do Media Queries, default to highest res
					newBreakpoint = "breakpoint_5";
				}

				/* tidy up after inconsistent browsers (some include quotation marks, they shouldn't) */
				newBreakpoint = newBreakpoint.replace(/"/g, "");
				newBreakpoint = newBreakpoint.replace(/'/g, "");

				// actually do stuff now we know the size changed
				if (currentBreakpoint !== newBreakpoint) {
					if (newBreakpoint === 'breakpoint_1') {
						clean_html(); // remove manipulations from previous breakpoints
						currentBreakpoint = 'breakpoint_1'; // set the new breakpoint as the current one
					}
					if (newBreakpoint === 'breakpoint_2') {
						clean_html(); // remove manipulations from previous breakpoints
						currentBreakpoint = 'breakpoint_2'; // set the new breakpoint as the current one
					}
					if (newBreakpoint === 'breakpoint_3') {
						clean_html(); // remove manipulations from previous breakpoints
						currentBreakpoint = 'breakpoint_3'; // set the new breakpoint as the current one
					}
					if (newBreakpoint === 'breakpoint_4') {
						clean_html(); // remove manipulations from previous breakpoints
						currentBreakpoint = 'breakpoint_4'; // set the new breakpoint as the current one
					}
					if (newBreakpoint === 'breakpoint_5') {
						clean_html(); // remove manipulations from previous breakpoints
						currentBreakpoint = 'breakpoint_5'; // set the new breakpoint as the current one
					}
				}
			}
		}, 250);
	} // body.home
}); // $(document).ready