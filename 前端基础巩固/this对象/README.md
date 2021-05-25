# this 对象

</br>
</br>

### 前言

在 JavaScript 中，this 对象是很容易被忽略的一个基础知识点，想要彻底弄懂它，也并非易事

</br>
</br>

### 描述

它代表**函数运行时**，自动生成的一个内部对象，永远指向**最后调用他的对象**

</br>
</br>

### 案例（一）

```javascript
var name = "HeJueTing";
function showName() {
	var name = "Kobe";
	console.log(this.name);
}

showName(); // HeJueTing
window.showName(); // HeJueTing
console.log(window === this); // true
```

在函数 showName 运行的时候，处于全局环境中。根据描述：**this**永远指向**最后调用他的对象**，最后调用 showName()方法的是**window 对象**，因此打印的结果是 HeJueTing 而不是 Kobe

</br>
</br>

### 案例（二）

```javascript
var name = "HeJueTing";
var person = {
	name: "Kobe",
	showName: function () {
		console.log(this.name);
	},
};

person.showName(); // Kobe
window.person.showName(); // Kobe

var newShowName = person.showName;
newShowName(); // HeJueTing
window.newShowName(); // HeJueTing
```

● person.showName()和 window.person.showName()最后调用 showName 方法的都是 person 这个对象，因此它们的打印结果是 Kobe

● newShowName 方法被赋值调用后，最后调用 newShowName 方法的是 window 对象，因此他的打印结果是 HeJueTing

</br>
</br>

### 案例三

```javascript
var name = "HeJueTing";
function showName() {
	console.log(this.name);
}
var person = {
	name: "Kobe",
	say: function () {
		showName();
	},
};

person.say(); // HeJueTing
```

● 虽然最后调用 say()方法的是 person 对象，在执行 say()方法时 this 对象将指向 person 对象，但是：**console 打印的逻辑是在 showName()方法中，执行 showName()方法时，调用它的对象是 window 对象，并不是 person 对象**，因此打印结果是"HeJueTing"

</br>
</br>

### 箭头函数

箭头函数是 ES6 中规范的语法，它的 this 对象比较特殊，**它没有自己的 this 对象**，箭头函数中的 this 对象**继承于最近一层作用域的 this 对象**

```javascript
var name = "HeJueTing";
var person = {
	name: "Kobe",
	say: () => {
		console.log(this.name);
	},
};

person.say(); // HeJueTing
```

虽然最后调用 say()方法的是 person 对象，但 say()方法是一个箭头函数，它并没有 this 对象，而是继承于最近一层作用域的 this 对象；在整段代码中，离 say()方法最近的便是全局作用域，因此输出结果是 HeJueTing

注：如对作用域有不了解的地方，请移步 **《作用域》**

</br>
</br>

### call() 和 apply()

调用函数时，使用 call 和 apply 方法，能**改变当前运行环境的 this 指向**。这两个方法作用相似，但是他们的参数形式有所不同

#### call

-   **语法：** function.call(thisArg, arg1, arg2, ...)
-   **thisArg：** 函数运行时使用的 this 值

-   **arg1, arg2：** 该函数指定的参数列表

-   **返回值：** 调用有指定 this 值和参数的函数的**结果**

#### apply

-   **语法：** func.apply(thisArg, [argsArray])
-   **thisArg：** 函数运行时使用的 this 值

-   **argsArray：** 以数组的方式传入该函数指定的参数列表

-   **返回值：** 调用有指定 this 值和参数的函数的**结果**

```javascript
var name = "HeJueTing";
var person1 = {
	name: "Kobe",
	say: function (age) {
		console.log(`name：${this.name}，age：${age}`);
	},
};
var person2 = {
	name: "Jordan",
	say: function (age) {
		console.log(`name：${this.name}，age：${age}`);
	},
};

person1.say(24); // name：Kobe，age：24
person1.say.call(person2, 24); // name：Jordan，age：24
person1.say.apply(person2, [24]); // name：Jordan，age：24

person2.say(24); // name：Jordan，age：24
person2.say.call(person1, 24); // name：Kobe，age：24
person2.say.apply(person1, [24]); // name：Kobe，age：24

person1.say.call(this, 24); // name：HeJueTing，age：24
person1.say.apply(this, [24]); // name：HeJueTing，age：24

person2.say.call(this, 24); // name：HeJueTing，age：24
person2.say.apply(this, [24]); // name：HeJueTing，age：24

person1.say.call(); // name：HeJueTing，age：undefined
person1.say.apply(); // name：HeJueTing，age：undefined
```

当使用 call 和 apply 方法调用函数时，this 对象将**优先指向 call 方法中的第一个参数，如果没有传递第一个参数，this 的值将会被绑定为全局对象**

</br>
</br>

### bind()

bind 方法与 call 和 apply 方法有所不同，使用 bind 方法**能创建一个新的函数**，当这个新函数被调用时，这个**新函数的 this 值被指定为 bind()的第一个参数**，而其余参数将作为新函数的参数，供调用时使用

-   **语法：** function.call(thisArg, arg1, arg2, ...)
-   **thisArg：** 被创建函数运行时的 this 值，**无论何时何地调用，都会指向 thisArg**

-   **arg1, arg2：** 被创建函数指定的参数列表

-   **返回值：** 返回一个**原函数的拷贝**，并拥有指定的 this 值和初始参数

```javascript
var name = "HeJueTing";
var person = {
	name: "Kobe",
	say: function (age) {
		console.log(`name：${this.name}，age：${age}`);
	},
};

var sayName1 = person.say;
var sayName2 = person.say.bind(person);
var sayName3 = person.say.bind();

sayName1(24); // name：HeJueTing，age：24
sayName2(24); // name：Kobe，age：24
sayName3(24); // name：HeJueTing，age：24
```

● 虽然调用 sayName1 和 sayName2 方法的都是默认 window 对象，但是 sayName2 是由 bind 函数所创建，且函数运行时的 this 值已绑定成为了 person 对象，因此 sayName2 的结果是 Kobe

● 与 call、apply 方法类似，**如果没有传入绑定的 this 值，this 值将会被绑定为全局对象**

</br>
</br>

### 严格模式

在严格模式中，如果函数**不是作为对象的属性或方法调用**，那么 this 将会默认为 undefined。

```javascript
"use strict";

function say() {
	console.log(this);
}

say(); // undefined
window.say(); // window

say.call(); // undefined
say.apply(); // undefined

var sayBind = say.bind();
sayBind(); // undefined
```

● 在严格模式下，如果 call、apply 方法没有传入第一个参数，this 也将不会指向 window 对象，而默认为 undefined

● bind 方法没有指定 this 值，所创建出来的方法运行时，this 值也将一直为 undefined

</br>
</br>

### 总结

● 通常情况下，**在函数运行时**，this 值永远指向**最后调用他的对象**

● 箭头函数的 this 值**继承于最近一层作用域的 this 对象**

● call、apply 可**调用时**改变函数的 this 值，返回值是该函数调用后的**结果**

● bind 可**永久性**改变函数执行时的 this 值，返回值是一个**新函数**

</br>
</br>
