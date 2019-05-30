/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    
    let v = Array(10);
    
    // useable number const
    v[0] = 0b000000001;
    v[1] = 0b000000010;
    v[2] = 0b000000100;
    v[3] = 0b000001000;
    v[4] = 0b000010000;
    v[5] = 0b000100000;
    v[6] = 0b001000000;
    v[7] = 0b010000000;
    v[8] = 0b100000000;
    v[9] = 0b111111111;
    
    let _num = Array(81).fill(v[9]);
    
    
    const index2x = function(index) {
        return Math.floor(index / 9);
    }
    
    const index2y = function(index) {
        return index % 9;
    }
    
    const coor2index = function(x, y) {
        return x * 9 + y;
    }
    
    const countOneOfBinary = function(su) {
        let tmp = su;
        let count = 0;
        while (tmp > 0) {
            tmp = tmp & (tmp - 1);
            count ++;
        }
        
        return count;
    }
    
    const getIndexOfBinary = function(su, index) {
        
        let k = 0;
        for (let i = 0; i < 9; i++) {
            if ((v[i] & su) != 0) {
                k++;
                if (k === index) return i + 1;
            }
        }
        
        return -1;
    }
    
    const removeSuAdIndex = function(index, su) {
        let notSu = v[9] - v[su - 1];
        if (_num[index] > 0) {
            _num[index] = _num[index] & notSu;
        }
        
        return _num[index];
    }
    
    const removeSuAtCoor = function(x, y, su) {
        return removeSuAdIndex(coor2index(x, y), su);  
    }
    
    const setNumAtIndex = function(index, su) {
        if ((v[su - 1] & _num[index]) === 0) return false;
        _num[index] = su * -1;
        
        let x = index2x(index);
        let y = index2y(index);
        
        // remove su at row and col
        for (let i = 0; i < 9; i++) {
            if (removeSuAtCoor(x, i, su) === 0) return false;
            if (removeSuAtCoor(i, y, su) === 0) return false;
        }
        
        let x1 = Math.floor(x / 3) * 3;
        let y1 = Math.floor(y / 3) * 3;
        
        for (let i = x1; i < x1 + 3; i++) {
            for (let j = y1; j < y1 + 3; j++) {
                if (removeSuAtCoor(i, j, su) === 0) return false;
            }
        }
        
        return true;
    }
    
    // calc cells
    const findMinCell = function() {
        let i = 0;
        let result = -1;
        let suMin = 10;
        do {
            if (_num[i] < 0) {
                i++;
                continue;
            }
            
            let count = countOneOfBinary(_num[i]);
            if (count == 1) {
                let su = getIndexOfBinary(_num[i], 1);
                if (!setNumAtIndex(i, su)) return -2;
                
                if (i === result) {
                    result = -1;
                    suMin = 10;
                }
                
                i = -1;
            } else {
                if (count < suMin) {
                    suMin = count;
                    result = i
                }
            }
            i++;
        } while (i < 81);
        return result;
    }

    const findNextResult = function(stack, info, index, tryIdx) {
      let j = getIndexOfBinary(_num[index], tryIdx);
  
      while (j != -1) {
          if (setNumAtIndex(index, j)) {
              info.index = index;
              info.try = tryIdx;
              stack.push(info);
              
              index = findMinCell();
              
              break;
          }
          
          _num = info.num.slice(0);
          tryIdx++;
          j = getIndexOfBinary(_num[index], tryIdx);
      }
      
      if (j === -1) return -2;
      return index;
  }
    
    // copy board to array
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '.') continue;
            //num[coor2index(i, j)] = board[i][j] * -1;
            setNumAtIndex(coor2index(i, j), board[i][j]);
        }
    }
    
    let result = findMinCell();
    let stack = [];
    
    while (result != -1) {
        if (result ==  -2) {
            let info = stack.pop();
            
            _num = info.num.slice(0);
            result = info.index;
            tryIdx = info.try + 1;
            
            result = findNextResult(stack, info, result, tryIdx);
        } else {
            
            let info = {};
            info.num = _num.slice(0);
            result = findNextResult(stack, info, result, 1);
        }
    }
        
    
    
    // output
    for (let i = 0; i < _num.length; i++) {
        let x = index2x(i);
        let y = index2y(i);
        board[x][y] = _num[i] * -1;
    }
};

let board =[[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]];
solveSudoku(board);
let a = 16;

console.log(board);
