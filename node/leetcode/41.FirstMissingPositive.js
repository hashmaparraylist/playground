/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  if (nums.length === 0) return 1;
  for (let i = 0; i < nums.length; i++) {
    while(nums[i] > 0 && nums[i] < nums.length && nums[nums[i] - 1] != nums[i]) {
      let k = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = k;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != i + 1) {
      return i + 1;
    }
  }

  return nums.length + 1;
};