import React, {Component, PropTypes} from 'react'
import {OverlayMixin} from './OverlayMixin'
class Circle extends Component {
    constructor(props, context) {
        super(props, context);
        const {...setting} = this.props
        const {map} = this.context
        this.circle = map.addCircle(setting)
    }

    componentWillUnmount() {
        this.circle.remove()
    }

    componentWillReceiveProps(nextProps) {
        const {center:nowCenter, radius:nowRadius} = this.props
        const {center, radius} = nextProps
        if (center !== nowCenter) {
            this.circle.setCenter(center)
        }

        if (radius !== nowRadius) {
            this.circle.setRadius(radius)
        }

    }

    render() {
        return null
    }
}

Circle.propTypes = {
    center: PropTypes.array.isRequired,
    radius: PropTypes.number.isRequired,
    event: PropTypes.object,
    edit: PropTypes.bool
}

Circle.contextTypes = {
    map: PropTypes.object
}
export default Circle

