import React, {Component} from 'react'
import classnames from 'classnames'
import {Spin} from 'rc-ui'
import {connect} from 'react-redux'
import Boat from './Boat'

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
                    {show && <Boat showMap={this.showMap} select={select} {...props}/>}
                </div>
            </div>)
    }
}

function mapStateToProps({loading, select}) {
    return {loading, select}
}
export default connect(mapStateToProps)(Result)