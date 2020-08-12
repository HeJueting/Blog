(async function(){
    const imageData = await getImageData("./img/bac.jpg");
    const markData = getMarkData(1280, 720);

    // 加密
    for(let i=0; i<imageData.data.length; i+=4){
        // 将ImageData中R通道的色值全部转为奇数
        if(imageData.data[i] % 2 === 0){
            imageData.data[i] --;
        }
        // // 找到markData中alpha不为0的像素,将R通道更新为偶数
        if(markData.data[i + 3] !== 0) {
            imageData.data[i] ++;
        }
    }
    let encryptionCanvas = document.createElement('canvas');
    let encryptionCtx = encryptionCanvas.getContext('2d');
    encryptionCanvas.setAttribute('width', `1280px`);
    encryptionCanvas.setAttribute('height', `720px`);
    encryptionCtx.putImageData(imageData, 0, 0);
    document.getElementById('encryption').appendChild(encryptionCanvas);



    // 解密
    for(let i=0; i<imageData.data.length; i+=4){
        // 如果R通道为偶数，直接置为0
        if(imageData.data[i] % 2 === 0){
            imageData.data[i] = 0;
        }
    }
    let decryptCanvas = document.createElement('canvas');
    let decryptCtx = decryptCanvas.getContext('2d');
    decryptCanvas.setAttribute('width', `1280px`);
    decryptCanvas.setAttribute('height', `720px`);
    decryptCtx.putImageData(imageData, 0, 0);
    document.getElementById('decrypt').appendChild(decryptCanvas);

})();


// 获得图片像素数据
function getImageData(url) {
    return new Promise(function(resolve,reject){
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
            // 获取像素数据
            resolve(ctx.getImageData(0, 0, image.width, image.height));
        }
    })
}
// 获得水印像素数据
function getMarkData(width, height) {
    // 创建canvas元素
    let canvas = document.createElement('canvas');
    // 创建context
    let ctx = canvas.getContext('2d');
    // 设置宽高
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);
    // 再绘制文本水印
    ctx.font = '96px Microsoft YaHei';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillText(`hejueting.cn`, 900, 400);
    
    return ctx.getImageData(0, 0, width, height);
}