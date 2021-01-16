# useEffect

> 将class语法中的componentDidMount和componentsDidUpdate功能集成于useEffect

<br></br>



### 知识点


- useEffect的第一个参数是一个函数，这个函数会在每次组件**更新渲染完成后执行**(意味着这时已经可以拿到网页中的dom)，并且第一次组件渲染完成后也会执行

```javascript
useEffect(() => {
    // to do something...
})
```

<br></br>



- 传入useEffect的函数，可以返回一个清除函数，该清除函数会在下一次useEffect执行前执行

```javascript
useEffect(() => {
    subscribe();          // 注册监听事件
    return () => {
        unsubscribe();    // 在下一次执行这个useEffect前，取消注册监听事件
    }
})
```

<br></br>



- useEffect的第二个参数(是一个数组)可以用来约束哪些变量更新才会触发，如果传入[]，则只在第一次组件加载时，才会触发

```javascript
// 只有在name和age变化后，才会执行这个useEffect
useEffect(() => {
    // to do something...
}, [name, age])
```
