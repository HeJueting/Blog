# 数组中的第 K 个最大元素

</br>

### 题目

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素

```
// 示例1
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5

// 示例2
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

</br>
</br>

### 求解

```javascript
function findKthLargest(nums, k) {
    // 先将nums进行排序
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}
```

由于 JS 的 Array 对象自带 sort 方法，变将这个问题直接简化

</br>

**题目来自：[LeetCode-数组中的第 K 个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)**
