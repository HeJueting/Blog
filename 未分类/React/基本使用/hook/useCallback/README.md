# useCallback

> 缓存函数，配合 React.memo 避免子组件不必要的渲染

</br>

### 什么是 React.memo

React.memo 功能类似于 React.PureComponent，每当组件中的 props 和 state 发生变化时，React 将检查 上一个 state 和 props 以及下一个 props 和 state 是否相等，如果不相等则函数组件将重新渲染，如果它们相等则函数组件将不会重新渲染

</br>
</br>

### 案例

```javascript
const Child = React.memo((props) => {
    console.log("child render");
    return <div onClick={props.childHandleClick}>子组件</div>;
});

function Parent() {
    const [count, setCount] = useState(0);
    const childHandleClick = () => {
        console.log("to do something");
    };
    console.log("parent render");
    return (
        <div>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                add
            </button>
            <Child childHandleClick={childHandleClick} />
        </div>
    );
}
```

第一次渲染的时候，控制台打印结果:

> parent render
> child render

当点击 add 按钮后，控制台打印结果依然是:

> parent render
> child render

虽然我们使用了 React.memo 进行了优化，但是父组件 count 值的更新还是影响了子组件的重新渲染。这是因为给 Child 传入的 childHandleClick 方法，在父组件重新渲染时，该函数又会进行重新定义，前后两次定义的函数虽然内容相同，但是引用的地址值却不同，就造成了 Child 的重新渲染

</br>
</br>

### 优化

```javascript
const Child = React.memo((props) => {
    console.log("child render");
    return <div onClick={props.childHandleClick}>子组件</div>;
});
function App() {
    const childHandleClick = useCallback(() => {
        console.log("to do something");
    }, []);
    // 省略相同的代码......
}
```

我们只需要将 childHandleClick 使用 useCallback 进行缓存即可，这样搭配 React.memo 使用就可以避免子组件的不必要渲染

</br>
</br>

### 什么时候需要使用 useCallback

既然 useCallback 可以对函数进行缓存，那么以后函数的定义我们是否都可以使用 useCallback 进行缓存？答案肯定是否定的，useCallback 带来函数缓存便利的同事，也会带来额外的开销。

```javascript
const childHandleClick = useCallback(() => {
    console.log("to do something");
}, []);

// 既然useCallback可以缓存函数(也就是它的第一个参数)，以上代码可以等价于
const func = () => {
    console.log("to do something");
};
const childHandleClick = useCallback(func, []);
```

使用 useCallback，除了我们所需要的 func 方法以外，我们还需要一个[]数组来规定什么时候更新函数缓存，这个数组的定义和逻辑执行本身也会带来性能的开销

**什么时候使用 useCallback**

-   子组件的不必要渲染(配合 React.memo 使用)

-   需要大量计算的函数，例如 for 循环 10000 次

</br>
</br>

**注意：** 以上内容基于 React 17.0.1 版本学习记录
