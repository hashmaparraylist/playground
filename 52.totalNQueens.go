var rows []int
var hills []int
var dales []int
var queens []int

func totalNQueens(n int) int {
    rows = make([]int, n)
    hills = make([]int, 4 * n - 1)
    dales = make([]int, 2 * n - 1)
    queens = make([]int, n)
    result := 0
    backtrack(0, n, &result)
    return result
}

func backtrack(row, n int, result *int) {
    for i := 0; i < n; i++ {
        if isNotUnderAttack(row, i, n) {
            placeQueen(row, i, n)
            if (row + 1) == n {
                *result = *result + 1
            } else {
                backtrack(row + 1, n, result)
            }
            removeQueen(row, i, n)
        }
    }
}

func isNotUnderAttack(row, col, n int) bool {
    res := rows[col] + hills[row - col + 2 * n] + dales[row + col];
    if res == 0 {
        return true
    } else {
        return false
    }
}

func placeQueen(row, col, n int) {
    queens[row] = col;
    rows[col] = 1;
    hills[row - col + 2 * n] = 1;
    dales[row + col] = 1;
}

func removeQueen(row, col, n int) {
    queens[row] = 0;
    rows[col] = 0;
    hills[row - col + 2 * n] = 0;
    dales[row + col] = 0;
}

