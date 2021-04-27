# webpack 文件指纹

</br>

### Hash

和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改（A 页面的 JS 变化，B 页面的打包的 JS 名称也会跟着变化）

```javascript
module.exports = {
    output: {
        filename: "[name][hash:8].js",
    },
};
```

</br>
</br>

### Chunkhash

和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值（A 页面的 JS 变化，不会引起 B 页面的打包的 JS 名称变化）

```javascript
module.exports = {
    output: {
        filename: "[name][chunkhash:8].js",
    },
};
```

</br>
</br>

### Contenthash

根据文件内容来定义 hash，文件内容不变，则 contenthash 不变（同一个页面的 JS 文件发生变化，不会影响到该页面的 CSS 打包文件名称改变）

```javascript
module.exports = {
    output: {
        filename: "[name][contenthash:8].js",
    },
};
```

</br>
</br>

注：以上 “ :8 ” 代表取哈希的前八位
