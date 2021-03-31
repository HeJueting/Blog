# 删除链表中的节点

</br>

### 题目

请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点。传入函数的唯一参数为 要被删除的节点

```
// 示例1
输入：head = [4,5,1,9], node = 5
输出：[4,1,9]
解释：给定你链表中值为5的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

// 示例2
入：head = [4,5,1,9], node = 1
输出：[4,5,9]
解释：给定你链表中值为1的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
```

</br>
</br>

### 注意

-   在 JavaScript 中，我们可以利用 Object 属性的指向来模拟链表操作

-   在 leetcode 中，**多留意代码块中的注释内容，Definition 后面定义的函数或变量是可以直接使用的**

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
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    // 将下一个obj直接赋值给了被删除的整个obj
    node.val = node.next.val;
    node.next = node.next.next;
};
```

</br>
</br>

**题目来自：[LeetCode-删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)**
