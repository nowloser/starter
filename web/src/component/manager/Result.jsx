import React, {Component} from 'react'
import classnames from 'classnames'
import {Spin} from 'rc-ui'
import {connect} from 'react-redux'
import Company from './Company'
import Boat from './Boat'
import Berth from './Berth'
import Beacon from './Beacon'
import Channel from './Channel'
import Video from './Video'
import Flow from './Flow'
import Building from './Building'
import Gate from './Gate'

import {
    setCenter,
    loading,
    replaceMarker
} from '../../action/map.action'
/**
 *
 * */
class Result extends Component {
    constructor(props, context) {
        super(props, context)
    }

    showMap = ({jd, wd}) => {
        const {dispatch} = this.props
        dispatch(setCenter([jd, wd]))
        dispatch(replaceMarker([{
            position: [jd, wd],
            icon: '../images/circle.png',
            rotate: 0,
            size: [50, 50]
        }]))

    }

    render() {
        const {select, dispatch, loading, show, ...props} = this.props
        const ResultC = [Company, Boat, Berth, Beacon, Channel, Video, Flow, Building, Gate][select - 1]
        const listClass = classnames({
            'result-bar': true,
            active: show
        })

        return (
            <div className={listClass}>
                {loading && (<div className="loading-container">
                    <Spin/>
                </div>)}
                <div>
                    {show && <ResultC showMap={this.showMap} select={select} {...props}/>}
                </div>
            </div>)
    }
}

function mapStateToProps({loading, select}) {
    return {loading, select}
}
export default connect(mapStateToProps)(Result)