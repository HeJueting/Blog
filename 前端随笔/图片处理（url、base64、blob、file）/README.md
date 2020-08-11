# 图片处理（url、base64、blob、file）

</br>
</br>











### 前言

> 在进行图片处理的时，经常会与url、base64、blob打交道，在此记录一下三者之间的转换关系

</br>
</br>











### URL

> 在WWW上，每一信息资源都有统一的且在网上唯一的地址，该地址就叫URL（Uniform Resource Locator,统一资源定位器），它是WWW的统一资源定位标志，就是指网络地址。

```html
<img src="https://www.baidu.com/test.png"/>
```

例如这里的 *https://www.baidu.com/test.png* 便是某张图片的 url 地址，它由三部分组成：存放资源的主机域名、资源文件名、资源类型


</br>
</br>












### base64 和 DataURL

</br>

**1、什么是base64**


> Base64是网络上最常见的用于传输8Bit字节码的编码方式之一，Base64就是一种**基于64个可打印字符来表示二进制数据的方法**


通过 atob() 方法对经过 base-64 编码的字符串进行解码。相反地，通过 btoa() 函数能够将某个数据转为base-64编码的ASCII字符串


![image](./img/base64.png)


例如该图片就是以 base64 形式进行展示，但严格来说，src 中的数据格式应该叫做 Data URL


参考：[Base64的编码与解码](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)

</br>





**2、什么是DataURI**


> Data URI scheme 简称 Data URI，即前缀为 data: 协议的URL，其允许内容创建者向文档中嵌入小文件


Data URL 应有由以下四个部分组成：


- 前缀（data:）

- 指示数据类型的MIME类型（image/svg+xml）

- base64标记（;base64）

- base64数据（PHN2ZyB4bWxu...）


```json
data:image/jpg;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=
```

</br>




**3、如何得到DataURL**


> **canvas.toDataURL 方法**

该方法返回一个包含图片展示的 data URI

```javascript
// 获取图片
const diamonds = document.getElementById("diamonds");
// 创建canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
canvas.setAttribute('width', `${diamonds.width}px`);
canvas.setAttribute('height', `${diamonds.height}px`);

diamonds.onload = function(){
    ctx.drawImage(diamonds, 0, 0);
    // 将canvas转为图片
    const base64Url = canvas.toDataURL();
    console.log(base64Url);
}
```

</br>


> **FileReader.readAsDataURL 方法**

该方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成DONE，并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容

```html
<input id="inputFile" type="file" onchange="fileLoad()"/>
```
```javascript
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
```


参考：[DataURL](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)、[HTMLCanvasElement.toDataURL](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)、[FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)、[FileReader.readAsDataURL](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)

</br>
</br>











### Blob对象

</br>

**1、什么是Blob对象**

> Blob对象是File对象的父类，表示一个文件的数据内容，它通常用来读写文件

</br>



**2、如何得到Blob对象**

> new Blob([array], options)

```javascript
new Blob([
    JSON.stringify({name: "hejueting"})
] , {
    type : 'application/json'
})
```

![image](./img/blob-new.png)


Blob() 构造函数会返回一个新的 Blob 对象，该构造函数接受两个参数: 

- 第一个参数是数组，成员是*字符串*或*二进制对象*（[ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)、[ArrayBufferView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)、[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[DOMString](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)），表示新生成的Blob实例对象的内容

- 第二个参数是一个配置对象

	- type，默认值为 ""，它代表了将会被放入到blob中的数组内容的MIME类型
	
	- endings，默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入

</br>




> fetch(url)

```javascript
fetch('http://localhost/img/diamonds.png').then(
    res => res.blob()
).then(blob => {
    console.log('fetch：', blob);
});
```

利用JS提供的Fetch API，也可以得到Blob对象

![image](./img/blob-fetch.png)

</br>




> canvas.toBlob

```javascript
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
```

除了toDataURL方法外，canvas还有toBlob方法将canvas画布内容转为一个Blob对象

![image](./img/blob-canvas.png)

</br>


参考：[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)、[canvas.toBlob](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob)

</br>
</br>












### file对象

</br>

**1、什么是File对象**

> 文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容

</br>





**2、如何得到File对象**

> new File([bits], name, options)


```javascript
const file = new File(["Hello World"], "hello.txt", {
    type: "text/plain",
});
```

![image](./img/file-new.png)


File构造函数接受三个参数: 

- 第一个参数与Blob构造函数一样，接收一个数组，成员是*字符串*或*二进制对象*（[ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)、[ArrayBufferView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)、[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[DOMString](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)），表示新生成的File实例对象的内容

- 第二个参数是表示文件名称

- 第三个参数是一个配置对象

	- type，默认值为 ""，它代表了将会被放入到blob中的数组内容的MIME类型
	
	- lastModified: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()


</br>






> blob对象转file对象

由于File对象的第一个参数也可以是一个blob对象，因此通过blob对象也可以直接生成file对象

```javascript
const blob = new Blob(["Hello World"], {
    type: 'text/plain'
})
const blobToFile = new File([blob], "hello.txt", {
    type: "text/plain",
});
```

![image](./img/file-blob.png)


</br>




> dataTransfer.files


```javascript
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
```

![image](./img/file-drag.png)


</br>

参考：[File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)、[DragEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent)、[DataTransfer](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)


</br>
</br>












### 关系

经过以上分析，我们可以简单梳理出DataURL、Blob、File三者之间的关系:

![image](./img/relationship.png)

</br>
</br>






完整的代码已经上传到GitHub，请移步查看[demo](https://github.com/HeJueting/Blog/tree/master/%E5%89%8D%E7%AB%AF%E9%9A%8F%E7%AC%94/webpack%E8%87%AA%E5%AE%9A%E4%B9%89%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F/demo)



</br>