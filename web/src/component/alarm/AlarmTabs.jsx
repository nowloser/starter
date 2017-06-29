import React, {Component} from 'react'
import '../../../css/alarm.scss'
import classNames from 'classnames'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {
    getCompany,
    getShip,
    getBerth,
    clearBerth,
    clearCompany,
    clearShip,
    getMachine,
    clearMachine,
    getMonitor,
    clearMonitor,
    getEmployee,
    clearEmployee,
    getTank,
    clearTank
} from '../../action/alarm.action'
import {millToString} from '../util'
const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons


class AlarmTabs extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, row} = this.props
        const param = {yjsx: row.yjsx, yjdxid: row.yjdxid}
        dispatch(getCompany(param))
        dispatch(getShip(param))
        dispatch(getBerth(param))
        dispatch(getEmployee(param))
        dispatch(getTank(param))
        dispatch(getMachine(param))
        dispatch(getMonitor(param))
    }


    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(clearBerth())
        dispatch(clearShip())
        dispatch(clearCompany())
        dispatch(clearMonitor())
        dispatch(clearEmployee())
        dispatch(clearTank())
        dispatch(clearMachine())
    }

    handRadio = (index) => {
        const {handLawChange, ship} = this.props
        handLawChange({'cbmc': ship.data[index].cbmc})
        handLawChange({'cbid': ship.data[index].sycbjbxx_id || ship.data[index].mmsi})
    }

    render() {
        const {company, ship, berth, tank, employee, monitor, machine, info, handLawChange} = this.props
        const tabs = []
        if (company && company.data !== null && company.data[0]) {
            const companyData = company.data[0]
            handLawChange({'qymc': companyData.qymc})
            handLawChange({'ywdwbm': companyData.ywdwbm})

            tabs.push(<Tab tab="预警企业" key="detail-tab-1">
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
        if (info.yjsx == 8) {
            const $this = this
            if (ship && ship.data !== null && ship.data[0]) {
                const column = [
                    {
                        title: '选择', filed: 'opr',
                        render(field, index, rowData, data){
                            return <input type="radio" name="boat" onClick={$this.handRadio.bind($this, index)}/>
                        }
                    },
                    {title: '船舶名称', filed: 'cbmc'},
                    {title: 'mmsi', filed: 'mmsi'},
                    {title: '船舶类型', filed: 'cblx'},
                    {title: '船舶所有人', filed: 'cbsyr'},
                    {
                        title: '船籍', filed: 'flag',
                        render: (value, index, row) => {
                            switch (+value) {
                                case 1:
                                    return '本地船'
                                case 2:
                                    return '外地船'
                            }
                        }
                    },
                ]
                tabs.push(<Tab tab="预警船舶" key="detail-tab-2">
                    <div className="table-row">
                        <Table column={column}
                               data={ship.data}
                               className="table"
                               auto={true}/>
                    </div>
                </Tab>)
            }
        } else {
            if (ship && ship.data !== null && ship.data[0]) {
                const shipData = ship.data[0]

                handLawChange({'cbmc': shipData.cbmc})
                handLawChange({'cbid': shipData.sycbjbxx_id || shipData.mmsi})
                tabs.push(<Tab tab="预警船舶" key="detail-tab-2">
                    <div className="table-row">
                        <table className="detail-table">
                            <tbody>
                            <tr>
                                <td>船舶名称</td>
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
        }
        if (berth && berth.data !== null && berth.data[0]) {
            const berthData = berth.data[0]
            handLawChange({'bwmc': berthData.bwmc})
            handLawChange({'bwid': berthData.bwxx_id})

            tabs.push(<Tab tab="预警泊位" key="detail-tab-3">
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

        if (monitor && monitor.data !== null && monitor.data[0]) {
            const monitorData = monitor.data[0]
            tabs.push(<Tab tab="监控点" key="detail-tab-4">
                <div className="table-row">
                    <table className="detail-table">
                        <tbody>
                        <tr>
                            <td>观测站编号</td>
                            <td>{monitorData.gczbh}</td>
                            <td>观测站名称</td>
                            <td>{monitorData.gczmc}</td>
                        </tr>
                        <tr>
                            <td>观测位置</td>
                            <td>{monitorData.gczwz}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Tab>)
        }

        if (machine && machine.data !== null && machine.data[0]) {
            const machineData = machine.data[0]
            tabs.push(<Tab tab="机械设备" key="detail-tab-5">
                <div className="table-row">
                    <table className="detail-table">
                        <tbody>
                        <tr>
                            <td>设备名称</td>
                            <td>{machineData.jxmc}</td>
                            <td>所属企业</td>
                            <td>{machineData.qymc}</td>
                        </tr>
                        <tr>
                            <td>所属港口</td>
                            <td>{machineData.gkmc}</td>
                            <td>所属港区</td>
                            <td>{machineData.gqmc}</td>
                        </tr>
                        <tr>
                            <td>设备规格</td>
                            <td>{machineData.xhgg}</td>
                            <td>设备有效期（起始时间）</td>
                            <td>{machineData.syqxks}</td>
                        </tr>
                        <tr>
                            <td>设备有效期（截止时间）</td>
                            <td>{machineData.syqxz}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Tab>)
        }

        if (employee && employee.data !== null && employee.data[0]) {
            const employeeData = employee.data[0]
            tabs.push(<Tab tab="从业人员" key="detail-tab-6">
                <div className="table-row">
                    <table className="detail-table">
                        <tbody>
                        <tr>
                            <td>姓名</td>
                            <td>{employeeData.xm}</td>
                            <td>身份证号</td>
                            <td>{employeeData.sfzh}</td>
                        </tr>
                        <tr>
                            <td>所属企业</td>
                            <td>{employeeData.qymc}</td>
                            <td>证书类型</td>
                            <td>{employeeData.zslx}</td>
                        </tr>
                        <tr>
                            <td>证书编号</td>
                            <td>{employeeData.zsbh}</td>
                            <td>有效期(截止时间)</td>
                            <td>{employeeData.yxq}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Tab>)
        }

        if (tank && tank.data !== null && tank.data[0]) {
            const tankData = tank.data[0]
            tabs.push(<Tab tab="储罐" key="detail-tab-7">
                <div className="table-row">
                    <table className="detail-table">
                        <tbody>
                        <tr>
                            <td>储罐容量</td>
                            <td>{tankData.cgrl}</td>
                            <td>当前可用容量</td>
                            <td>{tankData.cgrl}</td>
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

function mapProps({portDetail, company, ship, berth, tank, employee, monitor, machine}) {
    const info = portDetail.data[0] || {}
    return {
        info,
        company,
        ship,
        berth,
        tank,
        employee,
        monitor,
        machine,
    }
}
export default connect(mapProps)(AlarmTabs)