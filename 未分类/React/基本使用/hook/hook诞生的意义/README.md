# hook 诞生的意义

</br>

### 代码更精简，更容易理解

> 例如：实现监听鼠标在网页中移动的位置

-   **使用 class 语法实现**

```javascript
class Mouse extends React.Component {
    constructor() {
        super();
        this.mouseMove = this.mouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }
    componentDidMount() {
        document.addEventListener("mousemove", this.mouseMove);
    }
    componentWillUnmount() {
        document.removeEventListener("mousemove", this.mouseMove);
    }
    mouseMove(e) {
        this.setState({
            x: e.clientX,
            y: e.clientY,
        });
    }
    render() {
        const { x, y } = this.state;
        return (
            <p>
                鼠标位置x: {x}, y: {y}
            </p>
        );
    }
}
```

-   **使用 hook 实现**

```javascript
function Mouse() {
    const [location, setLocation] = useState({ x: 0, y: 0 });
    const mouseMove = (e) => {
        setLocation({
            x: e.clientX,
            y: e.clientY,
        });
    };
    useEffect(() => {
        document.addEventListener("mousemove", mouseMove);
        return () => {
            document.removeEventListener("mousemove", mouseMove);
        };
    }, []);
    return (
        <p>
            鼠标位置x: {location.x}, y: {location.y}
        </p>
    );
}
```

实现同样的需求，在 class 语法中:

-   需要把 mouseMove 方法需要绑定 this 对象上调用
-   需要在不同的生命周期中对鼠标移动事件进行监听、卸载
-   编码量较多

但是 hook 语法中:

-   不需要 this 对象，直接以函数形式调用 mouseMove 方法
-   仅在 useEffect 中就可以实现对鼠标移动事件进行监听、卸载
-   编码量较少

</br>
</br>

### 更好的复用状态逻辑

> 如果需要把监听鼠标移动这个逻辑抽离出来，class 语法常用的两种方式: [render props](https://zh-hans.reactjs.org/docs/render-props.html)、[HOC 高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)

-   **class 语法，使用 render props 来抽离**

```javascript
// Mouse组件
class Mouse extends React.Component {
    constructor() {
        super();
        this.mouseMove = this.mouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }
    componentDidMount() {
        document.addEventListener("mousemove", this.mouseMove);
    }
    componentWillUnmount() {
        document.removeEventListener("mousemove", this.mouseMove);
    }
    mouseMove(e) {
        this.setState({
            x: e.clientX,
            y: e.clientY,
        });
    }
    render() {
        return <>{this.props.render(this.state)}</>;
    }
}

// Component组件
class Component extends React.Component {
    render() {
        const { location } = this.props;
        return (
            <p>
                我是组件，我想知道鼠标的位置: x({location.x})、y({location.y})
            </p>
        );
    }
}

// App组件
class App extends React.Component {
    render() {
        return <Mouse render={(state) => <Component location={state} />} />;
    }
}
```

-   **class 语法，使用 HOC 高阶组件来抽离**

```javascript
// MouseWithHOC方法
function MouseWithHOC(Components) {
    return class extends React.Component {
        constructor() {
            super();
            this.mouseMove = this.mouseMove.bind(this);
            this.state = { x: 0, y: 0 };
        }
        componentDidMount() {
            document.addEventListener("mousemove", this.mouseMove);
        }
        componentWillUnmount() {
            document.removeEventListener("mousemove", this.mouseMove);
        }
        mouseMove(e) {
            this.setState({
                x: e.clientX,
                y: e.clientY,
            });
        }
        render() {
            return <Components {...this.props} location={this.state} />;
        }
    };
}

// Component组件
class Component extends React.Component {
    render() {
        const { location } = this.props;
        return (
            <p>
                我是组件，我想知道鼠标的位置: x({location.x})、y({location.y})
            </p>
        );
    }
}

// App组件
class App extends React.Component {
    render() {
        const MouseWithComponent = MouseWithHOC(Component);
        return <MouseWithComponent />;
    }
}
```

-   **hook 语法来抽离**

```javascript
// 自定义useHook
function useMouse() {
    const [location, setLocation] = useState({ x: 0, y: 0 });
    const mouseMove = (e) => {
        setLocation({
            x: e.clientX,
            y: e.clientY,
        });
    };
    useEffect(() => {
        document.addEventListener("mousemove", mouseMove);
        return () => {
            document.removeEventListener("mousemove", mouseMove);
        };
    }, []);
    return location;
}

// Component组件直接复用useMouse的逻辑
function Component() {
    const location = useMouse();
    return (
        <p>
            我是组件，我想知道鼠标的位置: x({location.x})、y({location.y})
        </p>
    );
}
```

抽离同样的逻辑，使用 class 的 render props 和 HOC 方式，明显代码更加臃肿且不易理解

</br>
</br>

**注意：** 以上内容基于 React 17.0.1 版本学习记录
