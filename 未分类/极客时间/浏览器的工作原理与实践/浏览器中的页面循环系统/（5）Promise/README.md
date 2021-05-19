# Promise

</br>

### 回调地狱

```javascript
// 数据请求
function getData(url, done) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                done(xhr.responseText);
            }
        }
    };
    xhr.open("Get", url, true);
    xhr.send();
}

getData("https://yapi.baidu.com/mock/60651/test", (data1) => {
    getData("https://yapi.baidu.com/mock/60651/test", (data2) => {
        getData("https://yapi.baidu.com/mock/60651/test", (data3) => {
            console.log(data1, data2, data3);
        });
    });
});
```

</br>
</br>

### 使用 promise 解决回调地狱问题

以链式调用的方式解决了回调地狱的问题，满足我们的同步开发逻辑

```javascript
function getData(url) {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.open("Get", url, true);
        xhr.send();
    });
}

let data1, data2, data3;
getData("https://yapi.baidu.com/mock/60651/test")
    .then((data) => {
        data1 = data;
        return getData("https://yapi.baidu.com/mock/60651/test");
    })
    .then((data) => {
        data2 = data;
        return getData("https://yapi.baidu.com/mock/60651/test");
    })
    .then((data) => {
        data3 = data;
        console.log(data1, data2, data3);
    });
```

</br>
</br>

### Promise 特点

1. promise 有 pending/resolve/reject 三种状态，一旦状态改变，任何时刻都可以得到 promise 的结果

2. promise 优点：解决了回调地狱的问题，通过 then 方式让回调变得更优雅

3. promise 缺点：一旦创建了就无法取消，且处于 pending 状态时，无法得知目前进展

</br>
</br>

### 如何实现 Promise

```javascript
function myPromise(executor) {
    this.status = "PENDING";
    this.value = undefined;
    this.err = undefined;
    this.onResolveFunc = [];
    this.onRejectFunc = [];

    this.then = (onSuccess, onFailed) => {
        console.log("调用then方法");
        const successIsFunc = onSuccess && typeof onSuccess === "function";
        const failedIsFunc = onFailed && typeof onFailed === "function";
        if (this.status === "RESOLVE") {
            successIsFunc && onSuccess(this.value);
        }
        if (this.status === "REJECT") {
            failedIsFunc && onFailed(this.err);
        }
        if (this.status === "PENDING") {
            successIsFunc && this.onResolveFunc.push(onSuccess);
            failedIsFunc && this.onRejectFunc.push(onFailed);
        }
    };

    const resolve = (data) => {
        console.log("调用 resolve 方法");
        this.value = data;
        this.status = "RESOLVE";
        // 执行异步回调函数
        this.onResolveFunc.forEach((func) => {
            func(this.value);
        });
    };

    const reject = (err) => {
        console.log("调用 reject 方法");
        this.err = err;
        this.status = "REJECT";
        // 执行异步回调函数
        this.onRejectFunc.forEach((func) => {
            func(this.err);
        });
    };

    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}
```

```javascript
function getData(url) {
    return new myPromise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.open("Get", url, true);
        xhr.send();
    });
}

getData("https://yapi.baidu.com/mock/60651/test").then((data) => {
    console.log("执行了");
    console.log(data);
});
```

to do list ... 如何实现 then 方法的链式调用

</br>
</br>
