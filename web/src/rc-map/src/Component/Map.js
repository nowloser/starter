import React, {PureComponent, PropTypes} from 'react'
import {connectMap} from '../util'
import Marker from './Marker'
import Polyline from './Polyline'
import Circle from './Circle'
import MarkerCluster from './MarkerCluster'
import InfoWindow from './InfoWindow'
import Hot from './Hot'
import {OverlayMixin} from './OverlayMixin'
class MAP extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.bindEvent = OverlayMixin.bindEvent.bind(this)
        this.mouse = null
        this.state = {
            map: null
        }
    }

    /*context*/
    getChildContext() {
        return {
            map: this.state.map
        }
    }

    /*设置鼠标工具*/
    componentDidMount() {
        const container = this.refs.mapContainer
        /*创建地图*/
        const {map:mapSetting, event, tool, callback, ...setting} = this.props
        connectMap({map: mapSetting})(Object.assign({container}, setting), (map) => {
            this.bindEvent(map, event)
            this.setState({
                map
            })
            window.map = map
            if (callback) {
                callback(map)
            }
        })

    }

    componentWillReceiveProps(nextProps) {
        const {map} = this.state;
        if (!map) {
            return
        }
        const {event, center, zoom, type} = nextProps;
        const {event:nowEvent, center:nowCenter, zoom: nowZoom, type:nowType} = this.props;
        //设置地图中心位置
        if (center !== nowCenter) {
            map.setCenter(center)
        }

        // 设置zoom
        if (zoom !== nowZoom) {
            map.setZoom(zoom)
        }
        //重新注册事件
        this.bindEvent(map, event, nowEvent)
        if (type !== nowType) {
            map.changeType(type)
        }

    }

    componentWillUnmount() {
    }

    render() {
        const config = this.props
        let markers, cluster, polylines, polygons, circles, infoWindow, hot

        /*点标记*/
        if (this.state.map && config.markers) {
            if (Array.isArray(config.markers)) {
                markers = config.markers.map(function (marker, i) {
                    return (<Marker key={`gis-marker${i}`} {...marker}/>)
                })
            }
            else {
                const markersKeys = Object.keys(config.markers)
                markers = markersKeys.map(function (key, j) {
                    return config.markers[key].map(function (marker, i) {
                        return (<Marker key={`gis-${j}marker${i}`} {...marker}/>)
                    })
                })
            }

        }

        /*折线*/
        if (this.state.map && config.polyline && config.polyline.length) {
            polylines = <Polyline polyline={config.polyline}/>
        }



        /*圆*/
        if (this.state.map && config.circle) {
            if (Array.isArray(config.circle)) {
                circles = config.circle.map(function (circle, i) {
                    const key = `${i}-${circle.center[0]}-${circle.center[1]}${circle.radius}`
                    return (<Circle key={key} {...circle}/>)
                })
            }
            else {
                const circleKeys = Object.keys(config.circle)
                circles = circleKeys.map(function (key) {
                    return config.circle[key].map(function (circle, i) {
                        return (<Circle key={`gis-circle${i}`} {...circle}/>)
                    })
                })
            }

        }

        /*聚合*/

        if (this.state.map && config.cluster) {
            cluster = <MarkerCluster cluster={config.cluster}/>
        }

        /*聚合*/

        if (this.state.map && config.hot) {
            hot = <Hot hot={config.hot}/>

        }

        /*信息窗体*/

        if (this.state.map && config.infoWindow) {
            infoWindow = <InfoWindow {...config.infoWindow}/>
        }
        return (
            <div className={config.className} style={{position: 'relative'}} ref='mapContainer'>
                {markers}
                {polylines}
                {cluster}
                {circles}
                {infoWindow}
                {hot}
            </div>

        )
    }
}

MAP.propTypes = {
    map: PropTypes.string.isRequired,
    center: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
    zooms: PropTypes.array,
    event: PropTypes.object
}


/*定义context.map类型*/
MAP.childContextTypes = {
    map: PropTypes.object
}

export default MAP
