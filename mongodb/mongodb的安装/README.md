# mongodb 的安装

</br>
</br>

## windows

</br>

### 下载

下载地址：[https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)

</br>
</br>

### 加入到 windows 本地服务中

</br>

- **创建 mongodb.log**

首先，你需要进入 mongodb 文件夹下，手动创建一个 mongodb.log 的文件日志

</br>

- **配置**

打开管理员命令窗口（Windows PowerShell），进入到你的 mongdob 下面的 bin 目录，执行以下命令：

```
./mongod.exe --logpath "C:\mongodb\mongodb.log" --logappend --dbpath "C:\mongodb\data" --directoryperdb --serviceName "mongodb" --install
```

上述命令就是配置 mongodb 的日志和数据库的文件目录地址，你需要配置到自己 mongodb 的目录，值得注意的是，所有的路径和名称都需要加上引号。如果你的目录地址中存在空格，且不加引号，例如:

```
C:\Program Files\mongodb\mongodb.log
```

此时执行上面的命令会报错：_Invalid command:Files\mongodb\mongodb.log_，因此在配置名称和路径时，最好加上引号

</br>

- **开启服务**

上述命令中，有一个--serviceName 的参数，该参数代表你数据库的名称，此处我的数据库名称是“mongodb”，同样在管理员命令窗口（Windows PowerShell）执行以下命令：

```
net start mongodb   //开启服务
net stop mongodb    //关闭服务
```

</br>
</br>

## Linux(Centos 7)

</br>

### 安装

</br>

- **创建 mongodb-org-4.2.repo 文件**

```
//cd到yum.repos.d目录下
cd etc/yum.repos.d

//创建文件
vim mongodb-org-4.4.repo
```

</br>

- **写入配置信息**

```
//在该文件中输入并保存以下内容
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

</br>

- **使用 yum 安装**

```
yum install -y mongodb-org
```

</br>
</br>

### 操作命令

```
service mongod start   //开启服务
service mongod stop    //关闭服务
service mongod restart //重启服务
systemctl restart mongod.service  //重启服务
```

</br>
</br>

### 验证是否开启成功

```
mongo  // 输入命令
```

</br>

**PS：** linux 下最新版本的安装，请参见：[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)
