package main

func maxSubArray(nums []int) int {
	/**
	  // 动态规划解法
	  dp := make([]int, len(nums))
	  if len(nums) == 0 {
	    return 0
	  }

	  max := nums[0];
	  for i:= 0; i < len(nums); i++ {
	    for j:= i ; j < len(nums); j++ {
	      if i == j {
	        dp[j] = nums[j];
	      } else {
	        dp[j] = nums[j] + dp[j - 1]
	      }

	      if dp[j] > max {
	        max = dp[j]
	      }
	    }
	  }
	*/

	max := nums[0]
	var sum int
	for _, num := range nums {
		if sum > 0 {
			sum += num
		} else {
			sum = num
		}

		if sum > max {
			max = sum
		}
	}

	return max
}
