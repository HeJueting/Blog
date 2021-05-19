# WebAPI：XMLHttpRequest 是怎么实现的？

</br>

### 回调函数

将一个函数作为参数传递给另外一个函数，那**作为参数的这个函数就是回调函数**

1. 同步回调：在主函数执行完之后，立即执行的过程叫同步回调

2. 异步回调：在主函数外部执行的过程称为异步回调，一般有两种方式：

    - 第一种是把异步函数做成一个任务，添加到信息队列尾部
    - 第二种是把异步函数添加到微任务队列中，这样就可以在当前任务的末尾处执行微任务了

</br>
</br>

### 编码使用

```javascript
function GetWebData(URL) {
    // 新建 XMLHttpRequest 请求对象
    let xhr = new XMLHttpRequest();

    // 注册相关事件回调处理函数
    xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
            case 0:
                console.log("请求未初始化");
                break;
            case 1:
                console.log("OPENED");
                break;
            case 2:
                console.log("HEADERS_RECEIVED");
                break;
            case 3:
                console.log("LOADING");
                break;
            case 4:
                if (this.status == 200 || this.status == 304) {
                    console.log(this.responseText);
                }
                console.log("DONE");
                break;
        }
    };
    xhr.ontimeout = function (e) {
        console.log("ontimeout");
    };
    xhr.onerror = function (e) {
        console.log("onerror");
    };

    // 打开请求
    xhr.open("Get", URL, true);

    // 配置参数: 超时时间、返回的数据格式、请求头
    xhr.timeout = 3000;
    xhr.responseType = "text";
    xhr.setRequestHeader("X_TEST", "time.geekbang");

    // 发送请求
    xhr.send();
}
```

</br>

### XMLHttpRequest 运作机制

1. 发起请求后，渲染进程将该请求资源交给网络进程进行处理

2. 网络进程处理完该资源后，又将请求的数据递交给渲染进程

3. 渲染进程接收到消息之后，会将 xhr 的回调函数封装成任务并添加到消息队列中

</br>
</br>
