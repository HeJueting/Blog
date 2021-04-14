# 冒泡排序

</br>

### 思路

1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。

2. 第一次循环下来，最大的一个元素就排在了最后，以此类推......

</br>
</br>

### 实现

```javascript
function sort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // 位置交换
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
```

</br>
</br>
