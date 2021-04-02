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

### 求解

-   利用栈这种后进先出数据结构

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
    // 利用数组模拟栈
    var stack = [];
    var arr = s.split("");
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        // 插入的是左括号
        if (map.has(str)) {
            stack.push(str);
        }
        // 插入的是右括号
        else {
            // 如果stack不存在 or 与上一个符号没有形成闭合
            if (!stack.length || map.get(stack[stack.length - 1]) !== str) {
                return false;
            }
            // 成功与上一个符号形成闭合，删除上一个符号
            stack.pop();
        }
    }
    // 如果最后stack长度为空，说明已完全匹配
    return !stack.length;
}
```

</br>
</br>

**题目来自：[LeetCode-有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)**
