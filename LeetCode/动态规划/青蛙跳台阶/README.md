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

### 思路

```
n = 0  =>  1
n = 1  =>  1
n = 2  =>  2
n = 3  =>  3
n = 4  =>  5
n = 5  =>  8
n = 6  =>  13
n = 7  =>  21
以此类推...
F(n) = Fn(n-1) + F(n-2)
```

</br>
</br>

### 求解

```javascript
var numWays = function (n) {
    // 临界条件，当只有一个
    if (n < 2) {
        return 1;
    }
    return numWays(n - 1) + numWays(n - 2);
};
```

</br>
</br>

**题目来自：[LeetCode-青蛙跳台阶](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)**
