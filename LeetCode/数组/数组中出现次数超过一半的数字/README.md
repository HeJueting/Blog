# 数组中出现次数超过一半的数字

</br>

### 题目

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

```
// 示例
输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
输出: 2
```

</br>
</br>

### 求解一

1. 用 Map 数据结构记录每个数字出现的次数

2. 如果出现次数大于长度的一半，即可返回这个数字

```javascript
var majorityElement = function (nums) {
	let map = new Map();
	for (let i = 0; i < nums.length; i++) {
		let key = nums[i];
		if (map.has(key)) {
			map.set(key, map.get(key) + 1);
		} else {
			map.set(key, 1);
		}
		// 如果次数超过一半，直接return
		if (map.get(key) > nums.length / 2) {
			return key;
		}
	}
};
```

</br>
</br>

### 求解二

1. 既然出现次数一半以上，意味着 5 个数出现至少 3 次，6 个数出现至少 4 次

2. 将这个数组排序后，直接返回中间的数值即可

```javascript
var majorityElement = function (nums) {
	nums = nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)]
};
```

</br>
</br>

**题目来自：[LeetCode-两数之和](https://leetcode-cn.com/problems/two-sum/)**
