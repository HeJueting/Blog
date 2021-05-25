# 走进 JavaScript 对象

</br>

### 哪些可作为对象的属性？

```javascript
const obj = {};

// string
obj["str"] = "str";
obj.str; //=> "str"
obj["str"]; //=> "str"

// number
obj[0] = 0;
obj.0;  //=> 语法报错
obj[0]; //=> 0
obj['0']; //=> 0

// boolean
obj[true] = true;
obj.true);  //=> true
obj[true]; //=> true
obj['true']; //=> true

// null
obj[null] = null;
obj.null;  //=> null
obj[null]; //=> null
obj['null']; //=> null

// undefined
obj[undefined] = undefined;
obj.undefined;  //=> undefined
obj[undefined]; //=> undefined
obj['undefined']; //=> undefined

// object
const o = {};
obj[o] = 1;
obj; // { [object Object]: 1 }
obj[{}] = 2;
obj; // { [object Object]: 2 }
obj['[object Object]']; // 2

// symbol
const sym1 = Symbol('sym');
const sym2 = Symbol('sym');
obj[sym1] = 'sym1';
obj[sym2] = 'sym2';
obj; // { Symbol(sym): "sym1", Symbol(sym): "sym2" }
obj[sym1]; // "sym1"
obj[sym2]; // "sym2"
obj['Symbol(sym)']; // 语法报错
```

**总结：** 简单理解，任意数据类型（symbol 除外）当作为对象属性时，会自动事先转化为字符串

</br>
</br>

### 属性的所有权

如果属性直接属于某个对象，这个属性就具有所有权；通过原型链继承的属性不具有所有权

```javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype.live = "earth";

const tiger = new Animal("tiger");

tiger; // { name: "tiger" }
tiger.name; // tiger
tiger.live; // earth
```

tiger 对象上的 name 属性就具有所有权，而 live 属性是从 Animal 原型链上所继承的，不具有 live 属性的所有权

</br>
</br>

### 属性的可枚举性

可枚举属性是指那些内部标志设置为 true 的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 true。我们也可以**通过 Object.defineProperty 去定义不可枚举的属性**

```javascript
const obj = {};
obj.name = "hejueting";
Object.defineProperty(obj, "age", {
    value: 24,
    enumerable: false,
});
Object.defineProperty(obj, "location", {
    value: "CQ",
    enumerable: true,
});
```

obj 对象上的 name 属性和 location 属性是可枚举的，而 age 属性是不可枚举的

</br>
</br>

### 案例

```javascript
function Obj() {}
// 可枚举属性
Obj.prototype.a = "a";
// 不可枚举属性
Object.defineProperty(Obj.prototype, "b", {
    value: "b",
    enumerable: false,
});
// Symbol键
const symC = Symbol("c");
Obj.prototype[symC] = "c";

const obj = new Obj();
// 可枚举属性
obj.d = "d";
// 不可枚举属性
Object.defineProperty(obj, "e", {
    value: "e",
    enumerable: false,
});
// Symbol键
const symF = Symbol("f");
obj[symF] = "f";
```

</br>
</br>

### in 运算符

如果指定的属性在指定的对象或其原型链中，则 in 运算符返回 true

| 自身的可枚举属性 | 自身的不可枚举属性 | 自身的 Symbol 键 | 继承的可枚举属性 | 继承的不可枚举属性 | 继承的 Symbol 键 |
| ---------------- | ------------------ | ---------------- | ---------------- | ------------------ | ---------------- |
| ✔                | ✔                  | ✔                | ✔                | ✔                  | ✔                |

```javascript
"a" in obj; //=> true
"b" in obj; //=> true
symC in obj; //=> true
"d" in obj; //=> true
"e" in obj; //=> true
symF in obj; //=> true
```

</br>
</br>

### hasOwnProperty

判断该属性是否为对象自身属性（具有所有权）

| 自身的可枚举属性 | 自身的不可枚举属性 | 自身的 Symbol 键 | 继承的可枚举属性 | 继承的不可枚举属性 | 继承的 Symbol 键 |
| ---------------- | ------------------ | ---------------- | ---------------- | ------------------ | ---------------- |
| ✔                | ✔                  | ✔                | ✘                | ✘                  | ✘                |

```javascript
obj.hasOwnProperty("a"); //=> false
obj.hasOwnProperty("b"); //=> false
obj.hasOwnProperty(symC); //=> false
obj.hasOwnProperty("d"); //=> true
obj.hasOwnProperty("e"); //=> true
obj.hasOwnProperty(symF); //=> true
```

</br>
</br>

### for...in 和 Object.keys

for...in 和 Object.keys 这是我们常用的两种遍历对象的方法，但是他们是有区别的：

|             | 自身的可枚举属性 | 自身的不可枚举属性 | 自身的 Symbol 键 | 继承的可枚举属性 | 继承的不可枚举属性 | 继承的 Symbol 键 |
| ----------- | ---------------- | ------------------ | ---------------- | ---------------- | ------------------ | ---------------- |
| for...in    | ✔                | ✘                  | ✘                | ✔                | ✘                  | ✘                |
| Object.keys | ✔                | ✘                  | ✘                | ✘                | ✘                  | ✘                |

```javascript
for (let key in obj) {
    console.log(key); //=> d, a
}

Object.keys(obj); //=> ["d"]
```

</br>
</br>

### Reflect.ownKeys

Reflect.ownKeys 方法使用频率不高，它可以遍历自身的所有属性（可枚举/不可枚举/Symbol 键）

| 自身的可枚举属性 | 自身的不可枚举属性 | 自身的 Symbol 键 | 继承的可枚举属性 | 继承的不可枚举属性 | 继承的 Symbol 键 |
| ---------------- | ------------------ | ---------------- | ---------------- | ------------------ | ---------------- |
| ✔                | ✔                  | ✔                | ✘                | ✘                  | ✘                |

```javascript
Reflect.ownKeys(obj); //=> ["d", "e", Symbol(f)]
```

</br>
</br>

### Object.getOwnPropertyNames

Object.getOwnPropertyNames，可以遍历自身的可枚举/不可枚举的属性

| 自身的可枚举属性 | 自身的不可枚举属性 | 自身的 Symbol 键 | 继承的可枚举属性 | 继承的不可枚举属性 | 继承的 Symbol 键 |
| ---------------- | ------------------ | ---------------- | ---------------- | ------------------ | ---------------- |
| ✔                | ✔                  | ✘                | ✘                | ✘                  | ✘                |

```javascript
Object.getOwnPropertyNames(obj); //=> ["d", "e"]
```

</br>
</br>
