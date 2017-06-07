/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    var number = [
        ['1'], 
        ['a', 'b', 'c'], 
        ['d', 'e', 'f'], 
        ['g', 'h', 'i'], 
        ['j', 'k', 'l'], 
        ['m', 'n', 'o'], 
        ['p', 'q', 'r', 's'], 
        ['t', 'u', 'v'], 
        ['w', 'x', 'y', 'z'],
        [' ']
    ];
    
    var result = [];
    
    digits = "" + digits;
    
    if (digits.length === 0) {
        return result;
    }
    
    result = number[digits[0] - 1];
    
    if (digits.length === 1) {
        return result;
    }
    
    for(var i = 1; i < digits.length; i++) {
        var index = digits[i] - 1;
        var t = number[index];
        var temp = [];
        for(var j = 0; j < result.length; j++) {
            for(var k = 0; k < t.length; k++) {
                temp.push(result[j] + t[k]);
            }
        } 
        
        result = temp;
    }

    return result;
};
