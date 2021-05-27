# 变量提升和块级作用域

</br>

### 什么是变量提升？

在 JavaScript 代码执行过程中，JavaScript 引擎**把变量的声明部分和函数的声明部分提升到代码开头的行为**

```javascript
console.log(a); // undefined
var a = 1;
```

</br>
</br>

### 变量提升的原因

在运行 JavaScript 代码时，会经历两个阶段：**编译阶段**和**代码执行阶段**

**编译阶段**

经过编译后的 JavaScript 会生成两部分内容：

1. 创建一个执行上下文，并将函数和变量的声明保存在当前执行上下文的变量环境中

2. 生成可执行的代码

</br>

**代码执行阶段**

执行代码时，JavaScript 引擎会从当前执行上下文中的变量环境中去查找自定义的变量和函数

</br>
</br>

### 何时会创建执行上下文

1. 运行全局代码的时候，在编译阶段会创建**全局执行上下文**

2. 运行一个函数的时候，在编译阶段会创建**该函数的执行上下文**，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁

3. 使用 eval 函数的时候，在编译阶段，eval 的代码也会创建执行上下文。

</br>
</br>

### 变量提升案例分析

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

### 注意

在编译阶段：

1. var 定义的变量：创建、初始化，并保存在变量环境

2. 声明的函数：创建、初始化、函数赋值，并会保存在变量环境

3. let/const 定义的变量：仅创建，并保存在词法环境，因此提前访问会被报错
