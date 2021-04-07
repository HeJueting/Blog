# 聊一聊前后端如何用户认证

</br>

### 前言

由于 HTTP 协议是无状态的协议，如果服务端需要记录用户的状态时，就需要用某种机制来识具体的用户，**这个机制就是 Session**

</br>
</br>

### Session 机制

这里的 Session **是一个抽象概念**，即**会话**，它适用于在网站上记录有关用户（成客户端 or 浏览器）会话的信息。客户端与服务端通信时就会根据该会话信息，识别用户的状态。

</br>
</br>

### Cookie

我们可以通过 Cookie 去实现这样的**会话机制**。当服务器通过 HTTP 响应头设置 cookie 后，会在本地保存这个 cookie 数据，浏览器在下次向同一服务器再发起请求时，便携带该 cookie 并发送到服务器上。

![image](./img/cookie.jpg)

**特点**

-   跨域限制（可通过服务端设置 Access-Control-Allow-Credentials，前端设置 withCredentials 来解除）

-   本地存储，存储时间较长，但存储内容可以被轻松查看

-   cookie 存储的数量受限，跟浏览器及其版本有关，一般来说不超过 50 条

-   cookie 存储的大小受限，跟浏览器及其版本有关，一般来说不超过 4KB

</br>
</br>

### Session

这里的 Session 也是一种实现方式（注意区分 Session 机制，不同语境下的含义不同）。考虑到 Cookie 将内容存储在本地，很容易被查看，就衍生出了 Session 这种实现方式。

![image](./img/session.jpg)

其原理还是基于 Cookie 进行实现，只是这里的 cookie 保存的是一个 session id，服务器接收到这个 session id 后，会在自己维护的 Session 中找到对应的会话数据。与 Cookie 实现方式的不同点在于，前者将会话数据存储于浏览器端（容易被查看），而后者将会话数据存储于服务器端（就算被获取了，也拿不到关键信息）

但是这样的实现方式也有问题，如果 Session 过于庞大，服务器的性能会严重受影响。

</br>
</br>

### JWT

JWT 全称为 JSON Web Token，它由三部分组成：

```javascript
header.payload.signature

// 例如，下面的字符串就是一个完整的JWT：
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWNhNDE0NzI0OTg4MzYzMTYyNDBmMDg5IiwidWlkIjoiMzM5NzAiLCJyb2xlIjoiYWRtaW4iLCJsZXZlbCI6MTAwMDB9LCJleHAiOjE2MTc3OTk5ODcsImlhdCI6MTYxNzcxMzU4N30.1f40uQVFTf1h2GyhkFRT6SAyLRUKXdeXRPGx23ERjF0
```

</br>

**Header（头部）**

一个 json 对象，用于描述令牌的类型和加密算法，然后通过 base64 编码得到了第一部分

```json
{
    "typ": "JWT",
    "alg": "HS256"
}
```

</br>

**Payload（负载）**

也是一个 JSON 对象，用于描述 jwt 签发者，jwt 过期时间...等信息，以及用户自定义信息，也是通过 base64 编码得到了第二部分

```json
{
    "name": "hejueting",
    "admin": true
}
```

</br>

**Signature（签名）**

签名计算公式：

```javascript
// 这里HMACSHA256是header中声明的一种算法
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);
```

注意：生成签名还需要指定一个 secret，这个密钥只有服务器才知道。有了这个签名，就可以**防止数据篡改**

</br>

**工作流程**

![image](./img/jwt.jpg)

</br>

**特点**

-   JWT 也是保存在浏览器端的，一般保存在 localStorage 或者 indexDB 都可以

-   JWT 通常是携带于 http 请求头中的 Authorization 字段中，当然你也可以作为 get 或者 post 的参数进行携带

-   JWT 是通过服务端签发生成，并保存在浏览器端，因此一旦签发完成，就无法销毁（可通过重新签发 1s 过期的 JWT 来覆盖浏览器原有的 JWT 解决这个问题）

-   由于 payload 部分容易被破解，不应该在 payload 部分存放敏感信息

</br>
</br>
