/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {

  const multiplyOne = function(a, b, bits) {
    let result = Array(bits).fill(0);
    let overflow = 0;
    for (let i = 0; i < a.length; i++) {
      let k = a[i] * b;
      k += overflow;
      overflow = 0
      if (k >= 10) {
        result.push(k % 10)
        overflow = Math.floor(k / 10);
        continue;
      }
      
      result.push(k);
    }
    if (overflow > 0) result.push(overflow);
    return result;
  }

  let arrLong = [];
  let arrShort = [];

  if (num1 === '0' || num2 === '0') return '0';
  
  let longStr = num1.length > num2.length ? num1 : num2;
  let shortStr = num1.length > num2.length ? num2 : num1;

  for (let i = longStr.length - 1; i >= 0 ; i--) {
    arrLong.push(longStr[i]);
  }

  for (let i = shortStr.length - 1; i >= 0 ; i--) {
    arrShort.push(shortStr[i]);
  }

  let col = [];

  for (let i = 0; i < arrShort.length; i++) {
    let k = multiplyOne(arrLong, arrShort[i], i);
    col.push(k);
  }

  let result = [];
  for (let i = 0; i < col.length; i++) {
    let of = 0;
    for (let j = 0; j < col[i].length; j++) {
      if ((j + 1) > result.length) {
        let k = col[i][j] + of;
        result.push(k % 10);
        of = k >= 10 ? 1 : 0;
        continue;
      }

      let k = result[j] + col[i][j] + of;
      result[j] = k % 10;
      of = k >= 10 ? 1 : 0;
    }
    if (of > 0) result.push(of);
  }

  let res = '';
  for (let i = result.length - 1; i >= 0; i--) {
    res = res.concat(result[i] + '');
  }
  return res;
};