/**
 * Created by xiangfahai on 2016/12/27.
 */
// import warning from './warning'
export default function (map, setting) {
    return async function (markers, ops) {
        return new Promise((resolve, reject) => {
            let cluster;
            let select
            let events = {}
            const addMarker = function (marker) {
            }
            const removeMarker = function (marker) {
            }
            const getClustersCount = function () {
            }
            const clearMarkers = function () {
                cluster.removeAllFeatures()
            }

            const getMarkers = function () {
            }

            const addMarkers = function (markers) {
                cluster.addFeatures(markers);
            }

            const removeMarkers = function (markers) {
            }

            const setMarkers = function (markers) {
            }

            const remove = function () {
                cluster.removeAllFeatures()
                cluster.clearCluster()
                select.callbacks = {}
                cluster.destroyCluster()
            }
            const getInstance = function () {
                return cluster
            }

            const repaint = function () {
            }

            const addListener = function (type, event) {
                events[type] = event.bind(this)
                select.callbacks[type] = events[type]
                return this
            }

            /**
             * 移除一个事件
             * */

            const removeListener = function (type) {
                return this
            }

            setTimeout(() => {
                cluster = new SuperMap.Layer.ClusterLayer("Cluster", ops);
                window.cluster = cluster
                map.addLayers([cluster]);
                //创建聚散选择控件。该控件实现了聚散图层的鼠标事件。
                select = new SuperMap.Control.SelectCluster(cluster, {
                    callbacks: {}
                });
                //将控件添加到map上
                map.addControl(select);
                select.activate();
                cluster.addFeatures(markers);
                resolve({
                    getInstance,
                    addMarker,
                    removeMarker,
                    getClustersCount,
                    clearMarkers,
                    getMarkers,
                    addMarkers,
                    removeMarkers,
                    setMarkers,
                    remove,
                    repaint,
                    addListener,
                    removeListener
                })
            }, 0)


        })
    }


}