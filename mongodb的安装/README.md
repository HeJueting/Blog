# mongodb的安装
</br>
</br>

> 每次装mongodb都要去goole很多文章，干脆写一个简单的文章记录一下，避免下次又浪费时间到处找资源

</br>

### 下载

下载地址：[https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)
</br>
</br>

### 加入到windows本地服务中
**● 配置**
```javascript
mongod.exe --logpath C:\mongodb\mongodb.log --logappend --dbpath C:\mongodb\data --directoryperdb --serviceName mongodb --install
```
上述命令就是配置mongodb的日志和数据库的文件目录地址，你需要配置到自己Mongodb的目录，值得注意的是，如果你的目录地址中存在空格，例如:
```javascript
C:\Program Files\mongodb\mongodb.log
```
此时执行上面的命令会报错：*Invalid command:Files\mongodb\mongodb.log*，你该使用如下方式去规定他们目录地址：
```javascript
mongod.exe --logpath=“C:\Program Files\mongodb\mongodb.log” --logappend --dbpath=“C:\Program Files\mongodb\data” --directoryperdb --serviceName MongoDB --install
```
</br>
**● 开启服务**
上述命令中，有一个--serviceName的参数，该参数代表你数据库的名称，此处我的数据库名称是“mongodb”：
```javascript
net start mongodb   //开启服务
net stop mongodb    //关闭服务
```
</br>
</br>

### 数据的导入导出
```javascript
mongoexport -d <数据库名称> -c <collection名称> -o <json文件名称>
mongoimport -d <数据库名称> -c <collection名称> --file <要导入的json文件名称>
```