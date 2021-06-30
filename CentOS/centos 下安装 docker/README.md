# centos 下安装 docker

> 系统版本：centos 8.2

</br>

### 卸载旧版 docker

如果你安装了旧版的 docker，需要先卸载它们以及相关的依赖项。

```
yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```

</br>
</br>

### 安装 docker

```
yum install docker-ce docker-ce-cli containerd.io
```

</br>
</br>

### 卸载 docker

```
1、yum remove docker-ce docker-ce-cli containerd.io
2、rm -rf /var/lib/docker
3、rm -rf /var/lib/containerd
```

</br>
</br>

### 启动/关闭 docker

```js
//开启docker
service docker start

//关闭docker
service docker stop

// 重启docker
systemctl restart docker
```

</br>
</br>

### 修改 docker 镜像配置

国内连接 Docker 的官方仓库很慢，需要将默认仓库修改成阿里云的镜像或者国内的镜像

</br>

**阿里云镜像：**

1、如果你拥有阿里云服务器，建议使用阿里云国内镜像进行加速

2、登录阿里云，并访问：[https://cr.console.aliyun.com/undefined/instances/mirrors](https://cr.console.aliyun.com/undefined/instances/mirrors)

3、点击左侧菜单栏中的镜像加速器，查看加速器地址

```javascript
// 进入到daemon.json文件进行修改(没有就新建)
vim /etc/docker/daemon.json

// 配置daemon.json中的内容
{
  "registry-mirrors": ["https://xxxxxx.mirror.aliyuncs.com"]
}
```

</br>

**国内镜像**

```javascript
// 进入到daemon.json文件进行修改(没有就新建)
vim /etc/docker/daemon.json

// 配置daemon.json中的内容
{
    "registry-mirrors": [
        "https://registry.docker-cn.com",     //官方镜像
        "https://reg-mirror.qiniu.com"        //七牛加速
    ]
}
```

</br>

镜像配置修改后，需要重启 docker 及其配置文件

```js
// 重启配置文件
systemctl daemon-reload
// 重启docker
systemctl restart docker
```

</br>
</br>

参考：[https://docs.docker.com/engine/install/centos/](https://docs.docker.com/engine/install/centos/)
