# centos 下安装 minio

</br>

### 使用 wget 下载

1、如果你没有安装 wget，可先使用以下命令安装 wget：

```
yum -y install wget
```

</br>

2、然后使用 wget 安装 minio

```
wget https://dl.minio.io/server/minio/release/linux-amd64/minio
```

</br>

3、如果下载速度很慢，可使用国内的下载链接：

```
wget http://dl.minio.org.cn/server/minio/release/linux-amd64/minio
```

</br>

4、配置 minio 全局命令：

```
ln -s /minio /usr/local/bin/minio
```

</br>

5、创建 Minio 的文件存在目录：

```
mkdir -p /usr/minio/data/
```

</br>
</br>

### 修改默认用户名和密码

如果这里不指定，系统就是使用默认密码，账号和密码都是 minioadmin，可以使用以下命令进行修改：

```
export MINIO_ACCESS_KEY=hejueting
export MINIO_SECRET_KEY=*******
```

</br>
</br>

### 启动 minio

1、为下载的 minion 添加执行权限：

```
chmod +x minio
```

</br>

2、启动 minio（我上面也创建了这个文件夹）

```
minio server /usr/minio/data/
```

</br>

3、minio 的默认端口号是 9000，如果想修改端口号可以使用以下命令：

```
minio server --address=:5757 /usr/minio/data/
```

</br>

4、如果这样启动的话，命令窗口不能关闭，可以设置后台启动方式

```
nohup minio server --address=:5757 /usr/minio/data/ > /usr/minio/minio.log 2>&1 &
```

</br>
</br>

### 端口访问权限

启动成功后，需要开启端口访问权限，才能在 web 端访问你的 minio：

1、如果你使用的阿里云，可以直接去阿里云上配置防火墙端口

</br>

2、命令配置：

```
// 防火墙开启 9000 端口
firewall-cmd --zone=public --add-port=9000/tcp --permanent

// 防火墙关闭 9000 端口
firewall-cmd --zone=public --remove-port=9000/tcp --permanent

// 查看防火墙端口配置
firewall-cmd --zone=public --list-ports

// 开启防火墙
systemctl start firewalld

// 关闭防火墙
systemctl stop firewalld

// 重启防火墙
systemctl restart firewalld
```

</br>
</br>

### 关闭 minio

1、查看某一端口使用情况

```
netstat -nap | grep 端口号
```

</br>

2、根据 PID 关闭进程

```
kill -9 进程号
```

</br>
</br>

### 报错：ERROR Unable to initialize the server: Unable to initialize sub-systems: Credentials missing

1、先把服务停掉

2、修改密码账号

```
export MINIO_ACCESS_KEY=hejueting
export MINIO_SECRET_KEY=*******
```
