# 反转链表

<br></br>

### 反转一个单链表

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
    // 用指针p来记录当前遍历到哪个节点
    let p = head;
    // 用l表示反转后的链表
    const l = new ListNode();

    while(p) {
        // 缓存p的下一个节点
        const temp = p.next;
        // 如果l的下一个节点为空，说明不需要反转
        if (!l.next) {
            // 将第一个节点插入l链表中，注意，l链表的末尾为null，所以需要把p指针的next指向null
            p.next = null;
            l.next = p;
        }
        // 需要反转
        else {
            // 将p节点插入到l.next之前
            p.next = l.next;
            l.next = p;
        }
        // p节点向后移动
        p = temp;
    }

    // 返回l链表
    return l.next;
};
```

<br></br>

**题目来自：[LeetCode-反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)**
