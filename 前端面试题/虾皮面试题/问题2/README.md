### 题目描述

```javascript
// Test.__proto__ === Function.prototype
function Test() {}
Test.prototype.n = 1;
// a.__proto__ === Test.prototype === Function.prototype
var a = new Test();
// Test.prototyp 被修改为一个普通对象
// Test.prototype.__proto__ === Object.prototype
Test.prototype = {
    n: 2,
    m: 3,
};
// b.__proto__ === Test.prototype.__proto__ === Object.prototype
var b = new Test();

// Test.prototype 原型被修改后，对象 a 依然是修改前的原型链
console.log(a.n); // 1
console.log(a.m); // undefined
console.log(b.n); // 2
console.log(b.m); // 3

Function.prototype.printName = function () {
    console.log("Function");
};
Object.prototype.printName = function () {
    console.log("Object");
};
Test.printName(); // Function

// Test.prototype 原型被修改后，指向了 Object.prototype
var c = new Test();
c.printName(); // Object
```

