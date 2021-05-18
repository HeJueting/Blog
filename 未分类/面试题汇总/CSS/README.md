# CSS 面试题汇总

</br>

### 1、层叠上下文和 z-index

1. 浏览器有一条虚拟的 Z 轴，HTML 元素在该轴上根据层叠的优先级顺序进行展示，层级高的元素能遮挡层级低的元素

2. 当元素具有层叠上下文后，就可以通过 z-index 去控制层叠的展示顺序

3. 如何使元素具有层叠上下文：

    - position 值为 absolute 或 relative 且 z-index 值不为 auto 的元素

    - position 值为 fixed 或 sticky 的元素

    - flex/grid 容器的子元素，且 z-index 值不为 auto

    - opacity 属性值小于 1 的元素

    - transform/filter 不为 none 的元素

</br>
</br>

### 2、什么是脱离文档流？

CSS 中脱离文档流，也就是将元素从**普通的布局排版中拿走**，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位

</br>
</br>

### 3、描述 CSS 中的定位

1.  默认定位：static

2.  相对定位：relative，不会脱离文档流，可设置 z-index

3.  绝对定位：absolute，会脱离文档流，以最近一个非 static 定位的父组件进行定位

4.  固定定位：fixed，会脱离文档流流，以浏览器窗口为准

5.  粘性定位：sticky，不会脱离文档流，一般用于实现吸顶效果。当元素在屏幕内，表现为 relative，就要滚出显示器屏幕的时候，表现为 fixed

    -   sticky 元素会 "固定" 在离它最近的一个拥有 "滚动机制" 的祖先上

    -   父级/祖先元素如果 overflow 属性不为 visible，则 "固定效果" 会失效

</br>
</br>

### 4、CSS 盒模型

1. 标准盒模型（width 指定的内容的大小）：margin + border + padding + width

2. IE 盒模型（width 指定的盒子的大小）：margin + width（border + padding + content）

3. 通过 box-sizing 属性进行转换
    - border-box 转为 IE 盒模型
    - content-box 转为标准盒模型

</br>
</br>

### 5、CSS 单位

1. px

2. em 和 rem

3. vw 和 vh

4. vmin 和 vmax（vw 和 vh 中最小/大的一个）

5. cm（厘米）、mm（毫米）...

</br>
</br>

### 6、CSS 选择器与权重

1. id 选择器：100

2. class 选择器：10

3. 伪类：10，如：hover/active...

4. 标签选择器：1，如：h1/p/span...

5. 伪元素：1，如：after/before...

6. 通配符\*：0

</br>
</br>

### 7、CSS 伪类和伪元素的区别

1. 伪类：用来选择 DOM 元素的一些特殊选择器，例如：hover、focus...

2. 伪元素：dom 元素中的虚拟元素，例如：after、before...

</br>
</br>

### 8、flex:1 是代表什么意思？

**flex 盒子的设置**

1. flex-direction：决定主轴的方向。默认为水平轴

2. flex-wrap：当以该轴排列展示不下元素时，元素是否换行。默认不换行

3. justify-content：主轴的对齐方式

4. align-items：交叉轴的对齐方式

**flex 子元素的设置**

1. order：设置子元素展示的排列顺序

2. flex-grow：子元素的放大比例。默认为 0，即如果存在剩余空间，也不放大

3. flex-shrink：子元素的缩小比例。默认为 1，即如果空间不足，该项目将缩小

4. flex-basis：指定子元素在主轴方向上的初始大小，优先级高于 width

**flex 属性**

flex 属性代表 flex-grow，flex-shrink，flex-basis 这三种属性，他有几种快捷设置：

1.  flex 的默认值为 0 1 auto

2.  flex: auto，代表 1 1 auto

3.  flex: none， 代表 0 0 auto

4.  flex: 1，代表 1 1 0

</br>
</br>

### 9、CSS 如何实现水平垂直居中

1. flex 可以实现水平垂直方向上的居中

2. transform 也可以实现垂直水平方向上的居中

3. margin: auto 可以实现水平方向居中

4. position 定位搭配 margin 和 transform

</br>
</br>

### 10、grid 布局

1. grid-template-columns（每一列的宽度）、grid-template-rows（每一行的高度）

2. grid-column-gap（每一列的间隔）、grid-row-gap（每一行的间隔）

3. grid-template-areas：定义网格区域

```css
.test {
    /* 代表将9个单元格划分为 a b c d e f g h i 共9块区域 */
    grid-template-areas:
        "a b c"
        "d e f"
        "g h i";
    /* 代表将9个单元格划分为 a b c 共3块区域 */
    grid-template-areas:
        "a a a"
        "b b b"
        "c c c";
    /* 代表将9个单元格划分为 header main sidebar footer 共4块区域 */
    grid-template-areas:
        "header header header"
        "main main sidebar"
        "footer footer footer";
}
```

4. grid-auto-flow：设置子元素放置顺序，默认 “先行后列”

5. 子元素在容器中的对齐方式

    - 适用于所有元素：justify-items（水平方向）、align-items （竖直方向）

    - 适用于某个元素：justify-self（水平方向）、align-self （竖直方向）

6. 整个容器在内容区域的对齐方式：justify-content（水平方向）、align-content（竖直方向）

7. 设置浏览器自动创建的多余网格的列宽和行高（如：只有 9 个网格，却有 11 个子元素）：grid-auto-columns、grid-auto-rows

8. 指定子元素的位置，参照系是网格线：grid-column-start、grid-column-end、grid-row-start、grid-row-end

</br>
</br>

### 11、物理像素、设备独立像素、CSS 像素、devicePixelRatio

1. 物理像素：显示器的最小物理单位

2. 设备独立像素：设备的像素，例如：chrome 检查 iphone，显示 375×812。一个设备独立像素里可能包含 1 个或者多个物理像素点，包含的越多则屏幕看起来越清晰

3. CSS 像素：一般情况下（页面缩放比为 1），1 个 CSS 像素 等于 1 个设备独立像素

4. devicePixelRatio：一个 CSS 像素的大小与一个物理像素的大小，例如：iphone 手机下 的 1 个 CSS 像素可能是由 2 个物理像素组成

</br>
</br>

### 12、如何解决移动端 1px 的问题

1. 很多移动端浏览器都已经支持，chrome 暂不支持但可以设置

2. transform: scale(0.5) 来实现，但是 transform 缩小的元素还是会在网页中占据原有空间大小

3. 利用 JS 根据 window.devicePixelRatio 的大小动态设置 viweport 的 initial-scale、maximum-scale、minimum-scale 属性

</br>
</br>

### 页面的回流与重绘

整个渲染流程：构建 dom 树 → 构建 styleSheets → 计算元素位置，构建布局树 → 划分图层 → 拆分绘制命令，生成绘制列表 → 合成线程将图层划分为图块 → GPU 加速栅格化，将图块转化为位图 → 显示

1. 回流：走完整个渲染流程

    - 浏览器 resize
    - 元素位置尺寸改变
    - 元素的增删

2. 重绘：不需要重新计算元素位置并构建布局树，也不需要划分图层

    - 元素的 color 和 background 改变

3. transform 动画：需要配合 will-change 或者 translate3D(0) 开启 GPU 加速。开启 GPU 加速后，实际是创建了新的图层，直接进入到 GPU 生成位图阶段

    - translate3D(0) 模拟虚假的 3D 变化，开启 GPU 加速
    - will-change

</br>
</br>
