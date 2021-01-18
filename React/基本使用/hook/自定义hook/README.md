# 自定义hook

> 用于复用状态逻辑，与class语法中的 [高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html) 和 [render props](https://zh-hans.reactjs.org/docs/render-props.html) 实现的功能类似，与Vue的minx也类似

<br></br>


### 知识点

- 自定义hook是一个函数(返回值不是一个组件)，其名称必须以 "use" 开头，函数内部可以调用其他的hook

- 自定义hook用于复用状态逻辑，因此两个组件使用相同的自定义hook，不会共享state

```javascript
function useCoustomHook(friendID) {
  const [state, setState] = useState(null);

  // to do something...

  return state;
}
```

<br></br>
<br></br>

**注意：** 以上内容基于React 17.0.1版本学习记录
