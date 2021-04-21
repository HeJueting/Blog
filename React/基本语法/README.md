# React 基本语法

</br>

### JSX 语法

大括号中放入变量和表达式

```javascript
// 插入变量
<div>{ name }</div>
// class
<div className="box"></div>
<div className={ class }></div>
// style
<div style="font-size: 16px;"></div>
<div style={{ color: 'red' }}></div>
```

</br>
</br>

### 插入 html

```javascript
<div dangerouslySetInnerHTML={{ __html: "<p>First &middot; Second</p>" }} />
```

</br>
</br>

### 列表渲染

```javascript
render() {
    return <ul>
        {list.map(item => <p key={item}>item</p>)}
    </ul>
}
```

</br>
</br>

### 事件

-   React 中的 event 不是原生 event 对象，是 React 合成的 event 对象，通过 event.nativeEvent 可以访问原生的 event 对象（vue 是原生的 event 对象）

-   React 是将事件统一挂载在 document 上的（vue 是挂载到具体 dom）

```javascript
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.btnOneClick = this.btnOneClick.bind(this);
    }
    // 必须要绑定this
    btnOneClick(e) {
        console.log(e);
        console.log("Click Button One");
    }
    // 不用绑定bind
    btnTwoClick = (e, str) => {
        console.log(e, str);
        console.log("Click Button Two");
    };
    render() {
        return (
            <div>
                <button onClick={this.btnOneClick}>Button One</button>
                <button
                    onClick={(e) => {
                        this.btnTwoClick(e, "btn two");
                    }}
                >
                    Button Two
                </button>
            </div>
        );
    }
}
```

</br>
</br>

### 受控组件与非受控组件

-   **受控组件：** 通过变量/绑定事件自己控制组件的值

-   **非受控组件：** 利用 ref 获取 dom 元素的值

</br>
</br>

### props

变量和函数，父组件都通过 props 进行传递（区别 vue 的 props 和$emit）

</br>
</br>

### setState

-   不可变值，只能通过 setState 去修改

-   可能是异步更新，setTimeout / dom 事件 中是同步的

-   可能会被合并，传入对象会被合并，传入函数不会被合并

</br>
</br>

### 组件的生命周期

-   挂载阶段

    1. constructor
    2. getDerivedStateFromProps(nextProps, prevState)：返回一个对象来更新 state，如果返回 null 则不更新任何内容
    3. render
    4. componentDidMount

-   更新阶段

    1. getDerivedStateFromProps(nextProps, prevState)：返回一个对象来更新 state，如果返回 null 则不更新任何内容
    2. shouldComponentUpdate：返回 false 可以阻止更新
    3. render
    4. getSnapshotBeforeUpdate(prevProps, prevState)：返回值作为 componentDidUpdate 的第三个参数
    5. componentDidupdate

-   销毁阶段

    1. componentWillUnmount

</br>
</br>

### Protals

将一个组件渲染到父组件以外

```javascript
ReactDOM.createPortal(child, container);
```

</br>
</br>

### context

全局通信

```javascript
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext("light");
class App extends React.Component {
    render() {
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
        // 无论多深，任何组件都能读取这个值。
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
    console.log(this.context);
    return <div>Toolbar</div>;
}
```

</br>
</br>

### 异步加载组件

```javascript
import React from "react";
const AsyncComponent = React.lazy(() => import("./asyncComponent"));
function App() {
    return (
        <div>
            <React.Suspense fallback={<div>Loading...</div>}>
                <AsyncComponent />
            </React.Suspense>
        </div>
    );
}
```
