# 代码压缩

</br>

### HTML 压缩

使用 html-webpack-plugin 插件，不仅可以帮你创建 html 文件，还会帮你压缩 html 文件

**1、安装依赖**

```
npm i html-webpack-plugin -D
```

**2、webpack 配置**

如果 minify 开启后，该插件将会使用 html-minifier-terser 去压缩 HTML

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            // 模板html
            template: utils.resolve("src/main.html"),
            // 打包出来的html名称
            filename: "main.html",
            // 指定生成的html使用哪些chunk
            chunks: ["main"],
            // 打包出来的chunk会自动注入到html中
            inject: true,
            // 压缩输出（可以配置）
            minify: true,
        }),
    ],
};
```

</br>
</br>

### CSS 压缩

使用 optimize-css-assets-webpack-plugin 插件，它将在 Webpack 构建过程中搜索 CSS 资产，并优化最小化 CSS，默认情况下，它需要使用 cssnano，但可以指定自定义 CSS 处理器

**1、安装依赖**

```
npm i cssnano optimize-css-assets-webpack-plugin -D
```

**2、webpack 配置**

```javascript
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    plugins: [
        new OptimizeCssAssetsPlugin({
            // 一个正则表达式，去匹配要优化的资源
            assetNameRegExp: /\.css$/g,
            // 用于优化 CSS 的 CSS 处理器，默认为 cssnano
            cssProcessor: require("cssnano"),
        }),
    ],
};
```

</br>
</br>

### JavaScript

使用 uglifyjs-webpack-plugin 插件，已经内置在 webpack4 中，当 mode 为 production 时，默认开启该插件，我们不需要额外配置

</br>
</br>

### 自动清除构建目录

每次打包构建的时候，不会自动清除目录，打包出来的文件会越来越多。我们可以使用 clean-webpack-plugin 插件在打包前，帮我们自动清理目录

**1、安装依赖**

```
npm i clean-webpack-plugin -D
```

**2、webpack 配置**

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    plugins: [
        // 打包前自动清除文件
        new CleanWebpackPlugin(),
    ],
};
```

**3、其他方式**

如果不考虑使用 clean-webpack-plugin 插件的话，我们还可以在 package.json 中配置删除命令，同样可以实现此功能：

```json
{
    "scripts": {
        "prod": "rm -rf ./dist && webpack --config ./build/webpack.prod.config.js"
    }
}
```

</br>
</br>
