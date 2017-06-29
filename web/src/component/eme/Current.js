import React, {Component} from 'react'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {getCurrent} from '../../action/eme.action'
import classNames from 'classnames'
const Path = Icon.Path
const icons = Icon.icons

class Current extends Component {
    constructor() {
        super();
        this.state = {
            index: 0
        }
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getCurrent({page: 1, pageSize: 10}))
    }

    currentPage = (page) => {
        const {dispatch} = this.props
        dispatch(getCurrent({page, pageSize: 10}))
    }

    handSelect = (c, index, detail,e) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.handSel(c, detail)
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


    componentWillReceiveProps(nextProps) {
        if (nextProps.current != this.props.current && nextProps.currentTab === 0) {
            this.props.handSel(nextProps.current.data[0], false)
            this.setState({
                index: 0
            })
        }

        if (nextProps.currentTab != this.props.currentTab && nextProps.currentTab === 0) {
            this.props.handSel(nextProps.current.data[this.state.index], false)
        }
    }

    renderStatus = (status) => {
        switch (+status) {
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

    // getType = (type) => {
    //     switch (+type) {
    //         case 1:
    //             return '地震'
    //         case 2:
    //             return '水灾'
    //         case 3:
    //             return '危险品泄漏'
    //         default:
    //             return type
    //     }
    // }


    render() {
        const {current} = this.props
        return (
            <div>
                <div className="eme-list-container">
                    {current.data.map((c, i) => {
                        return (
                            <div className={this.getClass(i)} onClick={this.handSelect.bind(this, c, i,false)}>
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
                                <a onClick={this.handSelect.bind(this, c, i, true)}>详细信息</a>
                            </div>
                        )
                    })}
                </div>
                <div className="eme-page-container">
                    <Page total={current.total} className="res-page" pageSize={10} pageChange={this.currentPage}/>
                </div>
            </div>
        )
    }
}

function mapProps({current}) {
    return {current}
}
export default connect(mapProps)(Current)
