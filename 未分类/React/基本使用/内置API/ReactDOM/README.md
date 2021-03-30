# ReactDOM

```javascript
const ReactDOM = require('react-dom');
```

由于react-native跟react使用了部分相同的逻辑，React官方将react-dom包抽离出来，以下API均来源于react-dom中

<br></br>





### unmountComponentAtNode()

```javascript
ReactDOM.unmountComponentAtNode(container)
```

卸载Dom组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false

<br></br>





### createPortal()

```javascript
function Portal(props) {
    // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
    // `domNode` 是一个可以在任何位置的有效 DOM 节点。
    return ReactDOM.createPortal( props.children, domNode );
}
```

提供了一种将子节点渲染到存在于父组件以外的DOM节点的方式，这里的container可以是任意DOM元素

<br></br>
