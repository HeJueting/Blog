# 二维数组中的查找

</br>

### 题目

在一个 n \* m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```
// 示例
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]

给定 target = 5，返回 true
给定 target = 20，返回 false
```

</br>
</br>

### 思路

1.  两次 for 循环遍历

2.  注意几个临界条件

    -   如果 matrix[i][0] > target，说明这一行都不会存在

    -   如果 matrix[i]matrix[i].length - 1] < target，说明这一行都不会存在 target

    -   如果 matrix[i][j] > target，说明这一行剩下的元素不会存在 target

</br>
</br>

### 求解

```javascript
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
    // 先确定在哪几行符合查找规则
    for (let i = 0; i < matrix.length && matrix[i][0] <= target; i++) {
        // 刚好找到 target
        if (matrix[i][0] === target) {
            return true;
        }
        // 遍历这一行的内容，判断是否能找到 target
        for (let j = 0; j < matrix[i].length && matrix[i][j] <= target && target <= matrix[i][matrix[i].length - 1]; j++) {
            if()
            // 刚好找到 target
            if (matrix[i][j] === target) {
                return true;
            }
        }
    }
    return false;
};
```

</br>
</br>

**题目来自：[LeetCode-二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)**
