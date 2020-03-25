# 使用docker私有化部署egg项目

</br>
</br>

### 前言
> 最近oneview项目私有化部署的频率越来越高，而我们整个项目采用egg.js + mongodb + nginx + vue 进行开发，私有化部署的成本并不低，且在部署过程中问题也越来越多

- **耗时：**每次部署都需要安装 node、nginx、mongodb 等工具，不能一步到位
 
- **服务器的 node 版本不同：**例如，某服务器上有项目依赖于node 6x版本，而egg.js又至少需要node 8x版本，如果强行升级 node 版本，又有可能带来不可预知的风险

基于以上问题，我们决定实践 docker 对 oneview 项目进行私有化部署

</br>
</br>



### docker的安装

- **准备：** 阿里CentOS 7.3云服务器一台

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

- **阿里云国内镜像：**如果你拥有阿里云服务器，建议使用阿里云国内镜像进行加速
	- 登录阿里云，并访问：[https://cr.console.aliyun.com/undefined/instances/mirrors](https://cr.console.aliyun.com/undefined/instances/mirrors)
	- 点击左侧菜单栏中的镜像加速器，查看加速器地址

![image](http://localhost/img/docker-egg-1.png)

- **重启配置文件：**daemon.json文件修改成功后，需要重置配置文件

- **重启docker：**systemctl restart docker

</br>
</br>


### 测试

- **从docker官网镜像中拉取hello-world资源**

```javascript
docker image pull hello-world
```

- **查看image镜像**

```javascript
docker image ls
```

- **运行这个docker容器**

```javascript
docker container run hello-world
```

![image](http://localhost/img/docker-egg-2.png)

- 如果碰到如下报错信息（可能是centos系统版本兼容性问题）
 
```javascript
container_linux.go:247: starting container process caused "process_linux.go:258: applying cgroup configuration for process caused \"Cannot set property TasksAccounting, or unknown property.\""
/usr/bin/docker-current: Error response from daemon: oci runtime error: container_linux.go:247: starting container process caused "process_linux.go:258: applying cgroup configuration for process caused \"Cannot set property TasksAccounting, or unknown property.\"".

//更新一下系统
yum update
```
</br>
</br>


### 部署egg项目





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
```



