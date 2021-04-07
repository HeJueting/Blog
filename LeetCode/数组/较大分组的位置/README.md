# 较大分组的位置

</br>

### 题目

在一个由小写字母构成的字符串 s 中，包含由一些连续的相同字符所构成的分组。

例如，在字符串 s = "abbxxxxzyy"  中，就含有 "a", "bb", "xxxx", "z" 和 "yy" 这样的一些分组

分组可以用区间 [start, end] 表示，其中 start 和 end 分别表示该分组的起始和终止位置的下标。上例中的 "xxxx" 分组用区间表示为 [3,6]

我们称所有包含大于或等于三个连续字符的分组为 较大分组

找到每一个 较大分组 的区间，按起始位置下标递增顺序排序后，返回结果

提示：

-   1 <= s.length <= 1000
-   s 仅含小写英文字母

```
// 示例1
输入：s = "abbxxxxzzy"
输出：[[3,6]]
解释："xxxx" 是一个起始于 3 且终止于 6 的较大分组。

// 示例2
输入：s = "abc"
输出：[]
解释："a","b" 和 "c" 均不是符合要求的较大分组。

// 示例3
输入：s = "abcdddeeeeaabbbcd"
输出：[[3,5],[6,9],[12,14]]
解释：较大分组为 "ddd", "eeee" 和 "bbb"

// 示例4
输入：s = "aba"
输出：[]
```

</br>
</br>

### 思路

-   用 res 表示最后的结果，用 str 记录匹配的字符，用 start 记录匹配字符的起始点

-   遍历这个 s 字符串，如果发现 s\[i\]不等于 str，说明匹配到了新的字符，这时候再根据 start 和 i 判断是否需要加入 res 中，最后更新 start 和 str，继续遍历

</br>
</br>

### 求解

```javascript
var largeGroupPositions = function (s) {
    // 如果s的长度小于3，直接返回[]
    if (s.length < 3) {
        return [];
    }

    // 用start表示起始点位置
    let start = 0;
    // res表示最后的结果
    let res = [];
    // str表示当前匹配的字符
    let str = "";

    for (let i = 0; i < s.length; i++) {
        // 如果s[i]不等于当前所匹配的字符
        if (str !== s[i]) {
            // 如果匹配了三个及以上这样的字符，记录他的位置
            if (i - start > 2) {
                res.push([start, i - 1]);
            }
            // 更新起始点位置
            start = i;
            // 更新当前匹配的字符
            str = s[i];
        }
    }

    // 处理最后一组
    if (s.length - start > 2) {
        res.push([start, s.length - 1]);
    }

    return res;
};
```

</br>

**题目来自：[LeetCode-较大分组的位置](https://leetcode-cn.com/problems/positions-of-large-groups/)**
