// 获取页面的image元素
const image = document.getElementById('image');



// 创建canvas元素
let canvas = document.createElement('canvas');
// 创建context
let ctx = canvas.getContext('2d');




image.onload = function() {
    // 以图片宽高设置canvas的大小
    canvas.setAttribute('width', `${image.width}px`);
    canvas.setAttribute('height', `${image.height}px`);

    // 绘制这个image图片
    ctx.drawImage(image, 0, 0);
    // 再绘制文本水印
    ctx.font = '16px Microsoft YaHei';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillText(`hejueting.cn`, canvas.width-20, canvas.height-20);
    
    
    document.body.appendChild(canvas);


    // 将这个图片转为base64
    const canvasBase64 = canvas.toDataURL();

    console.log(canvasBase64);
    // 

    // window.open("https://codeload.github.com/douban/douban-client/legacy.zip/master")
}


