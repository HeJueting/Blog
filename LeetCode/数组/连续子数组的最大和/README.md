# 连续子数组的最大和

</br>

### 题目

输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

```javascript
// 示例
输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

</br>
</br>

### 求解一

1. 暴力求解法，两次 for 循环求解

```javascript
var maxSubArray = function (nums) {
    let max = nums[0];
    // 从第一个元素开始相加
    for (let i = 0; i < nums.length; i++) {
        // 用 sum 来记录相加的结果
        let sum = nums[i];
        max = max > sum ? max : sum;
        for (let j = i + 1; j < nums.length; j++) {
            sum += nums[j];
            // 通过 sum 来定位最大值
            if (sum > max) {
                max = sum;
            }
        }
    }
    return max;
};
```

</br>
</br>

### 求解二

1. 用 sum 记录当前连续多个子数组的和

    - 每轮循环，当 sum < 0，说明前面的子数组的和已经产生了负收益，重置 sum

2. 用 res 记录当前的最大值，每轮循环都求 max(res, sum)

```javascript
var maxSubArray = function (nums) {
    let res = nums[0];
    let sum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        // 说明产生了负收益，重新计算sum
        if (sum < 0) {
            sum = nums[i];
        } else {
            sum += nums[i];
        }
        res = Math.max(res, sum);
    }
    return res;
};
```

</br>
</br>

**题目来自：[LeetCode-连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/submissions/)**
