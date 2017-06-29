import warning from './warning'
import marker from './marker'
import circle from './circle'
import infoWindow from './infoWindow'
import markerCluster from './markerCluster'
import hot from './hot'
/**
 * 配置一个地图实例
 * @param {Object} setting 设定地图配置,暂时只支持配置地图种类
 * @return {Function}
 * */
export default function (setting) {
    /**
     *  构造一个地图
     *  @param {String} container Dom的id作为地图容器
     * */
    return function createMap(config, callback) {
        const {
            container,
            center,
            zoom,
            zooms,
            layers,
            type

        }  = config

        /**
         * 创建地图
         * */
        let map = {}, mapConfig, tiandituLayer, mapLayers = []

        function initMap() {
            return new Promise((resolve, reject) => {
                mapConfig = {
                    minZoom: zooms[0],
                    maxZoom: zooms[1],
                    fallThrough: true,
                    maxResolution: 'auto',
                    allOverlays: true,
                    controls: [
                        new SuperMap.Control.Zoom(),
                        new SuperMap.Control.ScaleLine(),
                        new SuperMap.Control.Navigation({
                            dragPanOptions: {
                                enableKinetic: true
                            }
                        })
                    ]
                };
                map = new SuperMap.Map(container, mapConfig);
                tiandituLayer = new SuperMap.Layer.Tianditu();
                window.layer = tiandituLayer
                map.addLayer(tiandituLayer);
                map.setCenter(new SuperMap.LonLat(center), zoom)
                function* getLayers(layers) {
                    for (let i = 0; i < layers.length; i++) {
                        yield new Promise((resolve) => {
                            let layer = new SuperMap.Layer.TiledDynamicRESTLayer("layer" + i, layers[i], {
                                transparent: true,
                                cacheEnabled: true
                            });
                            layer.events.on({
                                "layerInitialized": () => {
                                    mapLayers.push(layer)
                                    resolve()
                                }
                            });
                        })
                    }

                }

                switch (type) {
                    case 'img':
                        tiandituLayer.layerType = 'img'
                        break
                    default:
                        let hw = getLayers(layers);
                        (async function fn() {
                            while (true) {
                                const gen = hw.next()
                                await gen.value
                                if (gen.done) {
                                    resolve()
                                    break
                                }
                                map.addLayers(mapLayers);
                            }
                        })()
                }

            })

        }

        /**
         * 切换2d/映像图
         * */
        function changeType(type) {
            switch (type) {
                case 'img':
                    mapLayers.forEach(layer => layer.setVisibility(false))
                    tiandituLayer.layerType = 'img'
                    tiandituLayer.redraw()
                    break
                default :
                    tiandituLayer.layerType = 'vec'
                    mapLayers.forEach(layer => layer.setVisibility(true))
                    tiandituLayer.redraw()
            }
        }

        function initPlugin() {
            /**
             * 获取地图实例
             * */
            const getInstance = function () {
                return map
            }
            const setCenter = function (center) {
                config.center = center
                center = new SuperMap.LonLat(...center)
                map.setCenter(center, map.getZoom())
            }

            const addCircle = circle(map, setting)

            const addInfoWindow = infoWindow(map, setting)

            const cluster = markerCluster(map, setting)

            const addHot = hot(map, setting)
            /**
             * 点标注
             * */
            const addMarker = marker(map, setting)

            return {
                getInstance,
                setCenter,
                addMarker,
                addCircle,
                addInfoWindow,
                cluster,
                addHot,
                changeType
            }
        }

        (async function () {
            await initMap()
            const plugin = initPlugin()
            callback(plugin)
        })()
    }
}