# XSS 攻击

</br>

### 什么是 XSS 攻击

往 HTML 文件中或者 DOM 中注入恶意脚本。例如获取 cookie 信息，然后通过跨域请求将该信息发送给恶意服务器

</br>
</br>

### 如何注入恶意脚本

1. 将 JavaScript 代码存储到你的数据库中

2. 将 JavaScript 代码以 get 请求参数的形式返回给浏览器，浏览器执行该参数的代码

</br>
</br>

### 如何阻止 XSS 攻击

1. 对输入脚本进行过滤或转码

2. 很多 XSS 攻击都是来盗用 Cookie 的，因此服务器通过 HTTP 响应头来设置 HttpOnly 属性来保护我们 Cookie 的安全

</br>
</br>
