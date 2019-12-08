# mongodb的安装

</br>

每次装mongodb都要去goole很多文章，干脆写一个简单的文章记录一下，避免下次又浪费时间到处找资源

</br>
</br>


> # windows

</br>

### 下载

下载地址：[https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)

</br>
</br>

### 加入到windows本地服务中

</br>

- **配置**

```
mongod.exe --logpath C:\mongodb\mongodb.log --logappend --dbpath C:\mongodb\data --directoryperdb --serviceName mongodb --install
```

上述命令就是配置mongodb的日志和数据库的文件目录地址，你需要配置到自己Mongodb的目录，值得注意的是，如果你的目录地址中存在空格，例如:

```
C:\Program Files\mongodb\mongodb.log
```

此时执行上面的命令会报错：*Invalid command:Files\mongodb\mongodb.log*，你该使用如下方式去规定他们目录地址：

```
mongod.exe --logpath=“C:\Program Files\mongodb\mongodb.log” --logappend --dbpath=“C:\Program Files\mongodb\data” --directoryperdb --serviceName MongoDB --install
```

</br>

- **开启服务**

上述命令中，有一个--serviceName的参数，该参数代表你数据库的名称，此处我的数据库名称是“mongodb”：

```
net start mongodb   //开启服务
net stop mongodb    //关闭服务
```

</br>
</br>


### 数据的导入导出

```
mongoexport -d <数据库名称> -c <collection名称> -o <json文件名称>
mongoimport -d <数据库名称> -c <collection名称> --file <要导入的json文件名称>
```

</br>
</br>



</br>
</br>

> # Linux(Centos 7)

</br>

### 安装

- **创建mongodb-org-4.2.repo文件**

```
//cd到yum.repos.d目录下
cd etc/yum.repos.d

//创建文件
vim mongodb-org-4.2.repo
```

</br>

- **写入配置信息**

```
//在该文件中输入并保存以下内容
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

</br>

- **使用yum安装**

```
yum install -y mongodb-org
```

</br>

- **开启服务**

```
service mongod start   //开启服务
service mongod stop    //关闭服务
service mongod restart //重启服务
systemctl restart mongod.service  //重启服务
```

</br>

- **验证是否开启成功**

```
mongo
```

![image](https://github.com/HeJueting/Blog/blob/master/image/mongodb-install-1.png)


**PS：** 最新版本的安装，请参见：[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)

</br>

------

</br>

### 远程连接

- **服务器开放端口号**

mongodb默认的端口号是27017，需要服务器将其开放出来。我使用的阿里云云服务器（[开放地址](https://swas.console.aliyun.com/?spm=5176.12818093.my.dswas.488716d0Il0BVL#/server/9d0419bb1acc4784bc03bb1b12e31d10/cn-beijing/security/firewall)），点击左侧防火墙菜单进行配置
![image](https://github.com/HeJueting/Blog/blob/master/image/mongodb-install-2.png)

</br>

- **修改mongod.conf配置文件**

```
vim /etc/mongod.conf          // 编辑配置文件
```

![image](https://github.com/HeJueting/Blog/blob/master/image/mongodb-install-3.png)


wq保存退出后，记得重启mongodb

```
systemctl restart mongod.service
```

</br>

- **本地连接mongdb**

**1、** 可视化工具

我使用的是mongodb官方可视化工具 —— MongoDB Compass Community，输入**公网IP**和**端口号**即可进行连接

![image](https://github.com/HeJueting/Blog/blob/master/image/mongodb-install-4.png)

</br>

**2、** cmd连接

```
mongo 11.11.11.11 //mongo后面接你的公网IP地址
```

</br>

- **添加用户认证**

如果按照以上步骤操作，意味着任何人都可以连接你的数据库，因此，我们还需要针对不同数据库创建用户信息，避免任何人都可以对你的数据库进行读写。

**1、** 创建超级管理员用户

```
//连接数据库(你也通过cmd远程连接，这里我在服务器直接使用mongo命令进行的连接)
mongo

//切换到admin数据库
use admin

//创建管理员用户
db.createUser(
  {
    user: "root",      // 账号（自行设置）
    pwd: "xxxxxx",     // 密码（自行设置）
    roles: ["root"]    // 角色：超级管理员
  }
)

//验证你的账号信息：0代表验证失败，1代表验证通过
db.auth("root","xxxxxx")
```

![image](https://github.com/HeJueting/Blog/blob/master/image/mongodb-install-5.png)

</br>

**2、** 修改配置文件

```
//编辑配置文件
vim /etc/mongod.conf

//修改配置文件内容
security:                       // 去掉security前面#
    authorization: enabled      // 添加这句开启认证
```

![image](https://github.com/HeJueting/Blog/blob/master/image/mongodb-install-6.png)

</br>

**3、** 重启mongodb

```
systemctl restart mongod.service
```

</br>

**4、** 连接测试

✦ MongoDB Compass Community

![image](https://github.com/HeJueting/Blog/blob/master/image/mongodb-install-7.png)

✦ cmd

```
mongo 阿里云公网地址 -u "root" -p "xxxxxx" --authenticationDatabase admin
```

</br>

**5、** 常用命令

	- show dbs： 显示数据库列表
	
	- show collections： 显示当前数据库中的集合
	
	- use XXX： 切换/创建XXX数据库
	
	- db.dropDatabase()： 删除当前使用数据库

	- db.getName()： 查看当前使用的数据库

	- db.createUser： 创建用户

	- db.help()： 查看命令提示

</br>

**6、** 角色权限

在moogodb中，每一个数据库都可以创建多个角色，不同的角色有着不同的操作权限。对个人用户而言，也不需要这么角色去管理自己的数据库，如果有需要，可以自行学习：(https://docs.mongodb.com/manual/core/authorization/)[https://docs.mongodb.com/manual/core/authorization/]


</br>

------

</br>

### 踩坑

- **报错：** Job for mongod.service failed because the control process exited with error code. See “systemctl status mongod.service” and “journalctl -xe” for details.

```
//修改mongodb-27017.sock文件的所有者权限
chown mongod:mongod /tmp/mongodb-27017.sock
```