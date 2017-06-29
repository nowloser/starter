import React, {Component, PropTypes} from 'react'
import {OverlayMixin} from './OverlayMixin'
class Marker extends Component {
    constructor(props, context) {
        super(props, context)
        this.bindEvent = OverlayMixin.bindEvent.bind(this)
        const {event,...setting} = this.props
        const cluster = this.context.cluster;
        /*聚合*/
        if (cluster) {
            this.marker = this.context.map.addMarker(setting, false)
            cluster.addMarker(this.marker.getInstance())
        }
        /*非聚合*/
        else {
            this.marker = this.context.map.addMarker(Object.assign({},this.props))
        }
        /*事件*/
        if (event) {
            this.bindEvent(this.marker, event)
        }
    }

    

    componentWillUnmount() {
        /*移除*/
        this.marker.remove()
    }

    componentWillReceiveProps(nextProps) {
        /*设置中心位置*/
        if (nextProps.position != this.props.position) {
            this.marker.setPosition(nextProps.position)
        }

        /*设置图标*/
        if (nextProps.icon != this.props.icon) {
            this.marker.setIcon(nextProps.icon)
        }

        /*设置大小*/
        if (nextProps.size !== this.props.size) {
            this.marker.setSize(nextProps.size)
        }

        /*设置方向*/
        if (nextProps.rotate !== this.props.rotate) {
            this.marker.setRotate(nextProps.rotate)
        }
        /*重新绑定事件*/
        const {event} = nextProps
        const {event:nowEvent} = this.props
        this.bindEvent(this.marker, event, nowEvent)
    }

    render() {
        return null
    }
}
Marker.propTypes = {
    position: PropTypes.array.isRequired
}

Marker.contextTypes = {
    map: PropTypes.object,
    cluster: PropTypes.object
}
export default Marker

