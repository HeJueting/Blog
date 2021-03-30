# 反转链表

<br></br>

### 题目

请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点。传入函数的唯一参数为 要被删除的节点

```
// 示例
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

<br></br>
<br></br>




### 注意

- 在JavaScript中，我们可以利用Object属性的指向来模拟链表操作

- 在leetcode中，题目其实已经帮你实现了这样的链表，切记不要把[2,3,4,5]这样的链表数据当作普通数组，而要当作
```
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

- 初始化一个新链表表示反转后的链表

- 遍历链表，将每一个节点插入到新链表的第一个位置

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
var reverseList = function(head) {
    // l表示反转后的链表
    let l = new ListNode();
    // p表示原始链表的指针
    let p = head;
    while(p) {
        // 缓存p的下一个节点
        const temp = p.next;
        // 将最新的值插入到l.next
        p.next = l.next;
        l.next = p;
        // p指针向后移动
        p = temp;
    }

    return l.next;
};
```

<br></br>

**题目来自：[LeetCode-反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)**
