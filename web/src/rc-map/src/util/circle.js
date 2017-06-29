/**
 * Created by xiangfahai on 2016/12/27.
 */
import warning from './warning'


function Rad(d){
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}
//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function GetDistance(lat1,lng1,lat2,lng2){

    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
            Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
}


export default function (map, setting) {
    const circleVecotr = new SuperMap.Layer.Vector("圆");
    map.addLayers([circleVecotr]);

    function createCircle(origin, radius, sides, r, angel) {
        const rR = r * Math.PI / (180 * sides);
        let rotatedAngle, x, y;
        const points = [];
        for (let i = 0; i < sides; ++i) {
            rotatedAngle = rR * i;
            x = origin.x + (radius * Math.cos(rotatedAngle));
            y = origin.y + (radius * Math.sin(rotatedAngle));
            points.push(new SuperMap.Geometry.Point(x, y));
        }
        rotatedAngle = r * Math.PI / 180;
        x = origin.x + (radius * Math.cos(rotatedAngle));
        y = origin.y + (radius * Math.sin(rotatedAngle));
        points.push(new SuperMap.Geometry.Point(x, y));

        const ring = new SuperMap.Geometry.LinearRing(points);
        ring.rotate(parseFloat(angel), origin);
        const geo = new SuperMap.Geometry.Collection([ring]);
        geo.origin = origin;
        geo.radius = radius;
        geo.r = r;
        geo.angel = angel;
        geo.sides = sides;
        geo.polygonType = "Curve";
        return geo;
    }


    return function addCircle(config, isAdd) {
        if (!config || !config.center) {
            warning('参数错误')
            return
        }

        const defaultConfig = {
            brushType: 'both',
            strokeColor: "#F33", //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 3, //线粗细度
            fillColor: "#ee2200", //填充颜色
            fillOpacity: 0.35//填充透明度
        }
        const events = {}
        defaultConfig.color = config.fillColor || defaultConfig.fillColor
        // const circleConfig = Object.assign(defaultConfig, config)
        // const circle = new SuperMap.Feature.ShapeParameters.Circle(...config.center, config.radius)
        // circle.style = circleConfig
        const circleConfig = Object.assign(defaultConfig, config, {data: undefined})
        const centerPoint = new SuperMap.Geometry.Point(...config.center);
        const circleP = createCircle(centerPoint, config.radius, 256, 360, 360);
        const circle = new SuperMap.Feature.Vector(circleP);
        circle.style = circleConfig;
        circleVecotr.addFeatures([circle]);

        window.cir = circle

        /**
         * 添加一个事件
         * */

        const addListener = function (type, event) {
            return this
        }

        /**
         * 移除一个事件
         * */

        const removeListener = function (type) {
            return this
        }


        /**
         * 获取自定义数据
         * */

        const getData = function () {
            return config.data
        }
        /**
         * 修改自定义数据
         * */
        const setData = function (data) {
            config.data = data
            return this
        }


        /**
         * 获取圆心
         * */

        const getCenter = function () {

        }
        /**
         * 修改圆心位置
         * */
        const setCenter = function (center) {
            return this
        }

        /**
         * 修改半径
         * */
        const setRadius = function (radius) {
            return this
        }

        /**
         * 获取半径
         * */
        const getRadius = function () {
        }
        /**
         * 获取外切矩形
         * */
        const getBounds = function () {
        }

        /**
         * 移除折线
         * */
        const remove = function () {
            circleVecotr.removeFeatures(circle)
            circle.destroy()
        }


        /**
         * 添加折线
         * */
        const add = function () {
            return this
        }
        /**
         * 修改配置
         * */
        const setOptions = function (opts) {
            return this
        }

        const getInstance = function () {
            return circle
        }

        const openEdit = function () {
            return this
        }

        const closeEdit = function () {
            return this
        }


        return {
            getInstance,
            getData,
            setData,
            getCenter,
            setCenter,
            getRadius,
            setRadius,
            getBounds,
            remove,
            add,
            addListener,
            removeListener,
            setOptions,
            openEdit,
            closeEdit
        }
    }
}