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

	// Adds the userAgent and platforms to the <html> tag so
	// that if we absolutely have to we can target certain
	// browsers with fixes.
	var b = document.documentElement;
	b.setAttribute('data-useragent',  navigator.userAgent);
	b.setAttribute('data-platform', navigator.platform);

	$(document).ready(function() {
		// Uses modernizr to check whether it’s a touch device, and if it is
		// it removes the .hover class we use to stop touch devices
		// implementing a faux-hover effect badly.
		if ($(self.selectors.html).hasClass('touch')) {
			$(self.selectors.html).removeClass('hover');
		}
	})


};