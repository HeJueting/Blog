# 使用 nginx 反向代理

</br>
</br>

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

### 修饰符

- 根据优先级进行匹配，精确匹配 > 正则匹配 > 普通匹配（前缀匹配比较特俗，详情请看后文的案例）

| 符号 | 含义                                       |
| ---- | ------------------------------------------ |
| =    | 精确匹配                                   |
| ^~   | 前缀匹配                                   |
| ~    | 区分大小写的正则匹配（windows 系统不区分） |
| ~\*  | 不区分大小写的正则匹配                     |

</br>

### 常用正则

| 符号   | 含义                        |
| ------ | --------------------------- |
| .      | 匹配除换行符以外的任意字符  |
| [a-z]  | 匹配 a-z 小写字母的任意一个 |
| ?      | 重复 0 次或 1 次            |
| +      | 重复 1 次或更多次           |
| \*     | 重复 0 次或更多次           |
| ^      | 匹配字符串的开始            |
| $      | 匹配字符串的介绍            |

</br>

### 案例分析

- **案例 1**

= /blog 表示，只能匹配/blog（url 上携带参数也可以）

```js
// http://hejueting.cn/blog 匹配
// http://hejueting.cn/blog?a=1&b=2 匹配
// http://hejueting.cn/test/blog 不匹配
// http://hejueting.cn/blog/ 不匹配(结尾带有/)
// http://hejueting.cn/blogs 不匹配
// http://hejueting.cn/BLOG 取决于操作系统的文件系统是否大小写敏感, windows不敏感，linux(centos 8)敏感
server {
    server_name hejueting.cn;
    location = /blog { ... }
}
```

- **案例 2**

~ /blog 表示只要访问的路径中存在 /blog 即可匹配成功。注意：虽然 ~ 是区分大小写的修饰符，但是最终结果还是却决于取决于操作系统的文件系统是否大小写敏感

```js
// http://hejueting.cn/blog 匹配
// http://hejueting.cn/blog?a=1&b=2 匹配
// http://hejueting.cn/test/blog 匹配
// http://hejueting.cn/blog/test 匹配
// http://hejueting.cn/blogtest 匹配

// http://hejueting.cn/Blog 取决于操作系统的文件系统是否大小写敏感, windows不敏感，linux(centos 8)敏感
// http://hejueting.cn/BLOG 取决于操作系统的文件系统是否大小写敏感, windows不敏感，linux(centos 8)敏感

// http://localhost/blo 不匹配
// http://localhost/ablo 不匹配
server {
    server_name hejueting.cn;
    location ~ /blog { ... }
}
```

- **案例 3**

~\* /blog 表示只要访问的路径中存在 /blog 即可匹配成功（不区分大小写）

```js
// 参考案例2结果，唯一不同点在于，linux(centos 8)环境下不会再区分大小写
// http://hejueting.cn/Blog 匹配
// http://hejueting.cn/BLOG/a 匹配
// http://hejueting.cn/a/BLOG/ 匹配
server {
    server_name hejueting.cn;
    location ~* /blog { ... }
}
```

- **案例 4**

~ /blog$ 这个表达式表示必须以 /blog 结尾

```js
// http://hejueting.cn/blog 匹配
// http://hejueting.cn/blog?a=1&b=2 匹配
// http://hejueting.cn/test/blog 匹配

// http://hejueting.cn/testblog 不匹配
// http://hejueting.cn/blog/ 不匹配(结尾带有/)
server {
    server_name hejueting.cn;
    location ~ /blog$ { ... }
}
```

- **案例 5**

~ ^/blog 这个表达式表示必须以 /blog 开始

```js
// http://hejueting.cn/blog 匹配
// http://hejueting.cn/blog/test 不匹配
// http://hejueting.cn/blog?a=1&b=2 匹配
// http://hejueting.cn/test/blog 不匹配
// http://hejueting.cn/testblog 不匹配
server {
    server_name hejueting.cn;
    location ~ ^/blog { ... }
}
```

ps: ~ ^/blog$ 表达式其实等同于 = /blog，但优先级不变

- **案例 6**

普通匹配下，返回最长匹配的 location，与 location 所在位置顺序无关

```js
// 访问http://hejueting.cn/blog，匹配最长location，因此结果为702
server {
    server_name hejueting.cn;
    location /b {
        return 701;
    }
    location /blog {
        return 702;
    }
}

server {
    server_name hejueting.cn;
    location ~ ^/b {
        return 701;
    }
    location ~ ^/blog {
        return 702;
    }
}
```

- **案例 7**

正则匹配,与 location 的顺序有关

```js
// 访问http://hejueting.cn/blog，/blog 满足以 /b 开头的条件，因此结果为701
server {
    server_name hejueting.cn;
    location ~ ^/b {
        return 701;
    }
    location ~ /blog {
        return 702;
    }
}
// 访问http://hejueting.cn/blog，/blog 满足以 /blog 开头的条件，因此结果为702
server {
    server_name hejueting.cn;
    location ~ /blog {
        return 702;
    }
    location ~ ^/b {
        return 701;
    }
}
```

- **案例 8**

参照：精确匹配 > 正则匹配 > 普通匹配的匹配规则

```js
// 访问http://hejueting.cn/blog，返回703
// 访问http://hejueting.cn/blo，返回702
// 访问http://hejueting.cn/bl，返回702
// 访问http://hejueting.cn/b，返回701
server {
    server_name hejueting.cn;

    location /b {
        return 701;
    }
    location ~ ^/bl {
        return 702;
    }
    location = /blog {
        return 703;
    }

}
```

- **案例 9**

```js
// 精准匹配 > 前缀匹配
// 访问http://hejueting.cn/b，返回701
// 访问http://hejueting.cn/blog，返回702
server {
    server_name hejueting.cn;
    location ^~ /b {
        return 701;
    }
    location = /blog {
        return 702;
    }
}

// 前缀匹配 > 正则匹配
// 访问http://hejueting.cn/b，返回702
// 访问http://hejueting.cn/blog，返回702
server {
    server_name hejueting.cn;
    location = ^/blog {
        return 701;
    }
    location ^~ /b {
        return 702;
    }
}

// 前缀匹配 = 普通匹配，会根据location的长度来进行匹配
// 访问http://hejueting.cn/b，返回701
// 访问http://hejueting.cn/bl，返回702
// 访问http://hejueting.cn/blo，返回703
// 访问http://hejueting.cn/blog，返回704
server {
    server_name hejueting.cn;
    location ^~ /b {
        return 701;
    }
    location /bl {
        return 702;
    }
    location ^~ /blo {
        return 703;
    }
    location /blog {
        return 704;
    }
}

// 如果前缀匹配、正则匹配、普通匹配同时存在，正则 > 普通&前缀
// 访问http://hejueting.cn/b，返回701，此时只匹配到了前缀匹配
// 访问http://hejueting.cn/bl，返回701，此时只匹配到了前缀匹配、正则匹配，前缀 > 正则
// 访问http://hejueting.cn/blo，返回701，此时只匹配到了前缀匹配、正则匹配，前缀 > 正则
// 访问http://hejueting.cn/blog，返回702，此时只匹配到了前缀匹配、正则匹配、普通匹配，正则 > 普通&前缀
server {
    server_name hejueting.cn;
    location ^~ /b {
        return 701;
    }
    location ~ ^/bl {
        return 702;
    }
    location /blog {
        return 703;
    }
}
```

</br>
</br>
