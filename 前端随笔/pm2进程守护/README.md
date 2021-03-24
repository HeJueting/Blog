# pm2 进程守护

</br>

### 什么是 pm2 ?

pm2 是一个基于 Nodejs 开源的进程管理器，包括守护进程，监控，日志的一整套完整的功能，是 Nodejs 应用程序守护进程的不二选择，事实上它并不仅仅可以启动 Nodejs 的程序，只要是一般的脚本的程序它同样可以胜任。

</br>
</br>

### 安装 pm2

```
// 全局安装
npm install pm2 -g

// 如果你是linux系统，还需要指定一下命令软链接（需要根据你linux下node的安装目录来指定）
ln -s /node-v14.16.0-linux-x64/lib/node_modules/cnpm/bin/pm2 /usr/local/bin/pm2

// 查看版本
pm2 --version
```

</br>
</br>

### 常用命令

- **查看帮助文档**：pm2 --version

- **查看进程列表**：pm2 list

- **启动程序**：pm2 start

- **重启项目**：pm2 restart AppName|id|all

- **停止项目**：pm2 stop AppName|id|all

- **删除项目**：pm2 delete AppName|id|all

- **查看项目基本信息**：pm2 info AppName|id|all

- **查看项目日志**：pm2 log AppName|id

PS：pm2 start 启动程序后，这个程序就变成了一个 pm2 项目，通过 pm2 list 命令可以查看：项目名（AppName），项目 id（id）。上述命令中的 all 代表所有。

</br>
</br>

### 常用案例

```js
// 以app项目名称启动、重启、关闭、删除一个app.js
pm2 start app.js --name="app"
pm2 restart app
pm2 stop app
pm2 delete app

// 当app.js变化时自动重启应用
pm2 start app.js --watch

// 等价于 npm run dev
pm2 start  npm -- run dev
```

</br>
</br>
