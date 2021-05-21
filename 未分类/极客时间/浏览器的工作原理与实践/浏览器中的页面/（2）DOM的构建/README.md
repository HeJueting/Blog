# DOM 的构建

</br>

### 什么是 DOM

从网络传给渲染引擎的 HTML 文件字节流是无法直接被渲染引擎理解的，所以要将其转化为渲染引擎能够理解的内部结构，这个结构就是 DOM，它是**是生成页面的基础数据结构**

</br>
</br>

### DOM 如何生成

1. 在渲染引擎内部，有一个叫 HTML 解析器（HTMLParser）的模块，它的职责就是负责将 HTML 转换为 DOM 结构

2. 当渲染进程准备好之后，网络进程和渲染进程之间会建立一个共享数据的管道，通过该通道进行数据传输，**网络进程通过该通道传输了多少数据，HTML 解析器便解析多少数据**

3. 根据 HTML 标签的闭合规则， HTML 解析器**以栈的数据结构去解析生成的 DOM 树**（类似于算法：有效的括号）

</br>
</br>

### JavaScript 的影响

1. 内联的 JavaScript：因为渲染引擎并不知道该脚本是否会修改当前已经生成的 DOM 结构，所以当解析到 script 标签时，渲染引擎判断这是一段脚本，此时 **HTML 解析器就会暂停 DOM 的解析，然后执行该脚本**

```html
<body>
	<div>1</div>
	<script>
		let div1 = document.getElementsByTagName('div')[0]    div1.innerText = 'time.geekbang'
	</script>
	<div>test</div>
</body>
```

2. 以文件形式外链的 JavaScript：首先浏览器需要下载这段 JavaScript 代码，由于渲染引擎并不知道下载的这段代码是否会对 DOM 结构产生影响，因此**JavaScript 文件的下载过程同样会阻塞 DOM 解析**

```html
<body>
	<div>1</div>
	<script type="text/javascript" src="foo.js"></script>
	<div>test</div>
</body>
```

</br>
</br>

### CSS 的影响

1. CSS 的内容并不会影响 DOM 的构建

</br>
</br>

### JavaScript 预解析操作

Chrome 使用预解析操作来优化。当渲染引擎收到字节流之后，会开启一个预解析线程，用来分析 HTML 文件中包含的 JavaScript、CSS 等相关文件，解析到相关文件之后，预解析线程会提前下载这些文件

</br>
</br>

### 异步加载 JavaScript 脚本

1. async：标志的脚本文件一旦加载完成，会立即执行

2. defer：标记的脚本文件需要在 DOMContentLoaded 事件之前执行

</br>
</br>

3. 对 JavaScript 而言：DOM 提供给 JavaScript 脚本操作的接口，通过这套接口，JavaScript 可以对 DOM 结构进行访问，从而改变文档的结构、样式和内容
