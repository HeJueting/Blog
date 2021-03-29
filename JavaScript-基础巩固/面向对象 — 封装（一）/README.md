# 面向对象 — 封装（一）

</br>
</br>

### 前言

不知不觉，踩坑前端也两年多了。这一路的学习经历，也慢慢发现虽然技术会不断更新，但很多优秀的思想却会被一代一代传承。JavaScript 的设计之初，也只是一门运行在浏览器端的脚本语言，但随着技术的发展，JavaScript 所开发出来的项目也越来越庞大，代码的**可维护性、可复用性、可拓展性、灵活性、可理解性**也变得越来越重要。因此，我决定再一次深入面象对象的编程思想。

</br>
</br>

对于我们撸代码而言，封装的思想尤为重要。我理解的封装，应由两部分组成：**提取**、**拆分**

</br>

### 提取

举例：已知三角形 A,B,C 三个点的坐标，求 a,b,c 三边长度

● 封装前

```javascript
var A = { x: 12, y: 32 };
var B = { x: 24, y: 98 };
var C = { x: 18, y: 48 };
//求边a的长度
var dxA = Math.abs(B.x - C.x);
var dyA = Math.abs(B.y - C.y);
var a = Math.sqrt(Math.pow(dxA, 2) + Math.pow(dyA, 2));
//求边b的长度
var dxB = Math.abs(A.x - C.x);
var dyB = Math.abs(A.y - C.y);
var b = Math.sqrt(Math.pow(dxB, 2) + Math.pow(dyB, 2));
//求边c的长度
var dxC = Math.abs(A.x - B.x);
var dyC = Math.abs(A.y - B.y);
var c = Math.sqrt(Math.pow(dxC, 2) + Math.pow(dyC, 2));
```

● 封装后

```javascript
var A = { x: 12, y: 32 };
var B = { x: 24, y: 98 };
var C = { x: 18, y: 48 };
//已知两点，计算边长
function getLength(m, n) {
	var dx = Math.abs(m.x - n.x);
	var dy = Math.abs(m.y - n.y);
	var length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	return length;
}
//求a,b,c三边长度
var a = getLength(B, C);
var b = getLength(A, C);
var c = getLength(A, B);
```

**抽离代码公共逻辑部分**，减少代码量，便于维护代码

</br>
</br>

### 拆分

举例：通过鼠标移动来控制，某个 div 元素在页面中的位置

● 封装前

```javascript
//监听页面中鼠标移动事件
document.onmousemove = function (e) {
	var x = e.clientX;
	var y = e.clientY;
	$div.style.left = `${x}px`;
	$div.style.top = `${y}px`;
};
```

● 封装后

```javascript
//监听页面中鼠标移动事件
document.onmousemove = function (e) {
	var x = e.clientX;
	var y = e.clientY;
	setDivPosition(x, y);
};
//设置div元素的位置
function setDivPosition(x, y) {
	$div.style.left = `${x}px`;
	$div.style.top = `${y}px`;
}
```

将**不同职责的代码进行拆分**，降低代码耦合度，使代码层次更分明

</br>
</br>
