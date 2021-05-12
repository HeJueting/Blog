# webpack 面试题汇总

</br>

### webpack 的配置优化

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

6. Scope Hoisting

</br>
</br>

### 前端为何要进行打包和构建？

1. 高效开发：热更新

2. 语法编译： ES6，JSX，TS 语法，Less...

3. 压缩资源，体积更小，加载更快

4. 兼容性处理：CSS 补齐，polyfill

5. 错误检查（eslint）

</br>
</br>

### 构建工具演变历史

1. 本地写好代码，通过各种在线压缩工具，将前端文件压缩处理后，再拷贝到本地

2. 模块化概念出现，使用 grunt 进行构建，它会将整个构建过程分为一个一个的任务，然后去执行（解析 html、css、js、代码压缩、图片压缩……），每个任务处理完成会将处理结果存储在本地磁盘中，这样的 IO 操作就会导致构建时间过长的问题

3. gulp 的构建过程与 grunt 类似，但是 gulp 不会将处理完成的任务写入磁盘中，而是直接存放到内存中，再下一个任务执行的时候，可以直接从内存中读取上一个任务的结果，加快了打包的速度。但是 AMD，CMD，UMD 各种轮子模块化方案都蹦出来，对这种模块化乱象，gulp 显得无能为力

4. 然后 webpack 作为一个前端模块化方案出现（ES6 模块），将一切资源视为模块

</br>
</br>

### gulp 与 webpack 的区别

1. gulp 强调的是前端开发的流程，通过配置一系列的 task，定义 task 处理的事物（例如文件压缩合并、雪碧图、启动 server、 版本控制等），然后定义执行顺序，来让 gulp 执行 task，从而构建前端项目的流程。

2. webpack 是一个前端模块化方案，侧重模块打包，把开发中的所有资源（图片、js 文件、css 文件等）都看成模块，通过 loader（加载器）和 plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。

</br>
</br>

### webpack 基本构成

1. entry：打包入口文件

2. output：打包的输出地址

3. mode：指定环境

4. module：lodaer 文件解析，Webpack 只支持 js 和 json 两种文件类型，其他文件类型需要通过 loaders 去进行转化

5. plugins：插件，用于打包文件的优化，资源管理和环境变量的注入，作用于整个构建过程

</br>
</br>

### babel 是什么？

JS 语法编译工具，例如将 JSX 编译成 JS，将 ES6 编译成 ES5

</br>
</br>

### babel-polyfill（已废弃） 和 babel-runtime 的区别

babel-polyfill 主要是用于兼容浏览器的补丁，但他会自动加载所有的 polyfill，目前已弃用。现在使用动态 polyfills，通过引用官方提供的 polyfill.min.js 即可

1. babel-polyfill 在兼容的过程中可能会污染全局，但是使用了 babel-runtime 就不会污染全局

2. 产出第三方 lib 要用 babel-runtime

....
