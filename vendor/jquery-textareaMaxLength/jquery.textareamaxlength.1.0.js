/* Textarea maxlength plugin
 * version 1.0
 * by Alpha Channel Group
 * Released Dec 11, 2012
 * for questions and support, contact us at www.alphachannelgroup.com
 */
(function($, window, document, undefined) {
	var methods = {
			init: function( options ) {
				return this.each(function() {
					$(this).on("keyup", function() {
						methods.process($(this));
					}).on("blur", function() {
						methods.destroy($(this));
					}).css("resize", "none");
				});
			},
			
			process: function (el) {
				var me = "#" + jQuery(el).attr("name") + "-pseudo";
				// First, build a div and hide it
				if ($(me).length <= 0) {
					$("body").prepend('<div id="' + me.replace("#", "") + '"></div>');
					var atts = ["width", "padding", "border", "font-size", "line-height", "bold", "font-family", "border"];
					for (var i in atts) {
						$(me).css(atts[i], $(el).css(atts[i]));
					}
					$(me).css("position", "absolute").css("left", "-999em");
				}
				var html = $(el).val().replace(/\s{2,}/g, ' ');
				$(me).html(html);
				var count = 0;
				var inc = 2;
				while ($(me).outerHeight() > ($(el).outerHeight() + 8) && count++ < 500) {
					html = $(el).val().replace(/\s{2,}/g, ' ');
					html = $.trim(html.slice(0, html.length - parseInt(inc)));
					$(me).html(html);
					inc = inc + .25;
					$(el).css("border", "1px solid red");
					//$(el).attr("maxlength", $(el).val().length);
				}
				jQuery(el).val(html);
			},
			
			destroy: function(el) {
				var me = "#" + $(el).attr("name") + "-pseudo";
				$(el).val($.trim(jQuery(el).val()));
				$(el).css("border", $(me).css("border"));
				$(me).remove();
			}
		}
	
	$.fn.textareaMaxLength = function() {
		return methods.init.apply(this);
	};
		
})(jQuery, window, document);