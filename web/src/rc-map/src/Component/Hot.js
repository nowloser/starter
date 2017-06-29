import React, {Component, PropTypes} from 'react'
import {OverlayMixin} from './OverlayMixin'
class Hot extends Component {
    constructor(props, context) {
        super(props, context);
        const {map} = this.context
        this.hot = map.addHot(props.hot)
    }

    componentWillUnmount() {
        this.hot.remove()
    }

    componentWillReceiveProps(nextProps) {
        const {edit:nowEdit, path:nowPath,event:nowEvent} = this.props
    }

    render() {
        return null
    }
}

Hot.contextTypes = {
    map: PropTypes.object
}
// Polyline.propTypes = {
//     path: PropTypes.array.isRequired,
//     event: PropTypes.object,
//     edit: PropTypes.bool
// }
//
// Polyline.contextTypes = {
//     map: PropTypes.object,
// }
export default Hot

