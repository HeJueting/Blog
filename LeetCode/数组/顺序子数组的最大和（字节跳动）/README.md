# 顺序子数组的最大和（字节跳动）

</br>

### 题目

输入一个整型数组，数组中的一个或连续多个整数组成一个子数组，要求子数组必须顺序或者逆序，求所有子数组的和的最大值。

```javascript
// 示例1
输入: nums = [1, 2, 3, 3, -2, 5, 1, 6]
输出: 6
解释: 顺序（升序）子数组 [1, 2, 3, 3] 的和最大，为 9

// 示例2
输入: nums = [7, 2, -1, 3, 2, 5, -1, 6]
输出: 6
解释: 顺序（降序）子数组 [7, 2] 的和最大，为 9
```

</br>
</br>

### 求解

1. 用 arr 存储它的顺序子数组

2. 当顺序发生反转时，求出这个 arr 的最大值

```javascript
// 求一个顺序数组，和的最大值
function getArrMax(arr) {
    // 如果 arr 全是负数
    if (arr[0] < 0 && arr[arr.length - 1] < 0) {
        return arr[0] > arr[arr.length - 1] ? arr[0] : arr[arr.length - 1];
    }
    // 正常记录正数范围的最大值
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            sum += arr[i];
        }
    }
    return sum;
}

// 得到最大值
function getResult(nums) {
    // 处理特殊情况
    if (!Array.isArray(nums)) {
        return 0;
    } else if (nums.length < 2) {
        return nums.length ? nums[0] : 0;
    }

    // 分别记录最大值、连续子数组、升序与否
    let max;
    let arr = [nums[0]];
    let isUp;

    for (let i = 1; i < nums.length; i++) {
        // 初始化isUp
        if (isUp === undefined) {
            if (nums[i] > nums[i - 1]) {
                isUp = true;
            } else if (nums[i] < nums[i - 1]) {
                isUp = false;
            }
        }

        // 不确定升序还是降序，连续的重复数据
        if (isUp === undefined) {
            arr.push(nums[i]);
        }
        // 满足升序 or 满足降序
        else if ((isUp === true && nums[i] >= nums[i - 1]) || (isUp === false && nums[i] <= nums[i - 1])) {
            arr.push(nums[i]);
        }
        // 顺序反转
        else {
            // 更新max
            if (max === undefined) {
                max = getArrMax(arr);
            } else {
                max = Math.max(max, getArrMax(arr));
            }
            // 重置顺序
            isUp = !isUp;
            // 重置arr
            let newArr = [];
            let last = arr[arr.length - 1];
            while (arr[arr.length - 1] === last) {
                newArr.unshift(arr[arr.length - 1]);
                arr.splice(arr.length - 1, 1);
            }
            arr = newArr;
            arr.push(nums[i]);
        }
    }

    // 处理最后一组arr
    if (max === undefined) {
        max = getArrMax(arr);
    } else {
        max = Math.max(max, getArrMax(arr));
    }

    return max;
}
```
