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
import showCompany from '../map/showCompany'
import showBoat from '../map/showBoat'
import showBoatHot from '../map/showBoatHot'
import showBerth from '../map/showBerth'
import showBeacon from '../map/showBeacon'
import showChannel from '../map/showChannel'
import showVideo from '../map/showVideo'
import showFlow from '../map/showFlow'
import showGate from '../map/showGate'
import showBuild from '../map/showBuild'
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
        this.showCompany = showCompany.bind(this)
        this.showBoat = showBoat.bind(this)
        this.showBoatHot = showBoatHot.bind(this)
        this.showBerth = showBerth.bind(this)
        this.showBeacon = showBeacon.bind(this)
        this.showChannel = showChannel.bind(this)
        this.showVideo = showVideo.bind(this)
        this.showFlow = showFlow.bind(this)
        this.showGate = showGate.bind(this)
        this.showBuild = showBuild.bind(this)
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
        switch (select) {
            case 1:
                this.showCompany(param)
                this.setState({
                    legend: (
                        <ul>
                            {
                                [
                                    {name: '水运企业', img: '../images/blueCompany.png'},
                                    {name: '港口企业', img: '../images/orangeCompany.png'},
                                    {name: '危货企业', img: '../images/redCompany.png'}
                                ].map((l, i) => {
                                    return (<li key={`qytb${i}`}>
                                        <div className="legend-item"
                                             style={{background: `url(${l.img}) center/ contain no-repeat`}}></div>
                                        <div className="legend-name">{l.name}</div>
                                    </li>)
                                })
                            }
                        </ul>)
                })

                break
            case 2:
                if (layer === 'cluster') {
                    this.showBoat(param)
                    this.boatInterval = setInterval(() => {
                        this.showBoat(param)
                    }, 30000)

                    this.setState({
                        legend: (
                            <ul>
                                {
                                    [
                                        {name: '客船', img: '../images/boat/custom.png'},
                                        {name: '货船', img: '../images/boat/good.png',},
                                        {name: '高速船', img: '../images/boat/high.png'},
                                        {name: '搜救船', img: '../images/boat/save.png'},
                                        {name: '拖船', img: '../images/boat/tuo.png'},
                                        {name: '引航船', img: '../images/boat/ying.png'},
                                        {name: '游轮', img: '../images/boat/you.png'},
                                        {name: '执法船', img: '../images/boat/law.png'},
                                        {name: '其他', img: '../images/boat/other.png'},
                                        {name: '在航', img: '../images/boat/rother.png'},
                                        {name: '转向', img: '../images/boat/zother.png'},
                                        {name: '系泊', img: '../images/boat/bother.png'},
                                    ].map((l, i) => {
                                        return (<li key={`cbtb${i}`}>
                                            <div className="legend-item" style={{
                                                background: `url(${l.img}) center/ contain no-repeat`,
                                                width: '26px',
                                                height: '11px'
                                            }}></div>
                                            <div className="legend-name">{l.name}</div>
                                        </li>)
                                    })
                                }
                            </ul>
                        )
                    })
                }

                if (layer === 'hot') {
                    this.showBoatHot(param)
                }

                break
            case 3:
                this.showBerth(param)
                break
            case 4:
                this.showBeacon(param)
                break
            case 5:
                this.showChannel(param)
                break
            case 6:
                this.showVideo(param)
                break
            case 7:
                this.showFlow()
                break
            case 8:
                this.showBuild()
                break
            case 9:
                this.showGate()
                break
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