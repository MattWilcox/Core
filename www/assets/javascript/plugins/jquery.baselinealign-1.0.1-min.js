(function(a){var b={baselineAlign:function(b){var c=a.extend({container:!1},b);return this.each(function(){var b=a(this);if(b.css("display")==="inline")return;b.attr("style","");var d=Math.floor(b.height());b.css("height",d);var e=parseFloat(a("html").css("line-height").replace("px","")),f=parseFloat(a("html").css("font-size").replace("px","")),g=d;if(c.container!==!1&&b.parents(c.container).length>0){var h=b.parents(c.container);h.attr("style","");var i=Math.ceil(h.outerHeight());h.css("height",i);g=Math.floor(h.outerHeight(!1))}var j=parseFloat(g%e),k=parseFloat(e-j);k<e/4&&(k+=e);if(c.container===!1){b.css("margin-bottom",k+"px");return}if(b.parents(c.container).length>0){b.parents(c.container).css("margin-bottom",k+"px");return}b.css("margin-bottom",k+"px")})},init:function(){var c=!1,d=!1,e=this,f=arguments;a(window).resize(function(){c=!0});a(window).load(b.baselineAlign.apply(e,f));setInterval(function(){if(c){c=!1;return b.baselineAlign.apply(e,f)}},500)}};a.fn.baselineAlign=function(c){if(b[c])return b[c].apply(this,Array.prototype.slice.call(arguments,1));if(typeof c=="object"||!c)return b.init.apply(this,arguments);a.error("Method "+c+" does not exist on jQuery.baselineAlign")}})(jQuery);