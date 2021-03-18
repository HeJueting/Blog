# Linux 安装 Nginx

> 我使用的是阿里云的服务器， 系统安装的是 centos 7

</br>

### 安装

```
yum install -y nginx
```

- 安装成功后，静态资源的目录为： /usr/share/nginx/html

- 配置文件的目录为：/etc/nginx/nginx.conf

</br>
</br>

### 操作命令

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
