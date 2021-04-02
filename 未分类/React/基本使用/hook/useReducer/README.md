# useReducer

> useState 的替代方案，适用于 state 逻辑比较复杂且包涵多个子值

</br>

### 知识点

```javascript
function reducer(state, action) {
    switch (action.type) {
        case "add":
            return { count: state.count + 1 };
        case "reduce":
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}
function App() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return (
        <div className="App">
            <p>count: {state.count}</p>
            <button
                onClick={() => {
                    dispatch({ type: "add" });
                }}
            >
                加
            </button>
            <button
                onClick={() => {
                    dispatch({ type: "reduce" });
                }}
            >
                减
            </button>
        </div>
    );
}
```

</br>
</br>

**注意：** 以上内容基于 React 17.0.1 版本学习记录
