/**
 * Browser sniff partial
 *
 * Allows use of .hover, and data types on the browser
 */

g.codeHighlight = function() {
  var self = g.codeHighlight;

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

};