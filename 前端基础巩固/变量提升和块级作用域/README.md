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

#### 编译阶段

经过编译后的 JavaScript 会生成两部分内容：

1. 创建一个执行上下文，并**将函数和变量的声明保存在当前执行上下文的变量环境中**

2. 生成可执行的代码

</br>

#### 代码执行阶段

执行代码时，JavaScript 引擎会从当前执行上下文中的变量环境中去查找自定义的变量和函数

</br>
</br>

### 何时会创建执行上下文

1. 运行全局代码的时候，在编译阶段会创建**全局执行上下文**

2. 运行一个函数的时候，在编译阶段会创建**该函数的执行上下文**，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁

3. 使用 eval 函数的时候，在编译阶段，eval 的代码也会创建执行上下文。

</br>
</br>

### 作用域和块级作用域

作用域是指**在程序中定义变量的区域，该位置决定了变量的生命周期**。在 ES6 之前，只存在**全局作用域**和**函数作用域**，之后 ES6 推出了**块级作用域**，一对花括号就能形成一个块级作用域

</br>
</br>

### 为什么 ES6 会推出块级作用域

因为 JavaScript 变量提升这种特性，从而导致了很多与直觉不符的代码，这也是 JavaScript 的一个重要设计缺陷

</br>

#### 案例分析

例如下面这段代码：

```javascript
var name = "hejueting";
function showName() {
    console.log(name); // undefined
    if (false) {
        var name = "kobe";
    }
    console.log(name); // undefined
}
showName();
```

1. 创建全局执行上下文，由于变量提升，name 变量和 showName 函数保存在该执行上下文的变量环境中

2. 执行代码，执行 shouName 函数，创建函数执行上下文，由于变量提升，name 变量保存在了该函数执行上下文中

3. 执行代码，打印第一个 name，从函数执行上下文中访问 name 变量，发现为 undefined

4. 跳过 if 语句，打印第二个 name，从函数执行上下文中访问 name 变量，发现也为 undefined

</br>

#### 问题

即使 if 语句不会执行，if 语句中定义的变量也会变量提升，导致函数没法访问全局环境中的 name 变量。因此 ES6 **引入了 let 和 const 关键字，从而使 JavaScript 也能像其他语言一样拥有了块级作用域**

</br>
</br>

### JavaScript 如何同时支持变量提升和块级作用域

1. 创建执行上下文后，通过 var 声明的变量和声明的函数，在编译阶段全都被存放到**变量环境**里面了

2. 而通过 let/const 声明的变量，在编译阶段则会被存放到**词法环境**中

3. JavaScript 通过**栈结构**去进行管理**执行上下文和词法环境**

</br>

#### 案例分析

```javascript
var name = "hejueting";
{
    const name = "hejueting";
}
function showName() {
    console.log(name);
}
showName();
```

</br>
</br>

</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>

### 注意

在编译阶段：

1. var 定义的变量：创建、初始化，并保存在变量环境

2. 声明的函数：创建、初始化、函数赋值，并会保存在变量环境

3. let/const 定义的变量：仅创建，并保存在词法环境，因此提前访问会被报错

</br>
</br>

### 案例分析

```javascript
showName();
function showName() {
    console.log(1);
}
var showName = function () {
    console.log(2);
};
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
</br>

### 暂时性死区错误

指虽然通过 let 声明的变量已经在词法环境中了，但是在没有赋值之前，访问该变量 JavaScript 引擎就会抛出该错误

```javascript
let myname = "极客时间";
{
    console.log(myname); // 报错：Identifier 'myname' has already been declared
    let myname = "极客邦";
}
```

1. var 的创建和初始化被提升，赋值不会被提升

2. function 的创建、初始化和赋值均会被提升

3. let 的创建被提升，初始化和赋值不会被提升

</br>
</br>
