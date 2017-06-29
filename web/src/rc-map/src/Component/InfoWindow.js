import React, {Component, PropTypes} from 'react'
import {OverlayMixin} from './OverlayMixin'
class InfoWindow extends Component {

    constructor(props, context) {
        super(props, context);
        this.bindEvent = OverlayMixin.bindEvent.bind(this)
        const {event, ...setting} = this.props
        const {map} = this.context
        this.infoWindow = map.addInfoWindow(setting)
        /*事件*/
        if (event) {
            this.bindEvent(this.infoWindow, event)
        }
    }


    componentWillUnmount() {
        this.infoWindow.close()
    }

    componentWillReceiveProps(nextProps) {
        const {position:nowPosition, content:nowContent, event:nowEvent, open:nowOpen} = this.props
        const {position, content, event, open} = nextProps
        if (content !== nowContent) {
            this.infoWindow.setContent(content)
        }

        if (position !== nowPosition) {
            this.infoWindow.setPosition(position)
        }

        // if (nextProps === this.props) {
        //     this.infoWindow.setOpen(open || true)
        // }
        /*重新绑定事件*/

        event && this.bindEvent(this.infoWindow, event, nowEvent)
    }

    render() {
        return null
    }
}
InfoWindow.propTypes = {
    position: PropTypes.array.isRequired,
    content: PropTypes.string.isRequired,
    event: PropTypes.object,
    isCustom: PropTypes.bool
}

InfoWindow.contextTypes = {
    map: PropTypes.object
}
export default InfoWindow

