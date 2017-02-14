//: Playground - noun: a place where people can play

import UIKit

public class ListNode {
    public var val: Int
    public var next: ListNode?
    public init(_ val: Int) {
        self.val = val
        self.next = nil
    }
}

class Solution {
    func swapPairs(head: ListNode?) -> ListNode? {
        if head == nil {
            return head
        }
        if head!.next == nil {
            return head
        }
        var step = head
        var newHead: ListNode?
        var prev: ListNode?
        while step != nil {
            if step!.next == nil {
                if newHead == nil {
                    newHead = step
                }
                break
            }
            
            let temp = step!.next
            step!.next = temp!.next
            temp!.next = step
            step = step?.next
            if newHead == nil {
                newHead = temp
            }
            if prev != nil {
                prev!.next = temp
            }
            prev = step
        }
        
        return newHead
    }
    
    func threeSumClosest(nums: [Int], _ target: Int) -> Int {
        var sorted = nums.sort()
        var minOffset = Int.max
        for i in 0..<sorted.count - 2 {
            if i > 0 && sorted[i] == sorted[i - 1] {
                continue
            }
            for j in (i + 1)..<sorted.count - 1 {
                if j > (i + 1) && sorted[j] == sorted[j - 1] {
                    continue
                }
                for k in (j + 1)..<sorted.count {
                    if k > (j + 1) && sorted[k] == sorted[k - 1] {
                        continue
                    }
                    let sum = sorted[i] + sorted[j] + sorted[k]
                    let offset = sum - target
                    if abs(offset) < abs(minOffset) {
                        minOffset = offset
                    }
                    print("i=\(i) j=\(j) k=\(k) sum=\(sum) offset=\(offset) minOffset=\(minOffset)")
                    if offset == 0 {
                        return target
                    }
                }
            }
        }
        
        return target + minOffset
    }
    
    func abs(num: Int) -> Int {
        return num > 0 ? num : -num
    }
    
    func plusOne(digits: [Int]) -> [Int] {
        var overflow = 1
        var result : [Int] = []
        var i = digits.count - 1
        while i >= 0 {
            var digit = digits[i] + overflow
            overflow = digit / 10
            digit = digit % 10
            result.insert(digit, atIndex: 0)
            i--
        }
        
        if overflow > 0 {
            result.insert(overflow, atIndex: 0)
        }
        
        return result
    }
}
10/10
let s = Solution()
//s.threeSumClosest([1,1, 1, 0], 100)
s.plusOne([9, 9, 9, 9, 9, 9, 9, 9, 9, 9])

//let n1 = ListNode(1)
//let n2 = ListNode(2)
//let n3 = ListNode(3)
//let n4 = ListNode(4)
//
//n3.next = nil
//n2.next = n3
//n1.next = n2
//
//var a = s.swapPairs(n1)
//a
//a?.next
//a?.next?.next
//a?.next?.next?.next


