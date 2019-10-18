# 基于leaflet开发plugin

</br>
</br>

### 前言
> 最近 oneview 可视化编辑器的地图组件需要进行重构，参考了阿里的data-v的地图组件后，决定采用 **[leaflet](https://leafletjs.com/)** 这个开源地图进行重构。经过一番调研后，我们决定采用 **[Vue2Leaflet](https://github.com/KoRiGaN/Vue2Leaflet)** 直接上手到我们 vue 项目中。但是开发到复杂的一些图层时，Vue2Leaflet 并不能很好的支持，迫不得己只能自己去基于 leaflet 开发定制化图层（这里的图层在官网叫做 plugin）

</br>
</br>



### 参考
> 国内有关于 leaflet 的文档大多数都是英文文档（对于我这种英语学渣而言，真的难受），因此前期浪费了大量时间去盲目百度。如果你也想基于 leaflet 开发自定义图层（plugin），我整理了一下我的参考资料和调研思路。

- [源码下载](https://github.com/Leaflet/Leaflet)

    进行自定义图层（plugin）开发之前，你首先得对 leaflet 源码有一点点了解。主要参考一下它本身所提供的 plugin 代码架构（例如 Circle，Marker）

</br>

- [文档1 extending-1](https://leafletjs.com/examples/extending/extending-1-classes.html)

    大致了解源码后阅读文档1，我们会发现 leaflet 源码，它都是通过 extend 方法进行对象的合并，然后输出一个新的对象。因此所有的 plugin 都是通过 **XXX.extend({})** 去进行创建的。
</br>

- [文档2 extending-2](https://leafletjs.com/examples/extending/extending-2-layers.html)

    文档1主要介绍了一下 leaflet 的架构和 extend 方法的基本使用，文档2则教我们实操自定义图层（plugin），文档2的末尾也提供了相关的代码
```javascript
L.CustomLayer = L.Layer.extend({
    onAdd: function(map) {...}
    onRemove: function(map) {...}
    _update: function() {...}
})
```

</br>
</br>


### 实现
> 虽然有了以上文档的参考，但是为了不同应对不同场景下的 plugin 实现，我们可能也需要看看官方文档或者 leaflet 源码相关代码。例如 event 事件的返回结果， map 对象上有哪些方法 ......
>
> 我的需求是开发地图飞线层，因此主要需要往图层中插入 svg 代码

```javascript
function svgCreate(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

//这里的 L 代表 leaflet，我们项目中已经引入了 leaflet 并将其赋值给了 L
L.Point = L.Layer.extend({

    _mapRenderer: null,             //渲染后的map地图相关属性
    _latLngToPointFn: null,         //将经纬度坐标转化成map地图坐标的方法

    initialize: function(points) {
        this.points = points;
        L.setOptions(this);
    },

    beforeAdd: function (map) {
        this._mapRenderer = map.getRenderer(this);
        this._latLngToPointFn = map.latLngToLayerPoint;
    },
    
    onAdd: function(map) {
        // 拿到地图中插入图层的盒子
        var pane = map.getPane(this.options.pane);

        // 创建svg画布
        this._container = svgCreate("svg");
        this._container.setAttribute('pointer-events', 'none');

        // 初始化svg画布内容
        this._initContainerContent();

        // 初始化svg画布大小
        this._initContainerSize();

        // 向页面中插入svg
        pane.appendChild(this._container);

        // 绑定事件
        map.on('resize move', this._update, this);
    },
    
	onRemove: function(map) {
        // 从dom结构中删除该svg图层
        L.DomUtil.remove(this._container);
        // 解绑事件
        map.off('resize move', this._update, this);
	},

    _update: function(e){
        // 更新地图的相关参数
        this._mapRenderer = e.target.getRenderer(this);

        switch(e.type) {
            case "resize":                 // 如果是地图大小改变
               this._initContainerSize();
               break;
            case "move":                   // 如果是地图中心发生移动
               this._initContainerContent();
               break;
        }
    },
    _initContainerSize: function(){
        var b = this._mapRenderer._bounds,
            size = b.getSize();

        //更新svg的画布大小相关属性
        this._container.setAttribute('width', size.x);
		this._container.setAttribute('height', size.y);

        L.DomUtil.setPosition(this._container, b.min);
        this._container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));
    },
    _initContainerContent: function(){
        var content = "";
        for(var i=0; i<this.points.length; i++){
            var coordinate = this._latLngToPointFn.call(this._map, this.points[i]);
            content += `<circle cx="${coordinate.x}" cy="${coordinate.y}" r="4" stroke="black" stroke-width="2" fill="red"/>`;
        }

        // 直接更新container的整个dom元素
        this._container.innerHTML = content;
    },
});

// 传入的points是一个坐标数组，例如：[ [29.10, 103.23], [58.23, 120.32] ]
let Point = function (points){
	return new L.Point(points);
};

export default Point;
```

</br>
</br>


### 结束语
> 笔者使用 leaflet 的版本是 1.5.1，对于 leaflet 的了解也有些片薄，如果有姿势不正确的地方，欢迎一起沟通交流 ~
>
> 如下图所示：这些点便是一个自定义的图层，当地缩放、移动和大小改变后，这些点都会相应作出调整，同理可开发出你想要的 svg 图层，通过外部传入参数也可对其控制。

![](https://github.com/HeJueting/Blog/blob/master/image/leaflet-plugin-develop-1.png)