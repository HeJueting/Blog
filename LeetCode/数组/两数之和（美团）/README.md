# 两数之和

</br>

### 题目

给定一个整数数组 nums  和一个整数目标值 target，请你在该数组中找出 和为目标值 的那两个整数，并返回它们的数组下标

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍

你可以按任意顺序返回答案

```
// 示例1
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]

// 示例2
输入：nums = [3,2,4], target = 6
输出：[1,2]

// 示例3
输入：nums = [3,3], target = 6
输出：[0,1]
```

</br>
</br>

### 求解一

1.  两次 for 循环

```javascript
function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}
```

</br>
</br>

### 求解二

1.  先将数组转为 Map 数据结构，值作为 key，位置下标作为 value

2.  再遍历数组，判断 map 中是否存在 target - nums[ i ]的数据，如果有

3.  注意处理边界情况，target 不能自己与自己相加所得

```javascript
function twoSum(nums, target) {
    // 将数组转为map数据结构，值作为key，数组下标作为value
    const map = new Map();
    nums.forEach((num, index) => {
        map.set(num, index);
    });
    // 遍历原数组，用 target - nums[i] 作为 key，在map数据中查看 map[key] 是否存在
    for (let i = 0; i < nums.length; i++) {
        const mapIndex = map.get(target - nums[i]);
        // 注意：不能将自己与自己相加得到 target
        if (mapIndex !== undefined && mapIndex !== i) {
            return [i, map.get(target - nums[i])];
        }
    }
}
```

</br>
</br>

**题目来自：[LeetCode-两数之和](https://leetcode-cn.com/problems/two-sum/)**
