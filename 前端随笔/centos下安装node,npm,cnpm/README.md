# centos 下安装 node、npm、cnpm

</br>

### 下载 ndoe 和 npm

可以去 [官网](https://nodejs.org/zh-cn/download/) 查看 linux 最新版本的二进制文件。

```
wget https://nodejs.org/dist/v14.16.0/node-v14.16.0-linux-x64.tar.xz
```

</br>
</br>

### 解压文件

```
tar xvf node-v14.16.0-linux-x64.tar.xz
```

</br>
</br>

### 配置 node、npm 全局命令

```
ln -s /node-v14.16.0-linux-x64/bin/node /usr/local/bin/node
ln -s /node-v14.16.0-linux-x64/bin/npm /usr/local/bin/npm

node -v    // v14.16.0
npm -v     // 6.14.11
```

</br>
</br>

### cnpm 的安装和配置

```
// 下载
npm install -g cnpm --registry=https://registry.npm.taobao.org

// 配置
ln -s /node-v14.16.0-linux-x64/lib/node_modules/cnpm/bin/cnpm /usr/local/bin/cnpm
```

</br>
</br>
