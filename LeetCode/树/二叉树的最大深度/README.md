# 二叉树的最大深度

</br>

### 题目

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明：** 叶子节点是指没有子节点的节点

**示例：**给定二叉树 [3,9,20,null,null,15,7]

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3

</br>
</br>

### 思路

-   初始化一个新链表表示反转后的链表

-   遍历链表，将每一个节点 **插入到新链表的第一个位置**，其实就是链表插入节点的操作

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
 * @return {ListNode}
 */
var reverseList = function (head) {
    // l表示反转后的链表（初始值为null）
    let l = null;
    // p表示需要反转的这个链表的指针
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
    return l;
};
```

</br>

**题目来自：[LeetCode-反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)**
