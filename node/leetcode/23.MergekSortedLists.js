/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    var merged  = lists.reduce(function(a, b) {
        if (b == null) return a;
        if (a == null) return b;
        
        var bhead = b;
        var prehead = new ListNode(null);
        prehead.next = a;
        
        while (bhead != null) {
            var p = prehead.next;
            var pre = prehead;
            while (p != null) {
                if (bhead.val < p.val) {
                    var tmp = new ListNode(bhead.val);
                    tmp.next = p;
                    pre.next = tmp;
                    break;
                } else {
                    p = p.next;
                    pre = pre.next
                }
                
                if (p == null) {
                    var tmp = new ListNode(bhead.val);
                    pre.next = tmp;
                }
            }
            
            bhead = bhead.next;
        }

        return prehead.next;
    }, null);
    
    return merged;
};

