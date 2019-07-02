package main

import "fmt"

func permute(nums []int) [][]int {
	result := make([][]int, 0)
	tmp := nums[0:]
	backtrack(len(nums), tmp, &result, 0)

	return result
}

func backtrack(n int, nums []int, output *[][]int, first int) {
	if first == n {
		res := make([]int, len(nums))
		copy(res, nums)
		*output = append(*output, res)
	}

	for i := first; i < n; i++ {
		swap(nums, first, i)
		backtrack(n, nums, output, first+1)
		swap(nums, first, i)
	}
}

func swap(nums []int, i int, j int) {
	tmp := nums[i]
	nums[i] = nums[j]
	nums[j] = tmp
}

func main() {
	a := make([]int, 0)
	a = append(a, 1)
	a = append(a, 2)
	a = append(a, 3)
	fmt.Println(permute(a))
}
