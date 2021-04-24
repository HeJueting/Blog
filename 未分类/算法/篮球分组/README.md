# 篮球分组

</br>
</br>

### 前言

> 这周五报名了公司篮球协会举办的活动，出于公平起见，需要将所有报名活动的同事进行 5V5 随机分组，于是乎，写了一个篮球分组小脚本

</br>
</br>

### 5V5 随机分配

> 已知：所有篮球参与者 + 每组人数

```javascript
/*
 * athletes：所有运动员
 * number：每组分配多少人，5V5的话number就为5
 */
function setGroups(athletes, number) {
	// 默认至少一个组
	let groups = [[]];
	while (athletes.length > 0) {
		// 得到剩余的运动员数量
		let athletesLength = athletes.length;
		// 从剩余运动员中随机取出一个下标
		let index = Math.round(Math.random() * (athletesLength - 1));
		// 从groups取得最后一个组
		let lastGroupIndex = groups.length - 1;
		// 判断是否这个组已经满了
		if (groups[lastGroupIndex].length < number) {
			groups[lastGroupIndex].push(athletes[index]);
		} else {
			// 新增一个组
			groups.push([]);
			groups[lastGroupIndex + 1].push(athletes[index]);
		}
		// 从athletes中删除这个运动员
		athletes.splice(index, 1);
	}
	return groups;
}

setGroups(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"], 5);
```

</br>
</br>

### 篮球大魔王

> 可是如果强行让 CBA 的球员与 CUBA 的球员进行公平竞争，想必这场球赛也没有多大意义。实际分组过程中，还有一些不成文的规定：“ **篮球大魔王必须分开** ”。
>
> 已知：A、B、C 是三个篮球大魔王（不允许他们在一个队伍，不然还玩鸡鸡......）

```javascript
/*
 * athletes：所有运动员
 * number：每组分配多少人，5V5的话number就为5,
 * devils：篮球大魔王，不允许他们分在一个组
 */
function setGroups(athletes, number, devils) {
	// 判断每组最少有几个篮球大魔王
	minDevil = Math.floor(devils.length / (athletes.length / number));
	number -= minDevil;

	// 从athletes中过滤掉篮球大魔王
	athletes = athletes.filter((name) => devils.indexOf(name) == -1);

	// 默认至少一个组
	let groups = [[]];
	while (athletes.length > 0) {
		// 得到剩余的运动员数量
		let athletesLength = athletes.length;
		// 从剩余运动员中随机取出一个下标
		let index = Math.round(Math.random() * (athletesLength - 1));
		// 从groups取得最后一个组
		let lastGroupIndex = groups.length - 1;
		// 判断是否这个组已经满了
		if (groups[lastGroupIndex].length < number) {
			groups[lastGroupIndex].push(athletes[index]);
		} else {
			// 新增一个组
			groups.push([]);
			groups[lastGroupIndex + 1].push(athletes[index]);
		}
		// 从athletes中删除这个运动员
		athletes.splice(index, 1);
	}

	// 将这些大魔王随机分配到各个组中
	while (devils.length > 0) {
		// 从最后一组开始依次随机加入大魔王
		let i = groups.length - 1;
		for (i; i >= 0; i--) {
			if (devils.length > 0) {
				// 随机选出一个大魔王
				let index = Math.round(Math.random() * (devils.length - 1));
				groups[i].unshift(devils[index]);
				// 从devils中删除这个大魔王
				devils.splice(index, 1);
			} else {
				break;
			}
		}
	}

	return groups;
}

setGroups(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"], 5, ["A", "B", "C", "D"]);
```

</br>
</br>

**PS：虽然这只是生活中很小的一件事，也谈不上什么复杂的算法实现。但是仔细想想，用途还挺多的，于是就抽空写成了一篇博客，毕竟好记性不如烂笔头嘛~**

</br>
</br>
