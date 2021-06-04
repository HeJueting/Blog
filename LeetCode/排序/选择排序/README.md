# 选择排序

</br>

### 思路

1. 找到数组中最小值，选中它放置第一位

2. 找到数组中第二小的值，选中它并放置第二位

3. 以此类推...

</br>
</br>

### 实现

```javascript
function sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        // 记录下最小值
        let minIndex = i;
        // 从 i+1 个元素开始继续最小的值
        for (let j = i + 1; j < arr.length; j++) {
            // 如果 arr[j] 小于 arr[minIndex]，更新下 minIndex 的值
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // 交换位置
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
```

</br>
</br>
