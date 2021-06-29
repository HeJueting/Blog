# JavaScript 模拟链表

1. 多个元素组成的列表

2. 他们存储不连续，用 next 指针连在一起

</br>

### 模拟链表

```javascript
const a = { val: "a" };
const b = { val: "b" };
const c = { val: "c" };
const d = { val: "d" };
a.next = b;
b.next = c;
c.next = d;
```

</br>
</br>

### 遍历链表

```javascript
// 定义一个指针，指向链表的头部
let p = a;
while (p) {
    // 打印链表的节点元素
    console.log(p.val);
    // 让这个指针指向下一个节点
    p = p.next;
}
```

</br>
</br>

### 插入节点

```javascript
const d = { val: "d" };
// 在a,b间插入d节点
a.next = d;
d.next = b;
```
