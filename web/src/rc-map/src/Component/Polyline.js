import React, {Component, PropTypes} from 'react'
import {OverlayMixin} from './OverlayMixin'
class Polyline extends Component {
    constructor(props, context) {
        super(props, context);
        const {map:maps} = this.context
        const map = maps.getInstance()

        const vector = new SuperMap.Layer.Vector("vector");
        map.addLayers([vector]);

        const selectFeature = new SuperMap.Control.SelectFeature(vector,
            {
                callbacks: props.polyline[0].event
            });
        map.addControl(selectFeature);
        selectFeature.activate()

        const ploylines = props.polyline.map(function (m) {
            const {event, path, data, ...others} =m
            const points = path.map(p => new SuperMap.Geometry.Point(...p));
            const line = new SuperMap.Geometry.LineString(points);
            const polyline = new SuperMap.Feature.Vector(line);
            polyline.style = others
            polyline.info = data
            return polyline
        })
        vector.addFeatures(ploylines)
        this.vector = vector
        this.ploylines = ploylines
    }

    componentWillUnmount() {
        this.vector.removeAllFeatures()
    }

    componentWillReceiveProps(nextProps) {
        const nowLine = this.props.polyline
        const polyline = nextProps.polyline
        let flag = false
        nowLine.forEach((line, index) => {
            if (line.strokeColor !== polyline[index].strokeColor) {
                this.ploylines[index].style.strokeColor = polyline[index].strokeColor
                flag = true
                // this.vector.removeFeatures([polyline]);
                // this.vector.addFeatures([polyline]);

            }
        })

        if (flag) {
            this.vector.redraw()
        }

    }

    render() {
        return null
    }
}
Polyline.propTypes = {
}

Polyline.contextTypes = {
    map: PropTypes.object,
}
export default Polyline

