### 题目描述

```javascript
var a = 3;
var result = [];
var total = 0;

// a作为形参传入，整个函数作用域上都可以访问这个a
function foo(a) {
    var i = 0;
    // for循环执行完毕之后，i的值应该为3
    for (; i < 3; i = i + 1) {
        result[i] = function () {
            // 当foo函数结束后访问i，会形成闭包，这里的i永远都是for循环之后的3
            // 当foo函数结束后访问a，也形成闭包
            total += i * a;
            console.log(total);
        };
    }
}

foo(1);
result[0](); // 3
result[1](); // 6
result[2](); // 9
```

</br>
</br>
