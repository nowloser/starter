import React, {Component} from 'react'
import {connect} from 'react-redux'
import MAP from '../../rc-map/src/index'
import {
    addWindow,
    replaceMarker,
    replaceCluster,
    replacePolyline,
    replaceHot
} from '../../action/map.action'
import classnames from 'classnames'
import showBoat from '../map/showBoatPos'
import showBoatHot from '../map/showBoatHot'
class Map extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            pageSize: 10,
            windowPos: [],
            detail: {},
            content: '',
            legend: '',
            type: '2d'
        }
        this.showBoat = showBoat.bind(this)
        this.showBoatHot = showBoatHot.bind(this)
        this.boatInterval = 0
    }

    toggLayer = (type) => {
        this.setState({
            type
        })
    }

    clearTrail = () => {
        const {dispatch} = this.props
        if (this.ani) {
            clearInterval(this.ani)
        }
        dispatch(replaceMarker([]))
        dispatch(replacePolyline([]))
    }


    showPos({select, layer, param}) {
        this.boatInterval && clearInterval(this.boatInterval)
        this.clearTrail()

        if (layer === 'cluster') {
            this.showBoat(param)
            this.boatInterval = setInterval(() => {
                this.showBoat(param)
            }, 30000)

            this.setState({
                legend: ''
            })
        }

        if (layer === 'hot') {
            this.showBoatHot(param)
        }
    }


    componentDidMount() {
        this.showPos(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, select, layer, param, loading, changeCard, changeChart} = this.props
        if (nextProps.select != select || layer != nextProps.layer || param != nextProps.param) {
            dispatch(replaceMarker([]))
            dispatch(replacePolyline([]))
            dispatch(replaceCluster(null))
            dispatch(replaceHot(null))
            changeCard(false, [], null, null, true)
            changeChart(false)
            this.setState({
                legend: ''
            }, () => {
                this.showPos(nextProps)
            })
        }
    }

    getTypeClass = (type) => classnames({
        'layer-btn': true,
        'active': type === this.state.type
    })


    render() {
        const {...config} = this.props
        return (
            <div className='map-container'>
                <MAP {...config} type={this.state.type} className="map"/>
                <div className='window-pop' style={{left: this.state.windowPos[0], top: this.state.windowPos[1]}}>
                    <div className="pop-content">
                        {this.state.content}
                    </div>
                    <div className="caret">
                    </div>
                </div>
                <div className="win-legend">
                    {this.state.legend}
                </div>

                <div className="layer-switch">
                    <div className={this.getTypeClass('2d')} onClick={this.toggLayer.bind(this, '2d')}>2D图</div>
                    <div className={this.getTypeClass('img')} onClick={this.toggLayer.bind(this, 'img')}>影像图</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({center, cluster, infoWindow, polyline, hot, loading, layer, select, markers}) {
    return {
        map: 'supermap',//beyondmap/amap/supermap
        zoom: 12,
        zooms: [8, 16],
        layers: [
            // 'http://115.236.161.138:8090/iserver/services/map-world/rest/maps/World',

            // "http://172.18.25.139:8090/iserver/services/map-rest-zhejiang/rest/maps/zhejiang",
            // 'http://172.18.25.139:8090/iserver/services/map-tbs_hs_wz/rest/maps/CNWZ',

            //
            "http://60.190.98.18:8090/iserver/services/map-rest-zhejiang/rest/maps/zhejiang",
            'http://60.190.98.18:8090/iserver/services/map-tbs_hs_wz/rest/maps/CNWZ',
            //

            // 'http://60.190.98.18:8090/iserver/services/map-rest-zhejiang/rest/maps/zonghe',
            // 'http://60.190.98.18:8090/iserver/services/map-rest-zhejiang/rest/maps/luwang',
            // 'http://60.190.98.18:8090/iserver/services/map-rest-zhejiang/rest/maps/yuguan',lib
            // 'http://60.190.98.18:8090/iserver/services/map-rest-zhejiang/rest/maps/gaosu',
            // 'http://60.190.98.18:8090/iserver/services/map-rest-zhejiang/rest/maps/gongluju',
        ],
        // layers:['http://115.236.161.138:8090/iserver/services/map-world/rest/maps/World'],
        center,
        markers,
        cluster: cluster && Object.assign({}, cluster, {
            ops: {
                maxLevel: 11,
                // tolerance:1,
                clusterStyles: [
                    {
                        "count": 15,//子节点小于等于15的聚散点
                        "style": {
                            fontColor: "#404040",
                            graphic: true,
                            externalGraphic: '../images/m1.png',
                            graphicWidth: 38,
                            graphicHeight: 38,
                            labelXOffset: 0,
                            labelYOffset: 0
                        }
                    },
                    {
                        "count": 50,//子节点小于等于50大于15的聚散点
                        "style": {
                            fontColor: "#404040",
                            graphic: true,
                            externalGraphic: '../images/m2.png',
                            graphicWidth: 48,
                            graphicHeight: 48,
                            labelXOffset: 0,
                            labelYOffset: 0
                        }
                    },
                    {
                        "count": "moreThanMax",// 子节点大于50的聚散点
                        "style": {
                            fontColor: "#404040",
                            graphic: true,
                            externalGraphic: '../images/m3.png',
                            graphicWidth: 58,
                            graphicHeight: 58,
                            labelXOffset: 0,
                            labelYOffset: 0
                        }
                    }
                ]
            }
        }),
        infoWindow,
        polyline,
        hot,
        loading,
        layer,
        select
    }
}
export default connect(mapStateToProps)(Map)