# useState

将 class 语法中 this.state 和 this.setState 的功能集成于一体的一个 hook

</br>

### 知识点

-   useState 的参数也可以是一个函数，这个函数的返回值便作为 state 的初始值。如果 initialState 需要计算得到，就可以传入一个函数，避免多次计算

```javascript
// 可以传入一个初始变量作为state的值
const [state, setState] = useState(0);

// 也可以传入一个函数，该函数的返回值便是state的初始值
const [state, setState] = useState(() => {
    let res = 0;
    for (let i = 0; i < 1000; i++) {
        res += i;
    }
    return res;
});
```

</br>

-   React 的 setState 方法也是基于 [Object.is](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 方法来比较 state，如果 setState 返回的值与 state 相同，则不会重新渲染

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

</br>

-   setState 的参数可以是一个函数，该函数会以 prevState 作为参数，newState 作为函数返回值（感觉一般不会用到）

```javascript
setState((prevState) => {
    return newState;
});
```

</br>
</br>
