# 插入排序

</br>

### 思路

1. 第二个数开始往前比

2. 比他大就往后排

3. 以此类推进行到最后一个数

</br>
</br>

### 实现

```javascript
function sort(arr) {
    // 从第二个数开始往前比
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        // 一直比到第一个数字
        while (j > 0) {
            // 后一个跟前一个比较，如果后一个更小，就交换位置
            if (arr[j - 1] < arr[j]) {
                const temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
            j--;
        }
    }

    return arr;
}
```

</br>
</br>
