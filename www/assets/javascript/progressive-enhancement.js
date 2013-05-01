/*
	PROGRESSIVE-ENHANCEMENT.JS
	Responsible JavaScript enhancements.

	The aim of this file is to provide functionality niceties in the event that JavaScript is enabled on the client.
	In no case should JavaScript be required for the website to work. In no case should any JavaScript be in-line
	or embeded in HTML.
	
	-----------------------------------------------------------------------------------------------------------------------
	FILE INFO
	Last updated:     2012/12/18
	Last updated by:  Matt Wilcox

	-----------------------------------------------------------------------------------------------------------------------
	STYLEGUIDE
	Indentation uses tabs [why: http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/]

	This file is divided into the following sections:

	  =global_setting    |  Values used throughout the file
	  =helper_functions  |  Functions used throughout the file
	  =behaviours        |  Implement certain functionality based on the page being viewed or a user interaction
	----------------------------------------------------------------------------------------------------------------------- */


/* =respond ----------------------------------------------------------------------------------------------------------------
	NOTE: An object that is used to manage which JavaScript applicable to different viewport widths
	----------------------------------------------------------------------------------------------------------------------- */
	var respond = {
		cleanup_events:[],
		current_breakpoint:'',

		setup:function(){
			//find initial breakpoint and run corresponding javascript function
			respond.calculate_breakpoint();
		},

		calculate_breakpoint:function(){
			var new_breakpoint = null;
			try { // modern browsers
				new_breakpoint = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
			}
			catch(err) { // for browsers that don't do Media Queries, default to highest res
				new_breakpoint = "breakpoint_5";
			}
			
			/* tidy up after inconsistent browsers (some include quotation marks, they shouldn't) */
			new_breakpoint = new_breakpoint.replace(/"/g, "");
			new_breakpoint = new_breakpoint.replace(/'/g, "");

			/* is this breakpoint different from the last one? */
			if(new_breakpoint !== respond.current_breakpoint){
				respond.current_breakpoint = new_breakpoint;
				
				//reset elements on page
				respond.reset_js();

				switch(new_breakpoint){
					case 'breakpoint_5':
						respond.screen_5();
						break;
					case 'breakpoint_4':
						respond.screen_4();
						break;
					case 'breakpoint_3':
						respond.screen_3();
						break;
					case 'breakpoint_2':
						respond.screen_2();
						break;
					case 'breakpoint_1':
						respond.screen_1();
						break;
					default:
						break;
				}
			}
		},

		reset_js:function(){
			for(var i=0; i<respond.cleanup_events.length;i++){
				respond.cleanup_events[i]();
			}
			respond.cleanup_events=[];
		},

		screen_5:function(){
			respond.setup_hiding_nav();
			respond.setup_cjt_twitter();
		},

		screen_4:function(){
			respond.setup_hiding_nav();
			respond.setup_cjt_twitter();
		},

		screen_3:function(){
			respond.setup_mobile_nav();
		},

		screen_2:function(){
			respond.setup_mobile_nav();
		},

		screen_1:function(){
		},

		setup_mobile_nav:function(){
			//hide top nav
			$('html').addClass('mobile-nav');

			// add the navigation toggle if it's not there already
			if($('.nav-menu-trigger').length === 0) {
				$('#container').prepend('<a class=\'nav-menu-trigger\'>navigation menu</a>');
			}

			$('.nav-menu-trigger').click(function() {
				if($("html").hasClass('nav-active')){
					$("html").removeClass('nav-active');
					$('.nav-menu-trigger').html('navigation menu');
				}
				else {
					$('html').addClass('nav-active');
					$('.nav-menu-trigger').html('back to content');
				}
			});

			// add the teardown function to the cleanup array
			respond.cleanup_events.push(respond.teardown_mobile_nav);
		},
		teardown_mobile_nav:function(){
			$('html').removeClass('mobile-nav');
			$('html').removeClass('nav-active');

			if($('.nav-menu-trigger').length > 0) {
				$('.nav-menu-trigger').remove();
			}
		},

		setup_hiding_nav:function(){
			$("html").addClass("group_nav_hide");

			$(".link_family a").click(function(event){
				event.preventDefault();

				if($("html").hasClass("group_nav_hide")){
					$("html").removeClass("group_nav_hide");
				} else {
					$("html").addClass("group_nav_hide");
				}
			});
		},
		teardown_hiding_nav:function(){
			$("html").removeClass("group_nav_hide");
		},

		setup_cjt_twitter:function() {
			var twitter_code = '<div class="twitter_crutch"><h3>Latest Tweets</h3><a class="twitter-timeline" data-dnt=true href="https://twitter.com/CJ_Timber" data-widget-id="280673489244004353">Tweets by @CJ_Timber</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script></div>';
			$(".site_footer .band_1 .content").append(twitter_code);

			// add the teardown function to the cleanup array
			respond.cleanup_events.push(respond.teardown_cjt_twitter);
		},
		teardown_cjt_twitter:function(){
			$(".twitter_crutch, iframe").remove();
			$("body").attr("data-twttr-rendered","");
		}
	};

$(document).ready(function(){

/* =global settings -----------------------------------------------------------------------------------------------------
	NOTE: Values used throughout the file
	----------------------------------------------------------------------------------------------------------------------- */

	var animation_speed   = 500;
	var type_baseline     = parseFloat($("html").css("line-height").replace("px",""));

/* =helper functions ----------------------------------------------------------------------------------------------------
	NOTE: Functions used throughout the file
	----------------------------------------------------------------------------------------------------------------------- */

/* highlight a given element using an animated graphic overlay */
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

/* =load-complete */
	$(window).bind('load', function() {
		$("body").addClass("load-complete");
	});

/* =content_adaption ----------------------------------------------------------------------------------------------------
	NOTE: Alter behaviour of the page based on the design breakpoint that's currently active
	----------------------------------------------------------------------------------------------------------------------- */

	// Watch for resizes
	$(window).resize(function() {
		//didResize = true;
		delay(function(){
			respond.calculate_breakpoint();
		}, 500);
	});

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	respond.setup(); // always run at least once

}); // $(document).ready