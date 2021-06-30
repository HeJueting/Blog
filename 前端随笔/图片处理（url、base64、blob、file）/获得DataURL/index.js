// 使用 canvas 将图片转化为DataURL
// 创建canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
// 获取图片
const diamonds = document.getElementById("diamonds");
// 设置宽高
canvas.setAttribute('width', `${diamonds.width}px`);
canvas.setAttribute('height', `${diamonds.height}px`);

diamonds.onload = function(){
    ctx.drawImage(diamonds, 0, 0);
    // 将canvas转为图片
    const base64Url = canvas.toDataURL();
    console.log(base64Url);
}




// 使用FileReader将图片转为DataURL
function fileLoad() {
    const inputFile = document.getElementById('inputFile');
    const reader  = new FileReader();
    // 拿到这个文件的file对象，并作为readAsDataURL的参数
    reader.readAsDataURL(inputFile.files[0]);
    // readAsDataURL读取完成后，触发load事件
    reader.addEventListener("load", function () {
        // 该文件的DataURL作为reader的result属性输出
        console.log(reader.result);
    }, false);
}