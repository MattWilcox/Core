/*
 * http://www.creativit.com.br/jquery/ondemand_js/jquery.ondemand.js.1.0.0.txt
 * pathced to work with jQuery 1.4 by Matt Wilcox
 */
	(function($){
		
		function isExternalScript(url){ 
			return /(http|https):\/\//.test(url);
		};
		
		$.extend({
			requireConfig : {
				routeJs		: '',
				routeCss	: ''
			},
			
			ODqueue : [],
			ODpending : null,
			
			requireJs : function(scriptUrl, callback, opts, obj, scope)
			{
				if(opts != undefined || opts == null){
					$.extend($.requireConfig, opts);
				}
				
				var _request = {
					url 		: scriptUrl,
					callback 	: callback,
					opts		: opts,
					obj 		: obj,
					scope		: scope
				}
				
				if(this.ODpending)
				{
					this.ODqueue.push(_request);
					return;
				}
				
				this.ODpending = _request;
				
				var _this		= this;
				var _url		= (isExternalScript(scriptUrl)) ? scriptUrl : $.requireConfig.routeJs + scriptUrl;
				var _head 		= document.getElementsByTagName('head')[0];
				var _scriptTag 	= document.createElement('script');
					
					// Firefox, Opera
					$(_scriptTag).bind('load', function(){
						_this.requestComplete();
					});
					
					// IE
					_scriptTag.onreadystatechange = function(){
						if(this.readyState === 'loaded' || this.readyState === 'complete'){
							_this.requestComplete();
						}
					}
					
					_scriptTag.type = "text/javascript";
					_scriptTag.src = _url;
					
					_head.appendChild(_scriptTag);
			},
			
			requestComplete : function()
			{
				
				if(this.ODpending.callback){
					if(this.ODpending.obj){
						if(this.ODpending.scope){
							this.ODpending.callback.call(this.ODpending.obj);
						} else {
							this.ODpending.callback.call(window, this.ODpending.obj);
						}
					} else {
						this.ODpending.callback.call();
					}
				}
				
				this.ODpending = null;
				
				if(this.ODqueue.length > 0)
				{
					var request = this.ODqueue.shift();
					this.requireJs(request.url, request.callback, request.opts, request.obj, request.scope);
				}
			},
			
			requireCss : function(styleUrl){
				
				if(document.createStyleSheet){
					document.createStyleSheet($.requireConfig.routeCss + styleUrl);
				}
				else {
				
					var styleTag = document.createElement('link');
											
					$(styleTag).attr({
						href	: $.requireConfig.routeCss + styleUrl,
						type	: 'text/css',
						media	: 'screen',
						rel		: 'stylesheet'
					}).appendTo($('head').get(0));
					
				}
				
			}
			
		})
		
	})(jQuery);