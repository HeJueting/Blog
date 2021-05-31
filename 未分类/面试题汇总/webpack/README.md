# webpack 面试题汇总

</br>

### 1、前端为何要进行打包和构建？

1. 高效开发：热更新

2. 语法编译： ES6，JSX，TS 语法，Less...

3. 压缩资源，体积更小，加载更快

4. 兼容性处理：CSS 补齐，polyfill

5. 错误检查（eslint）

</br>
</br>

### 2、构建工具演变历史

1. 本地写好代码，通过各种在线压缩工具，将前端文件压缩处理后，再拷贝到本地

2. 模块化概念出现，使用 grunt 进行构建，它会将整个构建过程分为一个一个的任务，然后去执行（解析 html、css、js、代码压缩、图片压缩……），每个任务处理完成会将处理结果存储在本地磁盘中，这样的 IO 操作就会导致构建时间过长的问题

3. gulp 的构建过程与 grunt 类似，但是 gulp 不会将处理完成的任务写入磁盘中，而是直接存放到内存中，再下一个任务执行的时候，可以直接从内存中读取上一个任务的结果，加快了打包的速度。但是 AMD，CMD，UMD 各种轮子模块化方案都蹦出来，对这种模块化乱象，gulp 显得无能为力

4. 然后 webpack 作为一个前端模块化方案出现（ES6 模块），将一切资源视为模块

</br>
</br>

### 3、gulp 与 webpack 的区别

1. gulp 强调的是前端开发的流程，通过配置一系列的 task，定义 task 处理的事物（例如文件压缩合并、雪碧图、启动 server、 版本控制等），然后定义执行顺序，来让 gulp 执行 task，从而构建前端项目的流程。

2. webpack 是一个前端模块化方案，侧重模块打包，把开发中的所有资源（图片、js 文件、css 文件等）都看成模块，通过 loader（加载器）和 plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。

</br>
</br>

### 4、webpack 基本构成

1. entry：打包入口文件，设置为一个对象可以配置多页面

2. output：打包的输出地址

3. mode：指定环境

    - devServer：热更新配置，mode 为 development 时自动开启
    - optimization：公共资源抽离，mode 为 production 时自动开启
    - UglifyJsPlugin：自动开启代码压缩

4. module：lodaer 文件解析，Webpack 只支持 js 和 json 两种文件类型，其他文件类型需要通过 loaders 去进行转化

    - babel-loader
    - style-loader/css-loader/less-loader/postcss-loader
    - file-loader/url-loader
    - worker-loader（处理 web worker）

5. plugins：插件，用于打包文件的优化，资源管理和环境变量的注入，作用于整个构建过程

    - 热更新
    - 模板 html（html-webpack-plugin）
    - CSS 额外打包（mini-css-extract-plugin）

</br>
</br>

### 5、babel 是什么？

JS 语法编译工具（JSX 编译成 JS，将 ES6 编译成 ES5），由 presets 和 plugins 组成，presets 代表着多个 plugin 的集合

1. presets

    - 自动解析最新 ES 语法，@babel/preset-env

    - 解析 react 语法：@babel/preset-react

2. plugins：

    - @babel/plugin-syntax-dynamic-import 按需加载

    - @babel/plugin-transform-runtime 避免污染全局变量

</br>
</br>

### 6、babel-polyfill（已废弃） 和 babel-runtime 的区别

1. babel-polyfill 主要是用于兼容浏览器的补丁，但他会自动加载所有的 polyfill（目前已弃用）。现在使用动态 polyfills，通过引用官方提供的 polyfill.min.js 即可

2. babel-polyfill 在兼容的过程中可能会污染全局，但是使用了 babel-runtime 就不会污染全局

</br>
</br>

### 7、热更新的原理

1. 启动了一个 server 服务

2. 将打包好的 bundle.js 作为该服务端的静态资源，并保存在内存中

3. 浏览器就通过该服务端进行访问这个 bundle.js

4. 一旦文件有更新，该服务端就会重新打包并同步信息给浏览器，浏览器接收到了更新的讯息，就会刷新页面重载

</br>
</br>

### 8、treeshaking 和 Scope Hoisting 原理

两者通过 mode 设置为 production 后自动开启

**treeshaking**

1.  用来消除无用的 JS 代码

    -   代码不会被执行，不可到达

    -   代码执行的结果不会被用到

    -   代码只会影响死变量（只写不读）

2.  ES6 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析

</br>

**Scope Hoisting**

根据 ES6 模块依赖的关系，将打散的模块合并到一个函数中，引入到 JS 文件提升到它的引入者的顶部，减少打包后输出的函数作用域，使代码体积更小，运行速度更快

</br>
</br>

### 9、文件指纹

1. Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改（A 页面的 JS 变化，B 页面的打包的 JS 名称也会跟着变化）

2. Chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值（A 页面的 JS 变化，不会引起 B 页面的打包的 JS 名称变化）

3. Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变（同一个页面的 JS 文件发生变化，不会影响到该页面的 CSS 打包文件名称改变）

</br>
</br>

### 10、chunck、moudule、bundle

1. moudule：即模块，在 webpack 中，一切皆模块

2. chunk：多个模块的集合，例如：entry 入口中所有依赖的模块的集合就是一个 chunck

3. bundle：最后打包生成的产物

</br>
</br>

### 11、webpack 的工作流程

在 webpack4 中，webpack 拆分了一个 webpack-cli 工具出来，主要用来运行 webpack 命令

1. 运行 npm run dev / npm run build 命令打包时，npm 工具会进入到 node_modules/.bin 目录下查找 webpack 命令（局部安装）

2. .bin 命令下的命令实际上是通过每个包中 package.json 的 bin 属性去指定的，webpack 这个命令实际上是执行了 node_modules/webpack/bin/webpack.js 这个 js 文件

```json
{
    "bin": {
        "webpack": "bin/webpack.js"
    }
}
```

3. 运行这个 webpack.js 后，最终会找到 webpack-cli（webpack-command）这个 npm 包，并执行 cli 工具

    - webpack4 中将 webpack 和 webpack-cli 做了分离
    - webpack-command 是一个比较轻量的 webpack-cli

4. webpack-cli 会对命令进行分析，然后根据我们的 webpack 配置和命令行的一些参数生成一个 options 对象，然后将该对象传递给 webpack，生成一个 compiler 对象

    - webpack init 创建一份 webpack 配置文件
    - webpack info 返回与本地环境相关的一些信息
    - webpack help 查看命令帮助
    - webpack generate-loader 生成 loader 代码
    - webpack generate-plugin 生成 plugin 代码
    - ...

```javascript
// 根据webpack配置和命令行生成的一个对象
let options = ...;
// 引用webpack，并创建一个compiler对象
const webpack = require('webpack');
compiler = webpack(options);
```

5. compiler 对象继承于 Tapable，这个类主要控制 webpack 中的钩子函数，也就是用于控制构建流程

    - 在 webpack 源码中运行 plugin 的时候会把这个 complier 对象传递给这个 plugin，让 plugin 可以触发 webpack 中的声明钩子

6. 执行 compiler.run，就会从 entry 开始递归分析每一个依赖并进行构建，构建过程中会利用 loader 将内容进行处理

7. 构建完之后，会有很多钩子，在这些钩子中就可以对构建产物进行优化处理，最后输出构建产物

...

</br>
</br>

### 12、webpack 的配置优化

**显示方面优化**

1. 构建速度分析：speed-measure-webpack-plugin

2. 构建包体积大小分析：webpack-bundle-analyzer（生成一个网页，然后查看所有包的构建体积）

3. 构建的命令行日志：
    - 可设置 stats 属性，比如 "errors-only" 代表只展示错误日志...
    - 使用 friendly-errors-webpack-plugin 插件帮我自动优化

**构建速度优化**

1. 使用高版本的 webpack 和 bable

2. 开启多进程构建：thread-loader

3. 分包，预编译模块：DLLPlugin（将 react、react-dom、redux、react-redux..等等公共资源构建成为一个包，只打包一次公共资源包，之后就直接使用）

4. 指定包不进行打包：IgnorePlugin

5. 缩小构建目标：可设置 resolve 属性，配置模块如何解析

6. 开启缓存，提升二次解析速度：使用 babel-loader，配置为 "babel-loader?cacheDirectory=true"

**构建产物优化**

1. Tree Shaking（js/css）：无用的 JS 和 CSS 不会进行打包，JS 必须是 ES6 的 moudle 语法，webpack 默认支持

2. 图片资源处理：使用 url-loader，小图片直接 base64 打包进入文件中，减少 http 请求，大图片直接 copy

3. 开启 gzip 压缩

4. 外链资源：使用 html-webpack-externals-plugin，将资源以 script 标签的形式外链 CDN

5. 抽离公共脚本：基于 SplitChunksPluginjs 插件

6. Scope Hoisting（作用域提升）

</br>
</br>
