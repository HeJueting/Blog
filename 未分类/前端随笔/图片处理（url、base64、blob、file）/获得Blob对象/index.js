// new Blob创建
const blob = new Blob([
    JSON.stringify({ name: "hejueting" })
], {
    type: 'application/json'
})
console.log('new Blob：', blob);




// fetch获得Blob对象
fetch('http://localhost/img/diamonds.png').then(
    res => res.blob()
).then(blob => {
    console.log('fetch：', blob);
});




// canvas获得Blob对象
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
    canvas.toBlob(blob => {
        console.log('canvasBlob：', blob);
    });
}