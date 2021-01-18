# useState

> 将class语法中this.state和this.setState的功能集成于一体的一个hook

<br></br>



### 知识点

- useState的参数也可以是一个函数，这个函数的返回值便作为state的初始值

```javascript
// 可以传入一个初始变量作为state的值
const [state, setState] = useState(0);

// 也可以传入一个函数，该函数的返回值便是state的初始值
const [state, setState] = useState(() => 0);
```

<br></br>



- React的setState方法也是基于 [Object.is](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 方法来比较state，如果setState返回的值与state相同，则不会重新渲染

```javascript
// 原始数据类型比较他们的值是否相同
const [state, setState] = useState(0);
setState(0); // 不会渲染
setState(1); // 会渲染

// object类型，比较他们的地址值是否相同
const initialObj = { value: 1 };
const [state, setState] = useState(initialObj);
initialObj.value = 2;
setState(initialObj); // 不会渲染
```

<br></br>



- setState的参数可以是一个函数，该函数会以prevState作为参数，newState作为函数返回值（感觉一般不会用到）

```javascript
setState(prevState => {
      return newState;
});
```

<br></br>
<br></br>

**注意：** 以上内容基于React 17.0.1版本学习记录
