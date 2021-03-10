# 博客的规划与设计

</br>

### 功能规划

整个项目应该由一个 管理系统 + 个人博客 构成，个人博客的所有内容管理应由管理系统来控制。于我而言，博客管理系统应该有以下功能：

- 可以对个人博客流量、本人活跃度进行统计
- 维护本人基本信息（可以展示在个人博客中），简历信息（在线简历，显得高大上？）
- 集成一个对象存储平台，在线操作云端资源（再也不受 xshell 和 xftp 的限制了）
- 通过富文本编辑器操作进行文章管理，且支持分类、评论、点赞、排序、权限、回收站等常用功能
- 拥有相册功能，支持分类、权限、上传照片等常用功能
- 支持生活记录（记录下每年精彩、难忘的事件）
- 高度配置个人博客，如：友情链接、主题、配图...

</br>
</br>

### 数据库设计

在开发项目前，数据库设计尤为重要，它关乎着你整个项目的健壮性、可维护性。经过我的缜密思考（肯定还有很多不完美的地方），数据库设计如下：

**User 表**

|     | 字段              | 类型     | 描述                                   |
| --- | ----------------- | -------- | -------------------------------------- |
| 1   | \_id              | ObjectId | moogodb 生成的唯一标识字段             |
| 2   | userName          | String   | 登录密码                               |
| 3   | password          | String   | 登录密码                               |
| 4   | headImg           | String   | 头像的 url 地址                        |
| 5   | nickName          | String   | 用于展示的昵称                         |
| 6   | isMale            | Boolean  | 性别，男(true)、女(false)              |
| 7   | constellation     | String   | 星座                                   |
| 8   | birthday          | String   | 出生日期                               |
| 9   | email             | String   | 邮箱                                   |
| 10  | github            | String   | github 仓库地址                        |
| 11  | company           | String   | 就职公司                               |
| 12  | job               | String   | 从事工作                               |
| 13  | city              | String   | 现居城市                               |
| 14  | motto             | String   | 座右铭                                 |
| 15  | introduction      | String   | 自我介绍                               |
| 16  | hobby             | Array    | 爱好                                   |
| 17  | label             | Array    | 个性标签                               |
| 18  | educationRecord   | Array    | 教育履历                               |
|     | id                | Number   | 由时间戳生成的唯一 id（用于增删改查）  |
|     | school            | String   | 学校                                   |
|     | diploma           | String   | 文凭                                   |
|     | major             | String   | 专业                                   |
|     | startTime         | Number   | 起始时间（时间戳），空值默认为至今     |
|     | endTime           | Number   | 结束时间（时间戳）                     |
| 19  | workRecord        | Array    | 工作履历                               |
|     | id                | Number   | 由时间戳生成的唯一 id（用于增删改查）  |
|     | company           | String   | 公司名称                               |
|     | job               | String   | 从事工作                               |
|     | location          | String   | 工作地点                               |
|     | startTime         | Number   | 起始时间（时间戳），空值默认为至今     |
|     | endTime           | Number   | 结束时间（时间戳）                     |
| 20  | certificateRecord | Array    | 技能证书                               |
|     | id                | Number   | 由时间戳生成的唯一 id（用于增删改查）  |
|     | name              | String   | 证书名称                               |
|     | time              | Number   | 获取时间                               |
|     | number            | Number   | 证书编号                               |
| 21  | news              | Number   | 新消息的数量（用户评论会标记为新消息） |

</br>
