func spiralOrder(matrix [][]int) []int {
    res := make([]int, 0)
    MAX_ROW := len(matrix)
    if MAX_ROW == 0 {
        return res
    }
    MAX_COL := len(matrix[0])
    if MAX_COL == 0 {
        return res
    }

    dir := 0
    row := 0
    col := 0
    left := 0
    top := 0
    bottom := MAX_ROW - 1
    right := MAX_COL - 1

    for i := 0; i < MAX_ROW * MAX_COL ; i++{
        //fmt.Printf("Index: %d, row=%d, col=%d, Direct=%d \n", i, row, col, dir)
        e := matrix[row][col]
        res = append(res, e)

        switch dir {
        case 0:
            col++
            if col > right {
                col = right
                top++
                row++
                dir = (dir + 1) % 4
            }
        case 1:
            row++
            if row > bottom {
                row = bottom
                right--
                col--
                dir = (dir + 1) % 4
            }
        case 2:
            col--
            if col < left  {
                col = left
                bottom--
                row--
                dir = (dir + 1) % 4
            }
        case 3:
            row--
            if row < top {
                row = top
                left++
                col++
                dir = (dir + 1) % 4
            }
        }
    }

    return res
}

