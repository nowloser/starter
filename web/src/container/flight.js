import React, {PureComponent} from 'react'
import 'rc-ui/dist/rc-ui.css'
import '../../css/flight.scss'
import Search from '../component/manager/Search'
import {Tabs, Progress, Page, Table, Icon, Modal, Button} from 'rc-ui'
import {connect} from 'react-redux'
import {getQueryString} from  '../component/util'
import {
    getFlight
} from '../action/flight.action'
import Map from '../component/flight/Map'
import Lines from '../component/flight/Lines'
const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons

class Flight extends PureComponent {
    constructor() {
        super()
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getFlight())
    }

    render() {
        return (
            <div className="flight-page">
                <Map/>
                <Lines/>
            </div>
        )
    }
}

function mapStateToProps({}) {
    return {}
}
export default  connect(mapStateToProps)(Flight)