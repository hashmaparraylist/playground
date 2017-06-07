/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  var pattern = new RegExp('^' + p + '$');
  return pattern.test(s);
};

