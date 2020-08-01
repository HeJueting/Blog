# 计算渐变色值

</br>
</br>

### 前言
> 在开发地图热力层组件时，有这么一个小功能：每一块区域的颜色会根据，该区域的数值和用户设置最大值颜色和最小值的颜色进行计算展示，总的来说就是去计算两个颜色中间渐变色。

</br>
</br>



### 渐变原理
> CSS中用来表示颜色值的rgb，即代表 red、green、blue 三种颜色，从**纯白色 rgb(255, 255, 255)** 到 **纯黑色 rgb(0 ,0, 0)**，其实也就是red, green, blue 对应数值 255 变化至 0，因此**对于两种颜色的渐变，其实也就是它们 rgb 对应数值的渐变**

```javascript
// 传入：起始色值，末尾色值，需要多少次渐变
function gradient(startColor, endColor, step){
    // 得到起始和末尾颜色的rgb色值
    let startColorArr = getRgbNumbers(startColor);
    let endColorArr   = getRgbNumbers(endColor);

    let rStep = (endColorArr[0] - startColorArr[0]) / step;   //red颜色渐变的差值
    let gStep = (endColorArr[1] - startColorArr[1]) / step;   //green颜色渐变的差值
    let bStep = (endColorArr[2] - startColorArr[2]) / step;   //blue颜色渐变的差值

    let gradientArr = [];
    for(let i=0; i<step; i++){
        // 向下取整，避免色值越界
        let rColorNumber = Math.floor( startColorArr[0] + i*rStep );
        let gColorNumber = Math.floor( startColorArr[1] + i*gStep );
        let bColorNumber = Math.floor( startColorArr[2] + i*bStep );

        gradientArr.push(
            `rgb( ${rColorNumber}, ${gColorNumber}, ${bColorNumber} )`    
        );
    }

    return gradientArr;
}

// 得到三原色的具体数值
function getRgbNumbers(color){
    let rgbArr = [];
    color.split(",").map((value)=>{
        // 提取数字
        rgbArr.push(
            Number(value.replace(/[^0-9]/ig,""))
        )
    })
    return rgbArr;
}

let colorArr = gradient("rab(255,255,255)", "rgb(0,0,0)", 100);
```
</br>
</br>

### hex和rgb的转换
> 用rgb表示的两种颜色，我们可以轻松求得其间的渐变色，但是项目中又穿插着 **" #ffffff "** 以16进制格式来表示的颜色，因此在计算渐变色之前，我们还应该将16进制格式的颜色(hex)转换成10进制格式的颜色(rgb)。

</br>

**● 10进制转为16进制：**

</br>

在javascript中，利用 *parseInt* 这个方法，可以轻松实现。只需要在你的 *hexNumber(一个16进制的数值)* 前加上 *”0x“* 即可：

```javascript
parseInt("0x" + hexNumber);
```
</br>

**● 16进制转为10进制：**

</br>

利用 *toString* 这个方法，也可以轻松实现转换，number代表一个10进制的数值（值得注意的是数值后面不能直接调用toSring方法，需要先将该数值定义成一个变量）：

```javascript
number.toString(16);
```
</br>
</br>



### 思考
> 结合以上代码逻辑，这个小需求也算是轻松解决，但是细细斟酌，其实还有许多坑点

</br>

**● hex颜色的格式要求**

</br>

> 1、只能包含0-9,a-f(A-F)这些字符
>   
> 2、(不包含#符号)浏览器不会识别并渲染长度为1，2，5的hex颜色，长度为4的hex颜色会当作长度为3来渲染，长度为6才是标准的hex颜色
>   
> 欢迎补充......

</br>

```javascript
// 处理hex格式的颜色
function detectHexColor(color){
    // 统一去掉 # 符号
    color = color.slice(1, color.length);

    // 处理长度为3或者4位的不规范的hex颜色
	if(color.length === 3 || color.length === 4){
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }

    // 匹配6位在0-9或a-f(A-F)范围内的字符串
    let reg = /[0-9a-fA-F]{6}/;

    if(!reg.test(color)){
        throw "hex颜色格式有误";
    }

    // 加入 # 符号
    color = "#" + color;

    return color;
}
```

</br>
</br>

**● rgb颜色的格式要求**

</br>

> 1、rgb(x,x,x) 其中x是一个0-255的数字

</br>

```javascript
// 处理rgb格式的颜色
function detectRgbColor(color){
    //去掉空格
    color = color.replace(/\s+/g, "");

    // rgb颜色格式的正则表达式
    // ([0-9]|[1-9][0-9]|[1-2]([0-4][0-9]|5[0-5])) 代表匹配 0-255 的数值
    let reg = /^rgb\(([0-9]|[1-9][0-9]|[1-2]([0-4][0-9]|5[0-5]))\,([0-9]|[1-9][0-9]|[1-2]([0-4][0-9]|5[0-5]))\,([0-9]|[1-9][0-9]|[1-2]([0-4][0-9]|5[0-5]))\)/;
    
    if(!reg.test(color)){
        throw "hex颜色格式有误";
    }

    return color;
}
```

</br>
</br>

**● 兼容rgba格式的颜色(原理同上)**

</br>

```javascript
// 判断rgba的正则表达式
let reg = /^rgba/
```


</br>
</br>

### 博客原文：[hejueting.cn](www.hejueting.cn)

</br>