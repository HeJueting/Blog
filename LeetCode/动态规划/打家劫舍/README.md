# 打家劫舍

</br>

### 题目

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

```javascript
// 示例 1
输入：[1,2,3,1]
输出：4
解释：1、偷窃 1 号房屋 (金额 = 1)
      2、然后偷窃 3 号房屋 (金额 = 3)
偷窃到的最高金额 = 1 + 3 = 4

// 示例 2
输入：[2,7,9,3,1]
输出：12
解释：1、偷窃 1 号房屋 (金额 = 2)
      2、偷窃 3 号房屋 (金额 = 9)
      3、接着偷窃 5 号房屋 (金额 = 1)
偷窃到的最高金额 = 2 + 9 + 1 = 12
```

</br>
</br>

### 思路

1. f(k) = 从前 k 个房屋中能偷窃到的最大数额

2. Ak = 第 k 个房屋的钱数

3. f(k) = max(f(k-2) + Ak, f(k-1))

</br>
</br>

### 求解

```javascript
var rob = function (nums) {
    // 一个房屋都没有
    if (nums.length === 0) {
        return 0;
    }

    // 定义一个数组用来保存第n个房屋能打劫到的最大金额
    // 初始化arr时，第一项和第二项是可以确定的
    const arr = [0, nums[0]];

    // 从第三项开始遍历
    for (let i = 2; i < nums.length + 1; i++) {
        // 根据公式
        arr[i] = Math.max(arr[i - 2] + nums[i - 1], arr[i - 1]);
    }

    return arr[arr.length - 1];
};
```

</br>
</br>

**题目来自：[LeetCode-打家劫舍](https://leetcode-cn.com/problems/house-robber/)**
