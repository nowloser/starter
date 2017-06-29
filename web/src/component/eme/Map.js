import React, {Component} from 'react'
import MAP from '../../rc-map/src/index'
import {connect} from 'react-redux';
import {setCenter, replaceMarker, replaceCircle, getTrans, replaceMarter} from '../../action/eme.action'
class Map extends Component {
    constructor(props, context) {
        super(props, context)
    }


    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props
        if ((nextProps.select != this.props.select) && nextProps.select) {
            dispatch(setCenter([nextProps.select.jd, nextProps.select.wd]))
            dispatch(replaceMarker([{
                position: [nextProps.select.jd, nextProps.select.wd],
                icon: '../images/pos.png',
                rotate: 0,
                size: [30, 30]
            }]))

            !nextProps.trans.length && dispatch(replaceCircle([{
                center: [nextProps.select.jd, nextProps.select.wd],
                radius: .027//3km
            }]))

            dispatch(getTrans({urgent_id: nextProps.select.urgent_id}))
        }
        if (this.props.select && !nextProps.select) {
            dispatch(replaceCircle([]))
            dispatch(replaceMarker([]))
            dispatch(replaceMarter([]))
        }
        if (nextProps.trans != this.props.trans) {
            if (nextProps.trans.length) {
                dispatch(replaceCircle([{
                    center: [nextProps.select.jd, nextProps.select.wd],
                    radius: .009 * nextProps.trans[0].jsbj//3km
                }]))


                const markers = nextProps.trans.map((m) => {
                    let icon = '../images/pos.png'

                    if (m.yjwzlx == 1) {
                        icon = '../images/zf.png'
                    }

                    if (m.yjwzlx == 2) {
                        icon = '../images/wz.png'
                    }

                    if (m.yjwzlx == 3) {
                        icon = '../images/sprites/sp.png'
                    }
                    return {
                        position: [m.jd, m.wd],
                        icon: icon,
                        rotate: 0,
                        size: [26, 32]
                    }
                })
                dispatch(replaceMarter(markers))
            } else {
                dispatch(replaceCircle([{
                    center: [nextProps.select.jd, nextProps.select.wd],
                    radius: .009 * 3//3km
                }]))
                dispatch(replaceMarter([]))
            }

        }

    }

    render() {
        const {select, ...setting} = this.props
        return (
            <div className='map-container'>
                <MAP {...setting} className="map"/>
            </div>
        )


    }
}

function mapStateToProps({center, infoWindow, polyline, hot, loading, layer, markers, circle, trans}) {
    // return {
    //     map: 'supermap',//beyondmap/amap/supermap
    //     zoom: 6,
    //     zooms: [3, 18],
    //     layers: [
    //         "http://60.190.98.18:8090/iserver/services/map-rest-zhejiang/rest/maps/zhejiang",
    //         'http://60.190.98.18:8090/iserver/services/map-tbs_hs_wz/rest/maps/CNWZ',
    //     ],
    //     center,
    //     markers,
    //     infoWindow,
    //     polyline,
    //     hot,
    //     loading,
    //     layer
    // }

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
        infoWindow,
        polyline,
        hot,
        loading,
        layer,
        circle,
        trans
    }
}
export default connect(mapStateToProps)(Map)