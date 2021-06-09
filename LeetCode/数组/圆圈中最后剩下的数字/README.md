# 圆圈中最后剩下的数字

</br>

### 题目

0,1,···,n-1 这 n 个数字排成一个圆圈，从数字 0 开始，每次从这个圆圈里删除第 m 个数字（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。

例如，0、1、2、3、4 这 5 个数字组成一个圆圈，从数字 0 开始每次删除第 3 个数字，则删除的前 4 个数字依次是 2、0、4、1，因此最后剩下的数字是 3。

```javascript
// 示例 1
输入: n = 5, m = 3
输出: 3

// 示例 2
输入: n = 10, m = 17
输出: 2
``` 

</br>
</br>


### 递归求解

这种解决方案，当 m 和 n 过于庞大之后会存在栈溢出的问题

```javascript
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
    // 先将n转化为一个数组
    const array = [];
    for(let i=0; i<n; i++) {
        array.push(i)
    }

    // 递归删除
    function deep(arr, m) {
        // 如果被删除得只剩下一个数字
        if(arr.length === 1) {
            return arr[0];
        }

        // 被删除的数组下标
        let index = m;

        // 如果数组长度已经小于了m，index下标需要重新计算
        // 例如：1 2 3 删除第4个 其实删除的是 1
        if(arr.length < m) {
            // 如果刚好被整除，说明删除的是最后一个元素
            if(m % arr.length === 0) {
                index = arr.length;
            }else {
                index = m % arr.length;
            }
        }

        // 拼接构造一个新的数组
        const newArr = arr.slice(index, arr.length).concat(arr.slice(0, index-1));

        // 继续删除直到，只剩下一个数字
        return deep(newArr, m);
    }

    const res = deep(array, m);
    return res;
};
```

</br>
</br>

### 约瑟夫环

f(M, N) = ( f(M−1, N) + N ) % M

```javascript
function lastRemaining(m, n) {
	// 只有 1 个人的时候，那个人就是获胜者，他的下标位置是 0
	let p = 0;

	// 从 n=2 开始遍历
	for (let i = 2; i <= m; i++) {
		// 根据约瑟夫环的公式
		p = (p + n) % i;
	}
	return p;
}
```

</br>
</br>
