# 解析图片和字体

</br>

### 安装依赖

-   file-loader 用于解析图片和字体资源

-   url-loader 用于小图片和小字体 base64 的转换

```
npm i file-loader url-loader -D
```

</br>
</br>

### webpack 配置

```javascript
module: {
    rules: [
        // 图片的解析（小于8K的资源会被解析为base64）
        {
            test: /.(png|jpg|gif|jpeg)$/,
            include: [path.resolve("./src")],
            use: [
                {
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "img/[name].[ext]",
                    },
                },
            ],
        },
        // 字体的解析
        {
            test: /.(woff|woff2|eot|ttf|otf)$/,
            include: [path.resolve("./src")],
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "font/[name].[ext]",
                        publicPath: "../",
                    },
                },
            ],
        },
    ];
}
```

</br>
</br>
