/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  let results = [];
  let stack = [];
  candidates.sort((a, b) => a - b);
//  let seeds = candidates.filter(e => e <= target);

  const calc = function(seeds, place, stack, target, results) {
    if (target === 0) {
      results.push(stack.slice(0));
      return;
    }

    for (let i = place + 1; i < seeds.length && seeds[i] <= target; i++) {
      if ((i == place + 1) || seeds[i] != seeds[i - 1]) {
        stack.push(seeds[i]);
        calc(seeds, i, stack, target - seeds[i], results);
        stack.pop();
      }
    }
  }
  
  calc(candidates, -1, stack, target, results);
  return results;
};

