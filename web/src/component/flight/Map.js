import React, {Component} from 'react'
import {connect} from 'react-redux'
import MAP from '../../rc-map/src/index'
import classnames from 'classnames'
class Map extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            windowPos: [],
            type: '2d'
        }
    }

    toggLayer = (type) => {
        this.setState({
            type
        })
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
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

function mapStateToProps({}) {
    return {
        map: 'supermap',//beyondmap/amap/supermap
        zoom: 9,
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
        center: [120.69,27.7]
    }
}
export default connect(mapStateToProps)(Map)