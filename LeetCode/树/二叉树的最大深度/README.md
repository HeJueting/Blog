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

### 思路一

-   使用深度优先遍历

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
</br>

### 思路二

-   使用广度优先遍历

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
    // 如果root不存在，说明层级为0
    if (!root) {
        return 0;
    }

    // 用max来保存最深的节点层级
    let max = 0;

    // 用队列来保存需要遍历的节点
    const queue = [
        {
            node: root, // 节点
            index: 1, // 当前节点层级
        },
    ];

    while (queue.length) {
        // 取出队列第一项，获取节点、层级信息
        const { node, index } = queue[0];
        // 第一项出队列
        queue.shift();

        // 得到叶子节点的层级
        if (!node.left && !node.right) {
            max = max < index ? index : max;
        }
        // 如果不是叶子节点，继续入队列
        else {
            node.left &&
                queue.push({
                    node: node.left,
                    index: index + 1,
                });
            node.right &&
                queue.push({
                    node: node.right,
                    index: index + 1,
                });
        }
    }

    return max;
};
```

</br>
</br>

**题目来自：[二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/submissions/)**
