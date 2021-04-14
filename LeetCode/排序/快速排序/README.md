# 快速排序

</br>

### 思路

1. 在数据集之中，选择一个元素作为"基准"

2. 所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边

3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止

</br>
</br>

### 实现

```javascript
function fastSort(arr) {
    // 如果arr只有一个元素，直接返回这个元素
    if (arr.length < 2) {
        return arr;
    }
    // 找到中间这个基准位置
    var pivotIndex = Math.floor(arr.length / 2);
    // 从原数组中删除这个值（splice方法会改变原数组，并返回被删除的元素）
    var pivot = arr.splice(pivotIndex, 1)[0];
    // 用left、right数组用于存放左右两边的值
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // 对left、right继续排序，最后将left、right的结果组合在pivot左右侧
    return fastSort(left).concat([pivot], fastSort(right));
}
```
