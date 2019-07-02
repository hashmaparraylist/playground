func rotate(matrix [][]int) {
	l := len(matrix)
	for i := 0; i < l; i++ {
		for j := i; j < l; j++ {
			tmp := matrix[j][i]
			matrix[j][i] = matrix[i][j]
			matrix[i][j] = tmp
		}
	}
	for i := 0; i < l; i++ {
		for j := 0; j < l/2; j++ {
			tmp := matrix[i][j]
			matrix[i][j] = matrix[i][l-j-1]
			matrix[i][l-j-1] = tmp
		}
	}
}