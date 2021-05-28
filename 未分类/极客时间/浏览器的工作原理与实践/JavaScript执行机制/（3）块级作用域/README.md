# 块级作用域：var 缺陷以及为什么要引入 let 和 const？

</br>
</br>

### 作用域

作用域是指在程序中定义变量的区域，该位置决定了变量的生命周期。通俗地理解，作用域就是变量与函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期。

1. 在 ES6 之前，只存在全局作用域和函数作用域

2. 其他语言则都普遍支持块级作用域，因此 ES6 推出了块级作用域，一对花括号就能形成一个块级作用域

</br>
</br>

### 为什么 ES6 会推出块级作用域？

因为运行 JS 的时候会经历编译阶段，在编译阶段会存在变量提升，正是由于 JavaScript 存在变量提升这种特性，从而导致了很多与直觉不符的代码，这也是 JavaScript 的一个重要设计缺陷

1. 变量容易在不被察觉的情况下被覆盖掉

```javascript
var myname = "极客时间";
function showName() {
	console.log(myname); // undefined
	if (0) {
		var myname = "极客邦";
	}
	console.log(myname); // undefined
}

// 1. 执行该函数时，会创建一个执行上下文，
// 2. 函数中 var 声明的 myname 变量保存在该执行上下文中，并初始化为 undefined
showName();
```

2. 本应销毁的变量没有被销毁

```javascript
function foo() {
	for (var i = 0; i < 7; i++) {}
	// 循环运行结束之后，依然能访问到i，与其他语言表现不一致
	console.log(i);
}
foo();
```

</br>
</br>

### ES6 如何解决变量提升带来的问题

引入了 let 和 const 关键字，从而使 JavaScript 也能像其他语言一样拥有了块级作用域

</br>
</br>

### JavaScript 是如何同时支持变量提升和块级作用域的

1. 创建执行上下文后，通过 var 声明的变量，在编译阶段全都被存放到**变量环境**里面了

2. 而通过 let/const 声明的变量，在编译阶段则会被存放到**词法环境**中

3. 在词法环境中的内部，维护了一个**栈结构**，栈中的每一项代表着当前块级作用域下的维护的所有变量，栈底是最外层作用域的变量，进入一个作用域块后，就会把该作用域块内部的变量压到栈顶；当作用域执行完成之后，该作用域的信息就会从栈顶弹出

</br>
</br>

### 暂时性死区错误

指虽然通过 let 声明的变量已经在词法环境中了，但是在没有赋值之前，访问该变量 JavaScript 引擎就会抛出该错误

```javascript
let myname = "极客时间";
{
	console.log(myname); // 报错：Cannot access 'myname' before initialization
	let myname = "极客邦";
}
```

1. var 的创建和初始化被提升，赋值不会被提升

2. function 的创建、初始化和赋值均会被提升

3. let 的创建被提升，初始化和赋值不会被提升

</br>
</br>
