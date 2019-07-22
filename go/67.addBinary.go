import "strings"

func addBinary(a string, b string) string {
    MAX_LEN := len(a)
    if MAX_LEN < len(b) {
        MAX_LEN = len(b)
    }
    
    result := ""
    overflow := 0
    for i := 0; i < MAX_LEN; i++ {
        bitA := 0
        if len(a) - 1 - i >= 0 {
            bitA = int(a[len(a) - 1 - i]) - 0x30
        }

        bitB := 0
        if len(b) - 1- i >= 0 {
            bitB = int(b[len(b) - 1 - i]) - 0x30
        }

        bit := bitA + bitB + overflow
        if bit > 1 {
            overflow = 1
            bit = bit - 2
        } else {
            overflow = 0
        }

        result = string(0x30 + bit) + result
    }

    if overflow == 1 {
        result = string(0x30 + overflow) + result
    }
  
    return result
}

