/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {

  var roman = '';

  if ((num < 1) || (num > 3999)) {
    return null;
  }

  if ((num / 1000) >= 1) {
    roman += parseThousand(num);
  }
  
  num %= 1000;

  if ((num / 100) >= 1) {
    roman += parseHunred(num);
  }

  num %= 100;
  if ((num / 10) >= 1) {
    roman += parseTen(num);
  }

  num %= 10;

  roman += parseSingleDigits(num, 'I', 'V', 'X');

  return roman;
};

var parseTen = function(target) {
  var num = parseInt(target / 10);
  if (num < 1) return '';
  return parseSingleDigits(num, 'X', 'L', 'C');
}

var parseHunred = function(target) {
  var num = parseInt(target / 100);
  if (num < 1) return ''; 
  return parseSingleDigits(num, 'C', 'D', 'M');
}

var parseThousand = function(target) {
  var num = parseInt(target / 1000);
  if (num < 1) {
    return "";
  }
  return parseSingleDigits(num, "M", "", "") ;
};

var parseSingleDigits = function(target, one, five, ten) {
  switch(target) {
    case 1:
      return one;
    case 2:
      return one + one;
    case 3:
      return one + one + one;
    case 4:
      return one + five;
    case 5:
      return five;
    case 6:
      return five + one;
    case 7:
      return five + one + one;
    case 8:
      return five + one + one + one;
    case 9:
      return one + ten;
    default:
      return "";
  }
};
