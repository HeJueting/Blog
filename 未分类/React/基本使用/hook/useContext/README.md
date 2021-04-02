# useContext

</br>

### 知识点

-   接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值

-   当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染

```javascript
// 创建一个Context
const Context = React.createContext();

// 在App组件中，将count变量作为Context传递下去
function App() {
    const [count, setCount] = useState(0);
    return (
        <Context.Provider value={count}>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                add
            </button>
            <button
                onClick={() => {
                    setCount(count - 1);
                }}
            >
                reduce
            </button>
            <Child />
        </Context.Provider>
    );
}

// 在Child组件中访问Context
function Child() {
    const count = useContext(Context);
    return <p>子组件利用useContext获取父组件的: {count}</p>;
}
```

</br>
</br>

**注意：** 以上内容基于 React 17.0.1 版本学习记录
