# Linux

> 我使用的是阿里云的服务器， 系统安装的是 centos 7

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

# windows

### 安装

下载地址： [http://nginx.org/en/download.html](http://nginx.org/en/download.html)，下载后是一个 zip 文件，直接解压即可

</br>

### 操作

**启动 nginx**

- 打开 nginx 文件夹，双击 nginx.exe 启动

- 打开 cmd 命令，cd 到 nginx 解压目录下，输入 start nginx
