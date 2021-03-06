# Promise 常见考点

</br>
</br>

### 题目一

如果 promise 中没有 resolve 或者 reject，就不会触发 then 和 catch 方法

```javascript
const promise = new Promise((resolve, reject) => {
    console.log(1);
    console.log(2);
});
promise.then(() => {
    console.log(3);
});
console.log(4);
// 1 2 4
```

</br>
</br>

### 题目二

1. Promise 的状态一经改变就不能再改变

2. catch 不管被连接到哪里，都能捕获上层未捕捉过的错误

```javascript
const promise = new Promise((resolve, reject) => {
    reject("error");
    resolve("success1");
    resolve("success2");
});
promise
    .then((res) => {
        console.log("then1: ", res);
    })
    .then((res) => {
        console.log("then2: ", res);
    })
    .catch((err) => {
        console.log("catch: ", err);
    });
// catch: error
```

</br>
</br>

### 题目三

1. .then 和.catch 都会返回一个新的 Promise

2. 在 Promise 中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如 return 3 会被包装为 return Promise.resolve(3)

3. .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，相当于 return new Promise.resolve( new Error('error!!') )

```javascript
Promise.reject(1)
    .then((res) => {
        console.log(res);
        return 2;
    })
    .catch((err) => {
        console.log(err);
        return 3;
    })
    .then((res) => {
        console.log(res);
    });
// 1 3

Promise.resolve()
    .then(() => {
        return new Error("error!!!");
    })
    .then((res) => {
        console.log("then: ", res);
    })
    .catch((err) => {
        console.log("catch: ", err);
    });
// then: Error: error!!!
```

</br>
</br>

### 题目四

.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环

```javascript
const promise = Promise.resolve().then(() => {
    return promise;
});
promise.catch(console.err);
// Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
```

</br>
</br>

### 题目五

1. Promise 的 .then 或者 .catch 可以被调用多次, 但如果 Promise 内部的状态一经改变，并且有了一个值，那么后续每次调用.then 或者.catch 的时候都会直接拿到该值

2. .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("success");
});
promise.then((res) => {
    console.log(res);
});
promise.then((res) => {
    console.log(res);
});
// success
// success

Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
// 1
```

</br>
</br>

### 题目六

.then 方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，**在某些时候你可以认为 catch 是.then 第二个参数的简便写法**

```javascript
Promise.reject("err!!!")
    .then(
        (res) => {
            console.log("success", res);
        },
        (err) => {
            console.log("error", err);
        }
    )
    .catch((err) => {
        console.log("catch", err);
    });
// error error!!!

Promise.resolve()
    .then(
        function success(res) {
            throw new Error("error!!!");
        },
        function fail1(err) {
            console.log("fail1", err);
        }
    )
    .catch(function fail2(err) {
        console.log("fail2", err);
    });
// fail2 error!!!
```

</br>
</br>

### 题目七

1. .finally 方法也是返回一个 Promise，他在 Promise 结束的时候，无论结果为 resolved 还是 rejected，都会执行里面的回调函数

2. .finally 方法不管 Promise 对象最后的状态如何都会执行

3. .finally 方法的回调函数不接受任何的参数，也就是说你在 .finally 函数中是没法知道 Promise 最终的状态是 resolved 还是 rejected 的

4. 它最终返回的默认会是一个上一次的 Promise 对象值，不过如果抛出的是一个异常则返回异常的 Promise 对象。

5. **.finally() .catch .then 中定义的回调函数都是一个微任务**，链式调用时，需要等待上一个链式调用的函数执行完成之后，才能加入微任务队列

```javascript
function promise1() {
    let p = new Promise((resolve) => {
        console.log("promise1");
        resolve("1");
    });
    return p;
}
function promise2() {
    return new Promise((resolve, reject) => {
        reject("error");
    });
}
promise1()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => console.log("finally1"));

promise2()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => console.log("finally2"));
// promise1
// 1
// error
// finally1
// finally2
```

</br>
</br>

### 题目八

Promise.race() 接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。

```javascript
function asyncPromise(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(x);
            resolve(x);
        }, 1000 * x);
    });
}

Promise.race([asyncPromise(1), asyncPromise(2), asyncPromise(3)]).then((res) => {
    console.log("promise.race：", res);
});
// 1  (1s后输出)
// promise.race： 1
// 2  (2s后输出)
// 3  (3s后输出)
```

</br>
</br>
