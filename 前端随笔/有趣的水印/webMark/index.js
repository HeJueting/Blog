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