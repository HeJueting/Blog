# 二叉树叶子路径数字之和（字节跳动）

</br>

### 题目

二叉树所有根到叶子路径组成的数字之和

```javascript
// 示例
// 输出: 124 + 125 + 13 = 262
    1
   / \
  2   3
 / \
4   5
```

</br>
</br>

### 思路

1. 遍历这个二叉树，获取它的叶子节点

2. 当 node.left 和 node.right 都不存在时，代表已经遍历到了它的叶子节点

3. 利用字符串相加的特性可以得到 124 125 13 这些叶子节点的路径

</br>
</br>

### 求解

```javascript
function sumTreePath(root) {
    let sum = 0;

    // 递归遍历这个二叉树
    function deep(node, str) {
        // 遍历到了叶子节点
        if (!node.left && !node.right) {
            sum += Number(str + node.value);
        }
        // 将当前层级的信息以字符串的信息传递下去
        node.left && deep(node.left, str + node.value);
        node.right && deep(node.right, str + node.value);
    }
    deep(root, "");

    return sum;
}
```

</br>
</br>
