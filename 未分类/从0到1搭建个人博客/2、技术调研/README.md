# 技术调研

</br>

### 前端技术选型 Vue or React ？

作为前端圈最热门的两个技术框架，它们都有自己的成熟的技术配套。条条大路通罗马，无论选择 Vue 还是 React，都是可行的。React Hook 推出后，于我而言，更倾向于学习和使用 React 去进行开发。

</br>
</br>

### 服务端技术选型

作为前端开发工程师，node.js 就作为了服务端开发第一选择。基于 node.js 衍生出来的框架也很丰富：[Express](https://expressjs.com/zh-cn/)、[koa](https://koa.bootcss.com/)、[hapi](https://hapi.dev/)... 由于平时工作中有接触过 [egg.js](https://eggjs.org/zh-cn/)，它在 koa 基础上进行了封装，规范了项目架构，更适用于大型项目的开发。因此，我最终选择了 egg.js。

</br>
</br>

### 管理系统 - 技术架构

- **项目架构：** 随着 webpack 的学习成本、配置复杂度的增加，Vue 和 React 各自都推出了一套快速生成项目的工具库，因此我们可以直接借助[create-react-app](https://www.html.cn/create-react-app/docs/getting-started/) 快速生成一个 React 项目。

- **开发语言：** 引入 [TypeScript](https://www.typescriptlang.org/) 去规范 javascript 的数据类型，在开发过程中更容易排查出弱类型语言带来类型隐患，大大提升了项目的健壮性和可维护性。[React Hook](https://zh-hans.reactjs.org/docs/hooks-intro.html) 作为 React 最新推出的 Api，相比于 Component 代码语法更简洁，更是一种全新的开发思想。

- **UI 框架：** [Antd-Design](https://ant.design/) 作为国内最火的 React UI 框架，基于它可以快速搭建后台管理系统。React

- **富文本编辑器：** [braftEditor](https://github.com/margox/braft-editor) 是一款基于 draft.js 开发的一款 React 富文本编辑器，支持代码高亮，样式自定义，px 转 rem...功能

- **其他：** 还有许多工具库，都可以根据自己平时的喜好、项目应用场景去进行选择。例如 css 预处理（less 和 sass）、数据交互（axios 和 fetch）...

</br>
</br>

### 个人博客 - 技术架构
