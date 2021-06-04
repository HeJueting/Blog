# 二叉树的最小深度

</br>

### 题目

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明： 叶子节点是指没有子节点的节点。

**示例 1：**

```
    3
   / \
  9  20
    /  \
   15   7
```

输入：root = [3,9,20,null,null,15,7]
输出：2

</br>

**示例 2：**

输入：root = [2,null,3,null,4,null,5,null,6]
输出：5

</br>
</br>

### 思路一

-   使用深度优先遍历，找到所有叶子节点（left 和 right 为 null 就说明该节点为叶子节点），找到最小值

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
var minDepth = function (root) {
    // 如果root不存在，说明层级为0
    if (!root) {
        return 0;
    }

    // 用min来保存最小深度
    let min;

    // 递归遍历二叉树，将当前层数作为第二个参数
    function deep(node, l) {
        // 如果该节点的left和right不存在，说明这就是叶子节点
        if (!node.left && !node.right) {
            if (min === undefined) {
                min = l;
            } else {
                min = min > l ? l : min;
            }
        }
        // 继续深度遍历节点
        else {
            node.left && deep(node.left, l + 1);
            node.right && deep(node.right, l + 1);
        }
    }
    deep(root, 1);

    return min;
};
```

</br>
</br>

### 思路二

-   使用广度优先遍历，只要在某一层找到了叶子节点，就说明这是最小深度

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
var minDepth = function (root) {
    // 如果root不存在，层级为0
    if (!root) {
        return 0;
    }

    // 定义一个队列，用来保存当前需要遍历的节点
    const queue = [
        {
            node: root, // 表示节点
            index: 1, // 表示该节点的层级
        },
    ];

    // 遍历这个队列
    while (queue.length) {
        // 取出队列的第一项
        const { node, index } = queue[0];
        // 如果队列中的节点左子树和右子树都不存在，说明找到了叶子节点
        if (!node.left && !node.right) {
            return index;
        }
        // 将该层节点的左子树和右子树继续进入队列
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
        // 取出队列第一项
        queue.shift();
    }
};
```

</br>
</br>

**题目来自：[二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)**
