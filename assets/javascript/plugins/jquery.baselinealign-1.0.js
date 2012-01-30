(function( $ ) {
  $.fn.baselineAlign = function(options) {

  	// Create some configuration options, and give sensible defaults
    var settings = $.extend({
      'container' : 'popup'
    }, options);
  
    return this.each(function() {

    	var this_img = $(this);
      
      /* abort now if it's not an image set as display block */
    	if($(this).css('display') == 'inline') { return; }

    	$(this).attr('style',''); // reset JS applied margins on the image

      // shrink the image height to a whole pixel value to avoid rounding errors in the layout engine
      // NOTE, this introduces a very very slight difference in aspect ratio. You'll never see it.
      var img_height = this_img.height();
      var img_height = Math.floor(img_height);
      this_img.css("height",img_height);

    	/* setup variables */
    	var baseline        = parseFloat($("html").css("line-height").replace("px",""));
      var fontsize        = parseFloat($("html").css("font-size").replace("px",""));
      var total_footprint = null;

      /* IF: the image is inside a popup box */
      if(this_img.parents("."+settings.container).length > 0){
      	var popup = this_img.parents("."+settings.container);

      	popup.attr('style',''); // reset JS applied margins

        total_footprint = Math.floor(popup.outerHeight(false));
	    } 
	    /* ELSE IF: the image is inside an anchor but not a popup box */
	    else if(this_img.parent("a").length > 0){
        var parent_margin = parseFloat(this_img.parent("a").css("margin-bottom").replace("px",""));
        total_footprint   = total_footprint + parent_margin;
      }
      
      var remainder  = parseFloat(total_footprint%baseline);
      var offset     = parseFloat(baseline-remainder);
      
      if(
        this_img.parents(".popup.dc_full").length > 0 // if the parent is full width we always want at least one line of seperation
        || offset<(baseline/4) // avoid the text wrapping directly underneath, there needs to be at least 1/4 line-height gap
      ) {
      	offset = offset+baseline;
      }

      if(this_img.parents("."+settings.container).length > 0){ /* apply margin to popup box */
        this_img.parents("."+settings.container).css("margin-bottom",offset+"px");
      } else
      if(this_img.parent("a").length > 0){ /* apply margin to anchor */
        this_img.parent("a").css("margin-bottom",offset+"px");
      } else { /* apply margin to image */
        this_img.css("margin-bottom",offset+"px");
      }
    });
  };
})( jQuery );