# 分段反转链表（腾讯）

</br>

### 题目

给定一个链表 head 和 x，使其分段反转，如果末尾剩余的节点数量小于 x，则不进行反转。例如： head 一共有 8 个节点，x 值为 3，则 1/2/3 这三个节点进行反转，4/5/6 这三个节点进行反转，7/8 这两个节点不反转

```javascript
// 示例 1
输入: head = [1, 2, 3, 4, 5, 6, 7]  x = 3
输出: [3, 2, 1, 6, 5, 4, 7]

// 示例 2
输入: head = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  x = 2
输出: [2, 1, 4, 3, 6, 5, 8, 7, 10, 9]
```

</br>
</br>

### 思路

1. 用 l 表示分段反转后的结果

2. 用 r 记录每个分段反转的链表，用 times 记录当前反转的次数

3. 当 times = x，说明该分段反转结束，将 r 添加到 l 后面，重置 r 和 times

4. 遍历 head，用 location 记录每个分段反转后的链表指针，如果遍历结束后，剩余的节点不需要反转，直接将 location 添加到 l 后面

</br>
</br>

### 求解

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {x} x
 * @return {ListNode}
 */
var partition = function (head, x) {
    // 反转后的链表
    let l = null;
    // 反转后的链表指针（一直指向它的尾部）
    let lp = null;

    // 记录当前反转的分段反转的链表
    let r = null;
    let rp = null;

    // 记录分段反转到第几个节点
    let times = 0;
    // 记录当前分段的位置
    let location = head;

    // 遍历链表
    while (head) {
        // 刚好到分段
        if (times === x) {
            if (l) {
                lp.next = r;
            } else {
                l = r;
            }
            // 更新lp
            lp = rp;
            // 重置r、rp、times
            r = null;
            rp = null;
            times = 0;
            // 更新location位置
            location = head;
        }

        // 将当前节点插入到 r 头部
        if (r) {
            r = new ListNode(head.val, r);
        } else {
            r = new ListNode(head.val, null);
            rp = r;
        }

        // list 指向下一个节点
        head = head.next;
        times++;
    }

    // 处理最后一组需要反转
    if (times === x) {
        lp.next = r;
    }
    // 处理最后一组不需要反转
    else {
        lp.next = location;
    }

    console.log(l);

    return l;
};
```

</br>
</br>
