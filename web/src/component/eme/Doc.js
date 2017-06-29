import React, {Component} from 'react'
import '../../../css/port.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import Current from './Current'
import History from './History'
import Plan from './Plan'
import Material from './Material'
import {getDetail} from '../../action/eme.action'

const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab

class Doc extends Component {
    constructor() {
        super();
        this.state = {
            select: {},
            currentTab: 0,
            detail:false
        }

    }

    handSel = (select) => {
        this.setState({select}, () => {
            this.handDetail()
        })
    }

    changeTab = (currentTab) => {
        this.setState({
            currentTab
        })
    }

    handDetail = () => {
        const {dispatch} = this.props
        dispatch(getDetail({urgent_id: this.state.select.urgent_id}))
    }

    render() {
        const {currentTab} = this.state
        const {detail} = this.props
        const info = detail.data[0] || {}

        const rows = [
            {field: '事件标题', value: info.title},
            {field: '事件时间', value: info.begin_time},
            {field: '事件地点', value: info.address},
            {field: '事件类型', value: info.u_type},
            {field: '事件级别', value: info.u_level},
            {field: '事件状态', value: info.status},
            {field: '事件关联企业', value: info.company},
            {field: '事件关联泊位', value: info.berth},
            {field: '事件关联船舶', value: info.vessel},
            {field: '事件原因描述', value: info.reason},
        ]


        const res = []
        rows.forEach((row) => {
            res.push(<td>{row.field}</td>)
            res.push(<td>{row.value}</td>)
        })
        const resJsx = []
        for (let i = 0; i < res.length; i += 4) {
            resJsx.push(<tr>{res[i]}{res[i + 1]}{res[i + 2]}{res[i + 3]}</tr>)
        }

        const detailClass = classNames({
            'detail-info':true,
            active:this.state.detail
        })

        return (
            <div>
                <Tabs className={'eme-detail-tab'}>
                    <Tab tab="应急事件">
                        <Tabs className={'time-tab'} onChange={this.changeTab}>
                            <Tab tab="当前">
                                <Current handSel={this.handSel} currentTab={currentTab}/>
                            </Tab>
                            <Tab tab="案例">
                                <History handSel={this.handSel} currentTab={currentTab}/>
                            </Tab>
                        </Tabs>
                    </Tab>
                    <Tab tab="应急预案">
                        <Plan select={this.state.select}/>
                    </Tab>
                    <Tab tab="应急物资">
                        <Material/>
                    </Tab>
                </Tabs>
                <div className={detailClass}>
                    <Tabs className={'info-tab'} tools={[<Icon className={'rc-page-icon'} onClick={this.closeCard}>
                        <Path d={icons.close}/>
                    </Icon>]}>
                        <Tab tab="详细信息">
                            <div className="">
                                <table className="detail-table">
                                    <tbody>
                                    {resJsx}
                                    </tbody>
                                </table>
                            </div>
                        </Tab>
                        <Tab tab="应急调度">
                            asjnlsa
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

function mapProps({detail}) {
    return {detail}
}
export default connect(mapProps)(Doc)
