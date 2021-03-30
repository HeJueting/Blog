# 删除排序链表中的重复元素

<br></br>

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





### 求解一

- 声明一个arr保存不重复的数字

- 初始化一个新链表l，插入这些不重复的数字节点

- 遍历传入的链表，在l中插入新节点（lp.next赋值，然后lp指针不断后移）

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
var deleteDuplicates = function(head) {
    
    let p = head;               // 定义一个指针p指向这个链表的头部
    const l = new ListNode();   // 定义一个新链表，代表去重删除后的链表
    let lp = l;                 // lp代表一个指针，指向l链表的头部
    const arr = [];             // 定义一个数组来保存已经存在的值
    while(p) {
        // 临时存储p的下一个指向
        const temp = p.next;
        if(arr.indexOf(p.val) === -1) {
            arr.push(p.val);
            // 将p的下一个指向置空
            p.next = null;
            // lp指向p，添加一个新节点，lp向后移动
            lp.next = p;
            lp = lp.next;
        }
        // p指针后移
        p = temp;
    }
    
    return l.next;
};
```

<br></br>
<br></br>





### 求解二

- 这是一个顺序链表，只要前一个节点跟后一个节点相同就可以移除后一个节点

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
var deleteDuplicates = function(head) {
    let p = head;
    while (p && p.next) {
        // 如果后一个节点跟前一个节点一致，就移除后一个节点
        // 节点删除，相当于节点向后移动了一位
        if(p.val === p.next.val) {
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



<br></br>

**题目来自：[LeetCode-删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)**
