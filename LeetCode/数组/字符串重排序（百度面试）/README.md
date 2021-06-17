# 字符串重排序（百度面试题）

</br>

### 题目

给定一个字符串，只包含字母和数字，然后对这个字符串进行重排序，要求：

1. 字母在该字符串钟的位置不会改变

2. 数字的逆序展示

```javascript
// 示例1
a 13 bcd 456 bfg 78
a 87 bcd 654 bfg 31

// 示例2
a 13 bcd 7456 bfg 789
a 98 bcd 7654 bfg 731
```

</br>
</br>

### 求解一

1. 第一次 for 循环记录数字的值

2. 第二次 for 循环对相应位置的数字进行逆序替换

```javascript
function sort(str) {
    // 先将字符串转为数组
    const strArr = str.split("");

    // 用一个数组来保存 str 中的数字
    let arr = [];
    // 第一次for循环找到这些数字
    for (let i = 0; i < strArr.length; i++) {
        if (String(Number(strArr[i])) !== "NaN") {
            arr.unshift(strArr[i]);
        }
    }

    // 第二次for循环，更新这些数字
    for (let j = 0; j < strArr.length; j++) {
        if (String(Number(strArr[j])) !== "NaN") {
            strArr[j] = arr[0];
            arr.shift();
        }
    }

    return strArr.join("");
}
```

</br>
</br>

### 求解二

1. 使用 for 循环，从前后往中间遍历

```javascript
function sort(str) {
    // 先将字符串转为数组
    const strArr = str.split("");

    // 从前后往中间遍历
    for (let i = 0, j = strArr.length - 1; i < j; ) {
        // 如果 strArr[i] 是数字 并且 strArr[j] 也是数字，就交换他们的位置
        if (String(Number(strArr[i])) !== "NaN" && String(Number(strArr[j])) !== "NaN") {
            const temp = strArr[i];
            strArr[i] = strArr[j];
            strArr[j] = temp;
            // i 和 j 继续循环
            i++;
            j--;
        }
        // 如果 strArr[i] 不是数字
        if (String(Number(strArr[i])) === "NaN") {
            i++;
        }
        // 如果 strArr[j] 不是数字
        if (String(Number(strArr[j])) === "NaN") {
            j--;
        }
    }

    return strArr.join("");
}
```
