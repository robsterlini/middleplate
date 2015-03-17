/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.browserSniff = function() {
	var self = g.browserSniff;

	self.selectors = {
		html: "html"
	}

	var b = document.documentElement;
	b.setAttribute('data-useragent',  navigator.userAgent);
	b.setAttribute('data-platform', navigator.platform);

	$(document).ready(function() {
		if ($(self.selectors.html).hasClass('touch')) {
			$(self.selectors.html).removeClass('hover');
		}
	})


};