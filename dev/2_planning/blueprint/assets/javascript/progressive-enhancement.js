// progressive-enhancement.js
//
// Responsible JavaScript enhancements.
// The aim of this file is to provide functionality niceties in the event that JavaScript is enabled on the client.
// In no case should JavaScript be required for the website to work. In no case should any JavaScript be in-line or embeded in HTML.

$(document).ready(function(){
  /* language alert */
  $("p.language a").click(function(){
    alert("Switches the site to Welsh. When in Welsh this button switches to English.");
    return false;
  });
  
  $(window).bind('load', function() { // events to run after the entire page has finished loading
    $("body").addClass("load-complete");
    
    $(".note").delay(10000).animate({
      height: '0'
    }, 1000);
  });
});