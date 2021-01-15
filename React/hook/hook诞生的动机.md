# hook诞生的动机

> 例如实现这样一个需求：有一个消息通知，小明和小红都需要共享它的代码逻辑

<br></br>





###一、更好的复用状态逻辑


<br></br>


- **使用render props实现：**

```javascript
// notice组件
class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msg: '今天不上学，放假一天',};
    }
    render() {
        return (
            <> {this.props.render(this.state)} </>
        )
    }
}
// xiaoming组件
class XiaoMing extends React.Component {
    render() {
        const { info } = this.props;
        return (
            <h1>我是小明,我收到了通知: {info.msg}</h1>
        )
    }
}
// xiaohong组件
class XiaoHong extends React.Component {
    render() {
        const { info } = this.props;
        return (
            <h1>我是小红,我收到了通知: {info.msg}</h1>
        )
    }
}
// 小明小红共享消息通知
function App() {
    return (
        <div className="App">
            <Notice render={state => <XiaoMing info={state} />}></Notice>
            <Notice render={state => <XiaoHong info={state} />}></Notice>
        </div>
    );
}
```


<br></br>


- **使用HOC实现：**

```javascript
// 实现Notice高阶组件
function WithNotice(Component) {
    console.log(Component);
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                msg: '今天不上学，放假一天',
            };
        }
        render() {
            return (
                <Component {...this.props} info={this.state} />
            )
        }
    }
}

// 此处省略小明、小红组件的代码，与render props一致
// ......

// 小明小红共享消息通知
function App() {
    const NoticeWithXiaoMing = WithNotice(XiaoMing);
    const NoticeWithXiaoHong = WithNotice(XiaoHong);
    return (
        <div className="App">
            <NoticeWithXiaoMing />
            <NoticeWithXiaoHong />
        </div>
    );
}
```


<br></br>


- **使用Hook：**
