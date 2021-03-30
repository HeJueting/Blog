# 组件旋转

</br>
</br>








### 前言

近期，在view编辑器中，需要实现组件旋转的功能。在此，记录一下实现过程

![image](http://qiniu.hejueting.cn/github/notes/componentRotate/rotate.gif)


</br>
</br>








### 旋转过程分析

1、鼠标点击旋转的图标

2、按住鼠标左键不放，移动鼠标位置

3、组件根据鼠标移动的不同位置，进行旋转

```javascript
//获取可旋转的组件
var $box = document.getElementById("box");
//获取组件的旋转按钮
var $knob = document.getElementById("knob");

//对旋钮注册鼠标下按事件
$knob.onmousedown = function(e){
    //监听鼠标移动事件
    document.addEventListener("mousemove", mouseMove);
    //监听鼠标释放事件
    document.addEventListener("mouseup", mouseUp);
}


//鼠标移动事件
function mouseMove(e){
    //设置box的旋转
    setBoxRotate();
}

//鼠标释放事件
function mouseUp(){
    //取消鼠标移动事件的监听
    document.removeEventListener("mousemove", mouseMove);
    //取消鼠标释放事件的监听
    document.removeEventListener("mouseup", mouseUp);
}

//根据鼠标的移动，设置当前box旋转的角度
function setBoxRotate(){
    // To do list...
}
```


</br>
</br>









### 计算旋转的角度

![image](http://qiniu.hejueting.cn/github/notes/componentRotate/angle.png)

**条件：**

1、**组件高度height**、**组件宽度width**、**旋转点top值**、**组件的位置(x，y)** 均是通过根据CSS设置的，是已知值

2、通过监听鼠标移动，可获得**点M的坐标**

3、通过已知值，可计算出固定点**O点**和**R点**的坐标

</br>

**问题：**

已知O点、R点、M点的坐标，求∠O的角度？

</br>


**余弦定理**

已知三点的坐标，可求得三条边的长度，再根据余弦定理：**a²=b²+c²-2bc*CosA**，便可求得∠O的角度

</br>
</br>







### JavaScript知识补充

1、圆周率 π ：Math.PI

2、求x的反余弦值（单位为弧度）：Math.acos(x) 

3、求x的绝对值：Math.abs(x)

4、求x的y次方：Math.pow(x, y)

5、对x开根：Math.sqrt(x)


</br>
</br>








### 完整代码实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>组件旋转demo</title>
</head>

<style>
.box{
    position: absolute;
    left: 600px;
    top: 200px;
    width: 300px;
    height: 160px;
    border: 5px solid black;
}
.box span{
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    background: black;
    border-radius: 100%;
}
</style>

<body>
    <div class="box" id="box">
        <span id="knob"></span>
    </div>



<script type="text/javascript">
    //获取可旋转的组件
    var $box = document.getElementById("box");
    //获取组件的旋转按钮
    var $knob = document.getElementById("knob");

    //O点坐标
    var oCoord = {
        x: (600 + 300/2),
        y: (200 + 160/2)
    }
    //R点坐标
    var rCoord = {
        x: (600 + 300/2),
        y: (200 - 60)        
    }
    //M点坐标（默认为0,0）
    var mCoord = {
        x: 0,
        y: 0
    }

    //对旋钮注册鼠标下按事件
    $knob.onmousedown = function(e){
        //监听鼠标移动事件
        document.addEventListener("mousemove", mouseMove);
        //监听鼠标释放事件
        document.addEventListener("mouseup", mouseUp);
    }




    //鼠标移动事件
    function mouseMove(e){
        //设置M点的坐标
        mCoord = {
            x: e.clientX,
            y: e.clientY
        }
        //设置box的旋转
        setBoxRotate();
    }



    //鼠标释放事件
    function mouseUp(){
        console.log("鼠标释放了");
        //取消鼠标移动事件的监听
        document.removeEventListener("mousemove", mouseMove);
        //取消鼠标释放事件的监听
        document.removeEventListener("mouseup", mouseUp);
    }



    //根据鼠标的移动，设置当前box旋转的角度
    function setBoxRotate(){
        // OR边长
        var orLength = oCoord.y - rCoord.y;
        // RM边长
        var rmLength = sideLength(rCoord, mCoord);
        // OM边长
        var omLength = sideLength(oCoord, mCoord);
        //根据余弦定理求∠O的弧度
        var angel = Math.acos(
            (Math.pow(orLength, 2) + Math.pow(omLength, 2) - Math.pow(rmLength, 2)) /
            (2 * orLength * omLength),
        );
        //将弧度转化为角度值: deg / 360 = angel / (2 * π)
        var deg = angel * 180 / Math.PI;
        //如果鼠标落位点在中心点的左侧，则说明旋转角度大于180度
        if(mCoord.x < oCoord.x){
            deg = 360 - deg;
        }
        //设置它的旋转
        $box.style.transform = `rotate(${deg}deg)`;


        // 根据a，b两点的坐标，求两点的距离
        function sideLength(a, b){
            var dx = Math.abs(a.x - b.x);
            var dy = Math.abs(a.y - b.y);
            var length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            return length;
        }
    }
</script>
</body>
</html>
```

![image](http://qiniu.hejueting.cn/github/notes/componentRotate/result.gif)


</br>
</br>


代码已经放在github上：[组件旋转](https://github.com/HeJueting/Blog/tree/master/%E5%89%8D%E7%AB%AF%E9%9A%8F%E7%AC%94/%E7%BB%84%E4%BB%B6%E6%97%8B%E8%BD%AC)


</br>
</br>

### 博客原文：[hejueting.cn](www.hejueting.cn)

</br>