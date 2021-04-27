# webpack 4.x px 自动转为 rem

</br>

### 安装依赖

参考：[px2rem-loader](https://www.npmjs.com/package/px2rem-loader)

```
npm i px2rem-loader -D
```

</br>
</br>

### webpack 配置

```javascript
module.exports = {
    module: {
        rules: [
            // css解析
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, //css额外打包
                    "css-loader", // 解析css
                    {
                        loader: "px2rem-loader", // px转rem
                        options: {
                            remUnit: 75, // 1rem 等于75px
                            remPrecision: 8, // rem 转化为px后小数点的位数
                        },
                    },
                    "less-loader", // 将less解析为css
                ],
            },
        ],
    },
};
```

</br>
</br>

### 限制自动转换

后面有 /\*no\*/ 这种注释语法会不进行 rem 的转换

```css
.page {
    font-size: 12px; /*no*/
    width: 375px; /*no*/
    height: 40px;
}
```

</br>
</br>
