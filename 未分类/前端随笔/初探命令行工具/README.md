# 初探命令行工具

</br>
</br>

### 前言

> 最近有这么一个小需求，使用命令行快速构建项目文件，项目文件中的部分内容也会根据命令行输入内容的改变而改变，于是抽空简单学习了一下 **commander** 和 **inquirer** 的使用，并写了一个小 demo。

</br>
</br>

### 准备

- node 环境和 npm 包管理工具（[下载链接](https://nodejs.org/zh-cn/download/)）
  </br>

- 全局安装 cmd-hello

```javascript
npm install cmd-hello -g
```

- 运行 cmd 命令,初始化 hello 文件

```javascript
hjt hello
```

运行命令行后，便可以输入你的称呼（回车键确认），程序会自动在云端读取 zip 资源，并解压到在你当前 cmd 目录下

- 打开 hello.html（小彩蛋）

</br>
</br>

### 分析

总的来说要实现这个小工具有以下几个关键点：

- 识别你的命令语句，并作出不同的处理

  > 利用 commander.js

- 跟用户产生互动（即用户可输入输出）

  > 利用 inquirer.js

- 自定义全局命令

  > 可以利用 npm 全局安装的形式去解决,也就是安装时添加-g 的命令

- 从云端解压 zip 资源到本地
  > fetch 产生交互，fs 模块对文件进行读写，unzip 包对资源解压

</br>
</br>

### 学习

**一、commander**

```javascript
const cmd = require("commander");

cmd
	.command("hello")
	.alias("h")
	.description("你好，很高兴认识你~")
	.option("xxx", "xxx命令描述")
	.action((option) => {
		console.log("Hello World");
	});

cmd.parse(process.argv);
```

commander.js 提供了以下几个方法供我们调用：

- command：用于定义我们的命令指令。

- alias：该命令指令的简称。例如执行 hjt help 与 hjt h 是等价的命令。

- option：参数的定义，它接受四个参数，在第一个参数中，它可输入短名字 -a 和长名字–app ,使用 | 或者,分隔，在命令行里使用时，这两个是等价的，区别是后者可以在程序里通过回调获取到；第二个为描述, 会在 help 信息里展示出来；第三个参数为回调函数，他接收的参数为一个 string，有时候我们需要一个命令行创建多个模块，就需要一个回调来处理；第四个参数为默认值

- description：该命令的描述，当你执行 hjt -help 会出现它的描述。

```javascript
Options:
  -v, --version  output the version number
  xxx            xxx命令描述
  -h, --help     output usage information

Commands:
  hello|h        你好，很高兴认识你
```

- action：执行完该命令后，触发的 callback 回调函数

- parse：解析我们的命令行

</br>

---

</br>

**二、inquirer**

- 参数概括

```javascript
inquirer.prompt([{
    type: (String),                                  /*交互类型*/
    name: (String),                                  /*在回调函数的answers，可拿到该值*/
    message: String|Function),                       /*提示的问题信息*/
    default: (String|Number|Boolean|Array|Function), /*默认值*/
    choices: (Array|Function),                       /*选择项*/
    validate: (Function) ,                           /*验证答案的正确性*/
    filter: (Function) ,                             /*选过滤答案*/
    transformer: (Function) ,                        /*转换答案的形式*/
    when:(Function, Boolean),                        /*(PS:没懂)*/
    pageSize: (Number),                              /*设置list, rawList, expand 和 checkbox的页数*/
    prefix:(String)，                                /*更改默认消息的前缀（PS：没懂）*/
    suffix:(String)，                                /*更改默认消息的后缀（PS：没懂）*/
}]).then(answers => {
    console.log(answers)
})
```

- 举例：不同的 type 类型

```javascript
/* inquirer([])方法中接受一个数组，因此可依次添加多种用户交互逻辑 */
const inquirer = require("inquirer");

/*input输入类型  list选择类型*/
inquirer
	.prompt([
		{
			type: "input",
			message: "您的名字:",
			name: "name",
			default: "",
		},
		{
			type: "list",
			name: "sex",
			message: "你的性别是？",
			choices: [
				{
					name: "男",
					value: "man",
				},
				{
					name: "女",
					value: "woman",
				},
			],
		},
	])
	.then((answers) => {
		/* 当用户输入内容后，可在此函数中拿到用户输入的内容 */
		console.log(answers.name);
		console.log(answers.sex); /*man or woman*/
	});
```

......除此值外，还提供了 input, number, confirm, list, rawlist, expand, checkbox, password, editor 等多种类型，详情参考[inquirer](https://github.com/SBoudrias/Inquirer.js)

</br>

---

</br>

**三、自定义全局命令**

- 在 package.json 文件中，设置 bin 字段，表示用来存放一个可执行的文件

```javascript
/* hjt便是自定义全局命令，index.js是你node程序的入口文件 */
"bin": {
    "hjt": "./index.js"
 }
```

- 再在你的入口文件（index.js）第一行加上如下代码,表明这是一个可执行的应用：

```javascript
#!/usr/bin/env node

```

- 发布到 npm 资源池中,参考[如何发布 npm 包](https://github.com/chiwent/blog/issues/5)

- 使用-g 命令,全局安装你发布的包

</br>

---

</br>

**四、压缩包资源的处理**

1. 使用 node-fetch 模块去请求云端资源,参考[node-fetch](https://www.npmjs.com/package/node-fetch)

2. 使用 fs.createWriteStream 将云端资源写入到磁盘,参考[fs](http://nodejs.cn/api/fs.html)

3. 再利用 fs.createReadStream 去读取该压缩包资源，读取同时利用 unzip 去解压资源，参考[unzip](https://www.npmjs.com/package/unzip)

4. 最后通过 fs.writeFileSync 写入解压后的文件

```javascript
/*请求zip资源*/
fetch("https://hjt/xxx.zip").then((res) => {
	/*写入磁盘，注意__dirname,__filename,process.cwd()的区别*/
	const dest = fs.createWriteStream(path.join(process.cwd(), `./xxx.zip`));
	res.body.pipe(dest);

	// 写入成功后
	dest.on("close", () => {
		// 读取该压缩包资源，并解压
		fs.createReadStream(path.join(process.cwd(), `xxx.zip`))
			.pipe(unzip.Parse())
			.on("entry", (entry) => {
				var fileName = entry.path; // 解压后的文件名
				var type = entry.type; // 文件类型：'Directory' or 'File';
				// 写入解压后文件
				fs.writeFileSync(path.join(process.cwd(), `./${fileName}`), content);
			});
	});
});
```

</br>
</br>
