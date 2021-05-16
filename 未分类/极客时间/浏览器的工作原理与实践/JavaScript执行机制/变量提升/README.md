# 变量提升：JavaScript 代码是按顺序执行的吗？

</br>

### 概念

所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined

</br>
</br>

### 编译阶段

经过编译后，会生成两部分内容：

1. 执行上下文：指 JavaScript 执行一段代码时的运行环境，在执行上下文中存在一个变量环境的对象，该对象中保存了变量提升的内容，变量的默认值会被设置为 undefined

2. 可执行代码

</br>
</br>

### 代码执行阶段

在代码执行阶段，JavaScript 引擎会从变量环境中去查找自定义的变量和函数

</br>
</br>

### 何时会创建执行上下文

1. 当 JavaScript 执行全局代码的时候，会编译全局代码并创建全局执行上下文，而且在整个页面的生存周期内，全局执行上下文只有一份

2. 当调用一个函数的时候，函数体内的代码会被编译，并创建函数执行上下文，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁

3. 当使用 eval 函数的时候，eval 的代码也会被编译，并创建执行上下文。

</br>
</br>

### 案例

```javascript
showName();
var showName = function () {
	console.log(2);
};
function showName() {
	console.log(1);
}
showName();

// 结果
// 1
// 2
```

**编译阶段**

1. var showName = undefined

2. function showName 替换 showName

**代码执行阶段**

1. showName() 输出 1

2. 重新定义 showName 函数 = function () { console.log(2) };

3. 再次执行 showName() 函数，输出 2

</br>
</br>
