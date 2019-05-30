/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  let results = [];
  candidates.sort((a, b) => a - b);
  let seeds = candidates.filter(e => e <= target);
  if (seeds.length === 0) return results;

  let stack = [];
  stack.push({
    seeds: seeds.slice(0),
    selected: [seeds[0]],
    target: target
  });

  while(stack.length > 0) {
    let num = stack[stack.length - 1].target;
    let selected = stack[stack.length - 1].selected.slice(0);
    num -= selected[selected.length - 1];

    if (num > 0) {
      let seeds = stack[stack.length - 1].seeds.filter(e => e <= num);
      if (seeds.length > 0) {
        selected.push(seeds[0]);
        stack.push({
          seeds: seeds,
          selected: selected.slice(0),
          target: num
        });
        continue;
      }
    }

    if (num == 0) {
      let ok = stack.pop();
      let result = ok.selected.slice(0);
      result.sort((a, b) => a - b);
      let str = result.join(',');
      if (results.indexOf(str) === -1) {
        results.push(str);
      }
    }

    let info = stack.pop();
    while (info != null) {
      let index = info.seeds.indexOf(info.selected[info.selected.length - 1]);
      index++;
      if (index < info.seeds.length) {
        info.selected.pop();
        info.selected.push(info.seeds[index]);
        stack.push(info);
        break;
      }
      info = stack.pop();
    }

  }

  let r = results.map(e => {
    let arr = e.split(',');
    return arr.map( el => Number.parseInt(el));
  });

  return r;
};

console.log(Date());
let r = combinationSum([2,3,6,7], 7);
console.log(Date());
console.log(JSON.stringify(r, '', 4));