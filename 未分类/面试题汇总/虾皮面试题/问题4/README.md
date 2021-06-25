### 题目

1. async 函数的返回值会默认包装成一个 promise 对象

```javascript
async function async1() {
    console.log("async1 start");
    // 第一个微任务
    await async2();
    console.log("async1 end");
}
async function async2() {
    console.log("async2 start");
}

async1();

setTimeout(() => {
    // 第一个宏任务
    console.log("setTimeout");
});

console.log("script start");

new Promise((resolve, reject) => {
    console.log("promise start");
    resolve();
}).then(() => {
    // 第二个微任务
    console.log("promise end");
});

console.log("script end");

// async1 start  （先执行 async1 函数体）
// async2 start  （再执行 async2 函数体）
// script start  （执行主函数）
// promise start （promise 主函数正常顺序执行）
// script end    （主函数执行完毕）
// async1 end    （async2由于没有返回值，默认返回一个promise.resolve()，因为await的原因，console.log("async1 end")需要等async2返回的promise.resolve这个微任务执行完之后才能继续执行）
// promise end   （执行第二个微任务）
// setTimeout    （执行第一个宏任务）
```

</br>
</br>
