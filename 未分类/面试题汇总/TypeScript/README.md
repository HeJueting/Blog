# TypeScript

</br>

### 1、基本常识

1. 在项目中引入第三方包的时候，有些包默认就支持 TS

    - 要么额外安装 @type/xxx 依赖

    - 要么就是这个包内部就编写有 TS 的声明文件

2. 动态类型语言和静态类型语言:

    - 动态：在代码运行期间，才会对数据类型进行检查，编码时，不用对变量类型进行检查，javascript 就是动态语言

    - 静态: 在编译期间，就对数据类型进行检查

3. TypeScript 的作用就是把 javascript 动态类型风格，扩展成为静态类型风格

</br>
</br>

### 2、tsconfig.json 配置

```json
{
    "compilerOptions": {
        // 指定自定义声明的 TS 的文件的路径
        "typeRoots": ["src/typing"]
    },
    // 配置解析规则，告诉 TS 哪些类型的文件或者文件夹下的内容该被解析编译
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
    // 配置不需要被解析的文件或者文件夹
    "exclude": ["node_modules"]
}
```

</br>
</br>

### 3、类型声明

1. 首先在 tsconfig.json 文件中配置自定义声明文件的路径，以 .d.ts 为后缀名

2. 声明全局变量

```javascript
declare let userName: string;
declare function getName(uid: number): string;
```

3. 在 window 上挂载一些方法和属性时

```javascript
iterface Window {
    loading: boolean;
    setLoading: (v: boolean) => void;
}
```

4. 扩展已有模块

5. 项目全局使用的一些类型

</br>
</br>

### 4、其他用法

1. 泛型：在定义阶段不对参数类型进行展示，在使用时才会规定参数的类型

2. 使用 as 类型断言，编译阶段不确定的变量类型时，告诉 ts 它的类型，不用报错

</br>
</br>

### 5、interface 和 type 使用区别

感觉 interface 和 type 功能很类似，都可以用于定义数据类型，很多场景，两者都能使用，我个人常用 interface，他们拥有哪些细微的差距我没有深入去探究

</br>
</br>
