# 认识 DockerFile

除了拉取官方镜像外，我们也可以定制镜像，这就需要 DockerFile 文件。Dockerfile 是一个文本文件，其内容包含一条条描述该层应当如何构建的指令。

</br>

### FROM 指令

用来指定基础镜像，例如，以 node:10.13.0 版本构建基础镜像：

```
FROM node:10.13.0
```

</br>
</br>

### RUN 指令

用于执行后面跟着的命令行命令，例如，在/usr/docker 目录下创建 koa-test 文件夹：

```
RUN mkdir -p /usr/docker/koa-test
```

</br>
</br>

### WORKDIR 指令

使用 WORKDIR 指令可以来指定每层构建时的工作目录，我们需要在 /app 目录下执行 npm install 命令

```javascript
// 错误写法：每层构建都是独立的，第一层 cd /app 跟第二层执行 npm install 没有任何关系
RUN cd /app
RUN npm install

// 正确写法
WORKDIR /app
RUN npm install
```

</br>
</br>

### ENV 指令

设置环境变量，定义了环境变量，那么在后续的指令中，就可以使用这个环境变量。

```
ENV PATH=/usr/blog PRO=admin
RUN cd $PATH/$PRO
```

.
.
.
.
.
.
.
.
.
.
.
.
.

```javascript

//cd到你项目下，根据的Dockerfile安装docker镜像
docker build [options] xxxx .
例如：docker build -t egg-demo .
```
