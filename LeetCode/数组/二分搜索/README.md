# 二分搜索

</br>

### 思路

1. 这个数组必须是有序数组

2. 将数组一分为二，从数组的中间元素开始搜索，如果刚好等于目标值，返回目标值下标

3. 如果小于目标值，就从小于的那一半继续搜索；如果大于目标值，就从大于的一半继续搜索

</br>
</br>

### 求解

```javascript
function find(arr, target) {
    // 找到中间值
    const midIndex = Math.floor(arr.length / 2);
    const midNumber = arr[midIndex];
    // 如果中间值刚好是target，直接返回下标
    if (midNumber === target) {
        console.log(midIndex);
        return midIndex;
    }
    // 如果 arr.length 小于 2，说明没有找到
    else if (arr.length > 1) {
        // 如果target大于中间值，继续在大于target那部分的数组中搜寻
        if (target > midNumber) {
            const newArr = arr.slice(midIndex + 1, arr.length);
            return find(newArr, target);
        }
        // 如果target小于中间值，继续在小于target那部分的数组中搜寻
        else if (target < midNumber) {
            const newArr = arr.slice(0, midIndex);
            return find(newArr, target);
        }
    } else {
        return null;
    }
}
```
