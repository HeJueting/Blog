# 回文链表

</br>

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

</br>
</br>

### 注意

1. 在 JavaScript 中，我们可以利用 Object 属性的指向来模拟链表操作

2. 在 leetcode 中，**多留意代码块中的注释内容，Definition 后面定义的函数或变量是可以直接使用的**

</br>
</br>

### 思路

1. 遍历链表，并将链表转为数组

2. 数组从前后往中间进行遍历判断

</br>
</br>

### 求解

```javascript
var isPalindrome = function (head) {
    // 将链表转为数组
    let p = head;
    const arr = [];
    while (p) {
        arr.push(p.val);
        p = p.next;
    }
    // 前后向中间遍历数组
    for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
        if (arr[i] !== arr[j]) {
            return false;
        }
    }

    return true;
};
```

</br>
</br>

**题目来自：[LeetCode-回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)**
