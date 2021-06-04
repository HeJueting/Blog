# 二叉树的最大深度

</br>

### 题目

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明：** 叶子节点是指没有子节点的节点

**示例：**给定二叉树 [3,9,20,null,null,15,7]

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3

</br>
</br>

### 思路

-   初始化一个新链表表示反转后的链表

-   遍历链表，将每一个节点 **插入到新链表的第一个位置**，其实就是链表插入节点的操作

</br>
</br>

### 求解

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    // 用max用来保存该二叉树的最大深度值
    let max = 0;

    // 递归遍历这个二叉树
    // 以参数的形式记录当前树的深度
    function deep(node, index) {
        // 递归的终止条件是node不存在
        if (!node) {
            return;
        }

        // 如果max小于index，则更新max
        max = max < index ? index : max;

        // 下一次递归，树的深度+1
        deep(node.left, index + 1);
        deep(node.right, index + 1);
    }

    // 遍历root
    deep(root, 1);

    return max;
};
```

</br>

**题目来自：[二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/submissions/)**
