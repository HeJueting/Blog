# nginx 的安装和使用

</br>
</br>

## Centos 8.2

</br>

### 安装

```
yum install -y nginx
```

- 安装成功后，静态资源的目录为： /usr/share/nginx/html

- 配置文件的目录为：/etc/nginx/nginx.conf

</br>

### 操作

- 启动 Nginx:

```
systemctl start nginx
```

- 停止 Nginx:

```
systemctl stop nginx
```

- 重启 Nginx:

```
systemctl restart nginx
```

</br>
</br>

## windows

</br>

### 安装

下载地址： [http://nginx.org/en/download.html](http://nginx.org/en/download.html)，下载后是一个 zip 文件，直接解压即可

</br>

### 操作

**1、启动 nginx**

- 打开 nginx 文件夹，双击 nginx.exe 启动

- 打开 cmd 命令，cd 到 nginx 解压目录下，输入命令： start nginx

**2、关闭 nginx**

- 打开任务管理器，直接关掉 nginx 的两个进程

- 打开 cmd 命令，cd 到 nginx 解压目录下，输入命令：nginx.exe -s stop

**3、重启 nginx**

- 打开 cmd 命令，cd 到 nginx 解压目录下，输入命令：nginx.exe -s reload
