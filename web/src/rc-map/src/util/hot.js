import warning from './warning'
export default function (map, setting) {
    /**
     * 添加实例
     * */
    const hotlayer = new SuperMap.Layer.HeatMapLayer(
        "heatMap",
        {
            "radius": 45,
            "featureWeight": "value",
            "featureRadius": "geoRadius"
        }
    );

    map.addLayers([hotlayer]);
    return function addHot(config) {
        if (!config || !config.points) {
            warning('参数错误')
            return
        }
        const heatPoints = []

        function createHot() {
            const {radius, points} = config
            hotlayer.radius = radius
            switch (setting.map) {
                case 'supermap':
                    points.forEach((pos, i) => {
                        heatPoints[i] = new SuperMap.Feature.Vector(
                            new SuperMap.Geometry.Point(pos.lon, pos.lat)
                        );
                        heatPoints[i].attributes.value = pos.value;
                    })
                    hotlayer.addFeatures(heatPoints);
                    break
            }
        }

        createHot()


        const getInstance = function () {
            return heatPoints
        }

        function remove() {
            hotlayer.removeAllFeatures();
        }


        return {
            getInstance,
            remove
        }
    }
}