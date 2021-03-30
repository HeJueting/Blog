// 初始化图片时，给图片加水印
setImageWaterMark('./img/bac.jpg' ,(canvas)=>{
    document.getElementById('imageBox').appendChild(canvas);
});


// 给图片加水印
function setImageWaterMark(url ,done){
    // 创建canvas元素
    let canvas = document.createElement('canvas');
    // 创建context
    let ctx = canvas.getContext('2d');
    // 创建image元素
    let image = new Image();
    image.src = url;
    image.crossOrigin = 'anonymous';

    image.onload = function() {
        // 以图片宽高设置canvas的大小
        canvas.setAttribute('width', `${image.width}px`);
        canvas.setAttribute('height', `${image.height}px`);

        // 绘制这个image图片
        ctx.drawImage(image, 0, 0);
        // 再绘制文本水印
        ctx.font = '128px Microsoft YaHei';
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillText(`hejueting.cn`, 1000, 400);
        
        // 逻辑处理 ... 
        done(canvas);
    }
}

// 点击下载图片
const btn = document.getElementById('btn');
btn.addEventListener('click', e => {
    fetch('http://localhost/img/bac.jpg').then(
        res => res.blob()
    ).then(blob => {
        const reader  = new FileReader();
        reader.readAsDataURL(blob);
        // readAsDataURL读取完成后，触发load事件
        reader.addEventListener("load", function () {
            const base64 = reader.result;
            // 将该图片添加上水印并下载
            setImageWaterMark(base64 ,(canvas)=>{
                // 转为base64
                const imageBase64 = canvas.toDataURL();
                // 模拟下载图片
                let a = document.createElement('a');
                a.href = imageBase64;
                a.download = ''
                a.click()
            });
        }, false);
    });
})