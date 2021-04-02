# JavaScript 模拟集合

-   一种**无序且唯一**的数据结构

</br>

### 模拟集合

-   javascript 用 Set 构造函数来模拟集合，自带数组去重功能

```javascript
let set = new Set();
const obj = { a: 1 };
set.add(1); // {1}
set.add(2); // {1, 2}
set.add(2); // {1, 2}
set.add("hello"); // {1, 2, 'hello'}
set.add(obj); // {1, 2, 'hello', { a: 1 }}

set.delete(1); // {2, 'hello', { a: 1 }}
set.has(1); // false
set.has(obj); // true
```

</br>
</br>

### 遍历集合

```javascript
const set = new Set([1, 2, "hello", { a: 1 }]);

for (item of set) {
    console.log(item); // 1, 2, hello, {a: 1}
}

for (item of set.keys()) {
    console.log(item); // 1, 2, hello, {a: 1}
}

for (item of set.entries()) {
    console.log(item); // [1, 1], [2, 2], ['hello', 'hello'], [{a: 1}, {a: 1}]
}
```

</br>
</br>

### Set 与 Array 相互转换

```javascript
const arr = [1, 2, 3];

// Array转Set
const set = new Set(arr);

// Set转Array
const arr1 = [...set];
const arr2 = Array.from(set);
```

</br>
</br>

### 求两个集合的交集

```javascript
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 4, 5, 6];
// 数组求解
const repeatByArr = arr1.filter((item) => arr2.indexOf(item) !== -1);
// Set求解
const set2 = new Set(arr2);
const repeatBySet = arr1.filter((item) => set2.has(item));
```

</br>
</br>
