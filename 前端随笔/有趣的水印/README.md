# 有趣的水印

</br>
</br>




### 前言

> 为了刺激view过期用户续费，需要实现水印的一个功能，在调研的过程中，发现许多好玩的东西

</br>
</br>






### 实现方式

- 网页的最顶层新增一个遮罩层用来展示“水印”

- 利用background-repeat的repeat属性，让这个“水印”重复展示

- 如果水印直接由UI大佬提供了设计图，直接一步到位

</br>
</br>





### canvas绘制

- 如果UI大佬没有直接提供设计图，我们也可以使用canvans来设计水印

- HTMLCanvasElement.toDataURL将canvas内容转换为一个图片的url

- 将这个图片以background的形式插入页面中



</br>



**index.html文件**

```html
<style>
#root {
    width: 100%;
    height: 100%;
    pointer-events:none;
    background-repeat:repeat;
}
</style>
<body>
    <div id="root"></div>
    <script type="text/javascript" src="./index.js"></script>
</body>
```

</br>

**index.js文件**
```javascript
// 创建canvas元素
var canvas = document.createElement('canvas');
// 创建context
var ctx = canvas.getContext("2d");

// 设置宽高
canvas.setAttribute('width', '300px');
canvas.setAttribute('height', '300px');

// 绘制文本
ctx.font = "24px Microsoft YaHei";            //字体大小
ctx.fillStyle = 'rgba(184, 184, 184, 0.8)';   //字体颜色
ctx.rotate(Math.PI / 180 * 30);               //旋转角度
ctx.fillText(`机密文件`, 150, 50);     //渲染的内容和位置

// 绘制图片
var img = new Image();
img.src = '../img/diamonds.png'; 
img.crossOrigin = "Anonymous";        //解决"被污染"的问题
img.onload = function(){
    ctx.drawImage(img, 100, 30);

    // 将canvas转为图片
    var base64Url = canvas.toDataURL();
    // 获取div盒子
    var dom = document.getElementById("root");
    // 以background的形式插入页面
    dom.setAttribute('style', `background-image:url('${base64Url}')`);
}
```


</br>


**注意**

- 需要设置img的crossOrigin属性，因为canvas无法读取从外部引入img或svg元素，这种机制可以避免未经许可拉取远程网站信息而导致的用户隐私泄露（参考：[MDN-启用了 CORS 的图片](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)）

- 需要在img元素加载完成后再去转换canvas元素，否则图片将不会被解析

- pointer-events属性设置为none，会使该元素不会成为鼠标事件的target，避免影响网页的正常使用（参考：[MDN-pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)）

</br>


**参考**

- [MDN-canvas使用](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

- [MDN-toDataURL](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)



</br>
</br>







### 水印防修改


水印的实现方式简单，破解方式也更简单，稍微懂行的人就能打开控制台去掉水印，因此我们还需要加强对水印的保护。在[《监听iframe页面高度》](https://github.com/HeJueting/Blog/tree/master/%E5%89%8D%E7%AB%AF%E9%9A%8F%E7%AC%94/%E7%9B%91%E5%90%ACiframe%E9%A1%B5%E9%9D%A2%E9%AB%98%E5%BA%A6)文章中，有提到[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)的使用，此情此景，我们也可以使用该API去监控水印的变化。

</br>

```javascript
// 生成水印的方法
function initWatermark(){
    // 创建canvas元素
    let canvas = document.createElement('canvas');
    // 创建context
    let ctx = canvas.getContext("2d");

    // 设置宽高
    canvas.setAttribute('width', '300px');
    canvas.setAttribute('height', '300px');

    // 绘制文本
    ctx.font = "24px Microsoft YaHei";            //字体大小
    ctx.fillStyle = 'rgba(184, 184, 184, 0.8)';   //字体颜色
    ctx.rotate(Math.PI / 180 * 30);               //旋转角度
    ctx.fillText(`机密文件`, 150, 50);     //渲染的内容和位置


    // 绘制图片
    let img = new Image();
    img.src = './img/diamonds.png'; 
    img.crossOrigin = "Anonymous";        //解决"被污染"的问题
    img.onload = function(){
        ctx.drawImage(img, 100, 30);

        // 将canvas转为图片
        const base64Url = canvas.toDataURL();


        // 获取页面中的watermark盒子
        let dom = document.getElementById('watermark');
        // 如果dom不存在
        if(!dom){
            // 创建div盒子
            dom = document.createElement('div');
            dom.setAttribute('id', `watermark`);
        }
        // 设置这个div盒子的属性
        let styleStr = `
            position: fixed;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            z-index: 99999;
            pointer-events:none;
            background-repeat:repeat;
            background-image:url('${base64Url}');
        `;
        dom.setAttribute('style', styleStr);
        // 插入body中
        document.body.appendChild(dom);


        // 监视这个div盒子
        // 观察器的配置（需要观察什么变动）
        const config = { 
            attributes: true, 
            childList: true
        };

        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(()=>{
            const newDom = document.getElementById('watermark');
            console.log("发生改变~");
            // 如果dom不存在或者style发生改变
            if(!newDom || (newDom && newDom.getAttribute('style') !== styleStr)) {
                // 取消监听
                observer.disconnect();
                // 重新生成水印
                initWatermark();
            }
        });

        // 在body元素上监听子节点的变化
        observer.observe(document.body, {
            childList: true
        });
        // 在水印dom元素上监听他的属性变化
        observer.observe(dom, {
            attributes: true
        });
    }
}


initWatermark();
```

</br>
</br>








### DefinePlugin

- 通过 cross-env 设置的环境变量，虽然在 webpack 配置文件中可以访问，但在项目编译过程中是无法访问的

- DefinePlugin 插件允许你在代码编译期间，为整个项目配置全局变量，在webpack打包的时候会对这些变量做替换

```javascript
// webpack配置
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            MODE: "test"
	    })
    ]
};


// 被打包的index.js文件
console.log(MODE);    // 报错：test is not defined
```

</br>

打包编译后的结果如下：

```javascript
console.log(test)
```

MODE 在代码中直接被替换为了 test ，但我们本想赋值 test 字符串给 MODE，却赋值成为了 test 变量。这是因为在配置这些全局变量的时候，**如果传入的值为字符串，会被webpack解析为一个变量**，如果想要赋值一个真正的字符串我们可以这样做：

```javascript
// 方法一
MODE: "'test'"

// 方法二
MODE: JSON.stringify('test')
```

</br>

这里建议使用方法二，因为它不仅可以处理字符串，还可以处理对象：

```javascript
// webpack中变量定义
plugins: [
    new webpack.DefinePlugin({
        OBJ_1: JSON.stringify({
            MODE: "test"
        }),
        OBJ_2: {
            MODE: "test"
        },
        ARR_1: JSON.stringify(["value1", "value2"]),
        ARR_2: ["value1", "value2"]
    })
]


// 被打包的index.js文件
console.log(OBJ_1);
console.log(OBJ_2);
console.log(ARR_1);
console.log(ARR_2);


// 打包后的编译结果
console.log({MODE:"test"});                  // 解析正确
console.log(Object({MODE:test}));            // 解析错误，test被替换成为了变量
console.log(["value1","value2"]);            // 解析正确
console.log(Object({0:value1,1:value2}));    // 解析错误
```

</br>
</br>


完整的代码已经上传到GitHub，请移步查看[demo](https://github.com/HeJueting/Blog/tree/master/%E5%89%8D%E7%AB%AF%E9%9A%8F%E7%AC%94/webpack%E8%87%AA%E5%AE%9A%E4%B9%89%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F/demo)

```json
1、下载 demo 文件夹内容
2、npm install 安装依赖
3、npm run build 打包
4、npm run start 执行打包后的bundle.js
```






</br>
</br>

参考文档：[MDN-DefinePlugin](https://www.webpackjs.com/plugins/define-plugin/)、[Node-process](http://nodejs.cn/api/process.html#process_process)、[GitHub-cross-env](https://github.com/kentcdodds/cross-env)


前端水印生成方案：
https://juejin.im/entry/5b55db355188251b11097366


toDataURL方法：
https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL


canvas使用：
https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage


图片隐秘术：
https://www.cnblogs.com/edgeQAQ/p/12503919.html