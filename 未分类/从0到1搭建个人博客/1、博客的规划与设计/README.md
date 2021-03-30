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

在开发项目前，数据库设计尤为重要，它关乎着你整个项目的健壮性、可维护性。这里我使用的是 [XMind](https://www.xmind.cn/) 工具去设计我的数据表。经过我的缜密思考（肯定还有很多不完美的地方），数据库设计如下：

**User 表（用户信息）**

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

**articleCategory 表（文章分类）**

|     | 字段        | 类型     | 描述                                             |
| --- | ----------- | -------- | ------------------------------------------------ |
| 1   | \_id        | ObjectId | moogodb 生成的唯一标识字段                       |
| 2   | public      | Boolean  | 是否公开该分类                                   |
| 3   | sort        | Number   | 控制文章分类展示顺序(-1000 ~ 1000)，负数代表置顶 |
| 4   | name        | String   | 文章分类名称                                     |
| 5   | description | String   | 文章分类描述                                     |
| 6   | parentId    | String   | 父级分类的\_id                                   |
| 7   | level       | Number   | 文章分类等级（一级分类、二级分类...）            |

</br>

**article 表（文章）**

|     | 字段       | 类型     | 描述                                         |
| --- | ---------- | -------- | -------------------------------------------- |
| 1   | \_id       | ObjectId | moogodb 生成的唯一标识字段                   |
| 2   | sort       | Number   | 控制文章展示顺序(-1000 ~ 1000)，负数代表置顶 |
| 3   | title      | String   | 文章标题                                     |
| 4   | categoryId | String   | 文章分类的\_id                               |
| 5   | html       | String   | 正文（html 格式）                            |
| 6   | abstract   | String   | 文章摘要                                     |
| 7   | state      | Number   | 文章状态：草稿(0)、发布(1)、删除(2)          |
| 8   | tags       | Array    | 文章标签                                     |
| 9   | bacImg     | String   | 背景缩略图地址                               |
| 10  | purview    | Number   | 文章权限：私密(0)、密码(1)、公开(2)          |
| 11  | password   | String   | 访问密码                                     |
| 12  | look       | Number   | 浏览量                                       |
| 13  | good       | Number   | 点赞量                                       |
| 14  | createAt   | Number   | 创建时间（时间戳）                           |
| 15  | modifyAt   | Number   | 更新时间（时间戳）                           |

</br>

**albumCategory 表（相册分类）**

|     | 字段        | 类型     | 描述                                             |
| --- | ----------- | -------- | ------------------------------------------------ |
| 1   | \_id        | ObjectId | moogodb 生成的唯一标识字段                       |
| 2   | sort        | Number   | 控制相册分类展示顺序(-1000 ~ 1000)，负数代表置顶 |
| 3   | name        | String   | 相册分类名称                                     |
| 4   | description | String   | 相册分类描述                                     |

</br>

**album 表（相册）**

|     | 字段        | 类型     | 描述                                |
| --- | ----------- | -------- | ----------------------------------- |
| 1   | \_id        | ObjectId | moogodb 生成的唯一标识字段          |
| 2   | name        | String   | 相册名称                            |
| 3   | description | String   | 相册描述                            |
| 4   | categoryId  | String   | 相册分类的\_id                      |
| 5   | purview     | Number   | 相册权限：私密(0)、密码(1)、公开(2) |
| 6   | password    | String   | 访问密码                            |
| 7   | bacImg      | String   | 相册封面图片                        |
| 8   | location    | String   | 拍摄地点的地理信息\_id              |
| 9   | look        | Number   | 浏览量                              |
| 10  | createAt    | Number   | 创建时间（时间戳）                  |
| 11  | modifyAt    | Number   | 更新时间（时间戳）                  |

</br>

**photo 表（照片）**

|     | 字段       | 类型     | 描述                       |
| --- | ---------- | -------- | -------------------------- |
| 1   | \_id       | ObjectId | moogodb 生成的唯一标识字段 |
| 2   | categoryId | String   | 所属相册的\_id             |
| 3   | url        | String   | 照片的 url 访问地址        |
| 4   | width      | Number   | 照片宽度                   |
| 5   | height     | Number   | 照片高度                   |
| 6   | good       | Number   | 点赞数量                   |
| 7   | createAt   | Number   | 创建时间（时间戳）         |

</br>

**location 表（地理信息，考虑到想地图展示形迹）**

|     | 字段 | 类型     | 描述                           |
| --- | ---- | -------- | ------------------------------ |
| 1   | \_id | ObjectId | moogodb 生成的唯一标识字段     |
| 2   | time | Number   | 什么时候去的这个地方（时间戳） |
| 3   | name | String   | 地理名称                       |
| 4   | lng  | Number   | 地理经度                       |
| 5   | lat  | String   | 地理纬度                       |

</br>

**record 表（生活记录）**

|     | 字段     | 类型     | 描述                       |
| --- | -------- | -------- | -------------------------- |
| 1   | \_id     | ObjectId | moogodb 生成的唯一标识字段 |
| 2   | time     | Number   | 事件发生的时间（时间戳）   |
| 3   | title    | String   | 事件标题                   |
| 4   | content  | String   | 事件内容（html 格式）      |
| 5   | abstract | String   | 生活摘要                   |

</br>

**resume 表（我的简历）**

|     | 字段     | 类型     | 描述                       |
| --- | -------- | -------- | -------------------------- |
| 1   | \_id     | ObjectId | moogodb 生成的唯一标识字段 |
| 2   | content  | String   | 简历内容（html 格式）      |
| 3   | public   | Boolean  | 是否公开                   |
| 4   | password | String   | 访问密码                   |

</br>

**comment 表（所有评论）**

|     | 字段       | 类型     | 描述                                       |
| --- | ---------- | -------- | ------------------------------------------ |
| 1   | \_id       | ObjectId | moogodb 生成的唯一标识字段                 |
| 2   | category   | Number   | 类型: 文章(0)、相册(1)、留言板(2)、建议(3) |
| 3   | categoryId | String   | 分类模块的 id（文章、相册需要此字段）      |
| 4   | name       | String   | 称呼                                       |
| 5   | email      | String   | 邮箱                                       |
| 6   | html       | String   | 评论内容（html 格式）                      |
| 7   | quote      | String   | 被引用的评论\_id（回复别人的评论时需要 ）  |
| 8   | createAt   | Number   | 评论时间（时间戳）                         |

</br>

**active 表（活跃度统计）**

|     | 字段  | 类型     | 描述                       |
| --- | ----- | -------- | -------------------------- |
| 1   | \_id  | ObjectId | moogodb 生成的唯一标识字段 |
| 2   | date  | Number   | 当天日期（时间戳）         |
| 3   | look  | Number   | 当天访问量                 |
| 4   | login | Number   | 当天登录次数               |

</br>

**settting 表（个人博客的设置）**

|     | 字段        | 类型     | 描述                                 |
| --- | ----------- | -------- | ------------------------------------ |
| 1   | \_id        | ObjectId | moogodb 生成的唯一标识字段           |
| 2   | links       | Array    | 友情链接                             |
|     | url         | String   | 链接地址                             |
|     | title       | String   | 链接标题                             |
| 3   | themeConfig | Object   | 博客主题配置                         |
| ... | ...         | ...      | 其他配置（根据后期个人博客设计而定） |

</br>
</br>

### 原型图、界面 UI 设计

画原型图和界面 UI 设计，对于一个前端开发工程师而言，是真的难 ~ 自身对布局和审美的要求又高，但是这两个块内容又不是自己的强项，总会改来改去。考虑到自身强行在于编码，就只有结合 setting 数据表尽量让个人博客支持高度配置。最后，简述一下我的设计思路：

- 1、下载使用 [Axure RP](https://www.axure.com/) 画原型图，下载使用 [draw.io](https://github.com/jgraph/drawio-desktop/releases) 设计页面

- 2、多去去网上搜图片素材，将别人设计好的东西再进行拼拼凑凑；管理系统多参考 antd-design 布局和界面风格即可、个人博客就得多去淘淘宝藏网页了。

</br>
</br>

做好以上准备，下一步我们就可以开始技术调研了。
