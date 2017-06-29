import React, {Component} from 'react'
import '../../../css/alarm.scss'
import {Dropdown, Icon, Button, Page, Tabs, Table} from 'rc-ui'
import {connect} from 'react-redux';
import {millToString} from '../util'

const Tab = Tabs.Tab
const Path = Icon.Path
const icons = Icon.icons
class ComplainInfo extends Component {

    getYjsj(code) {
        switch (+code) {
            case 1:
                return '危货企业未申报作业预警'
            case 2:
                return '危险作业申报-危货码头停普通船'
            case 3:
                return '危险作业申报-小码头靠大船'
            case 4:
                return '危险作业申报-船舶超载靠泊位预警'
            case 5:
                return '危险作业申报-未在规定的时间内作业'
            case 6:
                return '危险作业申报-未在规定的时间内申报'
            case 7:
                return '危险作业申报-危货品与港口经营许可不同'
            case 8:
                return '流量监控-流量监控点超载预警'
            case 9:
                return '证书过期类-船舶年审合格证到期前30天'
            case 11:
                return '证书过期类-船舶经营许可证到期前30天'
            case 13:
                return '证书过期类-船舶营运检验证到期前30天'
            case 15:
                return '证书过期类-水运企业营运许可证到期前30天'
            case 17:
                return '证书过期类-港口企业营运许可证到期前30天'
            case 19:
                return '证书过期类-危险品作业许可证到期前30天'
            case 21:
                return '证书过期类-机械设施设备有效到期前30天'
            case 23:
                return '证书过期类-危险品作业人员许可证到期前30天'
            case 25:
                return '证书过期类-储罐低液位预警'
            case 10:
                return '证书过期类-船舶年审合格证过期'
            case 12:
                return '证书过期类-船舶经营许可证过期'
            case 14:
                return '证书过期类-船舶营运许可证过期'
            case 16:
                return '证书过期类-水运企业营运许可证过期'
            case 18:
                return '证书过期类,港口企业营运许可证过期'
        }
    }

    render() {
        const {row:info, select} = this.props
        const rows = [
            {field: '报警时间', value: millToString(info.bjsj)},
            {field: '报警级别', value: select.map.bjjb[info.bjjb - 1]},
            {field: '报警类型', value: select.map.bjlx[info.bjlx - 1]},
            {field: '反应企业', value: info.qymc},
            {field: '反应船舶', value: info.cbmc},
            {field: '反应泊位', value: info.bwmc},
        ]


        const res = []
        rows.forEach((r, i) => {
            res.push(<td>{r.field}</td>)
            res.push(<td>{r.value}</td>)
        })
        const resJsx = []
        for (let i = 0; i < res.length; i += 4) {
            resJsx.push(<tr>{res[i]}{res[i + 1]}{res[i + 2]}{res[i + 3]}</tr>)
        }
        return (
            <div className="message">
                <table className="detail-table">
                    <tbody>
                    {resJsx}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapProps({select}) {
    return {
        select
    }
}
export default connect(mapProps)(ComplainInfo)