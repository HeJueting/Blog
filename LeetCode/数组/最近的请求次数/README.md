# 最近的请求次数

</br>

### 题目

写一个 RecentCounter 类来计算特定时间范围内最近的请求：

-   RecentCounter() 初始化计数器，请求数为 0
-   int ping(int t) 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 [t-3000, t] 内发生的请求数
-   保证 每次对 ping 的调用都使用比之前更大的 t 值

```
// 示例
输入：
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
输出：
[null, 1, 2, 3, 3]

解释：
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1]，范围是 [-2999,1]，返回 1
recentCounter.ping(100);   // requests = [1, 100]，范围是 [-2900,100]，返回 2
recentCounter.ping(3001);  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3
```

</br>
</br>

### 思路

1. 利用队列先入先出的特性

2. 先让传入的 t 入列队，然后不断遍历队列的第一项，如果小于 t-3000 就让第一项出队列

3. 最后队列的长度就是符合要求的请求数量

</br>
</br>

### 求解

```javascript
var RecentCounter = function () {
    this.queue = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
    this.queue.push(t);
    // 每次入队时，循环判断队列的第一项是否符合要求，不符合则出队
    while (this.queue[0] < t - 3000) {
        this.queue.shift();
    }
    return this.queue.length;
};
```

</br>
</br>

**题目来自：[LeetCode-最近的请求次数](https://leetcode-cn.com/problems/number-of-recent-calls/)**
