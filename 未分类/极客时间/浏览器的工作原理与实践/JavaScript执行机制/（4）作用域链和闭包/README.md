# 作用域链和闭包：代码中出现相同的变量，JavaScript 引擎是如何选择的？

</br>

### 词法作用域

词法作用域就是指**作用域是由代码中函数声明的位置来决定的**，所以词法作用域是静态的作用域，**通过它就能够预测代码在执行过程中如何查找标识符**

```javascript
// 词法作用域为：
// a函数作用域 - 全局作用域
// b函数作用域 - 全局作用域
function a() {}
function b() {}

// 词法作用域为：
// c函数作用域 - b函数作用域 - a函数作用域 - 全局作用域
function a() {
    function b() {
        function c() {}
    }
}
```

</br>
</br>

### 作用域链

在每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，我们把这个**外部引用称为 outer**，outer 的指向规则由**词法作用域**决定，当访问一个变量时：

1. 先访问当前执行上下文中，变量环境和词法环境中是否存在该变量

2. 如果不存在，继续根据 outer 的指向继续访问上一个执行上下文中的变量

通过 outer 的不断指向，就会生成一个链条，**该链条就是作用域链**

```javascript
function bar() {
    console.log(myName);
}
function foo() {
    var myName = "极客邦";
    bar();
}
var myName = "极客时间";
foo(); // 极客时间
```

1. 词法作用域：
    - bar 函数作用域 - 全局作用域
    - foo 函数作用域 - 全局作用域
2. 执行到 bar 函数时，在作用域链条上访问 myName 变量
3. bar 执行上下文中没有 myName，全局环境中存在，输出：极客时间

</br>
</br>

### 闭包

在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包

```javascript
function foo() {
    var myName = "极客时间";
    let test = 1;
    var innerBar = {
        getName: function () {
            console.log(test);
            return myName;
        },
        setName: function (newName) {
            myName = newName;
        },
    };
    return innerBar;
}
var bar = foo();
bar.setName("极客邦");
bar.getName(); // 1  极客帮
```

1. 词法作用域：setName/getName —— foo —— 全局作用域

2. 虽然 foo 函数执行完之后，会回收该函数中所定义的变量 myName 和 test，但是根据作用域链规则 getName 和 setName 是可以访问 myName 和 test 变量的

3. 因此 foo 函数执行完之后，通过 bar 继续访问 foo 函数中 myName 和 test 变量就会产生闭包

</br>
</br>

### 思考题

```javascript
var bar = {
    myName: "time.geekbang.com",
    printName: function () {
        console.log(myName);
    },
};
function foo() {
    let myName = "极客时间";
    return bar.printName;
}
let myName = "极客邦";
let printName = foo();
printName(); // 极客邦
bar.printName(); // 极客邦
```

1. 根据词法作用域

    - foo 函数作用域 —— 全局函数作用域
    - function () { console.log(myName) } 函数作用域 —— 全局函数作用域

2. 执行 printName 函数时，function () { console.log(myName) } 函数作用域中不存在 myName 变量，直接返回全局作用域中的 myName 变量

3. 同理 bar.printName()函数时，function () { console.log(myName) } 函数作用域中不存在 myName 变量，直接返回全局作用域中的 myName 变量

</br>
</br>

### 总结

1. 作用域链是由词法作用域决定的

2. 而词法作用域是由代码结构来确定的

</br>
</br>
