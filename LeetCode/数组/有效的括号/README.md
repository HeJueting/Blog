# 有效的括号

</br>

### 题目

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

-   左括号必须用相同类型的右括号闭合。
-   左括号必须以正确的顺序闭合。
-   注意空字符串可被认为是有效字符串。

```
// 示例1
输入: "()"
输出: true

// 示例2
输入: "()[]{}"
输出: true

// 示例3
输入: "(]"
输出: false

// 示例4
输入: "([)]"
输出: false

// 示例5
输入: "{[]}"
输出: true
```

</br>
</br>

### 思路

1. 利用栈这种先出后出数据结构

2. 如果进入的符号与前一个符号相匹配，则同时弹出两个符号，否则说明不符合

3. 符号遍历完之后，如果数组为空，说明符合，否则不符合

</br>
</br>

### 求解

```javascript
// 构造符号闭合规则的数据结构
var map = new Map([
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
]);

function isValid(s) {
    // 如果字符串长度为奇数，永远不可能形成配对
    if (s.length % 2 === 1) {
        return false;
    }
    const arr = [];
    for (let i = 0; i < s.length; i++) {
        // arr最后一项是否与s[i]形成匹配
        const lastOne = arr[arr.length - 1];
        if (lastOne && map.get(lastOne) === s[i]) {
            arr.pop();
        } else {
            arr.push(s[i]);
        }
    }
    return !arr.length;
}
```

</br>
</br>

**题目来自：[LeetCode-有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)**
