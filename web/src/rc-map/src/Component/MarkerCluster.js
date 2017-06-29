import React, {PureComponent, PropTypes} from 'react'
import {OverlayMixin} from './OverlayMixin'

class MarkerCluster extends PureComponent {
    constructor(props, context) {
        super(props, context)
        this.state = {
            cluster: null
        };
        this.bindEvent = OverlayMixin.bindEvent.bind(this)
        const {event} = this.props.cluster

        const {map} = this.context;
        const markers = []
        this.props.cluster.markers.forEach((over) => {
            const marker = map.addMarker(over, false)
            this.bindEvent(marker, over.event)
            markers.push(marker.getInstance())
        })
        if (this.state.cluster) {
            this.state.cluster.clearMarkers()
            this.state.cluster.addMarkers(markers)
            /*事件*/
            if (event) {
                this.bindEvent(this.state.cluster, event)
            }
        }
        else {
            /*地图聚合异步*/
            const mountCluster = async() => {
                const cluster = await map.cluster(markers,this.props.cluster.ops)
                this.setState({
                    cluster: cluster
                })
            }
            mountCluster()
        }


    }

    // static childContextTypes = {
    //     cluster: PropTypes.object
    // }

    static contextTypes = {
        map: PropTypes.object
    }

    // getChildContext() {
    //     return {
    //         cluster: this.state.cluster
    //     }
    // }


    componentDidUpdate() {
        const {map} = this.context;
        const markers = []
        this.props.cluster.markers.forEach((over) => {
            markers.push(map.addMarker(over, false).getInstance())
        })
        if (this.state.cluster) {
            this.state.cluster.clearMarkers()
            this.state.cluster.addMarkers(markers)
            /*重新绑定事件*/
            const {event} = this.props.cluster
            this.bindEvent(this.state.cluster, event, {})
        }
        else {
            /*地图聚合异步*/
            const mountCluster = async() => {
                const cluster = await map.cluster(markers,this.props.cluster.ops)
                this.setState({
                    cluster: cluster
                })
            }
            mountCluster()
        }
    }

    componentWillUnmount() {
        this.state.cluster.remove()
        if (process.env.NODE_ENV !== 'production') {
            // console.log('移除聚集')
        }
    }

    render() {
        return null
    }
}


export default MarkerCluster

