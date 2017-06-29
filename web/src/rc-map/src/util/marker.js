import warning from './warning'
export default function (map, setting) {
    /**
     * 添加实例
     * */
    const markerlayer = new SuperMap.Layer.Vector("标记点位");
    const selectFeature = new SuperMap.Control.SelectFeature(markerlayer,
        {
            callbacks: {click: function(currentFeature){
                console.log(currentFeature)
            }}
        });
    map.addControl(selectFeature);
    selectFeature.activate();
    map.addLayers([markerlayer]);
    // window.selectFeature1 = selectFeature

    return function addMarker(config, isAdd) {
        if (!config || !config.position) {
            warning('参数错误')
            return
        }
        let marker;
        const events = {}

        function createMarker() {
            const sizing = config.size || [30, 30]
            const icon = config.icon //|| '../theme/images/marker.png'
            marker = new SuperMap.Feature.Vector();
            marker.geometry = new SuperMap.Geometry.Point(...config.position);
            marker.style = Object.assign({
                pointRadius: 4,
                graphic: true,
                externalGraphic: icon,
                graphicWidth: sizing[0],
                graphicHeight: sizing[1],
                rotation: config.rotate,
            }, config.style);

            marker.info = config.data

            if (isAdd !== false) {
                markerlayer.addFeatures([marker]);
            }

            selectFeature.activate();

        }

        createMarker()
        /**
         * 添加一个事件
         * */

        const addListener = function (type, event) {
            events[type] = event.bind(this)
            // if (type === 'click') {
            //     selectFeature.hover = false
            // } else {
            //     selectFeature.hover = true
            // }

            events[type] = event.bind(this)
            selectFeature.callbacks[type] = events[type]
            selectFeature.onSelect = events[type]
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
         * 修改图标
         * */
        const setIcon = function (icon) {
            config.icon = icon
            // marker.setUrl(icon)
            return this
        }


        /**
         * 设置标记位置
         * */
        const setPosition = function (poi) {
            config.position = poi
            remove()
            createMarker()
            return this
        }


        /**
         * 设置大小
         * */
        const setSize = function (size) {
            config.size = size
            remove()
            createMarker()
            return this
        }
        /**
         * 设置旋转角度
         * */
        const setRotate = function (rotate) {
            config.rotate = rotate
            remove()
            createMarker()
            return this
        }

        /**
         * 移除点标记
         * */
        const remove = function () {
            markerlayer.removeFeatures(marker)
            marker.destroy()
            return this
        }


        const getInstance = function () {
            return marker
        }


        return {
            getInstance,
            addListener,
            removeListener,
            getData,
            setData,
            setIcon,
            setPosition,
            remove,
            setSize,
            setRotate
        }
    }
}