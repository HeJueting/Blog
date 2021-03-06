# 多态（三）

</br>
</br>

### 前言

> 《大话设计模式》开篇用简单的计算机案例介绍了面向对象编程，开启设计模式学习之旅的前奏，便是先学会用面向对象思维编程

</br>
</br>

### 传统的面向对象

#### 三大特性

- 封装： 将不同职责的代码进行拆分，降低代码耦合度

- 继承： 不同实例拥有相同的属性和方法都挂载在这个类上（抽离公共的代码）

- 多态： 不同实例的相同方法在不同情形有不同表现形式

#### 两个概念

- 类： 创建对象的模板

- 实例： 使用类创建出来的对象

</br>

### JavaScript 中的面向对象

> 虽然 JavaScript 在 ES5 语法中，是没有类的概念，但是其“构造函数”却与类的作用相似。但在 ES6 语法中，引入了“类”的概念，让我们更好地以面向对象的思维去编写代码

#### ES5

```javascript
function A() {}
var a = new A();
```

- 构造函数：通过 new function 这种形式去实例对象时，这个 function 就变成了构造函数

- 实例：通过 new 关键字去创建一个“对象”时，这个“对象”便叫作实例

#### ES6

```javascript
class A {}
var a = new A();
```

- 类：ES6 语法中，通过 class 关键字，可以定义类

#### 区别

ES6 中 class 类，其本质也是一个构造函数，只是改变了写法，使其更接近传统的面向对象语言的写法

```javascript
function A() {}
typeof A; //function

class B {}
typeof B; //function
```

</br>
