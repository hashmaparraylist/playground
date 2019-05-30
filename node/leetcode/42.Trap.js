/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {

  let maxNum = 0;
  let maxIndex = 0;

  height.forEach((e, i) => {
    if (e >= maxNum) {
      maxNum = e;
      maxIndex = i;
    }
  });

  if (maxNum === 0) return 0;

  const leftTrap = function(height, begin, end, maxHeight) {
    let max = 0;
    let index = 0;
    for (let i = begin; i < end; i++) {
      if (height[i] > max) {
        max = height[i];
        index = i;
      }
    }

    if (max == 0) return 0;
    let trapNum = max * (end - index - 1);
    for (let i = index + 1; i < end; i++) {
      trapNum -= height[i];
    }

    let left = leftTrap(height, 0, index, max);
    return trapNum + left;
  }

  const rightTrap = function(height, begin, end, maxHeight) {
    let max = 0;
    let index = 0;
    for (let i = begin + 1; i < end; i++) {
      if (height[i] > max) {
        max = height[i];
        index = i;
      }
    }

    if (max == 0) return 0;
    let trapNum = max * (index - begin - 1);
    for (let i = begin + 1; i < index; i++) {
      trapNum -= height[i];
    }

    let right = rightTrap(height, index, height.length, max);
    return trapNum + right;
  }
  
  // left
  let left = leftTrap(height, 0, maxIndex, maxNum);

  // right
  let right = rightTrap(height, maxIndex, height.length, maxNum);

  return left + right;
};