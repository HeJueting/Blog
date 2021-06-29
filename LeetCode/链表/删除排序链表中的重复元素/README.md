# 删除排序链表中的重复元素

</br>

### 题目

给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次

```
// 示例1
输入: 1->1->2
输出: 1->2

// 示例2
输入: 1->1->2->3->3
输出: 1->2->3
```

</br>
</br>

### 注意

1. 在 JavaScript 中，我们可以利用 Object 属性的指向来模拟链表操作

2. 在 leetcode 中，**多留意代码块中的注释内容，Definition 后面定义的函数或变量是可以直接使用的**

</br>
</br>

### 求解一

1. 声明一个 arr 保存不重复数字的数组

2. 再根据这个 arr 数组生成新的链表

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
var deleteDuplicates = function (head) {
    // p代表该链表的指针
    let p = head;
    // arr代表存储没有重复字段的链表数据
    const arr = [];
    while (p) {
        if (arr.indexOf(p.val) === -1) {
            arr.push(p.val);
        }
        p = p.next;
    }

    // 注意处理[]这种特殊情况，直接返回null即可（空链表）
    if (arr[0] === undefined) {
        return null;
    } else {
        // 根据arr生成一个不重复的链表l
        const l = new ListNode(arr[0]);
        // 用lp表示l链表的指针
        let lp = l;
        for (let i = 1; i < arr.length; i++) {
            // 不断拼接这个链表
            lp.next = new ListNode(arr[i]);
            // lp指针后移
            lp = lp.next;
        }
        return l;
    }
};
```

</br>
</br>

### 求解二

1. 这是一个顺序链表，只要前一个节点跟后一个节点相同就可以移除后一个节点

```javascript
var deleteDuplicates = function (head) {
    let p = head;
    while (p && p.next) {
        // 如果后一个节点跟前一个节点一致，就移除后一个节点
        // 节点删除，相当于节点向后移动了一位
        if (p.val === p.next.val) {
            p.next = p.next.next;
        }
        // 节点向后移动
        else {
            p = p.next;
        }
    }
    return head;
};
```

</br>
</br>

**题目来自：[LeetCode-删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)**
