# 反转链表

<br></br>

### 题目

反转一个单链表

```
// 示例
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

<br></br>
<br></br>

### 注意

-   在 JavaScript 中，我们可以利用 Object 属性的指向来模拟链表操作

-   在 leetcode 中，题目其实已经帮你实现了这样的链表，切记不要把[2,3,4,5]这样的链表数据当作普通数组，而要当作

```javascript
{
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: ......
        }
    }
}
```

<br></br>
<br></br>

### 思路

-   初始化一个新链表表示反转后的链表

-   遍历链表，将每一个节点 **插入到新链表的第一个位置**，其实就是链表插入节点的操作

<br></br>
<br></br>

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
 * @return {ListNode}
 */
var reverseList = function (head) {
    // l表示反转后的链表（初始值为null）
    let l = null;
    // p表示需要反转的这个链表
    let p = head;
    // 遍历这个p链表
    while (p) {
        // 用temp缓存p的下一个节点
        const temp = p.next;
        // 将p当前这个节点插入到l链表头部
        p.next = l;
        l = p;
        // p继续指向下一个节点
        p = temp;
    }
};
```

<br></br>

**题目来自：[LeetCode-反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)**
