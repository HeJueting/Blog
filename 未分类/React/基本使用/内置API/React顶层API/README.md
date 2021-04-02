# React 顶层 API

```javascript
import React from "react";
```

以下 API 来自于引入的 react 包

</br>

### React.PureComponent 和 React.memo

```javascript
// class语法
class Component extends React.PureComponent {
    // 组件设计的编码......
}

// hook语法
const Component = React.memo(() => {
    // 组件设计的编码......
});
```

这两个 API 都有相同的一个作用，就是每当组件中的 props 和 state 发生变化时，React 将检查 上一个 state 和 props 以及下一个 props 和 state 是否相等，如果不相等则函数组件将重新渲染，如果它们相等则函数组件将不会重新渲染

</br>

### isValidElement()

```javascript
React.isValidElement(object);
```

验证对象是否为 React 元素，返回值为 true 或 false

</br>

### React.Fragment

```javascript
<React.Fragment>
    <h1>some components</h1>
</React.Fragment>

// 注意某些编辑器下，也可以这样写
<>
    <h1>some components</h1>
</>
```

React.Fragment 能够在不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素

</br>

### React.createRef

```javascript
this.inputRef = React.createRef();
```

class 语法中使用 React.createRef 创建 ref，hook 语法中有 useRef 的方案

</br>

### React.forwardRef

```javascript
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
));

// 访问FancyButton这个dom元素
function App() {
    const ref = React.createRef();
    return <FancyButton ref={ref}>Click me!</FancyButton>;
}
```

React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到另一个组件中

</br>

### React.lazy

```javascript
const SomeComponent = React.lazy(() => import("./SomeComponent"));
```

动态加载 SomeComponent 这个组件，打包过程中可以实现代码分割

</br>

### React.Suspense

```javascript
// 该组件是动态加载的
const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
    return (
        // 显示 <Spinner> 组件直至 OtherComponent 加载完成
        <React.Suspense fallback={<Spinner />}>
            <OtherComponent />
        </React.Suspense>
    );
}
```

React.Suspense 可以指定加载指示器，以防其组件树中的某些子组件尚未具备渲染条件，**目前只能搭配 React.lazy 使用**，未来计划让 Suspense 支持包括数据获取在内的更多场景

</br>

</br>
</br>

**注意：** 以上内容基于 React 17.0.1 版本学习记录
