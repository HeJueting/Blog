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


### JavaScript中的面向对象

> 虽然JavaScript在ES5语法中，是没有类的概念，但是其“构造函数”却与类的作用相似。但在ES6语法中，引入了“类”的概念，让我们更好地以面向对象的思维去编写代码

#### ES5

```javascript
function A(){}
var a = new A();
```

- 构造函数：通过new function这种形式去实例对象时，这个function就变成了构造函数

- 实例：通过new关键字去创建一个“对象”时，这个“对象”便叫作实例


#### ES6

```javascript
class A {}
var a = new A();
```

- 类：ES6语法中，通过class关键字，可以定义类


#### 区别

ES6中class类，其本质也是一个构造函数，只是改变了写法，使其更接近传统的面向对象语言的写法

```javascript
function A(){}
typeof A;    //function

class B{}
typeof B;    //function
```



</br>





### 原型链

> 在JavaScript中，是通过原型链实现了属性和方法的继承

#### prototype原型

```javascript
// ES5写法
function Animal(type){
    this.type = type;
}
Animal.prototype.say = function(){
    console.log("hello world");
}

var tiger = new Animal("tiger");
tiger.say();                     //hello world;
console.log(tiger.type);         //tiger


// ES6写法
class Animal{
    constructor(type){
        this.type = type;
    }
}
Animal.prototype.say = function(){
    console.log("hello world");
}

var tiger = new Animal("tiger");
tiger.say();                     //hello world;
console.log(tiger.type);         //tiger
```

Animal是一个父类，tiger是它的一个实例。当我们在Animal的prototype属性上挂载了一个say()方法后，它的实例tiger便能直接访问。由此可见，通过prototype属性，我们可以实现属性和方法的继承，而prototype属性也被称为**原型**。



#### __proto__属性

```javascript
tiger.__proto__ === Animal.prototype;           //true
```
实例tiger之所以能继承Animal原型上的say()方法，正是因为实例tiger拥有__proto__属性，指向了Animal父类的prototype属性


#### 一切皆对象

在JavaScript中，“一切皆对象”，这句话由何而来？

```javascript
tiger.__proto__ === Animal.prototype;            //true
tiger.__proto__.__proto__ === Object.prototype;  //true

Animal.__proto__ === Function.prototype;         //true
Animal.__proto__.__proto__ === Object.prototype; //true
```

无论是tiger实例，还是Animal父类，他们的__proto__属性最终会指向Object.prototype

</br>

在JavaScript中，目前共有7种数据类型：Number、String、Boolean、object、Symbol、undefined和null。undefined和null比较特殊，这两种类型都只有一个值，undefined表示**没有被赋值的变量**，而用于null表示**尚未创建的对象**。
```javascript
var num = 1;
typeof num;   //number
num.__proto__.__proto__ === Object.prototype;  //true

var boo = true;
typeof boo;   //boolean
boo.__proto__.__proto__ === Object.prototype;  //true

var str = "hello world";
typeof str;   //string
str.__proto__.__proto__ === Object.prototype;  //true

var obj = {};
typeof obj;   //object
obj.__proto__.__proto__ === Object.prototype;  //true

var sym = Symbol("symbol");
typeof sym;   //symbol
sym.__proto__.__proto__ === Object.prototype;  //true
```
由此可见，在JavaScript中除开undefined和null类型以外，其余数据类型都继承于Object的prototype属性。因此，便有了“一切皆对象”的描述。


#### 原型链的顶端

既然一切皆对象，那么Object.prototype是原型链的顶端吗？

```javascript
Object.prototype.__proto__ === null;   //true
```

![image](./img/1.png)

虽然Object.prototype的__proto__属性确实指向了null，但是MDN上也给出了明确的提示，Object.prototype将不再拥有这个属性。因此，Object.prototype是原型链的顶端。

#### 原型链的结构

回到最初的案例，我们再来分析一下：原型链的结构

![image](./img/2.png)

乍一看，有点复杂，其实仔细梳理一下，也就三条原型链

![image](./img/3.png)

为什么原型链是的结构是这样绕来绕去的？

> 通过前面的分析，我们可以发现：**任何对象的__proto__属性都会指向自己的构造函数的prototype属性**。
> 
> Function是所有函数的构造函数；Object作为一个函数，自然而然，它的__proto__属性会指向Function的prototype属性；而Function本身也是一个函数，作为函数的鼻祖，它的__proto__也只能指向自己的prototype属性


</br>



### 面象对象编程

> 接下来，我将列举一个案例，尝试着用ES5语法以及ES6语法进行面象对象编程。
>
> 假期来临，学校所有学生都布置了假期作业。除此之外，每个同学都必须完成一个社会实践：兼职实习、志愿者服务.....作为班干部的同学，必须完成网课《管理学之美》。小明假期选择了兼职实习，而班干部小红假期选择了志愿者服务。

#### ES5

```javascript
// 学生类
function Student(name){
    this.name = name;
    this.homework = "假期作业";
    this.socialPractice = function(){};
}
// 班干部类
function Cadre(name){
    this.course = "管理学之美";
}
Cadre.prototype = new Student();
// 学生小明
var ming = new Student("小明");
ming.socialPractice = function(){
    console.log("兼职实习");
}
// 学生小红
var hong = new Cadre("小红");
hong.socialPractice = function(){
    console.log("志愿者服务");
}
```

#### ES6

```javascript
// 学生类
class Student{
    constructor(name){
        this.name = name;
    }
    this.homework = "假期作业";
    this.socialPractice = function(){};
}
// 班干部类
class Cadre extends Student{
    this.course = "管理学之美";
}
Cadre.prototype = new Student();
// 学生小明
var ming = new Student();
ming.socialPractice = function(){
    console.log("我的社会实践是：兼职实习");
}
// 学生小红
var hong = new Cadre();
hong.socialPractice = function(){
    console.log("我的社会实践是：志愿者服务");
}
```


</br>
</br>

### 博客原文：[hejueting.cn](www.hejueting.cn)


</br>








