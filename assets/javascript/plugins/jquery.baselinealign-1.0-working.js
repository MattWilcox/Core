(function( $ ) {
  $.fn.baselineAlign = function(options) {

  	// Create some configuration options, and give sensible defaults
    var settings = $.extend({
      'container' : false // specify a container to apply the margin to rather than the image itself
    }, options);
  
    return this.each(function(run) {
    	var this_img = $(this);

      // abort now if it's not an image set as display block
    	if(this_img.css('display') === 'inline') { return; }

      // reset JS applied margins on the image
    	this_img.attr('style','');

      // shrink the image height to a whole pixel value to avoid rounding errors in the layout engine
      // NOTE, this introduces a very very slight difference in aspect ratio. You'll never see it.
      var img_height = Math.floor(this_img.height());
      this_img.css("height",img_height);

    	/* setup variables */
    	var baseline        = parseFloat($("html").css("line-height").replace("px",""));
      var fontsize        = parseFloat($("html").css("font-size").replace("px",""));
      var total_footprint = img_height;

      // IF: the image is inside a container box
      if(settings.container !== false &&
         this_img.parents(settings.container).length > 0
        ){
        	var container = this_img.parents(settings.container);

          // reset JS applied margins on the container
          container.attr('style','');

          // shrink the image height to a whole pixel value to avoid rounding errors in the layout engine
          // NOTE, this introduces a very very slight difference in aspect ratio. You'll never see it.
          var container_height = Math.ceil(container.height());
          container.css("height",container_height);

          total_footprint = Math.floor(container.outerHeight(false));
  	  }

      var remainder = parseFloat(total_footprint%baseline);
      var offset    = parseFloat(baseline-remainder);
      
      // avoid the text wrapping directly underneath, there needs to be at least 1/4 line-height gap
      if(offset<(baseline/4)) {	offset = offset+baseline; }

      if(settings.container === false) { // apply directly to the image
        this_img.css("margin-bottom",offset+"px");
        return; // stop processing this loop
      }
      if(this_img.parents(settings.container).length > 0) { /* apply margin to specified container box, if it exists */
        this_img.parents(settings.container).css("margin-bottom",offset+"px"); 
        return;
      }
      /* apply margin to image itself */
      this_img.css("margin-bottom",offset+"px");
    });
  };
})( jQuery );