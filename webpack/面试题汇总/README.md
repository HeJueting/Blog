### 前端为何要进行打包和构建？

-   高效开发：热更新

-   语法编译： ES6，JSX，TS 语法，Less...

-   压缩资源，体积更小，加载更快

-   兼容性处理（polyfill），错误检查（eslint）

</br>
</br>

### webpack 的优势

-   社区生态丰富（官方维护的插件丰富）

-   配置灵活

-   官方更新迭代速度快

</br>
</br>

### webpack 基本构成

-   entry：打包入口文件

-   output：打包的输出地址

-   mode：指定环境

-   module：lodaer 文件解析，Webpack 只支持 js 和 json 两种文件类型，其他文件类型需要通过 loaders 去进行转化

-   plugins：插件，用于打包文件的优化，资源管理和环境变量的注入，作用于整个构建过程

</br>
</br>

### module chunk bundle 的概念

-   module：各个文件的源码，webpack 中一切皆模块

-   chunk：多个模块的一个集合，例如：entry、import

-   bundle：最终打包的结果

</br>
</br>

### babel 和 webpack 的区别

-   babel：JS 语法编译工具

-   webpack：打包构建工具

</br>
</br>

### 构建工具演变历史

1. 本地写好代码，通过各种在线压缩工具，将前端文件压缩处理后，再拷贝到本地

2. 使用 ant + YUI 工具，在本地对 css、js 进行直接压缩处理

3. 模块化概念出现，使用 grunt 进行构建，它会将整个构建过程分为一个一个的任务，然后去执行（解析 html、css、js、代码压缩、图片压缩……），每个任务处理完成会将处理结果存储在本地磁盘中，这样的 IO 操作就会导致构建时间过长的问题

4. gulp 的构建过程与 grunt 类似，但是 gulp 不会将处理完成的任务写入磁盘中，而是直接存放到内存中，再下一个任务执行的时候，可以直接从内存中读取上一个任务的结果，加快了打包的速度

</br>
</br>

### babel-polyfill（已废弃） 和 babel-runtime 的区别

-   babel-polyfill 会污染全局

-   babel-runtime 不会污染全局

-   产出第三方 lib 要用 babel-runtime

</br>
</br>

### webpack 优化措施

-   显示优化

    1.  速度分析插件（speed-measure-webpack-plugin）
    2.  构建包体积大小分析插件（webpack-bundle-analyzer）
    3.  命令行日志显示（friendly-errors-webpack-plugin）

-   构建速度优化

    1. 高版本的 webpack 和 bable
    2. 多进程构建（thread-loader）
    3. 分包，预编译模块（DLLPlugin）
    4. 开启缓存
        - babel-loader：提升二次解析速度
        - terser-webpack-plugin：缓存&多进程压缩，提升二次压缩速度
        - hard-source-webpack-plugin：提升二次模块转换速度
    5. 不打包指定包（IgnorePlugin）

-   构建产物优化

    1. Tree Shaking（js/css）
    2. 动态 Polyfill
    3. 图片压缩
    4. 资源分包
    5. 懒加载
    6. gzip 压缩
    7. 公共资源抽离
    8. Scope Hoisting
