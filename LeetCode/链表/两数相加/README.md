# 两数相加

</br>

### 题目

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

```
// 示例1
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.

// 示例2
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]

// 示例3
输入：l1 = [0], l2 = [0]
输出：[0]
```

</br>
</br>

### 思路

1. 用 carry 记录每次相加后，是否会产生进一位

2. 遍历两个链表，从头部开始相加；想加时，如果链表节点不存在，用 0 来相加

3. 遍历完成后，注意判断是否还需要进位

</br>
</br>

### 求解

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    // 声明一个l3代表求和结果的链表
    var l3 = new ListNode();
    // 指针p1,p2,p3  分别指向l1,l2,l3的头部
    var p1 = l1;
    var p2 = l2;
    var p3 = l3;
    // 下一位是否进一
    var carry = 0;
    while (p1 || p2) {
        var val1 = p1 ? p1.val : 0;
        var val2 = p2 ? p2.val : 0;
        // p3的next指向新的节点
        p3.next = new ListNode((val1 + val2 + carry) % 10);
        // p3向后移动
        p3 = p3.next;
        // 下次相加是否进一位
        if (carry + val1 + val2 >= 10) {
            carry = 1;
        } else {
            carry = 0;
        }
        // p1,p2向后移动
        if (p1) p1 = p1.next;
        if (p2) p2 = p2.next;
    }

    // 如果carry还为1，还需要在末尾加一个1
    if (carry) {
        p3.next = new ListNode(1);
    }

    // 最后从第一个有效节点开始输出
    return l3.next;
};
```

</br>
</br>

**题目来自：[LeetCode-两数相加](https://leetcode-cn.com/problems/add-two-numbers/)**
