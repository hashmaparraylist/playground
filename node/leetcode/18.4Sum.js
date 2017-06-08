/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    if (nums.length < 4) return [];

    var number = [];
    //var i = 0, j = 0, k = 0;
    var num = nums;
    num.sort();
    num.sort(function(a, b) {
        return a - b;
    });
    console.log(num);
    for (var i = 0; i < num.length -3; i ++) {
        if ((i>0) && (num[i] === num[i-1]))
            continue;
        
        for (var j = i + 1; j < num.length -2; j++) {
            if ((j > (i+1)) && (num[j] === num[j-1]))
                continue; 
            
            var low = j + 1;
            var high = num.length - 1;
            
            while (low < high) {
                var sum = num[i] + num[j] + num[low] + num[high];
                if (sum === target) {
                    number.push([num[i], num[j], num[low], num[high]]);
                    while ((low<high) && (num[low]===num[low+1]))
                        low++; //skipping over duplicate on low
                    while ((low<high) && (num[high]===num[high-1]))
                        high--; //skipping over duplicate on high
                    low++;
                    high--;
                } else if (sum < target) low ++;
                else high--;
            }
        }
    }
    
    
    return number;
};


