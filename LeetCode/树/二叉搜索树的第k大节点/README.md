# 二叉搜索树的第 k 大节点

</br>

### 题目

给定一棵二叉搜索树，请找出其中第 k 大的节点

**示例 1：**

```
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 4
```

</br>

**示例 2：**

```
输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 4
```

</br>
</br>

### 思路

-   遍历这个二叉树，将起节点数值存到数组中

-   对这个数组排序，再取出第 K 大的值

</br>
</br>

### 求解

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
    const arr = [];

    // 遍历二叉树，将其转为一个数组
    function deep(node) {
        arr.push(node.val);
        node.left && deep(node.left);
        node.right && deep(node.right);
    }
    deep(root);

    // 对arr排序
    arr.sort((a, b) => {
        return b - a;
    });

    return arr[k - 1];
};
```

</br>
</br>

**题目来自：[二叉搜索树的第 k 大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)**
