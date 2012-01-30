(function( $ ) {
  $.fn.baselineAlign = function(options) {

  	// Create some configuration options, and give sensible defaults
    var settings = $.extend({
      'container' : '.popup'
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
      if(this_img.parents(settings.container).length > 0){
      	var container = this_img.parents(settings.container);

        container.attr('style',''); // reset JS applied margins

        // shrink the image height to a whole pixel value to avoid rounding errors in the layout engine
        // NOTE, this introduces a very very slight difference in aspect ratio. You'll never see it.
        var container_height = Math.ceil(container.height());
        container.css("height",container_height);

        total_footprint = Math.floor(container.outerHeight(false));
	    }
      
      var remainder = parseFloat(total_footprint%baseline);
      var offset    = parseFloat(baseline-remainder);
      
      if(
        this_img.parents(".popup.dc_full").length > 0 // if the parent is full width we always want at least one line of seperation
        || offset<(baseline/4) // avoid the text wrapping directly underneath, there needs to be at least 1/4 line-height gap
      ) {
      	offset = offset+baseline;
      }

      if(this_img.parents(settings.container).length > 0){ /* apply margin to specified container box */
        this_img.parents(settings.container).css("margin-bottom",offset+"px");
      } else { /* apply margin to image itself */
        this_img.css("margin-bottom",offset+"px");
      }
    });
  };
})( jQuery );