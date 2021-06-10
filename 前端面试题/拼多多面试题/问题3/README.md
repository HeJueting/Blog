### 题目描述

如何实现元素消失与显示动画

</br>
</br>

### 代码实现

1. 理解事件循环机制，

2. 使用 transition 平移动画

3. 理解 requestAnimationFrame 的触发时机

```html
<html lang="en">
    <style>
        .div {
            opacity: 1;
            width: 100px;
            height: 100px;
            border-radius: 100%;
            background: red;
            transition: 1s opacity linear 0s;
            margin-top: 20px;
        }
    </style>
    <body>
        <button id="disappear-btn">消失</button>
        <button id="show-btn">展示</button>
        <div id="div" class="div"></div>
        <script>
            // 获取dom元素
            const disappearBtn = document.getElementById("disappear-btn");
            const showBtn = document.getElementById("show-btn");
            const div = document.getElementById("div");
            // 点击消失按钮
            disappearBtn.addEventListener("click", () => {
                div.style.opacity = 0;
            });
            // 点击显示按钮
            showBtn.addEventListener("click", () => {
                // 浏览器立刻更新元素的属性，然后重新计算元素的样式和位置，生成渲染树
                div.style.display = "block";
                div.style.opacity = 0;
                // 在渲染之前，再次更新元素的属性，浏览器又会重新计算元素的样式和位置，生成渲染树
                // 因为transition的加持，就可以实现动画了
                requestAnimationFrame(() => {
                    div.style.opacity = 1;
                });
            });
            // 监听动画的结束
            div.addEventListener("transitionend", (e) => {
                if (div.style.opacity == 0) {
                    div.style.display = "none";
                }
                // 访问动画触发的dom元素及其触发的属性
                console.log(e.propertyName); // opacity
                console.log(e.target); // div#div.div
            });
        </script>
    </body>
</html>
```

</br>
</br>
