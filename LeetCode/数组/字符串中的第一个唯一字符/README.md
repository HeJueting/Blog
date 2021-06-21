# 字符串中的第一个唯一字符

</br>

### 题目

给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1

```
// 示例1
s = "leetcode"
返回 0

// 示例2
s = "loveleetcode"
返回 2
```

</br>
</br>

### 求解一

1. 循环遍历这个 s 字符串

2. 每一轮循环中将这个 s 字符串转为数组 arr

3. 从 arr 中删除当前的字符 s\[i\]

4. 再次利用 indexof 方法判断 arr 中剩下的字符中是否还存在 s\[i\]，如果不存在返回 i

```javascript
var firstUniqChar = function (s) {
    for (let i = 0; i < s.length; i++) {
        const arr = s.split("");
        const index = arr.indexOf(s[i]);
        // 删除这个字符
        arr.splice(index, 1);
        if (arr.indexOf(s[i]) === -1) {
            return i;
        }
    }

    return -1;
};
```

</br>
</br>

### 求解二

1. 用一个 Map 数据结构去维护目前已有的字符和他的出现次数

2. 再遍历整个 Map 数据结构，如果 value 为 1，就返回这个字符

```javascript
var firstUniqChar = function (s) {
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1);
    }
    for (let key of map.keys()) {
        if (map.get(key) === 1) {
            return s.indexOf(key);
        }
    }
    return -1;
};
```

</br>
</br>

**题目来自：[LeetCode-字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)**
