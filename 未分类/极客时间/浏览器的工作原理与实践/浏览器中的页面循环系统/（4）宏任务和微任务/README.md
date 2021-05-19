# 宏任务和微任务：不是所有任务都是一个待遇

</br>

### 宏任务

1. 渲染事件（如解析 DOM、计算布局、绘制）

2. 用户交互事件（如鼠标点击、滚动页面、放大缩小等）

3. JavaScript 脚本执行事件

4. 网络请求完成、文件读写完成事件

5. setTimeout

</br>
</br>

### 微任务

每个宏任务都关联了一个微任务队列，当前宏任务执行完之后，就立即执行关联的微任务队列。以下情况属于微任务：

1. MutationObserver 监控某个 DOM 节点，触发的方法

2. Promise

</br>
</br>

### 案例

打印结果: observer promise setTimeout

```javascript
// 得到要观察的元素
var divDom = document.querySelector("#div");
var observer = new MutationObserver(function () {
    console.log("observer ");
});
observer.observe(divDom, { subtree: true, childList: true });

// 修改dom，触发监听
divDom.innerHTML = "<p>hhh</P>";

// 执行setTimeout
setTimeout(() => {
    console.log("setTimeout");
}, 0);

// 执行promise
var pro = new Promise((resolve, reject) => {
    resolve("promise");
});
pro.then((str) => {
    console.log(str);
});
```

</br>
</br>
