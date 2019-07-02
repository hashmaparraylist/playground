func myPow(x float64, n int) float64 {
	res := 1.0000
	if x == 1 {
		return x
	}
	if x == 0 {
		return x
	}
	if n == 0 {
		return res
	} else if n < 0 {
		x = 1 / x
		n = -1 * n
	}
	/*
	for i := 1; i <= n; i++ {
		res = res * x
	}
	*/
	cur := x
	for i := 1; i > 0; i >>> 1 {
		if (i % 2) == 1 {
			res = res * cur
		}
		cur *= cur
	}
	return res
}