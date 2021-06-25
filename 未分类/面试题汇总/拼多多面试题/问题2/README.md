### 题目描述

封装一个 fetchData，如果用户某个时刻多次调用 fetchData，该方法会自动将这些请求进行合并，然后只用发送一次 http 请求就能返回其数据

要求：

1. 在页面渲染的之前进行触发

</br>
</br>

### 实现

```javascript
// 收集页面渲染前的所有请求
let collect = [];
// 记录每一次合并请求后的结果
let results = null;

function fetchData(params) {
    // 先记录这个请求，不会立刻发起请求，以url地址作为key
    collect.push(params);

    // 利用requestAnimationFarame在下一次渲染前触发
    requestAnimationFarame(async () => {
        // 如果collect中存在需要请求的接口
        if (collect.length) {
            // 一次性请求所有接口
            results = await fetch("http://mergeAjax", {
                method: "post",
                body: JSON.stringify(collect),
            });
            // 重置collect
            collect = [];
        }
    });

    fetchData.then = (onsuccess) => {
        onsuccess;
    };
}

fetchData({
    url: "http://aaaa",
    method: "get",
    data: "aaaa",
}).then((res) => {
    console.log(res);
});
fetchData({
    url: "http://bbb",
    method: "post",
    data: "bbb",
});
```
