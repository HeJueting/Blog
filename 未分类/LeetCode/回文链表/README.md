# 回文链表

<br></br>

### 题目

请判断一个链表是否为回文链表

```
// 示例1
输入: 1->2
输出: false

// 示例2
输入: 1->2->2->1
输出: true

// 示例3
输入: 1->1->2->1
输出: false
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

- 遍历链表，并链表转为数组

- 数组从前后往中间进行遍历判断

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
var isPalindrome = function(head) {
    // 将链表转为数组
    let p = head;
    const arr = [];
    while(p) {
        arr.push(p.val);
        p = p.next;
    }
    // 前后向中间遍历数组
    for(let i=0, j=arr.length-1; i<j; i++, j--) {
        if(arr[i] !== arr[j]) {
            return false;
        }
    }

    return true;
};
```

<br></br>

**题目来自：[LeetCode-回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)**
