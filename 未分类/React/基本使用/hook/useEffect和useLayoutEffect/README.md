# useEffect

> 将 class 语法中的 componentDidMount 和 componentsDidUpdate 功能集成于 useEffect

</br>

### 知识点

-   useEffect 的第一个参数是一个函数，这个函数会在每次组件**更新渲染完成后执行**(意味着这时已经可以拿到网页中的 dom)，并且第一次组件渲染完成后也会执行

```javascript
useEffect(() => {
    // to do something...
});
```

</br>

-   传入 useEffect 的函数，可以返回一个清除函数，该清除函数会在下一次 useEffect 执行前执行

```javascript
useEffect(() => {
    subscribe(); // 注册监听事件
    return () => {
        unsubscribe(); // 在下一次执行这个useEffect前，取消注册监听事件
    };
});
```

</br>

-   useEffect 的第二个参数(是一个数组)可以用来约束哪些变量更新才会触发，如果传入[]，则只在第一次组件加载时，才会触发

```javascript
// 只有在name和age变化后，才会执行这个useEffect
useEffect(() => {
    // to do something...
}, [name, age]);
```

</br>
</br>
</br>

# useLayoutEffect

-   useLayoutEffect 的使用方式与 useEffect 相同

-   但是 useLayoutEffect 是**在浏览器渲染之前触发**，useLayoutEffect 内部的更新计划将被**同步刷新**

-   尽可能使用标准的 useEffect **以避免阻塞视觉更新**。

</br>
</br>

**注意：** 以上内容基于 React 17.0.1 版本学习记录
