# 初探命令行工具

</br>
</br>

### 前言

> 最近有这么一个小需求，使用命令行快速构建项目文件，项目文件中的部分内容也会根据命令行输入内容的改变而改变，于是抽空简单学习了一下 **commander** 和 **inquirer** 的使用，并写了一个小 demo。

</br>
</br>

### 使用

```javascript
// 全局安装hjt-cmd工具包
npm i hjt-cmd -g

// 查看命令帮助
hjt --help

// 初始化项目
hjt init test
> 请输入你的名称：hejueting

// 最后将生成一个test项目
// 进入test项目，打开hello.html（小彩蛋）
```

</br>
</br>

### 分析

总的来说要实现这个小工具有以下几个关键点：

-   自定义全局命令

-   识别你的自定义指令，并作出不同的处理

-   跟用户产生互动（即用户可输入输出）

-   获取云端资源，根据用户输入内容，修改资源内容

</br>
</br>

### 自定义全局命令

**1. #! /usr/bin/env node**

在 index.js 文件的顶部插入如下代码：

```
#! /usr/bin/env node
```

普通文件带有 **#!** 开头的，就会当做一个执行文件来运行，/usr/bin/env node 的意思就是在用户(usr)的安装根目录(bin)下的 env 环境变量中用 node 来执行此文件

</br>

**2. package.json 中的 bin 字段**

```javascript
{
    "bin": {
        "hjt": "./index.js"
    },
}
```

使用 npm -g 全局安装模块的时候，npm 会为 bin 中配置的文件在系统 bin 目录下创建一个软连接。全局执行 hjt 命令时，实际就是执行 index.js 文件，然后系统发现 index.js 头部有 **#! /usr/bin/env node** 字段的定义，就会以 node 程序去运行这个 index.js

</br>

**3. 使用 npm i hjt-cmd -g 全局安装**

</br>
</br>

### 自定义指令

虽然我们可以在全局使用 hjt 命令了，但是想让程序识别出 **hjt init** 中 init 指令，并作出相应的反应，我们还需要借助 **commander.js** 来实现

```javascript
// 定义版本信息
program.version("0.0.1");
// 定义参数
program
    .option("-t, --test", "this is a test option")
    .option("-var, --variable <variable>", "this is a variable option", "hello");
// 获取options参数
const options = program.opts();
// 定义指令
program
    .command("init <project>")
    .alias("i")
    .description("初始化项目...")
    .action((project) => {
        // 打印project和options参数
        console.log("project:", project);
        console.log("options:", options);
    });
// 解析我们的命令
program.parse(process.argv);
```

-   version：用于定义我们的命令指令

-   option：定义的命令的参数

    -   第一个参数：它可输入短名字 -b 和长名字 –banana ，使用“|”或者“,”分隔，在命令行里使用时，这两个是等价的
    -   第二个参数：参数的描述，会在 help 信息里展示出来
    -   第三个参数：参数变量的默认值

-   command：用于定义我们的命令指令，\<project\>是一个紧跟在 init 指令后的变量

-   alias：该命令指令的简称。例如执行 hjt init 与 hjt i 是等价的命令

-   description：该命令的描述，当你执行 hjt -help 会出现它的描述

-   action：执行完该命令后，触发的 callback 回调函数

-   parse：解析我们的命令行

```javascript
> hjt --help
// Options:
//   -V, --version                output the version number
//   -t, --test                   this is a test option
//   -var, --variable <variable>  this is a variable option (default: "hello")
//   -h, --help                   display help for command
//
// Commands:
//   init|i <project>             初始化项目...
//   help [command]               display help for command

> hjt -V | hjt --version
// 0.0.1

> hjt init testProject
// project: testProject
// options: { variable: 'hello' }

> hjt init app -t -f apple
// project: app
// options: { variable: 'apple', test: true }
```

</br>
</br>

### 互动交互

既然是命令行操作，肯定少不了与用户的互动操作，某些情况下，我们还得根据用户的输入输出来改变程序的执行逻辑。这里我们使用了 **inquirer.js**

**1. 常用参数**

```javascript
inquirer.prompt([{
    type: (String),                                  /*交互类型，例如：确认，输入，密码...*/
    name: (String),                                  /*在回调函数的answers，可拿到该属性值*/
    message: String|Function),                       /*提示的问题信息*/
    default: (String|Number|Boolean|Array|Function), /*默认值*/
    choices: (Array|Function),                       /*选择项*/
    validate: (Function) ,                           /*验证答案的正确性*/
}]).then(answers => {
    console.log(answers)
})
```

**2. 举例**

```javascript
const inquirer = require("inquirer");
inquirer
    .prompt([
        {
            type: "input",
            message: "请输入你的名字:",
            name: "name",
            default: "",
        },
        {
            type: "confirm",
            message: "是否为男性?",
            name: "gender",
            default: true,
        },
        {
            type: "list",
            name: "location",
            message: "所在城市",
            choices: [
                {
                    name: "重庆",
                    value: "cq",
                },
                {
                    name: "北京",
                    value: "bj",
                },
            ],
        },
        {
            type: "input",
            name: "code",
            message: "校验码",
            validate: (val) => {
                if (val === "123") {
                    return true;
                } else {
                    return "校验码错误！";
                }
            },
        },
    ])
    .then((answers) => {
        /* 当用户输入内容后，可在此函数中拿到用户输入的内容 */
        console.log(answers);
    });
```

```
? 请输入你的名字: hejueting
? 是否为男性? Yes
? 所在城市 重庆
? 校验码 1234
>> 校验码错误
? 校验码 123
{ name: 'hejueting', gender: true, location: 'cq', code: '123' }
```

除此值外，还提供了 input, number, confirm, list, rawlist, expand, checkbox, password, editor 等多种类型，详情参考[inquirer](https://github.com/SBoudrias/Inquirer.js)

</br>
</br>

## 四、资源处理

1. 使用 node-fetch 模块去请求云端资源,参考[node-fetch](https://www.npmjs.com/package/node-fetch)

2. 使用 fs.createWriteStream 将云端资源写入到磁盘,参考[fs](http://nodejs.cn/api/fs.html)

3. 再利用 fs.createReadStream 去读取该压缩包资源，读取同时利用 unzipper 去解压资源，参考[unzipper](https://www.npmjs.com/package/unzipper)

4. 最后通过 fs.writeFileSync 写入解压后的文件

```javascript
fetch("http://qiniu.hejueting.cn/npm/cmd-hello/hello.zip").then(function (res) {
    // 将压缩包资源下载到本地磁盘
    const dest = fs.createWriteStream(`./${project}/hello.zip`);
    res.body.pipe(dest);
    // 下载成功后
    dest.on("close", () => {
        // 从本地磁盘读取该压缩包资源，并解压
        fs.createReadStream(`./${project}/hello.zip`)
            .pipe(unzipper.Parse())
            .on("entry", (entry) => {
                // 获取文件名称
                const fileName = entry.path;
                // 处理目标文件
                if (fileName === "hello.html") {
                    entry.on("data", (content) => {
                        // 将文件的内容转成utf-8格式
                        content = content.toString("utf-8");
                        // 替换变量
                        content = content.replace(/\[_name_\]/g, answers.name);
                        // 写入组件文件
                        fs.writeFileSync(`./${project}/${fileName}`, content, "utf8");
                    });
                } else {
                    entry.autodrain();
                }
            });
    });
});
```

</br>
</br>
