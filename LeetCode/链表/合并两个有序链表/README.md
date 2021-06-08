# 合并两个有序链表

</br>

### 题目

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的

```javascript
// 示例1
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

// 示例2
输入：l1 = [], l2 = []
输出：[]

// 示例3
输入：l1 = [], l2 = [0]
输出：[0]
```

</br>
</br>

### 注意

-   在 JavaScript 中，我们可以利用 Object 属性的指向来模拟链表操作

-   在 leetcode 中，**多留意代码块中的注释内容，Definition 后面定义的函数或变量是可以直接使用的**

</br>
</br>

### 思路

-   遍历两个链表的队头，将较小的插入到新的链表中

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
var mergeTwoLists = function (l1, l2) {
    let p1 = l1;
    let p2 = l2;
    let l = null;
    let pl;
    while (p1 || p2) {
        let next;
        if (p1 && p2) {
            if (p1.val > p2.val) {
                next = p2;
                p2 = p2.next;
            } else {
                next = p1;
                p1 = p1.next;
            }
        } else if (!p1 && p2) {
            next = p2;
            p2 = p2.next;
        } else if (!p2 && p1) {
            next = p1;
            p1 = p1.next;
        }
        next.next = null;

        if (l) {
            pl.next = next;
            pl = pl.next;
        } else {
            l = new ListNode(next.val, null);
            pl = l;
        }
    }
    return l;
};
```

</br>
</br>

**题目来自：[LeetCode-合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)**
