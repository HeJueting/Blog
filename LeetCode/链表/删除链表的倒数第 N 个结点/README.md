# 删除链表的倒数第 N 个结点

</br>

### 题目

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

```
// 示例1
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]

// 示例2
输入：head = [1], n = 1
输出：[]

// 示例3
输入：head = [1,2], n = 1
输出：[1]
```

</br>
</br>

### 注意

-   在 JavaScript 中，我们可以利用 Object 属性的指向来模拟链表操作

-   在 leetcode 中，**多留意代码块中的注释内容，Definition 后面定义的函数或变量是可以直接使用的**

</br>
</br>

### 求解一

-   遍历链表，得到其长度

-   根据链表长度和 n 得到被删除的前一个节点，p.next = p.next.next 进行删除即可

-   注意处理删除第一个节点这种临界情况（n = 链表长度）

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    // 先计算链表的长度
    let length = 0;
    // p代表链表的指针
    let p = head;
    while (p) {
        length++;
        p = p.next;
    }

    // 处理删除第一个节点这种临界情况
    if (length === n) {
        return head.next;
    } else {
        // l表示这个链表，lp表示这个链表的指针
        const l = head;
        let lp = l;
        // 获取被删除的前一个节点，这里i=1是因为lp已经被赋值为l链表的第一个节点了
        for (let i = 1; i < length - n; i++) {
            lp = lp.next;
        }
        // 删除节点
        lp.next = lp.next.next;
        return l;
    }
};
```

</br>
</br>

### 求解二

-   利用栈先入后出的特性来解决

-   链表节点先依次入栈，再根据 n 依次出栈，出栈 n 个节点之后，数组的最后一项刚好是被删除的前一个节点

-   注意处理删除第一个节点这种临界情况（出栈后，数组为空）

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    // 利用栈先入后出的特性来解决，arr用来存储链表的所有节点
    const arr = [];

    // p代表head的指针
    let p = head;
    while (p) {
        arr.push(p);
        p = p.next;
    }

    // 根据n依次出栈，找到被删除的上一个元素
    for (let i = 0; i < n; i++) {
        arr.pop();
    }

    // 处理删除第一个元素的临界条件
    if (arr.length === 0) {
        return head.next;
    } else {
        arr[arr.length - 1].next = arr[arr.length - 1].next.next;
        return head;
    }
};
```

</br>
</br>

### 求解三

-   定义两个指针，他们位置之差就是 n

-   当快指针指向末端时，慢指针恰好指向被删除的节点

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    // 定义一快一慢两个指针
    let fir = head;
    let sec = head;

    // 快指针一开始应该领先n个位置
    for (let i = 0; i < n; i++) {
        fir = fir.next;
    }

    // 如果fir为null，说明删除的是第一个元素
    if (!fir) {
        return head.next;
    } else {
        // 遍历快指针，当快指针的next指向末端时，慢指针的next刚好指向被删除的节点
        while (fir.next) {
            fir = fir.next;
            sec = sec.next;
        }
        sec.next = sec.next.next;
        return head;
    }
};
```

</br>
</br>

**题目来自：[删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)**
