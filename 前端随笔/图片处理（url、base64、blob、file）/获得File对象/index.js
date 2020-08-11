// new File创建
const file = new File(["Hello World"], "hello.txt", {
    type: "text/plain",
});
console.log('new File：', file);



// Blob对象转为File对象
const blob = new Blob(["Hello World"], {
    type: 'text/plain'
})
const blobToFile = new File([blob], "hello.txt", {
    type: "text/plain",
});
console.log('blob to File：', blobToFile);





// inputElement.files获得file对象
function fileLoad() {
    const inputFile = document.getElementById('inputFile');
    console.log('inputElement.files：', inputFile.files);
}




// DragEvent.dataTransfer.files获得file对象
const fileBox = document.getElementById("fileBox");
// 阻止将该文件打开新的浏览器窗口进行文件展示
fileBox.addEventListener('dragenter', e => {
    e.preventDefault();
    e.stopPropagation();
})
fileBox.addEventListener('dragover', e => {
    e.preventDefault();
    e.stopPropagation();
})
fileBox.addEventListener('dragleave', e => {
    e.preventDefault();
    e.stopPropagation();
})
fileBox.addEventListener('drop', e => {
    e.preventDefault();
    e.stopPropagation();
    // 获取文件
    let files = e.dataTransfer.files;
    console.log("dataTransfer.files：", files);
})