# useRef

> 用来访问React的dom元素

<br></br>


### 知识点

- 如何获取dom元素

```javascript
function InputWithRef() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };
    return (
        <>
          <input ref={inputEl} type="text" />
          <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}
```

- 如何在ref挂载dom之后，根据dom元素的内容进行初始化逻辑

```javascript
function App() {
    const [height, setHeight] = useState(0);
    const ref = useRef(null);
    // 模拟componentDidMounted生命周期
    useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, []);
    return (
        <>
            <h1 ref={ref}>Hello, world</h1>
            <h2>The above header is {Math.round(height)}px tall</h2>
        </>
    );
}
```


<br></br>
<br></br>
<br></br>



# useImperativeHandle

- 可以让你在使用 ref 时自定义暴露给父组件的实例值，应该与React.forwardRef一起使用

- React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到另一个组件中

<br></br>


### 父组件访问子组件的整个dom元素

```javascript
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">{props.children}</button>
));

// 使用FancyButton组件，并访问它的dom节点（可以访问到dom节点上的所有属性）
function App() {
    const ref = React.createRef();
    useEffect(() => {
        console.log(ref);
    }, []);
    return <FancyButton ref={ref}>Click me!</FancyButton>;
}
```

<br></br>

### 父组件访问子组件dom元素上自定义属性

```javascript
const FancyButton = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    // 自定义暴露给父组件的实例值
    useImperativeHandle(ref, () => ({
        focus: () => {
          inputRef.current.focus();
        }
    }))
    return <button ref={ref} className="FancyButton">{props.children}</button>
});

// 使用FancyButton组件，并访问它的dom节点（dom节点上只有一个foucs方法）
function App() {
    const ref = React.createRef();
    useEffect(() => {
        console.log(ref);
    }, []);
    return <FancyButton ref={ref}>Click me!</FancyButton>;
}
```

<br></br>
<br></br>

**注意：** 以上内容基于React 17.0.1版本学习记录
