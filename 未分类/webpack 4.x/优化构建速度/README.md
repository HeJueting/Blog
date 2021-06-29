# webpack 优化构建速度

</br>

### 总结归纳

-   使用高版本的 webpack 和 node.js

-   多进程/多实例构建

-   分包，预编译模块

-   利用缓存提高二次构建速度

    1. babel-loader

    2. 压缩缓存

    3. 模块缓存

-   缩小构建目标

</br>
</br>

### 多进程/多实例构建

使用 [thread-loader](https://www.webpackjs.com/loaders/thread-loader) 解析资源，把这个 loader 放置在其他 loader 之前，就会在一个单独的 worker 池中运行

**1、安装依赖**

```
npm i thread-loader -D
```

**2、webpack 配置**

```javascript
const threadLoader = require("thread-loader");
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: ["thread-loader", "babel-loader"],
            },
        ],
    },
};
```

</br>
</br>

### 分包，预编译模块

此前使用分包的方式，是将 react 和 react-dom 以 CDN 的形式引入项目中。我们还可以使用 [DLLPlugin 和 DLLReferencePlugin](https://webpack.docschina.org/plugins/dll-plugin/) 进行优化，将 react、react-dom、redux、react-redux..等等公共资源构建成为一个包，只打包一次公共资源包，之后就直接使用。

</br>
</br>

### 利用缓存提高二次构建速度

**1、开启 babel-loader 缓存**

[babel-loader](https://webpack.docschina.org/loaders/babel-loader/) 缓存开启成功后，node_moudle 下面会新增一个.cache 目录，提升二次解析速度

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: ["babel-loader?cacheDirectory=true"],
            },
        ],
    },
};
```

**2、开启压缩缓存**

使用 [terser-webpack-plugin](https://webpack.docschina.org/plugins/terser-webpack-plugin/) 插件缓存，开启压缩缓存，提升二次压缩速度

```
npm i terser-webpack-plugin -D
```

```javascript
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    optimization: {
        minimize: {
            parallel: true, // 使用多进程并行运行来提高构建速度
            cache: true, // 开启压缩缓存
        },
    },
};
```

**3、模块缓存**

使用 cache-loader 或者 [hard-source-webpack-plugin](https://github.com/mzgoddard/hard-source-webpack-plugin) 用于缓存 webpack 内部模块处理的中间结果，提升二次模块转换速度

```
npm install hard-source-webpack-plugin -D
```

```javascript
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
module.exports = {
    plugins: [new HardSourceWebpackPlugin()],
};
```

</br>
</br>

### 缩小构建目标

```javascript
module.exports = {
    // 配置模块如何解析
    resolve: {
        // 告诉 webpack 解析模块时应该搜索的目录
        modules: ["node_modules"],
        // 当从 npm 包中导入模块时，在 package.json 中使用哪个字段导入模块
        mainFields: ["main"],
        // 顺序解析这些后缀名
        extensions: [".js"],
    },
};
```

</br>
</br>
