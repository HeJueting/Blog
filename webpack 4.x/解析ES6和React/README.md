# webpack 4.x ES6 和 React 语法解析

</br>

### 安装依赖

```
npm i react react-dom -S
npm i @babel/core @babel/preset-env babel-loader @babel/preset-react -D
```

</br>
</br>

### webpack 配置

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: "babel-loader",
            },
        ],
    },
};
```

</br>
</br>

### 配置 .babelrc 文件

.babelrc 文件由 presets 和 plugins 组成，presets 代表着多个 plugin 的集合（ES6、ES7、ES8 等语法），一个 plugin 对应着 ES6 或更高级语法的一个功能

```json
{
    "presets": [
        "@babel/preset-env", // 自动解析最新ES语法
        "@babel/preset-react" // 解析react语法
    ]
}
```

</br>
</br>
