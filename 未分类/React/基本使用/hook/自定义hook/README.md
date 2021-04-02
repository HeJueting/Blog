# 自定义 hook

> 用于复用状态逻辑，与 class 语法中的 [高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html) 和 [render props](https://zh-hans.reactjs.org/docs/render-props.html) 实现的功能类似，与 Vue 的 minx 也类似

</br>

### 知识点

-   自定义 hook 是一个函数(返回值不是一个组件)，其名称必须以 "use" 开头，函数内部可以调用其他的 hook

-   自定义 hook 用于复用状态逻辑，因此两个组件使用相同的自定义 hook，不会共享 state

```javascript
function useCoustomHook(friendID) {
    const [state, setState] = useState(null);

    // to do something...

    return state;
}
```

</br>
</br>

**注意：** 以上内容基于 React 17.0.1 版本学习记录
