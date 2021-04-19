# 组件的使用

</br>

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

### 自定义 v-modal（双向数据绑定）

```javascript
// parent 父组件
<template>
    <div>
        <p>{{ name }}</p>
        <customVModel v-model="name" />
    </div>
</template>
</template>
<script>
    import customVModel from "./customVModel.vue";
    export default {
        components: { customVModel },
        data() {
            return {
                name: "hejueting",
            };
        },
    };
</script>

// customVModel 组件
<template>
    <input type="text" :value="value" @input="$emit('change', $event.target.value)" />
</template>
<script>
    export default {
        model: {
            // 这里的value要跟props中的value字段保持一致
            prop: "value",
            event: "change",
        },
        props: {
            value: {
                type: String,
                default: "",
            },
        },
    };
</script>
```

</br>
</br>

### ref 和 $nextTick

● $nextTick：会在 DOM 渲染之后触发，以获取最新的 DOM 节点

```javascript
<template>
    <div>
        <ul ref="ul">
            <li v-for="item in list" :key="item">{{ item }}</li>
        </ul>
        <button @click="add">新增</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: ["a", "b", "c"],
        };
    },
    methods: {
        add() {
            this.list.push(+new Date());
            const ulDom = this.$refs.ul;
            // 获取数据更新后最新的 DOM 节点
            this.$nextTick(() => {
                console.log("$nextTick:", ulDom.childNodes.length);
            });
        },
    },
};
</script>
```

</br>
</br>

### slot 插槽

**基本使用**

将父组件的一些内容插到子组件中（类似于 React 的 children）

```javascript
// parent 父组件
<template>
    <slotBasic>
        <p>这是插槽内容</p>
        <p>类似于React中的Children</p>
    </slotBasic>
</template>

// slotBasic 组件
<template>
    <div>
        <slot>如果没有传内容，这就是默认内容</slot>
    </div>
</template>
```

</br>

**作用域插槽**

父组件插入子组件的内容有一部分依赖于从子组件中的数据

```javascript
// parent 父组件
<template>
    <slotScope>
        <template v-slot="slotProps">
            <p>我是作用域插槽，我插入的内容可以依赖于子组件的数据</p>
            <p>hello, {{ slotProps.slotData.name }}</p>
        </template>
    </slotScope>
</template>

// slotScope 组件
<template>
    <div>
        <slot :slotData="data">如果没有传内容，这就是默认内容</slot>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: {
                    name: "hejueting",
                },
            };
        },
    };
</script>
```

</br>

**具名插槽**

子组件接收多个 slot 时，在父组件中在 template 上添加一个 name 属性来跟子组件的 slot 形成一一对应

```javascript
// parent 父组件
<template>
    <slotName>
        <template v-slot:header>
            <p>this is header</p>
        </template>
        <template v-slot:content>
            <p>this is content</p>
        </template>
        <template v-slot:footer>
            <p>this is footer</p>
        </template>
    </slotName>
</template>

// slotName 组件
<template>
    <div>
        <slot name="header"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
    </div>
</template>
```

</br>
</br>

### 动态组件

利用 component 和:is 来实现，其实就是根据变量来动态渲染组件，与 v-if 作用类似

```javascript
// parent 父组件
<template>
    <div>
        <component :is="dynamicComponent" />
        <button @click="dynamicComponent = 'dynamicComponentA'">渲染A</button>
        <button @click="dynamicComponent = 'dynamicComponentB'">渲染B</button>
        <button @click="dynamicComponent = 'dynamicComponentC'">渲染C</button>
    </div>
</template>
<script>
    import dynamicComponentA from "./dynamicComponentA";
    import dynamicComponentB from "./dynamicComponentB";
    import dynamicComponentC from "./dynamicComponentC";
    export default {
        components: {
            dynamicComponentA,
            dynamicComponentB,
            dynamicComponentC,
        },
        data() {
            return {
                // 动态组件的名称
                dynamicComponent: "dynamicComponentA",
            };
        },
    };
</script>

// dynamicComponentA / dynamicComponentB / dynamicComponentC 组件
<template>
    <p>dynamicComponentA</p>
</template>
<template>
    <p>dynamicComponentB</p>
</template>
<template>
    <p>dynamicComponentC</p>
</template>
```

</br>
</br>

### 异步组件

使用 import 函数，按需加载

```javascript
<template>
    <div>
        <asyncComponent v-if="asyncComponentShow" />
        <button @click="asyncComponentShow = true">加载异步组件</button>
    </div>
</template>
<script>
    export default {
        components: {
            asyncComponent: () => import("./asyncComponent.vue"),
        },
        data() {
            return {
                // 是否展示异步组件
                asyncComponentShow: false,
            };
        },
    };
</script>
```

</br>
</br>

### keep-alive

缓存组件，避免组件反复创建和渲染，频繁切换组件时使用（Vue 性能优化）

```javascript
<template>
    <div>
        <keep-alive>
            <keepAliveA v-if="keepAliveState === 'A'" />
            <keepAliveB v-if="keepAliveState === 'B'" />
        </keep-alive>
    </div>
</template>
```

</br>
</br>

### mixin

用于抽离多个组件的相同逻辑（代码可读性较差）

</br>
</br>
