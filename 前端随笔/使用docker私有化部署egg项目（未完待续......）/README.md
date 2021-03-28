# to do list ...

# 使用 docker 私有化部署 egg 项目

</br>
</br>

### 前言

> 最近 oneview 项目私有化部署的频率越来越高，而我们整个项目采用 egg.js + mongodb + nginx + vue 进行开发，私有化部署的成本并不低，且在部署过程中问题也越来越多

- **耗时：**每次部署都需要安装 node、nginx、mongodb 等工具，不能一步到位

- **服务器的 node 版本不同：**例如，某服务器上有项目依赖于 node 6x 版本，而 egg.js 又至少需要 node 8x 版本，如果强行升级 node 版本，又有可能带来不可预知的风险

基于以上问题，我们决定实践 docker 对 oneview 项目进行私有化部署

</br>
</br>

### docker 的安装

- **准备：** 阿里 CentOS 7.3 云服务器一台

- **安装：**

```javascript
yum -y install docker
```

- **启动/关闭：**

```javascript
//开启docker
service docker start

//关闭docker
service docker stop
```

- **阿里云国内镜像：**如果你拥有阿里云服务器，建议使用阿里云国内镜像进行加速
  - 登录阿里云，并访问：[https://cr.console.aliyun.com/undefined/instances/mirrors](https://cr.console.aliyun.com/undefined/instances/mirrors)
  - 点击左侧菜单栏中的镜像加速器，查看加速器地址

![image](http://localhost/img/docker-egg-1.png)

- **修改国内镜像：** 国内连接 Docker 的官方仓库很慢，需要将默认仓库修改成国内的镜像

```javascript
// 进入到daemon.json文件进行修改(没有就新建)
vim /etc/docker/daemon.json

// 配置daemon.json中的内容
"registry-mirrors": [
    "https://registry.docker-cn.com",     //官方镜像
    "https://reg-mirror.qiniu.com"        //七牛加速
]
```

- **重启配置文件：**daemon.json 文件修改成功后，需要重置配置文件

- **重启 docker：**systemctl restart docker

</br>
</br>

### 测试

- **从 docker 官网镜像中拉取 hello-world 资源**

```javascript
docker image pull hello-world
```

- **查看 image 镜像**

```javascript
docker image ls
```

- **运行这个 docker 容器**

```javascript
docker container run hello-world
```

![image](http://localhost/img/docker-egg-2.png)

- 如果碰到如下报错信息（可能是 centos 系统版本兼容性问题）

```javascript
container_linux.go:247: starting container process caused "process_linux.go:258: applying cgroup configuration for process caused \"Cannot set property TasksAccounting, or unknown property.\""
/usr/bin/docker-current: Error response from daemon: oci runtime error: container_linux.go:247: starting container process caused "process_linux.go:258: applying cgroup configuration for process caused \"Cannot set property TasksAccounting, or unknown property.\"".

//更新一下系统
yum update
```

</br>
</br>

</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>

```javascript

//从docker镜像仓库获取镜像，options是选项，name是镜像名称
docker image pull [options] [name]
例如：docker image pull hello-world

//查看当前所有image镜像
docker image ls [options]
例如：docker image ls

//cd到你项目下，根据的Dockerfile安装docker镜像
docker build [options] xxxx .
例如：docker build -t egg-demo .

//删除docker镜像
docker image rm [OPTIONS] [IMAGE ID]
例如：docker image rm -f 87abf0239f1a


//删除所有镜像
docker rmi $(docker images -q)







//查看正在运行的所有容器
docker container ls


// 列出本机所有容器，包括终止运行的容器
docker container ls --all


//终止容器运行
docker docker container kill


//终止运行的容器文件，依然会占据硬盘空间，可以使用docker container rm命令删除
docker container rm [containerID]

//删除所有容器
docker rm $(docker ps -a -q)


//从 image 文件生成容器。
docker container run -p 8000:3000 koa-demo

✦ -p参数：容器的 3000 端口映射到本机的 8000 端口。
✦ -it参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。
✦ koa-demo：image 文件的名字
✦ /bin/bash：容器启动以后，内部第一个执行的命令。这里是启动 Bash，保证用户可以使用 Shell。


//进入容器
docker container exec -it [containerID] /bin/bash
```
