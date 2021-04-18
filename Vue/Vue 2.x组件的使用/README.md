### props 和 $emit（父子组件通信）

● props：父组件向子组件**传递数据**

● $emit：父组件向子组件**传递事件**

```html
<!-- parent 父组件 -->
<template>
	<div>
		<h3>props和$emit的使用</h3>
		<child text="child" @over="over" />
	</div>
</template>
<script>
	import child from "./child.vue";
	export default {
		components: { child },
		methods: {
			over() {
				console.log("over");
			},
		},
	};
</script>

<!-- child 子组件 -->
<template>
	<h6>子组件：{{ text }}</h6>
</template>
<script>
	export default {
		props: {
			text: {
				type: String,
				default: "默认值",
			},
		},
		mounted() {
			this.$emit("over");
		},
	};
</script>
```

</br>
</br>

### 自定义事件（兄弟/任意组件通信）

```javascript
// parent 父组件
<template>
	<div>
		<bro1 />
		<bro2 />
	</div>
</template>
<script>
	import bro1 from "./bro_1.vue";
	import bro2 from "./bro_2.vue";
	export default {
		components: { bro_1, bro_2 },
	};
</script>

// event.js
import Vue from "vue";
export default new Vue();

// bro1
<template>
	<h6>兄弟组件：bro1</h6>
</template>
<script>
	import event from "./event";
	export default {
		methods: {
			// 定义talk方法
			talk(name) {
				console.log("hello ", name);
			},
		},
		mounted() {
			// 注册talk方法
			event.$on("talk", this.talk);
		},
	};
</script>

// bro2
<template>
    <h6>兄弟组件：bro2</h6>
</template>
<script>
    import event from "./event";
    export default {
        mounted() {
            // 调用bro1的talk方法
            event.$emit("talk", "hejueting");
        },
    };
</script>
```

</br>
</br>

### 组件的生命周期

● 父组件 created —> 子组件 created —> 子组件 mounted —> 父组件 mounted

● 父组件 beforeUpdate —> 子组件 beforeUpdate —> 子组件 updated —> 父组件 updated

● 父组件 beforeDestroy —> 子组件 beforeDestroy —> 子组件 destroyed —> 父组件 destroyed

**挂载阶段：**

-   beforeCreate

-   created：初始化了 vue 实例

-   beforeMount

-   mounted：页面已经渲染完成

**更新阶段：**

-   beforeUpdate

-   updated

**销毁阶段：**

-   beforeDestroy：销毁自定义事件、事件监听、定时器

-   destroyed

</br>
</br>
