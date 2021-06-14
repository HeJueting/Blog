# Promise 面试题

</br>
</br>

### 题目一

promise 中并没有 resolve 或者 reject，因此 promise.then 并不会执行，它只有在被改变了状态之后才会执行。

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

2. .then 和.catch 都会返回一个新的 Promise

3. catch 不管被连接到哪里，都能捕获上层未捕捉过的错误

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
	})
	.then((res) => {
		console.log("then3: ", res);
	});
// catch: error
// then3: undefined
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

### 题目五

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

### 题目五

.finally 方法也是返回一个 Promise，他在 Promise 结束的时候，无论结果为 resolved 还是 rejected，都会执行里面的回调函数

1. .finally()方法不管 Promise 对象最后的状态如何都会执行

2. .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道 Promise 最终的状态是 resolved 还是 rejected 的

3. 它最终返回的默认会是一个上一次的 Promise 对象值，不过如果抛出的是一个异常则返回异常的 Promise 对象。

```javascript
Promise.resolve("1")
	.then((res) => {
		console.log(res);
	})
	.finally(() => {
		console.log("finally");
	});
Promise.resolve("2")
	.finally(() => {
		console.log("finally2");
		return "我是finally2返回的值";
	})
	.then((res) => {
		console.log("finally2后面的then函数", res);
	});
// 1
// finally2
// finally
// finally2后面的then函数 2
```

https://juejin.cn/post/6844904077537574919#heading-22

</br>
</br>
