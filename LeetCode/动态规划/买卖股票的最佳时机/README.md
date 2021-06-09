# 打家劫舍

</br>

### 题目

给定一个数组 prices ，它的第  i 个元素  prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0

```javascript
// 示例 1
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票

// 示例 2
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0
```

</br>
</br>

### 思路

1. f(k) 表示第 k 天最大的收益

2. Ak 表示第 k 天卖出的价格，Ai 表示当前第 i 天产生了最大的收益

    - 如果 Ak > Ak - 1，f(k) = Ak - Ai + f(k-1)

    - 如果 Ak < A(k-1)，f(k) = f(k-1)

</br>
</br>

### 求解

```javascript
var maxProfit = function (prices) {
    // 如果只有1天的价格
    if (prices.length < 1) {
        return 0;
    }

    // max 表示最大收益
    let max = 0;
    // 定义一个 index 用来保存当前最大收益的下标
    let index = 0;

    // 从第二天开始遍历
    for (let i = 1; i < prices.length; i++) {

        if(prices[i] - prices[index])

        // 差值
        const diff = prices[i] - prices[index];


        // diff 大于 0 才能更新最大收益
        if (diff > 0) {
            max = prices[i] - prices[index] + max;
            index = i;
        }

        console.log
    }

    return max;
};
```

</br>
</br>

**题目来自：[LeetCode-打家劫舍](https://leetcode-cn.com/problems/house-robber/)**
