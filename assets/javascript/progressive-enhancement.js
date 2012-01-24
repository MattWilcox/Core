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

/* Fix baseline grid for images of unknown height */
  function fixBaseline(){
  	
    $("img").each(function(run) {
    	var total_footprint=null;

      if($(this).parents(".popup").length > 0){ /* the image is inside a popup box */
        var popup_margin_bottom  = parseFloat($(this).parents(".popup").css("margin-bottom").replace("px",""));
        var popup_padding_bottom = parseFloat($(this).parents(".popup").css("padding-bottom").replace("px",""));
        var popup_border_bottom  = parseFloat($(this).parents(".popup").css("border-bottom-width").replace("px",""));
        var popup_padding_top    = parseFloat($(this).parents(".popup").css("padding-top").replace("px",""));
        var popup_border_top     = parseFloat($(this).parents(".popup").css("border-top-width").replace("px",""));
        var popup_footprint      = parseFloat(popup_margin_bottom+popup_padding_bottom+popup_border_bottom+popup_padding_top+popup_border_top);

				total_footprint          = popup_footprint;
				
				if($(this).parents("a").next("p").html() != null) {
        	var caption_height         = parseFloat($(this).parents("a").next("p").css("height").replace("px",""));
        	var caption_margin_top     = parseFloat($(this).parents("a").next("p").css("margin-top").replace("px",""));
        	var caption_margin_bottom  = parseFloat($(this).parents("a").next("p").css("margin-bottom").replace("px",""));
        	var caption_padding_top    = parseFloat($(this).parents("a").next("p").css("padding-top").replace("px",""));
        	var caption_padding_bottom = parseFloat($(this).parents("a").next("p").css("padding-bottom").replace("px",""));

        	var caption_footprint      = parseFloat(caption_height+caption_margin_top+caption_margin_bottom+caption_padding_top+caption_padding_bottom);

        	total_footprint = total_footprint + caption_footprint;
        }
	    } else 
	    if($(this).parent("a").length > 0){ /* the image is inside an anchor but not a popup box */
        var parent_margin = parseFloat($(this).parent("a").css("margin-bottom").replace("px",""));
        total_footprint = total_footprint + parent_margin;
      } else {
      	if($(this).css('display','inline')) { return; }
      }

      var baseline           = parseFloat($("html").css("line-height").replace("px",""));
      var fontsize           = parseFloat($("html").css("font-size").replace("px",""));

      var img_height         = parseFloat($(this).height());

      // shrink the image height to a whole pixel to avoid rounding errors in the layout engine
      var downscale = Math.floor(img_height);

      var img_margin_top     = parseFloat($(this).css("margin-top").replace("px",""));
      var img_margin_bottom  = parseFloat($(this).css("margin-bottom").replace("px",""));
      var img_border_top     = parseFloat($(this).css("border-top-width").replace("px",""));
      var img_border_bottom  = parseFloat($(this).css("border-bottom-width").replace("px",""));

      var total_footprint    = total_footprint + parseFloat(img_margin_top+img_border_top+img_height+img_border_bottom+img_margin_bottom);

      var remainder         = parseFloat(total_footprint%baseline);
      var offset            = parseFloat(baseline-remainder);
      
      if($(this).parents(".popup.dc_full").length > 0) {
      	offset = offset+baseline;  	
      }

      if($(this).parents(".popup").length > 0){ /* apply margin to popup box */
        $(this).parents(".popup").css("margin-bottom",offset+"px");
      } else
      if($(this).parent("a").length > 0){ /* apply margin to anchor */
        $(this).parent("a").css("margin-bottom",offset+"px");
      } else { /* apply margin to image */
        $(this).css("margin-bottom",offset+"px");
      }

      $(this).css("height",downscale);
    });
  }

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
	=events to run after the entire page has finished loading */
	$(window).bind('load', function() {
		$("body").addClass("load-complete");

		/* run fixBaseline on page load too */
    fixBaseline();
	});
	
}); // $(document).ready