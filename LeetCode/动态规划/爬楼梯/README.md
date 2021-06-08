# 爬楼梯

</br>

### 题目

假设你正在爬楼梯。需要 n  阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

```javascript
// 示例 1
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶

// 示例 2
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

</br>
</br>

### 思路

```
n = 1  =>  1
n = 2  =>  2
n = 3  =>  3
n = 4  =>  5
以此类推...
F(n) = Fn(n-1) + F(n-2)
```

</br>
</br>

### 递归求解

```javascript
var climbStairs = function (n) {
    // 临界条件，当只有一个
    if (n < 2) {
        return 1;
    }
    return climbStairs(n - 1) + climbStairs(n - 2);
};
```

</br>
</br>

### 循环求解

```javascript
var climbStairs = function (n) {
    // 临界条件，当只有一个
    if (n < 2) {
        return 1;
    }
    let pre = 1;
    let next = 1;
    for (let i = 2; i < n + 1; i++) {
        const temp = pre;
        pre = next;
        next = temp + pre;
    }
    return next;
};
```

</br>
</br>

**题目来自：[LeetCode-爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)**
