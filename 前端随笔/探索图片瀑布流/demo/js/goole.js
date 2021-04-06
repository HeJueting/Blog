resetImgs();

// 页面大小改变后，200毫秒延时更新图片瀑布流
let timer;
window.addEventListener("resize", () => {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        resetImgs();
    }, 200);
});

// 重置图片瀑布流的展示
function resetImgs() {
    // 遍历得到所有的图片资源
    let wrap = document.getElementById("wrap");
    let index = 0;
    let images = [];
    for (let i = 0; i < wrap.children.length; i++) {
        images.push(wrap.children[i]);
    }

    while (index < wrap.children.length) {
        // 根据images计算出该行图片数量和高度
        let { height, number } = getNumberAndHeight(images);
        for (let i = 0; i < number; i++) {
            // 根据图片本身宽高，设置他的宽度
            images[i].style.width = Math.floor((images[i].naturalWidth * height) / images[i].naturalHeight) + "px";
            // 设置图片的高度
            images[i].style.height = height + "px";
            // 设置右边距、下边距
            images[i].style.marginRight = "20px";
            images[i].style.marginBottom = "20px";
            // 最后一张图片右边距为0
            if (i === number - 1) {
                images[i].style.marginRight = "0px";
            }
        }
        // 从images中删除已经设置好的图片
        images = images.slice(number);
        // 转到下一行
        index += number;
    }
}

// 得到该行图片的数量和高度
function getNumberAndHeight(images) {
    // 规定图片高度范围为：0 ~ 220
    let heightRange = [0, 220];
    let number = 0;
    let height = 0;
    let arr = [];
    for (let i = 0; i < images.length; i++) {
        // 不断将image追加到arr中，直到height符合规定
        arr.push(images[i]);
        height = calculateHeight(arr);
        // 如果图片高度范围符合规定值，跳出循环，arr的长度就是这一行图片的数量
        if (height >= heightRange[0] && height <= heightRange[1]) {
            number = arr.length;
            break;
        }
    }
    // 最后一行做特殊处理
    // number为0，说明这一行不满足高度范围（其实就是最后一行），默认设置为200高度
    if (number === 0) {
        return {
            number: images.length,
            height: 200,
        };
    }
    return {
        number: number,
        height: height,
    };
}

// 计算图片的高度
function calculateHeight(images) {
    let blankWidth = document.body.clientWidth - 20 * (1 + images.length) - 17;
    let height = 0;
    let ratios = 0;
    for (let i = 0; i < images.length; i++) {
        ratios += images[i].naturalWidth / images[i].naturalHeight;
    }
    height = Math.floor(blankWidth / ratios);
    return height;
}
