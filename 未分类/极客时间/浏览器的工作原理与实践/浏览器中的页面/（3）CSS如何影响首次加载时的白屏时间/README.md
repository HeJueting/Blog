# CSS 如何影响首次加载时的白屏时间？

</br>

### 渲染流水线

![image](./img/render.png)

1. 当渲染进程接收 HTML 文件字节流时，会先开启一个预解析线程，去提前下载 css 和 javascript 文件

2. 当 DOM 构建完成之后，还需要等待 CSSOM 对象的完成构建，才能进入下一步合成布局树

3. CSSOM 对象的作用：

    - 提供 javascript 操作样式的能力

    - 为布局树的合成提供样式信息

</br>
</br>

### 优化策略

1. 通过内联 JavaScript、内联 CSS 来移除这两种类型的文件下载，这样获取到 HTML 文件之后就可以直接开始渲染流程了

2. 尽量减少文件大小，比如通过 webpack 等工具移除一些不必要的注释，并压缩 JavaScript 文件

3. 还可以将一些不需要在解析 HTML 阶段使用的 JavaScript 标记上 async 或者 defer

4. 通过媒体查询属性，将其 CSS 文件拆分为多个不同用途的 CSS 文件，这样只有在特定的场景下才会加载特定的 CSS 文件。

</br>
</br>
