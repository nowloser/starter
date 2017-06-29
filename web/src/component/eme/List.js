import React, {Component} from 'react'
import '../../../css/port.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import Current from './Current'
import History from './History'
import Plan from './Plan'
import {getDetail, getReList} from '../../action/eme.action'
import classnames from 'classnames'

const Path = Icon.Path
const icons = Icon.icons
const Tab = Tabs.Tab

class List extends Component {
    constructor() {
        super();
        this.state = {
            // select: {},
            currentTab: 0,
            detail: false,
            doc: false
        }

    }

    handSel = (select, detail) => {
        this.props.handSel(select, () => {
            detail&&this.handDetail()
        })
        this.setState({detail})
    }

    openDoc = () => {
        this.setState({doc: true})
    }

    changeTab = (currentTab) => {
        this.setState({
            currentTab
        })
    }

    handDetail = () => {
        const {dispatch, select} = this.props
        select && dispatch(getDetail({urgent_id: select.urgent_id}))
        select && dispatch(getReList({urgent_id: select.urgent_id}))
    }

    closeDetail = () => {
        this.setState({detail: false})
    }

    closeDoc = () => {
        this.setState({doc: false})
    }


    download = () => {
        const {select} = this.props
        window.open(`/download?urgent_id=${select.urgent_id}`)

    }

    getLevel = (level)=>{
       return ['一般', '较大', '重大', '特别重大'][level]
    }

    render() {
        const {currentTab, changeTab} = this.props
        const {detail, select, reList, doc, plan} = this.props
        const info = detail.data[0] || {}

        const rows = [
            {field: '事件标题', value: info.title, cols: 3},
            {field: '事件时间', value: info.begin_time, cols: 3},
            {field: '事件地点', value: info.address, cols: 3},
            {field: '事件类型', value: info.u_type, cols: 3},
            {field: '事件级别',value: this.getLevel( info.u_level)},
            {field: '事件状态', value: info.status},
            {field: '事件关联企业', value: info.company, cols: 3},
            {field: '事件关联泊位', value: info.berth, cols: 3},
            {field: '事件关联船舶', value: info.vessel, cols: 3},
            {field: '事件原因描述', value: info.reason, cols: 3},
        ]


        const res = []
        rows.forEach((row) => {
            const cols = row.cols || 1
            res.push(<td>{row.field}</td>)
            res.push(<td colSpan={cols}>{row.value}</td>)
        })
        const resJsx = []
        for (let i = 0; i < res.length; i += 2) {
            resJsx.push(<tr>{res[i]}{res[i + 1]}</tr>)
        }

        // resJsx.push(<tr>
        //     <td>事件原因描述</td>
        //     <td colSpan="3">{info.reason}</td>
        // </tr>)


        const detailClass = classnames({
            'detail-info': true,
            active: this.state.detail
        })

        const docClass = classnames({
            'detail-info': true,
            active: this.state.doc
        })

        return (
            <div>
                <Tabs className={'eme-detail-tab'}>
                    <Tab tab="应急事件">
                        <Tabs className={'time-tab'} onChange={changeTab}>
                            <Tab tab="当前">
                                <Current handSel={this.handSel} currentTab={currentTab}/>
                            </Tab>
                            <Tab tab="历史">
                                <History handSel={this.handSel} openDoc={this.openDoc} closeDoc={this.closeDoc}
                                         currentTab={currentTab}/>
                            </Tab>
                        </Tabs>
                    </Tab>
                    <Tab tab="应急预案">
                        <Plan select={select}/>
                    </Tab>
                    {/*<Tab tab="应急物资">*/}
                    {/*<Material/>*/}
                    {/*</Tab>*/}
                </Tabs>
                <div className={detailClass}>
                    <Tabs className={'info-tab'} tools={[<Icon className={'rc-page-icon'} onClick={this.closeDetail}>
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
                        <Tab tab="事件处置">
                            <div className="tran-box">
                                {!reList.data.length && <div className="no-report">无处置记录</div>}
                                {reList.data.map((c) => {
                                    return (<div className='eme-card'>
                                        <p>
                                            时间:{c.operate_date}
                                        </p>
                                        <p>
                                            内容:{c.czjg}
                                        </p>
                                        <p>
                                            备注:{c.remark}
                                        </p>
                                    </div>)
                                })}
                            </div>
                        </Tab>
                    </Tabs>
                </div>


                <div className={docClass}>
                    <Tabs className={'info-tab'} tools={[<Icon className={'rc-page-icon'} onClick={this.closeDoc}>
                        <Path d={icons.close}/>
                    </Icon>]}>
                        <Tab tab="应急报告">
                            <div >
                                <table className="detail-table">
                                    <tbody>
                                    {resJsx}
                                    <tr>
                                        <td>应急预案</td>
                                        <td colSpan="3">{plan.data.map((p) => {
                                            return p.plan_content
                                        })}</td>
                                    </tr>
                                    <tr>
                                        <td>应急资源</td>
                                        <td colSpan="3">{doc.yjzys}</td>
                                    </tr>
                                    <tr>
                                        <td>任务产生方式</td>
                                        <td colSpan="3">{doc.rwcsfs}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <a className="down-link" onClick={this.download}>下载文件</a>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

function mapProps({detail, reList, doc, plan}) {
    return {detail, reList, doc: doc.map, plan}
}
export default connect(mapProps)(List)
