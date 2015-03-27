/**
 * Social sharing file
 *
 * Creates functionality for opening Twitter popup window to share
 */

g.share = function() {
  var self = g.share;

  self.selectors = {
    twitterButton: "[data-js='share-on-twitter']"
  }
  self.classes = {
    success: "btn--twitter-shared"
  }
  self.variables = {
    success: "Thanks!"
  }

  $(document).on('click', self.selectors.twitterButton, function(e) {
    e.preventDefault();
    var width  = 575, height = 400,
    left = ($(window).width()  - width) / 2,
    top = ($(window).height() - height) / 2,
    articleTitle = $('h1:first').text();
    url = this.href;
    opts='status=1'+',width='+width+',height='+height+',top='+top+',left='+left;
    window.open(url, 'twitter', opts);
    $(this).html(self.variables.success).addClass(self.classes.success);
  });

};