### 题目描述

1. async 函数的返回值是一个 promise 对象

2. async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态。抛出的错误对象会被 catch 方法回调函数接收到

3. await 命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值

4. 任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行

```javascript
async function async1() {
	console.log("async1 start");
	await async2();
	console.log("async1 end");
}
async function async2() {
	console.log("async2 start");
}

async1();

setTimeout(() => {
	console.log("setTimeout");
});

console.log("script start");

new Promise((resolve, reject) => {
	console.log("promise start");
	resolve();
}).then(() => {
	console.log("promise end");
});

console.log("script end");

// async1 start
// async2 start
// script start
// promise start
// script end
// async1 end
// promise end
// setTimeout
```
