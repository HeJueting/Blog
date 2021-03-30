# TypeScript学习

<br></br>



### 编程语言的类型

- 动态类型语言: 在代码运行期间，才会对数据类型进行检查，编码时，不用对变量类型进行检查，javascript就是动态语言

- 静态类型语言: 在编译期间，就对数据类型进行检查

<br></br>
<br></br>



### 什么是TypeScript

- 把javascript动态类型风格，扩展成为静态类型风格

<br></br>
<br></br>



### 为什么要使用TypeScript

- 程序更容易理解：例如定义函数输入输出的参数后，更容易理解这个函数的意义

- 开发效率更高：在不同代码块中可快速跳转

- 更少的错误：在编译期间就能够发现大部分错误

- 更好的包容性：完全兼容JavaScript

<br></br>
<br></br>



### javascript数据类型

**原始类型：**
- undefined、Boolean、Number、String、BigInt、Symbol、Null

**其他**
- Object

```typescript
// Boolean类型
const isDone: boolean = false;

// Number类型（二进制、八进制、十进制、十六进制）
const age: number = 25;

// String类型
const msg: string = 'hello';

// undefined和null类型
const u: undefined = undefined;
const n: null = null;
// 注意：这两个类型是所有类型的子类型
const test_u: number = undefined;
const test_n: string = null;
```

<br></br>
<br></br>




### any类型和联合类型

```typescript
// 任意类型
let notSure: any = 1;
notSure = 'test';
notSure = true;

// 联合类型
let numberOrString: number | string = 1;
numberOrString = 'str';
```

<br></br>
<br>



### Array和Tuple（定义array类型）

```typescript
// Array
const arrOfNumbers: number[] = [1,2,3,4];

// Tuple
const arrOfTuple: [string, number] = ['test', 100];
```

<br></br>
<br></br>



### Interface接口（定义object类型、函数...）

**定义object**

```typescript
interface Person {
    name: string;
    age?: number;         // 可选属性
    readonly id: number;  // 只能读的属性
}
const user: Person = {
    name: 'hejueting',
    age: 20,
    id: 111,
}
```


**定义函数**

```typescript
// 定义函数
function add(x: number, y: number = 10, z?: number): number {
    // y和z为都为可选参数，不同写法而已
    return x + y + z;
}
const addFunc: (x: number, y?: number, z?: number) => number = add;

// 使用interface描述函数
interface IPlus {
    (x: number, y: number = 10, z?: number) : number
}
const plusFunc: IPlus = add;
```


**类Class**

```typescript
// 定义一个动物类
class Animal {
    readonly color: string;           // readonly: 只允许读，不允许重新赋值
    static isAnimal(obj) {            // static: 静态方法，与实例无关，直接通过Animal类访问
        return obj instanceof Animal;
    };
    public name: string;              // public: 可以任意访问
    private from: string;             // privat: 只能在Animal类中进行访问，子类中或者实例上都无法访问
    protected isMale: boolean;        // protected: 只能在Animal类和它的子类中进行访问，实例上无法访问
    constructor(name: string, from: string, isMale: boolean, color: string) {
        this.name = name;
        this.from = from;
        this.isMale = isMale;
    }
    run() {
        return `${this.name} is runing`;
    }
}
const tiger = new Animal('tiger', '重庆', true, 'white');  // tiger实例
console.log(tiger.name);    // tiger
tiger.name = 'huhu';
tiger.color = 'black';      // 报错：该属性只能读，不能重写
console.log(tiger.from);    // 报错：无法访问该属性
console.log(tiger.isMale);  // 报错：无法访问该属性

// 定义一个Dog类，继承于动物类，并新增一个bark方法
class Dog extends Animal {
    brak() {
        console.log(this.from);   // 报错：无法访问该属性
        console.log(this.isMale); // true
        return `${this.name} is barking`
    }
}
const dandan = new Dog('dandan', '重庆', true, 'yellow');

// 定义一个Cat类，继承于动物类，重写run方法
class Cat extends Animal {
    run() {
        return `Meow, ${super.run()}`
    }
}
const dudu = new Cat('dudu', '重庆', true, 'gary');
```


**不同类通过interface定义同一个方法**

```typescript
interface Radio {
    switchRadio(): void;   // 不需要返回值就用void
}
interface Battery {
    checkBatteryStatus();
}
class Car implements Radio {
    switchRadio() {}
}
class Phone implements Radio, Battery {
    switchRadio() {}
    checkBatteryStatus() {}
}
```

<br></br>
<br></br>




### 枚举enums（常量，类似于JS的const）

```typescript
enum Direction {
    Up= 'W',
    Dodown = 'S',
    Left = 'A',
    Right = 'D',
}
console.log(Direction.Up);   // W

// 常量可以使用const来优化性能
const enum Color {
    black= '#000',
}

// 变量枚举
// to do list...
```

<br></br>
<br></br>




### generics泛型

> 泛型：即类型变量，在定义阶段不对参数类型进行展示，在使用时才会规定参数的类型

```typescript
// 基本用法
function echo<T>(arg: T): T {
    return  arg;
}
const num = echo(111);
const str = echo('str');

// 约束泛型
// 泛型：方法（必须带有length属性的泛型）
interface IWidthLength {
    length: number;
}
function echoWidthLength<T extends IWidthLength>(arg: T): T {
    const length = arg.length;
    console.log(length);
    return arg;
}
const str = echoWidthLength('str');
const obj = echoWidthLength({ length: 2 });
const arr = echoWidthLength([1, 2, 3]);
const num = echoWidthLength(111);           // 报错：111没有length属性

// 泛型：类
class Queue<T> {
    private data = [];
    push(item: T) {
        return this.data.push(item);
    }
    pop(item: T) {
        return this.data.shift();
    }
}
const queue1 = new Queue<number>();
queue1.push(1);
queue1.push('str'); // 报错，只能push number类型
const queue2 = new Queue<string>();
queue2.push(1);     // 报错，只能push string类型
queue2.push('str');

// 泛型：接口
interface KeyPair<T, U> {
    key: T;
    value: U;
}
const key1: KeyPair<string, number> = { key: 'str', value: 123 };
const key2: KeyPair<number, string> = { key: 'str', value: 123 };  // 报错，key必须为number类型，
const arr1: number[] = [1, 2, 3];           // 定义一个number类型的数组
const arr2: Array<number> = [1, 2, ,3];     // 利用泛型定义一个number类型数组
```





### 类型别名和类型断言

```typescript
// 类型别名：基本使用
type PlusType = (x: number, y: number) => number;
function sum(x: number, y: number): number {
    return x+y;
}
const sum2: PlusType = sum;
// 类型别名：联合类型
type StrResolver = () => string;
type StrOrResolver = string | strResolver;
function getStr(n: StrOrResolver): string {
    if(typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}

// 类型断言（编译阶段不确定的变量类型时，告诉ts它的类型，不用报错）
function getLength(input: string | number): number {
    // 断言：把input当作一个string
    const str  = input as string;
    if(str.length) {
        console.log(str.length);
    } else {
        // 断言：把num当作一个number
        const num = input as number;
        console.log(num);
    }
    // 断言：简写
    if((<string>input).length) {
        console.log(str.length);
    } else {
        console.log((<number>input).toFixed());
    }
}
```

<br></br>
<br></br>





### 声明文件

> 声明第三方库，可使之调用第三方库的API；配合DefinitelyTyped使用














