### 题目描述

```javascript
// Test.__proto__ === Function.prototype
function Test() {}
Test.prototype.n = 1;
// a.__proto__ === Test.prototype
var a = new Test();
Test.prototype = {
    n: 2,
    m: 3,
};
// b.__proto__ === Test.prototype
var b = new Test();

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
var c = new Test();
c.printName(); // Object
```
