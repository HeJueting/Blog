# 最小覆盖子串

<br></br>

### 题目

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 

注意：如果 s 中存在这样的子串，我们保证它是唯一的答案

```
// 示例1
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"

// 示例2
输入：s = "a", t = "a"
输出："a"
```

<br></br>
<br></br>



### 思路

- 用双指针维护一个滑动窗口

- 移动右指针，找到包涵T的子串，再移动左指针，尽量减少包含T的子串的长度

<br></br>
<br></br>





### 求解

```javascript
// 判断某个arr中，是否包涵str中所有的字符
var isHave = function(map, arr) {
    for([key, value] of map) {
        // arr中包涵key的数量
        const nums = arr.filter(item => item === key).length;
        if(nums < value || !nums) {
            return false;
        }
    }
    return true;
}
// 求出最小覆盖子串
var minWindow = function(s, t) {

    // 包涵t的最小子串
    let minStr = '';
    // 定义一个arr来模拟当前的滑动窗口
    const arr = [];

    // 用map来表示t中每个字符出现的次数
    const map = new Map();
    for(let item of t) {
        map.set(item, map.get(item) ? map.get(item) + 1 : 1); 
    }

    for(let i=0; i<s.length; i++) {
        // 右指针向后移动
        arr.push(s[i]);

        // 如果arr中完全包含t（左指针先后移动，直到不完全包涵t为止）
        while(isHave(map, arr)) {
            // arr转为字符串
            const arrStr = String(arr).replace(/,/g, '');
            // 如果minStr不存在或者arrStr小于minStr，就更新minStr
            minStr = (arrStr.length < minStr.length || !minStr) ? arrStr : minStr;

            // 左指针向后移动
            arr.shift();
        }
    }

    return minStr;
};
```
<br></br>
<br></br>


**题目来自：[LeetCode-最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)**
