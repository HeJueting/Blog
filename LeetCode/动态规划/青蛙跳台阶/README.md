# 青蛙跳台阶

</br>

### 题目

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法

```javascript
// 示例 1
输入：n = 2
输出：2

// 示例 2
输入：n = 7
输出：21

// 示例 3
输入：n = 0
输出：1
```

</br>
</br>

### 求解

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

**题目来自：[LeetCode-爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)**
