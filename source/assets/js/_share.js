/**
 * Disqus comments partial
 */

g.share = function() {
  var self = g.share;

  self.selectors = {
    html: "html"
  }
  self.classes = {
    start:  'animate--start',
    end:    'animate--end'
  }

  $(document).on('click', '.twitter-popup', function(e) {
    e.preventDefault();
    var width  = 575, height = 400,
    left = ($(window).width()  - width) / 2,
    top = ($(window).height() - height) / 2,
    articleTitle = $('section h1:first').text();
    url = this.href;
    opts='status=1'+',width='+width+',height='+height+',top='+top+',left='+left;
    window.open(url, 'twitter', opts);
    $(this).html('Thanks!').addClass('icon-smile loved-it-success');
  });

};