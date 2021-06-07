# 归并排序

</br>

### 思路

1. 分：将数组拆分为左右两个数组，直到拆分为单个数值为止

2. 合：将拆分出来的数值再以队列的思想进行合并，比较左右两个数组的对头，排序入队

</br>
</br>

### 实现

```javascript
function mergeSort(array) {
    // 利用递归将数组一分为二，直到分成单个的数字
    const decompose = (arr) => {
        // 当数组长度为1时，就不用再分了，直接 return 这个 arr
        if (arr.length === 1) {
            return arr;
        }
        // 找到数组中间值下标
        const midIndex = Math.floor(arr.length / 2);
        // 得到左右两个数组
        const leftArr = arr.slice(0, midIndex);
        const rightArr = arr.slice(midIndex, arr.length);
        // 递归继续拆分数组
        const left = decompose(leftArr);
        const right = decompose(rightArr);

        // 对 left 和 right 拆分的内容再进行合并
        // 以队列的思想，递归比较 left 和 right 的对头，将较小的数值插入到 res 中
        const res = [];
        while (left.length || right.length) {
            if (left.length && right.length) {
                if (left[0] > right[0]) {
                    res.push(right[0]);
                    right.shift();
                } else {
                    res.push(left[0]);
                    left.shift();
                }
            } else if (left.length && !right.length) {
                res.push(left[0]);
                left.shift();
            } else if (!left.length && right.length) {
                res.push(right[0]);
                right.shift();
            }
        }

        // 返回这个 res，递归合并
        return res;
    };
    const res = decompose(array);
    return res;
}

mergeSort([4, 5, 2, 1, 3]);
```

</br>
</br>
