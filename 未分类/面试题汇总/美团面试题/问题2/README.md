### 题目

不重复的先下降后上升数列 nums，查找数值 m 的下标或返回 -1

</br>
</br>

### 巧解

利用 Array.indexOf 这个 API，再搭配 while 循环很容易就找到了 ~

```javascript
function find(nums, m) {
	const res = [];
	while (nums.indexOf(m) !== -1) {
		const index = nums.indexOf(m);
		nums[index] = m + 1;
		res.push(index);
	}
	return res.length ? res : -1;
}
```

</br>
</br>

### 方案一

1. 先利用二分查找，找到最小值

2. 再将原数组分成两个数组，对这两个顺序数组继续二分查找

```javascript
function find(nums, m) {
	// 如果是一个空数组，直接返回 -1
	if (!nums.length) {
		return -1;
	}
	// 临界情况，如果 m 大于 nums 两端的最大值，直接返回 -1 即可
	if (nums[0] < m && nums[nums.length - 1] < m) {
		return -1;
	}

	// result表示最后返回的结果
	let result = [];

	// 找到最小值
	const minIndex = findMin(nums);

	// 将数组一分为二
	const leftArr = nums.slice(0, minIndex);
	const rightArr = nums.slice(minIndex, nums.length);

	// 二分查找左右两个数组
	const leftIndex = findTarget(leftArr, m, false);
	const rightIndex = findTarget(rightArr, m);
	if (leftIndex > -1) {
		result.push(leftIndex);
	}
	if (rightIndex > -1) {
		result.push(rightIndex + leftArr.length);
	}

	return result.length ? result : -1;
}
// 利用二分法找到最小值
function findMin(arr) {
	let left = 0;
	let right = arr.length - 1;
	while (left < right) {
		// 取中间值下标
		let mid = left + Math.floor((right - left) / 2);
		// 如果 mid > mid + 1，说明中间值还在递增，缩小 left 的范围
		if (arr[mid] > arr[mid + 1]) {
			left = mid + 1;
		}
		// 递增则缩小 right 的范围
		else {
			right = mid;
		}
	}
	// 当范围缩小到仅剩一个值时，返回最小值的下标
	return left;
}
// 二分法查找顺序数组的目标值，order代表顺序和倒叙
function findTarget(arr, target, order = true) {
	let left = 0;
	let right = arr.length - 1;
	while (left <= right) {
		// 取中间值下标
		let mid = left + Math.floor((right - left) / 2);
		if (target < arr[mid]) {
			order ? (right = mid - 1) : (left = mid + 1);
		} else if (target > arr[mid]) {
			order ? (left = mid + 1) : (right = mid - 1);
		} else {
			return mid;
		}
	}
	return -1;
}
```

### 方案二

1. 只使用一次二分法查找也可以实现

2. 需要注意很多条件判断，需要根据中间值目前所处的位置（升序还是降序），再去递归找 m 的值

```javascript
function find(nums, m) {
	// 如果是一个空数组，直接返回 -1
	if (!nums.length) {
		return -1;
	}
	// 临界情况，如果 m 大于 nums 两端的最大值，直接返回 -1 即可
	if (nums[0] < m && nums[nums.length - 1] < m) {
		return -1;
	}

	const result = [];

	function findTarget(arr, target, startIndex = 0) {
		// 找到中间值下标
		const midIndex = Math.floor(arr.length / 2);
		const midValue = arr[midIndex];
		const leftValue = arr[midIndex - 1];
		const rightValue = arr[midIndex + 1];
		// 得到 newStartIndex
		const newStartIndex = startIndex + midIndex + 1;
		// 以中间值为界限，将数组分为左右两个数组
		const leftArr = arr.slice(0, midIndex);
		const rightArr = arr.slice(midIndex + 1, arr.length);

		if (target > midValue) {
			// 如果 left < midValue < right，则继续在 right 部分寻找 target
			// left 递减部分也可能存在
			if (leftValue < midValue && midValue < rightValue) {
				findTarget(rightArr, target, newStartIndex);
				// 如果 left 部分的最大值大于了 target，也可能在 left 部分存在
				if (target <= arr[0]) {
					findTarget(leftArr, target, startIndex);
				}
			}
			// 如果 left > midValue > right，则继续在 left 部分寻找 target
			// right 递增部分也可能存在
			else if (leftValue > midValue && midValue > rightValue) {
				findTarget(leftArr, target, startIndex);
				// 如果 right 部分的最大值大于了 target，也可能在 right 部分存在
				if (target <= arr[arr.length - 1]) {
					findTarget(rightArr, target, newStartIndex);
				}
			}
			// left < midValue > right，target 刚好是最小值，left 和 right 中可能都会存在
			else {
				// arr[0] > target，继续查找 left 部分
				if (arr[0] >= target) {
					findTarget(leftArr, target, startIndex);
				}
				// arr[arr.length - 1] > target，继续查找 right 部分
				if (arr[arr.length - 1] >= target) {
					findTarget(rightArr, target, newStartIndex);
				}
			}
		} else if (target < midValue) {
			// 如果 left < midValue < right，则继续在 left 部分寻找 target
			if (leftValue < midValue && (midValue < rightValue || !rightValue)) {
				findTarget(arr.slice(0, midIndex), target, startIndex);
			}
			// 如果 left > midValue > right，则继续在 right 部分寻找 target
			else if (leftValue > midValue && midValue > rightValue) {
				findTarget(rightArr, target, newStartIndex);
			}
		} else {
			// 中间值刚好等于 target，直接 push 到 result 中
			result.push(newStartIndex - 1);
		}
	}

	findTarget(nums, m);

	return result.length ? result : -1;
}
```

</br>
</br>