# nginx 常用的代理配置

</br>

### proxy_pass

访问 http://127.0.0.1/blog/... , 以下配置将代理到 http://127.0.0.1:5757/test/...
访问 http://127.0.0.1/blog/admin/... , 以下配置将代理到 http://127.0.0.1:5757/test/admin/...

```
location ^~ /blog/ {
    proxy_pass http://127.0.0.1:5757/test/;
}
```

</br>
</br>

### root

访问 http://127.0.0.1/blog/admin/img.png , 实际访问的是本地文件 /usr/blog/admin/img.png
访问 http://127.0.0.1/blog/admin/test/index.html , 实际访问的是本地文件 /usr/blog/admin/test/index.html

```
location /blog/admin/ {
    root /usr/
}
```

</br>
</br>

### alias

访问 http://127.0.0.1/blog/admin/img.png , 实际访问的是本地文件 /usr/img.png
访问 http://127.0.0.1/blog/admin/test/index.html , 实际访问的是本地文件 /usr/test/index.html

```
location /blog/admin/ {
    alias /usr/
}
```

</br>
</br>

### try_files

常用于前端的单页应用配置

访问 http://127.0.0.1/blog/admin/info/img.png , nginx 会如下顺序依次查找：

1. /usr/admin/info/img.png
2. /usr/admin/info/img.png/ 下面的 index 文件
3. 如果都没有匹配到，则匹配 http://127.0.0.1/blog/index.html

```
location /blog/ {
    alias /usr/
    try_files $uri $uri/ /blog/index.html;
}
```

</br>
</br>
