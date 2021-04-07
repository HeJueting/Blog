# 使用 node.js 发送邮件

</br>

### 前言

邮件已经深入我们的生活，它跟短信一样具有提醒的功能。在个人博客开发中，需要登录验证、评论消息提醒等功能，考虑到现在的各大短信平台，都需要付费，就退而求其次，选择了邮件去实现这个功能。本文将简要介绍一下我是如何使用 node.js 实现邮件发送的功能。

</br>
</br>

### POP3/IMAP/SMTP 邮件协议

-   **POP3**：全称是 "Post Office Protocol 3"，即邮局协议的第 3 个版本。它主要作用是**接收邮件**，当我们发送一封邮件后，POP3 服务器会接收到这封邮件并保存在服务器上，如果有客户端连接上了 POP3 服务器，它可以下载这封邮件，但是如果**一旦下载成功，服务器上的这封邮件将会被删除**，因此如果后续有客户端连接服务器，将无法下载这封邮件

-   **IMAP**：全称是 "Internet Mail Access Protocol"，直译过来就是交互式邮件访问协议。它与 POP3 类似，都是用来**接收邮件**。不同点在于，它是双向通信的一个协议，服务器的邮件的状态跟客户端的邮件保持一致（删除、标记已读），这意味着客户端接收下载邮件后，IMAP 服务器仍然会保存这封邮件，不会立即删除。

-   **SMTP**：全称是 "Simple Mail Transfer Protocol"，直译过来就是简单的邮件传输协议。当我们通过 qq.com 发送一封邮件后，如果收件人也是 qq.com，SMTP 服务器就直接转其 qq.com 的 POP3 服务器就行了；如果接收人是 gmail.com，它还需要通过询问 DNS, 找到属于 gmail 的 SMTP 服务器，再由 gmail 的 SMTP 服务器转给 gmail 的 POP3 服务器。简单的来说，它的作用就是**发送邮件**

</br>
</br>

### nodemailer

我们可以借助 **nodemailer** 这个库快捷地实现 node.js 发送邮件。nodemailer 默认采用 SMTP 传输方式，常用的邮箱都支持的 SMTP 传输方式（网易、qq、新浪...）

```javascript
const nodemailer = require("nodemailer");

// 首先需要创建一个transporter对象
const transporter = nodemailer.createTransport({
    // nodemailer 内置了一些知名的邮件提供商，我们不需要自己写详细的配置，只需要配置提供商名称就足够了
    // 查看所有提供商：http://nodemailer.com/smtp/well-known/
    service: "qq",
    // 发送者邮箱、SMTP的授权码
    auth: {
        user: "hejueting@qq.com",
        pass: "xxxxxx",
    },
});

// 发送邮件
transporter.sendEmail({
    // 邮件发送对象
    to: "someone@qq.com",
    // 邮件主题
    subject: "hello world",
    // 消息内容（纯文本内容），如果对内容有样式排版要求，可以使用html字段
    text: "hello wolrd",
    // 邮件正文内容，html格式
    html: "<h1>Hello World</h1>",
});
```

nodemailer 是一个很成熟的库，它的配置项还有很多很多，但对于我们日常使用而言，上述配置已经完全满足开发需求了，更多详细内容可以查看 [nodemailer 官网文档](https://nodemailer.com/)

</br>
</br>

### 什么是 SMTP 的授权码？

在 nodemailer 中，我们需要配置 usr 和 pass 两个字段，usr 字段不难理解，表示发送者的邮箱。SMTP 的授权码它**不是你邮箱的登录密码**，而是当你的邮箱**开启 SMTP 服务后，为你生成的一个授权码**。默认情况下，常用的邮箱都没有开启 SMTP 服务，需要我们去客户端手动开启。

-   **QQ 邮箱**：https://service.mail.qq.com/cgi-bin/help?subtype=1&no=166&id=28

-   **网易邮箱**：https://help.mail.163.com/faqDetail.do?code=d7a5dc8471cd0c0e8b4b8f4f8e49998b374173cfe9171305fa1ce630d7f67ac2cda80145a1742516

-   **gmail 邮箱**：https://support.google.com/mail/answer/7126229?hl=zh-Hans

</br>
</br>

### 注意

-   建议使用 QQ 邮箱或者网易邮箱，在使用过程中暂没有发现任何坑

-   不建议使用 gmial 邮箱，它的安全机制对 nodemailer 的使用有所限制，如果必须使用该 gmail 邮箱，则需要使用 [OAuth2](http://nodemailer.com/smtp/oauth2/) 身份验证

</br>
</br>
