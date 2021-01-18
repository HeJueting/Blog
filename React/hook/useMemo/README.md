# useMemo

> 缓存变量，避免某些不必要的逻辑重复执行

<br></br>


### 案例

```javascript
function App() {
    const [val, setValue] = useState('1');
    const [count, setCount] = useState(1);
    function expensive() {
        let sum = 0;
        for (let i = 0; i < count * 10000; i++) {
            sum += i;
        }
        return sum;
    }
    return <div>
        <p>{val}-{count}-{expensive()}</p>
        <input value={val} onChange={event => setValue(event.target.value)}/>
        <button onClick={() => { setCount(count + 1); }}>count++</button>
    </div>
}
```

无论是count值变化还是input标签有输入值变化时，p标签内容的都会重新渲染，expensive()方法每次也会重新计算返回sum值，但是val值的改变其实并不影响expensive()方法的返回值，只有count值的变化才会影响它的结果

<br></br>
<br></br>




### 优化

我们需要只有count值变化，expensive()方法才会重新计算

```javascript
function App() {
    const [val, setValue] = useState('1');
    const [count, setCount] = useState(1);
    const expensive = useMemo(() => {
        let sum = 0;
        for (let i = 0; i < count * 10000; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
    return <div>
        <p>{val}-{count}-{expensive}</p>
        <input value={val} onChange={event => setValue(event.target.value)}/>
        <button onClick={() => { setCount(count + 1); }}>count++</button>
    </div>
}
```
