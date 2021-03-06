# 浏览器渲染流程

一旦资源提交给了渲染进程，他会把整个任务拆分为多个子任务，以**流水线**的形式进行处理（将上一个任务的处理结果返回给下一个任务，下一个任务继续处理），大致流程如下：

构建 DOM 树 ——> 构建 StyleSheets ——> 构建布局树 ——> 划分图层 ——> 图层绘制 ——> 栅格化操作 ——> 显示

</br>

### 1、构建 DOM 树

1. 浏览器无法直接理解和使用 HTML，所以需要将 HTML 转换为浏览器能够理解的结构 —— DOM 树

2. 与 HTML 不同的是，**DOM 树是保存在内存中树状结构**，可以通过 JavaScript 来查询或修改其内容

</br>
</br>

### 2、构建 CSSOM 对象

1. 渲染引擎接会收到 CSS 文本进行转换操作，转换为浏览器可以理解的结构 —— styleSheets（通过 document.styleSheets 可以查看）

2. 转换样式表中的属性值，使其标准化，才能被浏览器正确解析。例如：将 black 转为 rgb(0,0,0)

</br>
</br>

### 3、构建布局树

根据 DOM 树和 styleSheets，计算出每个节点的具体样式和位置，计算规则参考：

1. 子元素继承父元素的 CSS 样式

2. 根据 CSS 的权重去计算

</br>
</br>

### 4、划分图层

1. 页面本质上是若干图层堆叠而成的图像，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树

2. 拥有层叠上下文属性的元素会被提升为单独的一层

3. 通过开发者工具的 Layers 可以查看具体元素的图层

</br>
</br>

### 5、图层绘制

1. 把一个图层的绘制拆分成很多小的绘制指令

2. 再把这些指令按照顺序组成一个待绘制列表

3. 最后提交到合成线程

</br>
</br>

### 6、栅格化操作

1. 合成线程将图层分成图块

2. 合成线程会借助 GPU 进程将图块转为位图，并将位图保存在 GPU 内存中。

3. 将图块转换为位图的过程成为栅格化

4. 栅格化的过程中，优先会按照视口附近的图块来优先生成位图

</br>
</br>

### 7、显示

一旦所有图块被栅格化后，合成线程就会通知浏览器进程，浏览器进程便将 GPU 内存中的内容进行显示

</br>
</br>
