# 阿里云配置 SSH keys

</br>

### 前言

我的阿里云服务器安装的是 centos 系统，通过 yum 安装 git 后，使用 git clone git@github.com:HeJueting/test.git 命令克隆我 github 仓库时，出现以下报错：

```
Permission denied (publickey).
```

这是因为没有配置 SSH keys，却使用了 SSH 地址下载 GitHub 项目。因此，我需要给阿里云服务器生成 SSH keys。

</br>
</br>

### 生成 SSH keys

```
// 配置邮箱（输入命令后一路回车键即可）
ssh-keygen -t rsa -C  test@example.com

//
ssh -v git@github.com

ssh-agent -s

eval "ssh-agent -s"

ssh-add ~/.ssh/id_rsa

// 查看生成的公钥（id_rsa是私钥，id_rsa.pub是公钥）
vim /root/.ssh/id_rsa.pub
```

ssh 是什么：https://www.jianshu.com/p/1246cfdbe460

配置 ssh：https://blog.csdn.net/zhangbeizhen18/article/details/90759887
