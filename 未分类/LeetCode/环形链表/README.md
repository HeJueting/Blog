# 环形链表

<br></br>

### 题目

给定一个链表，判断链表中是否有环。

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

- 两个人在圆形操场上的起点同时起跑，速度快的人一定会超过速度慢的人一圈

- 用一快一慢两个指针遍历链表，如果指针能够相逢，那么链表就有圈

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
 * @return {boolean}
 */
var hasCycle = function(head) {
    // 定义两个指针同时参与遍历，一快一慢
    let p1 = head;
    let p2 = head;
    while(p1 && (p2 && p2.next)) {
        p1 = p1.next;
        p2 = p2.next.next;
        if(p1 === p2) {
            return true
        } 
    }
    return false;
};
```

<br></br>

**题目来自：[LeetCode-环形链表](https://leetcode-cn.com/problems/linked-list-cycle/submissions/)**
