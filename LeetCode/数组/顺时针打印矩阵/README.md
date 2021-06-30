# 顺时针打印矩阵

</br>

### 题目

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

```
// 示例1
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]

// 示例2
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```

</br>
</br>

### 思路

1. 在遍历的过程中不断删除原数组的内容，直到原数组的内容为空即表示对原数组遍历完成

2. 在顺序打印矩阵的过程中，有这四种情况
    - 从左到右
    - 从右到下
    - 从右到左
    - 从左到上

</br>
</br>

### 求解

```javascript
var spiralOrder = function (matrix) {
    let result = [];
    // 顺时针遍历的同时，不断删除已经遍历的元素，直到二维数组为空
    while (matrix.length) {
        // 左 ——> 右
        result = result.concat(matrix[0]); // 将第一行顺序放入到result中
        matrix.splice(0, 1); // 删除第一行

        // 右 ——> 下
        for (let i = 0; i < matrix.length; i++) {
            result.push(matrix[i][matrix[i].length - 1]); // push这个元素
            matrix[i].splice(matrix[i].length - 1, 1); // 删除这个元素
        }
        // 如果每一行的元素为空了，跳出循环
        if (matrix[0] && !matrix[0].length) {
            break;
        }

        // 下 ——> 左
        result = result.concat((matrix[matrix.length - 1] || []).reverse()); // 将最后一行逆序放入到result中
        matrix.splice(matrix.length - 1, 1); // 删除最后一行

        // 左 ——> 上
        for (let i = matrix.length - 1; i >= 0; i--) {
            result.push(matrix[i][0]); // push这个元素
            matrix[i].splice(0, 1); // 删除这个元素
        }
        // 如果每一行的元素为空了，跳出循环
        if (matrix[0] && !matrix[0].length) {
            break;
        }
    }

    return result;
};
```

</br>
</br>

**题目来自：[LeetCode-顺时针打印矩阵](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)**
