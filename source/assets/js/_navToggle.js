/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.navToggle = function() {
  var self = g.navToggle;

  self.selectors = {
    toggle:   '[data-js="toggle-navigation"]',
    parent:   '[data-js="toggled-navigation-parent"]'
  }
  self.classes = {
    toggled:  'masthead--toggled'
  }

  $(document).on('click', self.selectors.toggle, function(e) {
    e.preventDefault();
    $(self.selectors.parent).toggleClass(self.classes.toggled);
  });

};