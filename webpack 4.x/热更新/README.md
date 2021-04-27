# 热更新

</br>

### webpack 中文件监听

文件监听是在发现源码发生变化时，自动重新构建出新的输出文件。打包完是存放在磁盘中，有文件 IO 的读写。Webpack 开启监听的两种方式：

1. 启动 webpack 命令时，带上—watch 参数

2. 在 webpack.config.js 配置中设置 watch:true

自动编译后还需要手动刷新浏览器

</br>
</br>

### 监听的原理分析

轮询判断文件的最后编辑时间是否发生了变化。某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后告诉监听者：

```javascript
module.export = {
    // 默认false，也就是不开启
    watch: true,
    // 只有开启监听模式时，watchOptions才有意义
    watchOptions: {
        // 默认为空，不监听的文件或文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化后会等待300ms再去执行
        aggregateTimeout: 300,
        // 轮询的时间间隔，每秒轮询一次
        poll: 1000,
    },
};
```

</br>
</br>

### webpack-dev-server

该插件为我们提供了一个简单的 web server，并且具有热更新的功能（新代码生效，网页不刷新，状态不丢失）。设置如下：

**1、package.json 配置**

--open 参数代表每次开启后，自动打开浏览

```json
"scripts": {
    "dev": "webpack-dev-server --open"
},
```

**2、webpack 配置**

```javascript
module.exports = {
    mode: "development", //开发模式
    devServer: {
        contentBase: path.join(__dirname, "../dist"), //提供文件的路径
        port: 8888, //端口
        hot: true, //开启热更新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //使用热更新插件
    ],
};
```

</br>
</br>

### 热更新原理分析

1. Webpack Complier 打包文件，并启动了一个 server 服务端

2. 将打包好的 bundle.js 作为该服务端的静态资源，浏览器就通过该服务端进行访问这个 bundle.js；

3. 一旦文件有更新，该服务端就会重新打包并同步信息给浏览器，浏览器接收到了更新的讯息，就会自动热更新

</br>
</br>
