# 重温 git

</br>

### 什么是 git ?

git 是一个版本控制系统

</br>
</br>

### 版本控制系统 ?

例如 world 文档的 ctrl + z 和 ctrl + y 功能，他能记录你文件的每次修改。每一次修改都可以看作一个版本，通过对版本的管理，就能实现对文件的内容的管控。

</br>
</br>

### 如何安装 git？

- **windows**

直接在[官网](https://git-scm.com/download/win)下载 exe 安装包，然后点击安装即可。

- **Linux/Unix**

对于 Linux/Unix 系统，[官网](https://git-scm.com/download/linux)也详细介绍了安装步骤。阿里云服务器 centos7 系统也自带了 git。

</br>
</br>

### 版本控制

在开始版本控制之前，我们需要先创建一个版本库，也叫做仓库，这个仓库会帮我们记录该目录下所有文件的变化，以便我们任何时刻都可以追踪历史，或者在将来某个时刻"还原"

</br>

**1、创建版本库**

```
git init
```

仓库建立好之后，可以看见多了一个 .git 的文件夹（如果没有看见，需要设置一下显示隐藏的项目）。这个 .git 文件夹就是我们用来追踪管理仓库的关键。

</br>

**2、将文件添加到版本库**

在 .git 文件夹同级目录下，创建一个 test.txt 文件，并输入 'hello world' 文本，然后使用以下命令将这个文件添加进入版本库

```
git add test.txt
```

然后，我们还需要告诉 git 此次提交的说明：

```
git commit -m "创建test.txt文件，并输入hello world"
```

</br>

**3、查看当前仓库是否有修改**

我们打开刚才的 test.txt 文件，将里面的内容修改为 "hello hejueting"，然后使用 git status 命令查看当前仓库变化

```
git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   test.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

git status 命令可以让我们时刻掌握仓库当前的状态，上面的命令输出告诉我们，test.txt 被修改过了，但还没有准备提交的修改。

</br>

**4、查看具体的修改内容**

```
git diff test.txt

index 95d09f2..01da95b 100644
--- a/test.txt
+++ b/test.txt
-hello world
+hello hejueting
```

上面的命令输出看出，我们将 hello world 修改为 hello hejueting

</br>

**5、查看已经提交的版本**

我们先将刚才的修改进行提交

```
git add test.txt
git commit -m "将hello world修改为hello hejueting"
```

然后再使用 git log 命令查看已经提交的版本记录

```
git log

commit 897aa97ec5778b8c4210a98fb1bf83280af3f5e5 (HEAD -> master)
Author: hejueting <279975246@qq.com>
Date:   Fri Mar 19 17:16:39 2021 +0800

    将hello world修改为hello hejueting

commit 336595df5ab9927d1efde23908794088ce5b37f0
Author: hejueting <279975246@qq.com>
Date:   Fri Mar 19 16:57:52 2021 +0800

    创建test.txt文件，并输入hello world
```

这里已经将版本信息详细的打印了出来，我们还可以加上--pretty=oneline 参数，更直观地查看我们的历史版本

```
$ git log --pretty=oneline

897aa97ec5778b8c4210a98fb1bf83280af3f5e5 (HEAD -> master) 将hello world修改为hello hejueting
336595df5ab9927d1efde23908794088ce5b37f0 创建test.txt文件，并输入hello world
```

控制台会展示两个信息，一个是版本号，一个是你 commit 的提交说明。

</br>

**6、回退到上一个版本**

```
git reset --hard HEAD^

HEAD is now at 336595d 创建test.txt文件，并输入hello world
```

这时候，我们去查看我们的 test.txt 文件，就会发现 hello hejueting 已经恢复到了 hello world。

</br>

**7、回退到某一个版本**

```
git reset --hard 336595df5ab9927d1efde23908794088ce5b37f0
```

--hard 后面加上对应的版本号即可

</br>

**8、重新恢复到新版本**

当我们回退版本后，想恢复至 "hello hejueting" 这个版本又怎么办呢 ? 通过 git log 命令已经不再显示该版本的版本号了, 但我们可以使用 git reflog 命令去查看.

```
// 查看当前版本信息
git log --pretty=oneline
336595df5ab9927d1efde23908794088ce5b37f0 (HEAD -> master) 创建test.txt文件，并输入hello world

// 查看历史版本信息
git reflog
336595d (HEAD -> master) HEAD@{0}: reset: moving to HEAD^
897aa97 HEAD@{1}: commit: 将hello world修改为hello hejueting
336595d (HEAD -> master) HEAD@{2}: commit (initial): 创建test.txt文件，并输入hello world

// 回退到 "hello hejueting" 版本
git reset --hard 897aa97
```

再次查看 test.txt 文件, 已经回复至 "hello hejueting" 这个版本了

</br>
