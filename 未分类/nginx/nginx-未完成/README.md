## server

</br>

### listen

用于指定该虚拟服务器将要监听的 IP 地址和端口

```js
server {
    // 监听所有的80和8080端口
    listen 80 | 8080;

    // 监听127.0.0.1的所有端口
    listen 127.0.0.1;

    // 监听127.0.0.1的8080端口
    listen 127.0.0.1:8080;
}
```

</br>

### server_name

设置虚拟主机名称

```js
server {
    // 当通过域名访问时，nginx就会根据server_name进行匹配
    // 如：以hejueting.cn或者www.hejueting.cn域名访问时，就被会被以下规则所匹配；而通过test.cn访问就不会
    server_name hejueting.cn www.hejueting.cn;
}
```

在没有显式定义 default server 时，nginx 会将配置的第一个 server 作为 default server，即当请求没有匹配任何 server_name 时，此 server 会处理此请求。

```js
http {
    // 当我们直接使用 ip 地址访问时会被交给此处定义的第一个 server 处理
    server {
        listen 80;
        ...
    }
    server {
        listen 80;
        server_name hejueting.cn;
        ...
    }
}
```

</br>
</br>

## location

</br>
