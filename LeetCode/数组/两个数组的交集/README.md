# 两个数组的交集

</br>

### 题目

给定两个数组，编写一个函数来计算它们的交集

```
// 示例1
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]

// 示例2
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
```

</br>
</br>

### 思路

-   Array.filter 方法，找出两个数组公共的数值

-   利用 Set 数据结构，对数组去重

</br>
</br>

### 求解

```javascript
var intersection = function (nums1, nums2) {
    // 找出num2中与num1相同的数据
    const arr = nums2.filter((item) => nums1.indexOf(item) !== -1);
    // 将arr转为set数据结构，数组去重
    return [...new Set(arr)];
};
```

</br>

**题目来自：[LeetCode-两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)**
