# 环形链表

</br>

### 题目

给定一个链表，判断链表中是否有环。

</br>
</br>

### 注意

-   在 JavaScript 中，我们可以利用 Object 属性的指向来模拟链表操作

-   在 leetcode 中，**多留意代码块中的注释内容，Definition 后面定义的函数或变量是可以直接使用的**

</br>
</br>

### 思路

-   两个人在圆形操场上的起点同时起跑，速度快的人一定会超过速度慢的人一圈

-   用一快一慢两个指针遍历链表，如果指针能够相逢，那么链表就有圈

</br>
</br>

### 求解

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    // 定义两个指针同时参与遍历，一快一慢
    let p1 = head;
    let p2 = head;
    while (p1 && p2 && p2.next) {
        // p1每次后移一位，相当于速度慢的那个人
        p1 = p1.next;
        // p2每次后移两位，相当于速度快的那个人
        p2 = p2.next.next;
        // 如果相遇，说明成环
        if (p1 === p2) {
            return true;
        }
    }
    // 如果p1或p2走到了终点都没有相遇，说明不成环
    return false;
};
```

</br>
</br>

**题目来自：[LeetCode-环形链表](https://leetcode-cn.com/problems/linked-list-cycle/submissions/)**
