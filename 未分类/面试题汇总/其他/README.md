# 其他

</br>

### 1、什么是大前端

1. 前端其实是指各类终端的 UI 开发，比如 Web、安卓开发、IOS 开发等等...大前端就是所有前端的统称

2. 大前端需要解决的问题就是，抹平各个平台的差异性，只用一套技术，一套代码就可以适用于多端，例如：

    - 移动端的跨平台方案：Hybrid + web / React Native / weex / flutter / PWA

    - PC 端的跨平台方案：Electron

    - 各类小程序和 H5 以及 App 的跨平台方案：Taro 和 uni-app

</br>
</br>

### 2、前端的技术方向

1. 中后台方向：传统 PC 端的网页开发

2. 跨端方向：各种小程序、Electron、App 的开发、PWA

3. 可视化方向：2D 和 3D 的数据可视化

    - 2D：canvas、svg、echarts、d3

    - 3D：WebGL、three.js

4. 游戏互动方向

</br>
</br>

### 3、懒加载

1. getBoundingClientRect：得到它对应于视口左上角的坐标，再判断是否在视口之内，但是每次触发 scroll 事件时计算量很大，容易造成性能问题。

2. IntersectionObserver：监听 dom 元素，dom 元素移入视口和移出时会触发一个它的 callback，里面包含了一些 dom 元素信息

</br>
</br>
