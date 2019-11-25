//这里的 L 代表引入的 leaflet
L.CustomLayer = L.Layer.extend({
    _mapRenderer: null,             //渲染后的map地图相关属性
    _latLngToPointFn: null,         //将经纬度坐标转化成map地图坐标的方法

    // 该图层的构造函数，同 constructor 一样
    initialize: function (points, options) {
        this.points = points || [];
        L.setOptions(this, options);
    },

    // 图层加入map地图触发
    onAdd: function (map) {
        this._mapRenderer = map.getRenderer(this);
        this._latLngToPointFn = map.latLngToLayerPoint;

        // 拿到地图中插入图层的盒子
        var pane = map.getPane(this.options.pane);

        // 创建svg容器
        this.canvas = document.createElement('canvas');

        // 初始化svg的内容
        this._initCanvas();

        // 向页面中插入svg
        pane.appendChild(this.canvas);

        // 绑定事件（leaflet还有提供了其他事件，参见：https://leafletjs.com/reference-1.5.0.html）
        // 但是zoom事件会造成svg中的元素需要重新定位，因此需要监听并重进行重绘
        map.on('zoomend', this._update, this);
    },

    // 图层从map地图中删除触发
    onRemove: function (map) {
        // 从dom结构中删除该svg图层
        L.DomUtil.remove(this.canvas);
        // 解绑事件
        map.off('zoomend', this._update, this);
    },

    // 更新整个svg内容，改动较小的内容，可以直接自定义reSetXXX进行局部修改svg内容
    _update: function (e) {
        // e.target可以拿到map地图这个对象
        var map = e.target;
        // 移除这个图层又重新添加
        this.onRemove(map);
        this.onAdd(map);
    },

    //得到这个svg的dom节点内容
    _initCanvas: function () {
        console.log(this._mapRenderer);
        this.canvas.width = this._mapRenderer._map._size.x;
        this.canvas.height = this._mapRenderer._map._size.y;

        var ctx = this.canvas.getContext('2d');

        for(var i=0; i<this.points.length; i++){
            var point = this._exchangePoint(this.points[i]);
            ctx.beginPath();
            ctx.arc(point.x, point.y , 5, 0, 2*Math.PI);
            ctx.fillStyle = "#34dc27";
            ctx.fill();
        }
    },

    //将经纬度坐标点转为网页坐标点(lat, lng)
    _exchangePoint: function(point) {
        //注意：这里的经纬度需要反转一下！
        return this._latLngToPointFn.call(this._map, point);
    },
});

// 可以从外部传入params来控制我们的图层
var CustomLayer = function (points) {
    return new L.CustomLayer(points);
};