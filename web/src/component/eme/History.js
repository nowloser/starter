import React, {Component} from 'react'
// import '../../../css/port.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {millToString} from '../util'
import classNames from 'classnames'
import {getHistory, getDoc} from '../../action/eme.action'
const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab

class History extends Component {
    constructor() {
        super();
        this.state = {
            index: 0
        }
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getHistory({page: 1, pageSize: 10}))
    }

    currentPage = (page) => {
        const {dispatch} = this.props
        dispatch(getHistory({page, pageSize: 10}))
    }

    handSelect = (c, index) => {
        this.props.handSel(c, false)
        this.setState({
            index
        })
    }
    getClass = (i) => {
        const $this = this
        return classNames({
            'eme-card': true,
            active: i === $this.state.index
        })
    }

    renderStatus = (status)=>{
        switch (+status){
            case 1:
                return '新增'
            case 2:
                return '事件处置'
            case 3:
                return '调度'
            case 4:
                return '归档'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.history != this.props.history && nextProps.currentTab === 1) {
            this.props.handSel(nextProps.history.data[0])
            this.setState({
                index: 0
            })
        }

        if (nextProps.currentTab != this.props.currentTab && nextProps.currentTab === 1) {
            this.props.handSel(nextProps.history.data[0])
        }
        if (nextProps.currentTab !== 1) {
            this.props.closeDoc()
        }
    }

    showDoc = (data) => {
        const {dispatch} = this.props
        dispatch(getDoc({urgent_id: data.urgent_id}))
        this.props.openDoc()
    }

    render() {
        const {history} = this.props
        return (
            <div>
                <div className="eme-list-container">
                    {history.data.map((c, i) => {
                        return (
                            <div className={this.getClass(i)} onClick={this.handSelect.bind(this, c, i)}>
                                <label>
                                    {c.title}
                                </label>
                                <p>
                                    时间:<span>{c.begin_time}</span>
                                </p>
                                <p>
                                    地点:<span>{c.address}</span>
                                </p>
                                <p>
                                    类型:<span>{c.u_type}</span>
                                </p>
                                <p>
                                    事件状态:<span>{this.renderStatus(c.status)}</span>
                                </p>
                                <a onClick={this.showDoc.bind(this, c)}>应急报告</a>
                            </div>
                        )
                    })}

                </div>

                <div className="eme-page-container">
                    <Page total={history.total} className="res-page" pageSize={10} pageChange={this.currentPage}/>
                </div>
            </div>
        )
    }
}

function mapProps({history}) {
    return {history}
}
export default connect(mapProps)(History)
