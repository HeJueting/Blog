# 斐波那契数

<br></br>

### 题目

斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

```
F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n > 1
```

给你 n ，请计算 F(n)

```
// 示例1
输入：2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1

// 示例2
输入：3
输出：2
解释：F(3) = F(2) + F(1) = 1 + 1 = 2

// 示例3
输入：4
输出：3
解释：F(4) = F(3) + F(2) = 2 + 1 = 3
```

<br></br>
<br></br>

### 递归求解

```javascript
function getRes(n) {
    var res = fib(n);
    return res;
}

function fib(n) {
    if(n < 2) {
        return n;
    }
    var pre = fib(n-2);
    var next = fib(n-1);
    return pre + next;
}
```

<br></br>

#### 循环求解

```javascript
function fib(n) {
    if(n<2) {
        return n;
    }
    var pre = 0;
    var next = 1;
    var res = 1;
    for(var i=2; i<n; i++) {
        pre = next;
        next = res;
        res = pre + next;
    }
    return res;
};
```

**题目来自：[LeetCode-斐波那契数](https://leetcode-cn.com/problems/fibonacci-number/)**
