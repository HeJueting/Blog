# webpack 自定义环境变量

</br>
</br>

### 前言

> 通过 webpack 的 mode 参数，可以设置 NODE_ENV 环境变量去区分开发环境（development）、生产环境（production）。但是在实际开发过程中，可能存在多种环境（开发、测试、预发布、线上），亦或是该项目嵌入不同平台（不同平台的一些配置会有所差异）。这种时候我们可以通过自定义环境变量去解决该类问题。

</br>
</br>

### process

-   process 对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制。

-   在 package.json 中，scripts 字段能自定义脚本命令，我们通常会在此处自定义一个 NODE_ENV 变量去判断生产环境或开发环境。

```javascript
//windows:
{
  "scripts": {
    "build:one": "set NODE_ENV=production && webpack",
  }
}
//macOS:
{
  "scripts": {
    "build:one": "NODE_ENV=production && webpack",
  }
}
//linux
{
  "scripts": {
    "build:one": "export NODE_ENV=production && webpack",
  }
}
```

然后 NODE_ENV 变量会挂在 process.env 属性上（该属性包含了用户环境的对象），我们直接访问 process.env.NODE_ENV ：

```javascript
console.log(process.env.NODE_ENV); // production
```

</br>
</br>

### cross-env

-   不同平台（window、macOS、linux）的脚本命令有所不同

-   cross-env 可跨平台设置环境变量

```json
{
	"scripts": {
		"build": "cross-env NODE_ENV=production MODE=test webpack"
	}
}
```

在脚本命令中设置的 NODE_ENV 和 TYPE 变量都会挂载到 process.env 属性上

```javascript
console.log(process.env.NODE_ENV); // production
console.log(process.env.MODE); // test
```

</br>
</br>

### DefinePlugin

-   通过 cross-env 设置的环境变量，虽然在 webpack 配置文件中可以访问，但在项目编译过程中是无法访问的

-   DefinePlugin 插件允许你在代码编译期间，为整个项目配置全局变量，在 webpack 打包的时候会对这些变量做替换

```javascript
// webpack配置
const path = require("path");
const webpack = require("webpack");
module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "dist"),
	},
	plugins: [
		new webpack.DefinePlugin({
			MODE: "test",
		}),
	],
};

// 被打包的index.js文件
console.log(MODE); // 报错：test is not defined
```

</br>

打包编译后的结果如下：

```javascript
console.log(test);
```

MODE 在代码中直接被替换为了 test ，但我们本想赋值 test 字符串给 MODE，却赋值成为了 test 变量。这是因为在配置这些全局变量的时候，**如果传入的值为字符串，会被 webpack 解析为一个变量**，如果想要赋值一个真正的字符串我们可以这样做：

```javascript
// 方法一
MODE: "'test'";

// 方法二
MODE: JSON.stringify("test");
```

</br>

这里建议使用方法二，因为它不仅可以处理字符串，还可以处理对象：

```javascript
// webpack中变量定义
plugins: [
	new webpack.DefinePlugin({
		OBJ_1: JSON.stringify({
			MODE: "test",
		}),
		OBJ_2: {
			MODE: "test",
		},
		ARR_1: JSON.stringify(["value1", "value2"]),
		ARR_2: ["value1", "value2"],
	}),
];

// 被打包的index.js文件
console.log(OBJ_1);
console.log(OBJ_2);
console.log(ARR_1);
console.log(ARR_2);

// 打包后的编译结果
console.log({ MODE: "test" }); // 解析正确
console.log(Object({ MODE: test })); // 解析错误，test被替换成为了变量
console.log(["value1", "value2"]); // 解析正确
console.log(Object({ 0: value1, 1: value2 })); // 解析错误
```

</br>
</br>

完整的代码已经上传到 GitHub，请移步查看[demo](https://github.com/HeJueting/Blog/tree/master/%E5%89%8D%E7%AB%AF%E9%9A%8F%E7%AC%94/webpack%E8%87%AA%E5%AE%9A%E4%B9%89%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)

```json
1、下载 demo 文件夹内容
2、npm install 安装依赖
3、npm run build 打包
4、npm run start 执行打包后的bundle.js
```

</br>
</br>

参考文档：[MDN-DefinePlugin](https://www.webpackjs.com/plugins/define-plugin/)、[Node-process](http://nodejs.cn/api/process.html#process_process)、[GitHub-cross-env](https://github.com/kentcdodds/cross-env)
