# async 和 await

</br>

### 同步逻辑编写异步代码

ES7 引入了 async/await，这是 JavaScript 异步编程的一个重大改进，提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力，并且使得代码逻辑更加清晰

```javascript
(async function () {
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

    const data1 = await getData("https://yapi.baidu.com/mock/60651/test");
    const data2 = await getData("https://yapi.baidu.com/mock/60651/test");
    const data3 = await getData("https://yapi.baidu.com/mock/60651/test");

    console.log(data1, data2, data3);
})();
```

</br>
</br>

### 协程

协程是一种比线程更加轻量级的存在，**一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程**，比如当前执行的是 A 协程，要启动 B 协程，那么 A 协程就需要将主线程的控制权交给 B 协程，这就体现在 A 协程暂停执行，B 协程恢复执行；同样，也可以从 B 协程中启动 A 协程。**生成器就是协程的一种实现方式**

</br>
</br>

### 生成器（Generator）

1. 生成器函数是一个带星号函数，而且是可以暂停执行和恢复执行的

2. **如果遇到 yield 关键字，那么 JavaScript 引擎将返回关键字后面的内容给外部，并暂停该函数的执行**

```javascript
var x = 1;
function* genDemo() {
    yield (x = 2);
    yield (x = 3);
    return 4;
}
let gen = genDemo();
console.log(x); // 1
console.log(gen.next()); // {value: 2, done: false}
console.log(x); // 2
console.log(gen.next()); // {value: 3, done: false}
console.log(x); // 3
console.log(gen.next()); // {value: 4, done: true}
```

</br>
</br>

### async/await 的工作原理

1. async：是一个通过**异步执行**并**隐式返回 Promise 作为结果**的函数

2. await：执行到 await 时，会**默认创建一个 Promise 对象**，同时 JavaScript 引擎会暂停当前协程的执行，将主线程的控制权转交给父协程执行

```javascript
// 例如
const a = await 100;

// 等价于
const promise = new Promise((resolve, reject) => {
    resolve(100);
});
```

</br>
</br>

### 案例分析

```javascript
async function foo() {
    console.log(1);
    let a = await 100;
    console.log(a);
    console.log(2);
}
console.log(0);
foo();
console.log(3);
// 0 1 3 100 2
```

1. 声明了 foo 函数，执行 console.log(0) 打印 0

2. 执行 foo 函数，创建执行上下文，打印 1

3. 执行到 await，创建一个 promise 对象，并将该任务加入到微任务中，暂停后续操作，跳出 foo 函数，交给主线程继续执行

4. 执行 console.log(3)，打印 3，主线程执行完毕

5. 当 Promise.then 中回调函数触发后，再回到协程中

6. 继续执行 console.log(a)，打印 100；执行 console.log(2) 打印 2

</br>
</br>

### 基于 Promise 和 Generator 实现 async/await 函数的功能

```javascript
let res = null;
// myawait 函数接受一个可执行的 executor 操作
function myAwait(executor) {
    console.log("开始执行 myAwait 函数了...");
    // 创建一个promise对象，并resolve(executor)
    const p = new Promise((resolve, reject) => {
        resolve(executor);
    });
    // 当 p.then 的回调函数触发后，继续执行后续阻塞的任务
    p.then((data) => {
        console.log("p.then 函数触发了...");
        res = data;
        gen.next();
    });
}
function* myAsync() {
    console.log("开始执行 myAsync 任务了...");
    const data1 = yield myAwait(fetch("https://yapi.baidu.com/mock/60651/test"));
    console.log("继续执行 myAwait 的后续任务了...");
    console.log("res:", res);
}
console.log("任务1执行.....");

const gen = myAsync();
gen.next();

console.log("任务3执行.....");
console.log("主线程任务执行完成啦，通知 myAwait 继续执行.....");
```

```javascript
// 任务1执行.....
// 开始执行 myAsync 任务了...
// 开始执行 myAwait 函数了...
// 任务3执行.....
// 主线程任务执行完成啦，通知 myAwait 继续执行.....
// p.then 函数触发了...
// 继续执行 myAwait 的后续任务了...
// res: ....
```

</br>
</br>
