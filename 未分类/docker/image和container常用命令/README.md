# image 和 container 常用命令

</br>

### 镜像（image）

```javascript
// 拉取远程镜像
docker image pull [IMAGE]

// 查看当前所有image镜像
docker image ls

// 删除镜像
docker image rm [IMAGE ID]
// 删除所有镜像
docker image rm $(docker images -q)
// 如果被删除的镜像已经被某个容器所使用，需要使用-f命令强制删除
docker image rm -f ...
```

</br>
</br>

### 容器（container）

```javascript
// 查看正在运行的所有容器
docker container ls
// 列出本机所有容器，包括终止运行的容器
docker container ls --all


// 以test镜像文件生成容器
docker container run test
// 以test镜像文件生成容器，且容器的 3000 端口映射到本机的 8000 端口。
docker container run -p 8000:3000 test


// 启动一个已经被停止的容器
docker container start [containerID | containerName]
// 终止一个运行中的容器
docker container stop [containerID | containerName]
// 重启容器
docker container restart [containerID | containerName]


// 被终止运行的容器文件依然会占据硬盘空间，可以使用docker container rm命令删除
docker container rm [containerID]
// 删除所有容器
docker container rm $(docker ps -a -q)


//进入容器
docker attach [containerID]
```

</br>
</br>
