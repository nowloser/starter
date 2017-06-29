import React, {Component} from 'react'
import '../../../css/alarm.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {
    getComplianBoat,
    getComplianShip,
    getComplianCompany,
    clearComplianBoat,
    clearComplianCompany,
    clearComplianShip
} from '../../action/alarm.action'

const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons
class ComplainDetail extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        const {dispatch, row} = this.props

        const param1 = {fyqy: row.fyqy}
        row.fyqy && dispatch(getComplianCompany(param1))

        /*船舶*/
        const param4 = {fycb: row.fycb}
        row.fycb && dispatch(getComplianBoat(param4))

        /*泊位*/
        const param2 = {fybw: row.fybw}
        row.fybw && dispatch(getComplianShip(param2))
    }


    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(clearComplianShip())
        dispatch(clearComplianCompany())
        dispatch(clearComplianBoat())
    }

    render() {
        const {company, ship, berth} = this.props
        const tabs = []
        if (company && company.data !== null && company.data[0]) {
            const companyData = company.data ? company.data[0] || {} : {}
            tabs.push(<Tab tab="反应企业" key="detail-tab-1">
                <div className="table-row">
                    <table className="detail-table">
                        <tbody>
                        <tr>
                            <td>企业名称</td>
                            <td>{companyData.qymc}</td>
                            <td>许可证号码</td>
                            <td>{companyData.xkzhm}</td>
                        </tr>
                        <tr>
                            <td>许可经营范围</td>
                            <td>{companyData.xkjyfw}</td>
                            <td>许可批文号</td>
                            <td>{companyData.xkpwh}</td>
                        </tr>
                        <tr>
                            <td>许可证状态</td>
                            <td>{companyData.xkzzt}</td>
                            <td>联系人</td>
                            <td>{companyData.fddbr}</td>
                        </tr>
                        <tr>
                            <td>联系电话</td>
                            <td>{companyData.frlxdh}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Tab>)
        }
        if (ship && ship.data !== null && ship.data[0]) {
            const shipData = ship.data ? ship.data[0] || {} : {}
            tabs.push(<Tab tab="反应船舶" key="detail-tab-2">
                <div className="table-row">
                    <table className="detail-table">
                        <tbody>
                        <tr>
                            <td>企业名称</td>
                            <td>{shipData.cbmc}</td>
                            <td>船舶识别号</td>
                            <td>{shipData.cbsbh}</td>
                        </tr>
                        <tr>
                            <td>船舶登记号</td>
                            <td>{shipData.cbdjh}</td>
                            <td>船舶证书号</td>
                            <td>{shipData.cjzsh}</td>
                        </tr>
                        <tr>
                            <td>运营证编号</td>
                            <td>{shipData.yyzbh}</td>
                            <td>船舶所有人</td>
                            <td>{shipData.cbsyr}</td>
                        </tr>
                        <tr>
                            <td>船舶类型</td>
                            <td>{shipData.cblx}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Tab>)
        }
        if (berth && berth.data !== null && berth.data[0]) {
            const berthData = berth.data[0] || {}
            tabs.push(<Tab tab="反应泊位" key="detail-tab-3">
                <div className="table-row">
                    <table className="detail-table">
                        <tbody>
                        <tr>
                            <td>泊位名称</td>
                            <td>{berthData.bwmc}</td>
                            <td>泊位代码</td>
                            <td>{berthData.bwdm}</td>
                        </tr>
                        <tr>
                            <td>泊位属性</td>
                            <td>{berthData.bwsx}</td>
                            <td>泊位所在水系</td>
                            <td>{berthData.bwszsx}</td>
                        </tr>
                        <tr>
                            <td>生产类型</td>
                            <td>{berthData.sclx}</td>
                            <td>服务类型</td>
                            <td>{berthData.fwlx}</td>
                        </tr>
                        <tr>
                            <td>结构形式</td>
                            <td>{berthData.jgxs}</td>
                            <td>主要用途</td>
                            <td>{berthData.zyyt}</td>
                        </tr>
                        <tr>
                            <td>投产年份</td>
                            <td>{berthData.tcnf}</td>
                            <td>竣工验收年份</td>
                            <td>{berthData.jgysnf}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Tab>)
        }

        return (
            <Tabs className={'detail-tab'}>
                {tabs}
            </Tabs>
        )
    }
}

function mapProps({complainCompany:company, complainBoat:ship, complainShip:berth}) {
    return {
        company,
        ship,
        berth
    }
}
export default connect(mapProps)(ComplainDetail)