# 无重复字符的最长子串

<br></br>

### 题目

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度

```
// 示例1
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3

// 示例2
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1

// 示例3
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3

// 示例4
输入: s = ""
输出: 0
```

<br></br>
<br></br>




### 求解

- 用双指针维护一个滑动窗口，用来剪切子串

- 不断移动右指针，遇到重复字符，就把做指针移动到重复字符的下一位

- 过程中记录所有窗口的长度，并返回最大值

```javascript
var lengthOfLongestSubstring = function(s) {
    // 最大的字串长度
    let maxLength = 0;
    // 当前子串这个数组（类似于一个滑动窗口）
    let arr = [];

    for(let i=0; i<s.length; i++) {
        // 如果当前子串已经重复
        if(arr.indexOf(s[i]) !== -1) {
            // 更新最大字串长度
            maxLength = arr.length > maxLength ? arr.length : maxLength;
            // 删除重复的字串
            arr.splice(0, arr.indexOf(s[i]) + 1);
        }
        arr.push(s[i]);
    }

    // 处理最后一组arr窗口
    maxLength = arr.length > maxLength ? arr.length : maxLength;

    return maxLength;
};
```

<br></br>
<br></br>


**题目来自：[LeetCode-无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)**
