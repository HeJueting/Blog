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

- **创建mongodb.log**

首先，你需要进入mongodb文件夹下，手动创建一个mongodb.log的文件日志

- **配置**

打开管理员命令窗口（Windows PowerShell），进入到你的mongdob下面的bin目录，执行以下命令：

```
./mongod.exe --logpath "C:\mongodb\mongodb.log" --logappend --dbpath "C:\mongodb\data" --directoryperdb --serviceName "mongodb" --install
```

上述命令就是配置mongodb的日志和数据库的文件目录地址，你需要配置到自己mongodb的目录，值得注意的是，所有的路径和名称都需要加上引号。如果你的目录地址中存在空格，且不加引号，例如:

```
C:\Program Files\mongodb\mongodb.log
```

此时执行上面的命令会报错：*Invalid command:Files\mongodb\mongodb.log*，因此在配置名称和路径时，最好加上引号

</br>

- **开启服务**

上述命令中，有一个--serviceName的参数，该参数代表你数据库的名称，此处我的数据库名称是“mongodb”，同样在管理员命令窗口（Windows PowerShell）执行以下命令：

```
net start mongodb   //开启服务
net stop mongodb    //关闭服务
```

</br>
</br>


### 数据的导入导出

</br>

- **命令行**

cd到mongodb的bin目录下：

![image](http://qiniu.hejueting.cn/github/notes/mongodb/catalog.png)

```
mongoexport -d <数据库名称> -c <collection名称> -o <json文件名称>
mongoimport -d <数据库名称> -c <collection名称> --file <要导入的json文件名称>
```

</br>

- **MongoDB Compass Community**

选中一个数据表，会出现 Collection 选项，在 Collection 的下拉菜单中，就可以选择 import data 和 export collection（导入和导出数据）

![image](http://qiniu.hejueting.cn/github/notes/mongodb/compass.png)


</br>
</br>
</br>
</br>












> # Linux(Centos 7)

</br>




### 安装

</br>

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

![image](http://qiniu.hejueting.cn/github/notes/mongodb/verification.png)


**PS：** 最新版本的安装，请参见：[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)

</br>

------

</br>







### 远程连接

</br>

- **服务器开放端口号**

mongodb默认的端口号是27017，需要服务器将其开放出来。我使用的阿里云云服务器（[开放地址](https://swas.console.aliyun.com/?spm=5176.12818093.my.dswas.488716d0Il0BVL#/server/9d0419bb1acc4784bc03bb1b12e31d10/cn-beijing/security/firewall)），点击左侧防火墙菜单进行配置
![image](http://qiniu.hejueting.cn/github/notes/mongodb/port.png)

</br>

- **修改mongod.conf配置文件**

```
vim /etc/mongod.conf          // 编辑配置文件
```

![image](http://qiniu.hejueting.cn/github/notes/mongodb/conf.png)


wq保存退出后，记得重启mongodb

```
systemctl restart mongod.service
```

</br>
</br>

- **本地连接mongdb**

</br>

**1、** 可视化工具

我使用的是mongodb官方可视化工具 —— MongoDB Compass Community，输入**公网IP**和**端口号**即可进行连接

![image](http://qiniu.hejueting.cn/github/notes/mongodb/connect.png)

</br>

**2、** cmd连接

```
mongo 11.11.11.11 //mongo后面接你的公网IP地址
```

</br>

------

</br>







### 添加用户认证

</br>

如果按照以上步骤操作，意味着任何人都可以连接你的数据库，因此，我们还需要针对不同数据库创建用户信息，避免任何人都可以对你的数据库进行读写。

</br>

- **角色权限**

在moogodb中，每一个数据库都可以创建多个角色，不同的角色有着不同的操作权限

**1、** Database User Roles（数据库用户角色）

	✦ read：读取指定数据库中任何数据
	✦ readWrite：读写指定数据库中任何数据

**2、** Database Administration Roles（数据库管理角色）

	✦ dbAdmin：在指定数据库中执行管理函数
	✦ dbOwner：该数据库的所有者，拥有该库的所有权限，包括readWrite，dbAdmin和userAdmin权限
	✦ userAdmin：在指定数据库里创建、删除和管理用户

**3、** Cluster Administration Roles（群集管理角色）

	✦ clusterAdmin
	✦ clusterManager
	✦ clusterMonitor
	✦ hostManager

**4、** Backup and Restoration Roles（备份和恢复角色）

	✦ backup
	✦ restore

**5、** All-Database Roles（所有数据库角色）

	✦ readAnyDatabase：读取所有数据库中任何数据
	✦ readWriteAnyDatabase：读写所有数据库中任何数据
	✦ userAdminAnyDatabase：在任何数据库里创建、删除和管理用户
	✦ dbAdminAnyDatabase：在任何数据库中执行管理函数

**6、** Superuser Roles（超级管理员角色）
	
	✦ root：readWriteAnyDatabase、dbAdminAnyDatabase、userAdminAnyDatabase、clusterAdmin、restore、backup权限


更多角色详情，请查看： [https://docs.mongodb.com/manual/reference/built-in-roles/#database-user-roles](https://docs.mongodb.com/manual/reference/built-in-roles/#database-user-roles)

</br>


- **创建超级管理员用户** 

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

![image](http://qiniu.hejueting.cn/github/notes/mongodb/superman.png)


</br>


- **修改配置文件** 

```
//编辑配置文件
vim /etc/mongod.conf

//修改配置文件内容
security:                       // 去掉security前面#
    authorization: enabled      // 添加这句开启认证
```

![image](http://qiniu.hejueting.cn/github/notes/mongodb/superman-conf.png)

</br>


- **重启mongodb** 

```
systemctl restart mongod.service
```

</br>


- **连接测试** 

**1、** MongoDB Compass Community

![image](http://qiniu.hejueting.cn/github/notes/mongodb/connect-test.png)

**2、** cmd

```
mongo 阿里云公网地址 -u "root" -p "xxxxxx" --authenticationDatabase admin
```

</br>


- **常用命令** 

	- show dbs： 显示数据库列表
	
	- show collections： 显示当前数据库中的集合
	
	- use XXX： 切换/创建XXX数据库

	- show users： 展示当前数据库下的用户信息
	
	- db.dropUser('xxx')： 删除用户
	
	- db.dropDatabase()： 删除当前使用数据库

	- db.getName()： 查看当前使用的数据库

	- db.createUser： 创建用户

	- db.help()： 查看命令提示

</br>

------

</br>




### 使用moogose连接数据库

</br>

在我搭建个人博客中，使用到了 **moogose** 这个库对数据库进行连接，由于我开启了 mongodb 用户权限，使用 moogose 进行数据库连接时，也需要添加用户信息，否则 mongodb 会连接失败。

</br>

- **创建拥有读写权限的角色**

虽然我们一开始在 admin 数据库下创建了一个超级管理用户，他拥有所有数据库的读写权限，但是我的个人博客使用的是 blog 数据库，在 blog 数据库下用户认证是不会通过的。

![image](http://qiniu.hejueting.cn/github/notes/mongodb/writeReadLimit.png)

</br>

因此，我们还需要在 blog 数据库下新建一个拥有读写权限的用户角色：

```javascript
//切换到blog数据库
use blog

//创建拥有读写权限的用户角色
db.createUser(
  {
    user: "blog",          // 账号（自行设置）
    pwd: "xxxxxx",         // 密码（自行设置）
    roles: [{
		role:"readWrite",  // 拥有读写权限即可
		db:"blog"          // 指定数据库
	}]
  }
)
```

</br>

- **连接数据库**

```javascrit
mongoose.connect("mongodb://localhost:27017/blog", {
    user: "blog",          //用户名
    pass: "xxxxxx",        //密码
    useNewUrlParser: true
})
```

</br>
</br>

### 博客原文：[hejueting.cn](www.hejueting.cn)

</br>
