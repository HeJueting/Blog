# JavaScript 模拟字典

与集合类似，字典也是一种存储 **唯一值** 的数据结构，但它是以 **键值对** 的形式来存储

</br>

### 模拟字典

javascript 用 Map 构造函数来模拟字典，自带去重功能

```javascript
let map = new Map();
// 增
map.set("a", 1); // {"a" => 1}
map.set("b", 2); // {"a" => 1, "b" => 2}
// 删
map.delete("a"); // {"b" => 2}
// 改
map.set("b", "b"); // {"b" => "b"}
// 查
map.get("a"); // undefined
map.get("b"); // b
```

</br>
</br>

### 遍历字典

```javascript
const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", { msg: "hello" }],
]);

for (item of map) {
    console.log(item); // ["a", 1], ["b", 2], ["c", { msg: 'hello' }]
}
for (item of map.keys()) {
    console.log(item); // a, b, c
}
for (item of map.values()) {
    console.log(item); // 1, 2, { msg: 'hello' }
}
```

</br>
</br>
