# useMemo

> 缓存变量，避免某些不必要的逻辑重复执行

</br>

### 案例

```javascript
function App() {
    const [val, setValue] = useState("1");
    const [count, setCount] = useState(1);
    function expensive() {
        let sum = 0;
        for (let i = 0; i < count * 10000; i++) {
            sum += i;
        }
        return sum;
    }
    return (
        <div>
            <p>
                {val}-{count}-{expensive()}
            </p>
            <input value={val} onChange={(event) => setValue(event.target.value)} />
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                count++
            </button>
        </div>
    );
}
```

无论是 count 值变化还是 input 标签有输入值变化时，p 标签内容的都会重新渲染，expensive()方法每次也会重新计算返回 sum 值，但是 val 值的改变其实并不影响 expensive()方法的返回值，只有 count 值的变化才会影响它的结果

</br>
</br>

### 优化

我们需要只有 count 值变化，expensive()方法才会重新计算

```javascript
function App() {
    const [val, setValue] = useState("1");
    const [count, setCount] = useState(1);
    const expensive = useMemo(() => {
        let sum = 0;
        for (let i = 0; i < count * 10000; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
    return (
        <div>
            <p>
                {val}-{count}-{expensive}
            </p>
            <input value={val} onChange={(event) => setValue(event.target.value)} />
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                count++
            </button>
        </div>
    );
}
```

</br>
</br>

**注意：** 以上内容基于 React 17.0.1 版本学习记录
