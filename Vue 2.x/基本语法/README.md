# 基本语法

</br>

### 插值、表达式

```html
<!-- 插入变量 -->
<p>hello, {{ name }}</p>

<!-- 插入javascript表达式 -->
<p>{{ ok ? 'yes' : 'no' }}</p>
<p>{{ arr.reverse().join('') }}</p>
```

</br>
</br>

### 动态属性

冒号后面的属性，就是一个动态属性，我们**可以传入插值或者表达式**

```html
<p :class="testClass"></p>
<p :style="{ color: loading ? 'red' : 'blue' }"></p>
```

</br>
</br>

### 插入 html（有 xss 风险）

```html
<!-- testHtml是一个html格式的变量 -->
<p v-html="testHtml"></p>
```

</br>
</br>

### computed 和 watch

**1. computed：** 有缓存，引用的 data 不变不会重新计算

```javascript
computed: {
    // result的值依赖于num和ratio变量
    result: () => {
        return this.num * this.ratio
    },
}
```

**2. watch：** 通过 deep 属性深度监听，引用类型拿不到 oldVal

```javascript
watch: {
    // 监听name变量
    name: (val, oldVal) => { /* ... */ },
    // 深度监听obj变量
    obj: {
        handler: (val, oldVal) => {
            /* obj是引用类型，拿不到oldVal */
        },
        deep: true
    },
}
```

</br>
</br>

### v-if 和 v-show

**1. v-if：** 不会渲染这个 dom 节点

```html
<p v-if="visible">hello</p>
```

**2. v-show：** 通过 display 来隐藏显示，如果切换频繁，用 v-show 更好

```html
<p v-show="visible">hello</p>
```

</br>
</br>

### 循环列表

1. v-for 和 v-if 不能同时使用（原因：如果同时存在，先 v-for 再执行 v-if，浪费资源，可以提升到父级使用）

2. v-for 也可以遍历对象

3. 必须加上 key 值

```javascript
// 遍历数组
const items = ['a', 'b'];
<div v-for="(item, index) in items" :key="item">
    {{ item }}
</div>

// 遍历对象
const objs = { a: 'a', b: 'b' };
<div v-for="(val, key, index) in objs" :key="key">
    {{ val }}
</div>
```

</br>
</br>

### 事件

**1.** $event 是原生的 event 对象

**2.** 事件被挂载到当前的元素

```html
<button @click="click"></button>

<button @click="click('hello', $event)"></button>
```

**3.** 常用事件修饰符

```html
<!-- 停止冒泡 -->
<button @click.stop="click"></button>
<!-- 阻止默认行为 -->
<button @click.prevent="click"></button>
<!-- 串联修饰符：停止冒泡 + 阻止默认行为 -->
<button @click.prevent.stop="click"></button>
<!-- 键修饰符 -->
<input @keyup.13="onEnter" />
<!-- 点击事件只会触发一次 -->
<button @click.once="click"></button>
```

</br>
</br>
